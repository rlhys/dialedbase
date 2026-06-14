"""Auth router: single-admin login (unprotected)."""
from fastapi import APIRouter, Depends, HTTPException, status

from ..db import db
from ..models.admin import AdminPublic, AdminUser, LoginRequest, TokenResponse
from ..models.common import utcnow
from ..security import create_access_token, get_current_admin, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=TokenResponse)
async def login(body: LoginRequest):
    doc = await db.admin_users.find_one({"email": body.email}, {"_id": 0})
    if not doc or not verify_password(body.password, doc["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    admin = AdminUser(**doc)
    token, expires_at = create_access_token(admin.id, admin.email)
    await db.admin_users.update_one({"id": admin.id}, {"$set": {"last_login_at": utcnow()}})
    return TokenResponse(
        access_token=token,
        expires_at=expires_at,
        admin=AdminPublic(id=admin.id, email=admin.email, last_login_at=utcnow()),
    )


@router.get("/me", response_model=AdminPublic)
async def me(admin: AdminUser = Depends(get_current_admin)):
    return AdminPublic(id=admin.id, email=admin.email, last_login_at=admin.last_login_at)


@router.post("/logout")
async def logout(admin: AdminUser = Depends(get_current_admin)):
    # Stateless JWT — nothing to invalidate server-side. Provided for symmetry.
    return {"ok": True}
