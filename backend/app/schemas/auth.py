from pydantic import BaseModel, EmailStr, Field


class SignUpRequest(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)


class SignInRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserProfileResponse"


from app.schemas.profile import UserProfileResponse

AuthResponse.model_rebuild()
