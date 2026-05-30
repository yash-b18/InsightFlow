from urllib.parse import urlsplit, urlunsplit

import asyncpg
import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from app.config import settings
from app.db import get_session
from app.main import app  # importing app.main also registers all ORM models on Base.metadata
from app.models import Base

_parts = urlsplit(settings.database_url)
_db_name = _parts.path.lstrip("/")
_test_db_name = f"{_db_name}_test"
TEST_DATABASE_URL = urlunsplit(_parts._replace(path=f"/{_test_db_name}"))


async def _ensure_test_database() -> None:
    admin_dsn = urlunsplit(_parts._replace(path="/postgres")).replace(
        "postgresql+asyncpg", "postgresql"
    )
    conn = await asyncpg.connect(admin_dsn)
    try:
        exists = await conn.fetchval(
            "SELECT 1 FROM pg_database WHERE datname = $1", _test_db_name
        )
        if not exists:
            await conn.execute(f'CREATE DATABASE "{_test_db_name}"')
    finally:
        await conn.close()


@pytest_asyncio.fixture
async def client():
    await _ensure_test_database()
    engine = create_async_engine(TEST_DATABASE_URL)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    test_session = async_sessionmaker(engine, expire_on_commit=False)

    async def override_get_session():
        async with test_session() as session:
            yield session

    app.dependency_overrides[get_session] = override_get_session
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as http_client:
        yield http_client

    app.dependency_overrides.clear()
    await engine.dispose()
