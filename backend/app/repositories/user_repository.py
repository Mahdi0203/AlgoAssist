from collections.abc import Mapping
import sqlite3
from uuid import uuid4

UserDocument = dict[str, object]

USER_FIELDS = [
    "id",
    "name",
    "email",
    "password_hash",
    "phone_number",
    "institute",
    "avatar_url",
    "facebook_link",
    "discord_username",
    "vjudge_username",
    "codeforces_username",
    "is_active",
]

def serialize_user(document: sqlite3.Row | Mapping[str, object] | None) -> UserDocument | None:
    if document is None:
        return None

    return {key: document[key] for key in USER_FIELDS}


def get_user_by_email(db: sqlite3.Connection, email: str) -> UserDocument | None:
    document = db.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
    return serialize_user(document)


def get_user_by_id(db: sqlite3.Connection, user_id: str) -> UserDocument | None:
    document = db.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    return serialize_user(document)


def create_user(
    db: sqlite3.Connection,
    *,
    name: str,
    email: str,
    password_hash: str,
) -> UserDocument | None:
    try:
        user_id = str(uuid4())
        db.execute(
            """
            INSERT INTO users (
                id, name, email, password_hash, phone_number, institute, facebook_link,
                avatar_url, discord_username, vjudge_username, codeforces_username, is_active
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                user_id,
                name,
                email,
                password_hash,
                None,
                None,
                None,
                None,
                None,
                None,
                None,
                1,
            ),
        )
        db.commit()
    except sqlite3.IntegrityError:
        return None

    document = db.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    return serialize_user(document)


def update_user(
    db: sqlite3.Connection,
    user_id: str,
    updates: dict[str, object | None],
) -> UserDocument | None:
    if not updates:
        return get_user_by_id(db, user_id)

    assignments = ", ".join(f"{field} = ?" for field in updates)
    values = [*updates.values(), user_id]
    db.execute(
        f"UPDATE users SET {assignments}, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        values,
    )
    db.commit()
    document = db.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    return serialize_user(document)
