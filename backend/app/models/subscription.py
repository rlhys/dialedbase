"""Local mirror of a Square subscription so the dashboard avoids live calls."""
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from .common import new_id, utcnow


class Subscription(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=new_id)
    client_id: str
    square_subscription_id: str
    square_plan_variation_id: str | None = None
    status: str = "ACTIVE"  # Square vocabulary: ACTIVE | PAUSED | CANCELED | DEACTIVATED
    amount: int = 0         # integer cents
    currency: str = "GBP"
    cadence: str = "MONTHLY"
    start_date: datetime | None = None
    canceled_date: datetime | None = None
    created_at: datetime = Field(default_factory=utcnow)
    updated_at: datetime = Field(default_factory=utcnow)
