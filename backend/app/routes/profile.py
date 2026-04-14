from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_db
from app.models.user import User
from app.schemas.profile import UpdateProfileRequest, UserProfileResponse
from app.services.profile_service import get_profile, update_profile

router = APIRouter()


@router.get("/me", response_model=UserProfileResponse)
def read_my_profile(current_user: User = Depends(get_current_user)) -> UserProfileResponse:
    return get_profile(current_user)


@router.patch("/me", response_model=UserProfileResponse)
def update_my_profile(
    payload: UpdateProfileRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> UserProfileResponse:
    return update_profile(db, current_user, payload)
