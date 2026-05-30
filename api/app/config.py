from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "InsightFlow API"
    environment: str = "development"
    database_url: str = "postgresql+asyncpg://insightflow:insightflow@db:5432/insightflow"

    # auth
    jwt_secret: str = "change-me-in-prod"
    jwt_alg: str = "HS256"
    access_token_ttl: int = 60 * 60 * 24 * 7  # 7 days, in seconds
    cookie_name: str = "if_session"
    cookie_secure: bool = False  # True behind HTTPS in prod
    cookie_samesite: str = "lax"

    # llm
    llm_provider: str = "anthropic"
    llm_model: str = "claude-sonnet-4-6"
    anthropic_api_key: str | None = None
    openai_api_key: str | None = None


settings = Settings()
