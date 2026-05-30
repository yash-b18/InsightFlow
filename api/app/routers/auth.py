import uuid

from fastapi import APIRouter, Cookie, Depends, HTTPException, Response, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.db import get_session
from app.models.user import User
from app.schemas.auth import LoginIn, SignupIn, UserOut
from app.security import (
    create_access_token,
    decode_token,
    hash_password,
    verify_password,
)

router = APIRouter(prefix="/auth", tags=["auth"])


def _set_session_cookie(response: Response, user_id: str) -> None:
    response.set_cookie(
        key=settings.cookie_name,
        value=create_access_token(user_id),
        httponly=True,
        secure=settings.cookie_secure,
        samesite=settings.cookie_samesite,
        max_age=settings.access_token_ttl,
        path="/",
    )


@router.post("/signup", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def signup(
    body: SignupIn,
    response: Response,
    db: AsyncSession = Depends(get_session),
):
    email = body.email.lower()
    existing = await db.scalar(select(User).where(User.email == email))
    if existing is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Email already registered"
        )
    user = User(email=email, name=body.name, password_hash=hash_password(body.password))
    db.add(user)
    await db.commit()
    await db.refresh(user)
    _set_session_cookie(response, str(user.id))
    return user


@router.post("/login", response_model=UserOut)
async def login(
    body: LoginIn,
    response: Response,
    db: AsyncSession = Depends(get_session),
):
    user = await db.scalar(select(User).where(User.email == body.email.lower()))
    if user is None or not verify_password(body.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    _set_session_cookie(response, str(user.id))
    return user


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(response: Response):
    response.delete_cookie(settings.cookie_name, path="/")


async def get_current_user(
    db: AsyncSession = Depends(get_session),
    session: str | None = Cookie(default=None, alias=settings.cookie_name),
) -> User:
    if not session:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated"
        )
    try:
        payload = decode_token(session)
        user_id = uuid.UUID(payload["sub"])
    except Exception as exc:  # noqa: BLE001 - any decode failure is an auth failure
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid session"
        ) from exc
    user = await db.get(User, user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found"
        )
    return user


@router.get("/me", response_model=UserOut)
async def me(user: User = Depends(get_current_user)):
    return user
