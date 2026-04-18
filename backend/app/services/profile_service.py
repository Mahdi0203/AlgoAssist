import sqlite3

from fastapi import HTTPException, status

from app.repositories.user_repository import update_user
from app.schemas.profile import UpdateProfileRequest, UserProfileResponse


def get_profile(current_user: dict) -> UserProfileResponse:
    return UserProfileResponse(**current_user)


def update_profile(
    db: sqlite3.Connection,
    current_user: dict,
    payload: UpdateProfileRequest,
) -> UserProfileResponse:
    updates = payload.model_dump(exclude_unset=True)
    user = update_user(db, str(current_user["id"]), updates)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    return UserProfileResponse(**user)
