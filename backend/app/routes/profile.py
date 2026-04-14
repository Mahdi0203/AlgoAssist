from fastapi import APIRouter, Depends
from pymongo.database import Database

from app.api.deps import get_current_user
from app.core.database import get_database
from app.schemas.profile import UpdateProfileRequest, UserProfileResponse
from app.services.profile_service import get_profile, update_profile

router = APIRouter()


@router.get("/me", response_model=UserProfileResponse)
def read_my_profile(current_user: dict = Depends(get_current_user)) -> UserProfileResponse:
    return get_profile(current_user)


@router.patch("/me", response_model=UserProfileResponse)
def update_my_profile(
    payload: UpdateProfileRequest,
    db: Database = Depends(get_database),
    current_user: dict = Depends(get_current_user),
) -> UserProfileResponse:
    return update_profile(db, current_user, payload)
