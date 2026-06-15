"""Centralized settings, read once from the environment.

All admin-panel configuration (auth, Square, reminders) lives here so the rest
of the code never touches os.environ directly.
"""
from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

ROOT_DIR = Path(__file__).resolve().parent.parent  # backend/


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=str(ROOT_DIR / ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # --- Database (existing) ---
    MONGO_URL: str
    DB_NAME: str
    CORS_ORIGINS: str = "*"

    # --- Auth ---
    JWT_SECRET: str = "change-me-in-prod"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 720  # 12h
    ADMIN_EMAIL: str = ""
    ADMIN_PASSWORD_HASH: str = ""  # bcrypt hash, generated offline

    # --- Square ---
    SQUARE_ACCESS_TOKEN: str = ""
    SQUARE_ENVIRONMENT: str = "sandbox"  # sandbox | production
    SQUARE_APPLICATION_ID: str = ""  # public app id (sq0idp-...) for Web Payments SDK
    SQUARE_LOCATION_ID: str = ""
    PUBLIC_BASE_URL: str = "https://www.dialedbase.com"  # for building client-facing links
    SQUARE_WEBHOOK_SIGNATURE_KEY: str = ""
    SQUARE_WEBHOOK_NOTIFICATION_URL: str = ""
    SQUARE_DEFAULT_PLAN_VARIATION_ID: str = ""  # optional shared monthly plan variation

    # --- Reminders / cron (future tier-2) ---
    CRON_SECRET: str = ""

    @property
    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()] or ["*"]

    @property
    def square_is_configured(self) -> bool:
        return bool(self.SQUARE_ACCESS_TOKEN and self.SQUARE_LOCATION_ID)


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
