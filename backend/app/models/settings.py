"""App settings singleton (id == 'singleton')."""
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from .common import utcnow

SETTINGS_ID = "singleton"


class AppSettings(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = SETTINGS_ID
    business_name: str = "dialedbase"
    default_currency: str = "GBP"
    upcoming_window_days: int = 7
    overdue_grace_days: int = 0
    timezone: str = "UTC"
    updated_at: datetime = Field(default_factory=utcnow)


class AppSettingsUpdate(BaseModel):
    business_name: str | None = None
    default_currency: str | None = None
    upcoming_window_days: int | None = None
    overdue_grace_days: int | None = None
    timezone: str | None = None
