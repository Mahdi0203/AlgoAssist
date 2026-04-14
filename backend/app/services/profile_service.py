from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.user_repository import update_user
from app.schemas.profile import UpdateProfileRequest, UserProfileResponse


def get_profile(current_user: User) -> UserProfileResponse:
    return UserProfileResponse.model_validate(current_user)


def update_profile(
    db: Session,
    current_user: User,
    payload: UpdateProfileRequest,
) -> UserProfileResponse:
    updates = payload.model_dump(exclude_unset=True)
    user = update_user(db, current_user, updates)
    return UserProfileResponse.model_validate(user)
