"""Payment models. Amounts are integer cents."""
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from .common import PaymentSource, PaymentStatus, PaymentType, new_id, utcnow


class PaymentBase(BaseModel):
    client_id: str
    type: PaymentType
    amount: int = Field(..., ge=0, description="Amount in integer cents")
    currency: str = "USD"
    status: PaymentStatus = PaymentStatus.pending
    due_date: datetime
    paid_at: datetime | None = None
    period_start: datetime | None = None
    period_end: datetime | None = None
    source: PaymentSource = PaymentSource.manual
    note: str | None = None


class PaymentCreate(PaymentBase):
    pass


class PaymentUpdate(BaseModel):
    type: PaymentType | None = None
    amount: int | None = Field(None, ge=0)
    status: PaymentStatus | None = None
    due_date: datetime | None = None
    paid_at: datetime | None = None
    period_start: datetime | None = None
    period_end: datetime | None = None
    note: str | None = None


class Payment(PaymentBase):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=new_id)
    square_payment_id: str | None = None
    square_order_id: str | None = None
    square_invoice_id: str | None = None
    square_payment_link_id: str | None = None
    square_payment_link_url: str | None = None
    created_at: datetime = Field(default_factory=utcnow)
    updated_at: datetime = Field(default_factory=utcnow)


class PaymentOut(Payment):
    """Payment with the derived `overdue` flag and a denormalized client name."""
    overdue: bool = False
    client_name: str | None = None
