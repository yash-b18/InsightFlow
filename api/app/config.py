from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "InsightFlow API"
    environment: str = "development"
    database_url: str = "postgresql+asyncpg://insightflow:insightflow@db:5432/insightflow"
    jwt_secret: str = "change-me-in-prod"
    llm_provider: str = "anthropic"
    llm_model: str = "claude-sonnet-4-6"
    anthropic_api_key: str | None = None
    openai_api_key: str | None = None


settings = Settings()
