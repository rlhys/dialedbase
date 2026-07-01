"""Auth router: single-admin login (unprotected)."""
from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status

from ..db import db
from ..models.admin import AdminPublic, AdminUser, LoginRequest, TokenResponse
from ..models.common import ensure_aware, utcnow
from ..security import create_access_token, get_current_admin, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])

# Brute-force throttle: after MAX_FAILED failures, lock for LOCK_WINDOW.
# Auto-clears, so a legit admin is only ever delayed, never permanently locked.
MAX_FAILED = 10
LOCK_WINDOW = timedelta(minutes=15)


@router.post("/login", response_model=TokenResponse)
async def login(body: LoginRequest):
    now = utcnow()
    doc = await db.admin_users.find_one({"email": body.email}, {"_id": 0})

    attempts = doc.get("failed_attempts", 0) if doc else 0
    last_failed = ensure_aware(doc.get("last_failed_at")) if doc else None
    within_window = last_failed is not None and (now - last_failed) < LOCK_WINDOW

    if doc and attempts >= MAX_FAILED and within_window:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many attempts. Please try again later.",
        )

    if not doc or not verify_password(body.password, doc["password_hash"]):
        if doc:
            next_count = attempts + 1 if within_window else 1
            await db.admin_users.update_one(
                {"id": doc["id"]},
                {"$set": {"failed_attempts": next_count, "last_failed_at": now}},
            )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    admin = AdminUser(**doc)
    token, expires_at = create_access_token(admin.id, admin.email)
    await db.admin_users.update_one(
        {"id": admin.id}, {"$set": {"last_login_at": now, "failed_attempts": 0}}
    )
    return TokenResponse(
        access_token=token,
        expires_at=expires_at,
        admin=AdminPublic(id=admin.id, email=admin.email, last_login_at=now),
    )


@router.get("/me", response_model=AdminPublic)
async def me(admin: AdminUser = Depends(get_current_admin)):
    return AdminPublic(id=admin.id, email=admin.email, last_login_at=admin.last_login_at)


@router.post("/logout")
async def logout(admin: AdminUser = Depends(get_current_admin)):
    # Stateless JWT — nothing to invalidate server-side. Provided for symmetry.
    return {"ok": True}
