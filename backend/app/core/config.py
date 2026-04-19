import json

from pydantic import field_validator, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


DEFAULT_SECRET_KEY = "change-this-secret-key"
LOCAL_CORS_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"]


class Settings(BaseSettings):
    app_name: str = "AlgoAssist API"
    api_v1_prefix: str = "/api/v1"
    environment: str = "development"
    port: int = 8000
    mongodb_uri: str = "mongodb://127.0.0.1:27017"
    mongodb_db_name: str = "algoassist"
    secret_key: str = DEFAULT_SECRET_KEY
    access_token_expire_minutes: int = 60
    algorithm: str = "HS256"
    backend_cors_origins: list[str] = LOCAL_CORS_ORIGINS.copy()

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    @field_validator("environment", mode="before")
    @classmethod
    def normalize_environment(cls, value: str) -> str:
        return value.strip().lower()

    @field_validator("backend_cors_origins", mode="before")
    @classmethod
    def parse_cors_origins(cls, value: str | list[str]) -> list[str]:
        if isinstance(value, list):
            return value
        if not value:
            return []
        if value.startswith("["):
            return json.loads(value)
        return [origin.strip() for origin in value.split(",") if origin.strip()]

    @model_validator(mode="after")
    def validate_production_settings(self) -> "Settings":
        if self.environment != "production":
            return self

        if self.secret_key == DEFAULT_SECRET_KEY:
            raise ValueError("SECRET_KEY must be set in production")
        if not self.backend_cors_origins:
            raise ValueError("BACKEND_CORS_ORIGINS must be set in production")

        return self

    @property
    def cors_origins(self) -> list[str]:
        if self.environment == "production":
            return self.backend_cors_origins

        origins = list(self.backend_cors_origins)
        for origin in LOCAL_CORS_ORIGINS:
            if origin not in origins:
                origins.append(origin)
        return origins


settings = Settings()
