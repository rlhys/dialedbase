"""Admin user + auth payload models."""
from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from .common import new_id, utcnow


class AdminUser(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=new_id)
    email: EmailStr
    password_hash: str
    created_at: datetime = Field(default_factory=utcnow)
    last_login_at: datetime | None = None


class AdminPublic(BaseModel):
    """Admin profile returned to the client (no secrets)."""
    id: str
    email: EmailStr
    last_login_at: datetime | None = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_at: datetime
    admin: AdminPublic
