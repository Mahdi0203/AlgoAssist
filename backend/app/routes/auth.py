import sqlite3

from fastapi import APIRouter, Depends, status

from app.core.database import get_database
from app.schemas.auth import AuthResponse, SignInRequest, SignUpRequest
from app.services.auth_service import signin, signup

router = APIRouter()


@router.post("/signup", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def signup_user(
    payload: SignUpRequest,
    db: sqlite3.Connection = Depends(get_database),
) -> AuthResponse:
    return signup(db, payload)


@router.post("/signin", response_model=AuthResponse)
def signin_user(
    payload: SignInRequest,
    db: sqlite3.Connection = Depends(get_database),
) -> AuthResponse:
    return signin(db, payload)
