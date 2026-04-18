import sqlite3

from fastapi import HTTPException, status

from app.core.security import create_access_token, hash_password, verify_password
from app.repositories.user_repository import create_user, get_user_by_email
from app.schemas.auth import AuthResponse, SignInRequest, SignUpRequest
from app.schemas.profile import UserProfileResponse


def signup(db: sqlite3.Connection, payload: SignUpRequest) -> AuthResponse:
    existing_user = get_user_by_email(db, payload.email)
    if existing_user is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    user = create_user(
        db,
        name=payload.name,
        email=payload.email,
        password_hash=hash_password(payload.password),
    )
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    access_token = create_access_token(str(user["id"]))

    return AuthResponse(
        access_token=access_token,
        user=UserProfileResponse(**user),
    )


def signin(db: sqlite3.Connection, payload: SignInRequest) -> AuthResponse:
    user = get_user_by_email(db, payload.email)
    if user is None or not verify_password(payload.password, str(user["password_hash"])):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = create_access_token(str(user["id"]))
    return AuthResponse(
        access_token=access_token,
        user=UserProfileResponse(**user),
    )
