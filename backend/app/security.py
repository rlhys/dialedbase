"""Password hashing, JWT issuing/verification, and the admin-auth dependency."""
import logging
from datetime import datetime, timedelta, timezone

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from passlib.context import CryptContext

from .config import settings
from .db import db
from .models.admin import AdminUser
from .models.common import utcnow

logger = logging.getLogger(__name__)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
_bearer = HTTPBearer(auto_error=False)


# --- Passwords ---
def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return pwd_context.verify(plain, hashed)
    except Exception:
        return False


# --- JWT ---
def create_access_token(sub: str, email: str) -> tuple[str, datetime]:
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=settings.JWT_EXPIRE_MINUTES)
    payload = {"sub": sub, "email": email, "exp": expires_at}
    token = jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
    return token, expires_at


def decode_token(token: str) -> dict:
    return jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])


# --- Client-facing card-capture links (no admin login) ---
def create_card_session_token(client_id: str, days_valid: int = 14) -> str:
    expires_at = datetime.now(timezone.utc) + timedelta(days=days_valid)
    payload = {"sub": client_id, "purpose": "save_card", "exp": expires_at}
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)


def verify_card_session_token(token: str) -> str:
    """Return the client_id for a valid save-card token, else raise JWTError."""
    payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
    if payload.get("purpose") != "save_card" or not payload.get("sub"):
        raise JWTError("invalid card session token")
    return payload["sub"]


def create_checkout_token(payment_id: str, days_valid: int = 30) -> str:
    expires_at = datetime.now(timezone.utc) + timedelta(days=days_valid)
    payload = {"sub": payment_id, "purpose": "checkout", "exp": expires_at}
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)


def verify_checkout_token(token: str) -> str:
    """Return the payment_id for a valid checkout token, else raise JWTError."""
    payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
    if payload.get("purpose") != "checkout" or not payload.get("sub"):
        raise JWTError("invalid checkout token")
    return payload["sub"]


# --- Dependency ---
async def get_current_admin(
    creds: HTTPAuthorizationCredentials | None = Depends(_bearer),
) -> AdminUser:
    cred_exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Not authenticated",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if creds is None or not creds.credentials:
        raise cred_exc
    try:
        payload = decode_token(creds.credentials)
        sub = payload.get("sub")
        if not sub:
            raise cred_exc
    except JWTError:
        raise cred_exc

    doc = await db.admin_users.find_one({"id": sub}, {"_id": 0})
    if not doc:
        raise cred_exc
    return AdminUser(**doc)


# --- Bootstrap ---
async def seed_admin() -> None:
    """Upsert the single admin from env (ADMIN_EMAIL + ADMIN_PASSWORD_HASH).

    Idempotent: keeps the email/hash in sync with env on every startup so the
    DB is the source of truth but env bootstraps it. No signup endpoint exists.
    """
    if not settings.ADMIN_EMAIL or not settings.ADMIN_PASSWORD_HASH:
        logger.warning("ADMIN_EMAIL / ADMIN_PASSWORD_HASH not set; admin not seeded.")
        return
    existing = await db.admin_users.find_one({"email": settings.ADMIN_EMAIL})
    if existing:
        await db.admin_users.update_one(
            {"id": existing["id"]},
            {"$set": {"password_hash": settings.ADMIN_PASSWORD_HASH}},
        )
        return
    admin = AdminUser(email=settings.ADMIN_EMAIL, password_hash=settings.ADMIN_PASSWORD_HASH)
    doc = admin.model_dump()
    doc["created_at"] = utcnow()
    await db.admin_users.insert_one(doc)
    logger.info("Seeded admin user %s", settings.ADMIN_EMAIL)
