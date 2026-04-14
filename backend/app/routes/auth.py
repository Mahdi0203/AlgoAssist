from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.auth import AuthResponse, SignInRequest, SignUpRequest
from app.services.auth_service import signin, signup

router = APIRouter()


@router.post("/signup", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def signup_user(payload: SignUpRequest, db: Session = Depends(get_db)) -> AuthResponse:
    return signup(db, payload)


@router.post("/signin", response_model=AuthResponse)
def signin_user(payload: SignInRequest, db: Session = Depends(get_db)) -> AuthResponse:
    return signin(db, payload)
