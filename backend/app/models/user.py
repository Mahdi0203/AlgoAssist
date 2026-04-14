from sqlalchemy import Boolean, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    phone_number: Mapped[str | None] = mapped_column(String(30), nullable=True)
    institute: Mapped[str | None] = mapped_column(String(255), nullable=True)
    facebook_link: Mapped[str | None] = mapped_column(String(255), nullable=True)
    discord_username: Mapped[str | None] = mapped_column(String(100), nullable=True)
    vjudge_username: Mapped[str | None] = mapped_column(String(100), nullable=True)
    codeforces_username: Mapped[str | None] = mapped_column(String(100), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
