from collections.abc import Generator
import os
from pathlib import Path
import sqlite3

from app.core.config import settings

BASE_DIR = Path(__file__).resolve().parents[2]


def resolve_database_path() -> Path:
    configured_path = Path(settings.database_path).expanduser()
    if configured_path.is_absolute():
        return configured_path

    local_app_data = os.getenv("LOCALAPPDATA")
    if local_app_data:
        return Path(local_app_data) / "AlgoAssist" / configured_path.name

    return BASE_DIR / ".data" / configured_path.name


DATABASE_PATH = resolve_database_path()


def create_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(DATABASE_PATH, check_same_thread=False)
    connection.row_factory = sqlite3.Row
    return connection


def init_database() -> None:
    DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)

    with create_connection() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                phone_number TEXT,
                institute TEXT,
                avatar_url TEXT,
                facebook_link TEXT,
                discord_username TEXT,
                vjudge_username TEXT,
                codeforces_username TEXT,
                is_active INTEGER NOT NULL DEFAULT 1,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
            """
        )
        columns = {
            row["name"]
            for row in connection.execute("PRAGMA table_info(users)").fetchall()
        }
        if "avatar_url" not in columns:
            connection.execute("ALTER TABLE users ADD COLUMN avatar_url TEXT")
        connection.commit()


def get_database() -> Generator[sqlite3.Connection, None, None]:
    connection = create_connection()
    try:
        yield connection
    finally:
        connection.close()
