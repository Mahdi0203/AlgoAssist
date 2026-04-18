from pydantic import BaseModel, EmailStr, Field


class UserProfileResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    phone_number: str | None
    institute: str | None
    avatar_url: str | None
    facebook_link: str | None
    discord_username: str | None
    vjudge_username: str | None
    codeforces_username: str | None


class UpdateProfileRequest(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=120)
    phone_number: str | None = Field(default=None, max_length=30)
    institute: str | None = Field(default=None, max_length=255)
    avatar_url: str | None = Field(default=None, max_length=2_000_000)
    facebook_link: str | None = Field(default=None, max_length=255)
    discord_username: str | None = Field(default=None, max_length=100)
    vjudge_username: str | None = Field(default=None, max_length=100)
    codeforces_username: str | None = Field(default=None, max_length=100)
