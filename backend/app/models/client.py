"""Client (CRM) models. Money is stored as integer cents."""
from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from .common import ClientStatus, new_id, utcnow


class ClientBase(BaseModel):
    name: str
    company: str | None = None
    email: EmailStr
    phone: str | None = None
    status: ClientStatus = ClientStatus.lead
    project_description: str | None = None
    notes: str | None = None
    deposit_amount: int = Field(0, ge=0, description="Deposit in integer cents")
    monthly_recurring_amount: int = Field(0, ge=0, description="Monthly recurring in integer cents")
    start_date: date | None = None
    currency: str = "GBP"


class ClientCreate(ClientBase):
    pass


class ClientUpdate(BaseModel):
    name: str | None = None
    company: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    status: ClientStatus | None = None
    project_description: str | None = None
    notes: str | None = None
    deposit_amount: int | None = Field(None, ge=0)
    monthly_recurring_amount: int | None = Field(None, ge=0)
    start_date: date | None = None
    currency: str | None = None


class Client(ClientBase):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=new_id)
    square_customer_id: str | None = None
    square_subscription_id: str | None = None
    created_at: datetime = Field(default_factory=utcnow)
    updated_at: datetime = Field(default_factory=utcnow)


class ClientOut(Client):
    """Client enriched with derived fields for the UI."""
    outstanding_balance: int = 0       # sum of pending payment amounts (cents)
    paid_total: int = 0                # sum of paid payment amounts (cents)
    next_payment_due: datetime | None = None
    overdue_count: int = 0
