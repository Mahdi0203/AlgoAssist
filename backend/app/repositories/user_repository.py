from collections.abc import Mapping
from uuid import uuid4

from app.core.database import DatabaseClient
from pymongo import ReturnDocument
from pymongo.errors import DuplicateKeyError

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

def serialize_user(document: Mapping[str, object] | None) -> UserDocument | None:
    if document is None:
        return None

    serialized = {key: document[key] for key in USER_FIELDS if key in document}
    if "id" in serialized:
        serialized["id"] = str(serialized["id"])
    return serialized


def get_user_by_email(db: DatabaseClient, email: str) -> UserDocument | None:
    document = db.users.find_one({"email": email})
    return serialize_user(document)


def get_user_by_id(db: DatabaseClient, user_id: str) -> UserDocument | None:
    document = db.users.find_one({"id": user_id})
    return serialize_user(document)


def create_user(
    db: DatabaseClient,
    *,
    name: str,
    email: str,
    password_hash: str,
) -> UserDocument | None:
    user_id = str(uuid4())

    document = {
        "id": user_id,
        "name": name,
        "email": email,
        "password_hash": password_hash,
        "phone_number": None,
        "institute": None,
        "avatar_url": None,
        "facebook_link": None,
        "discord_username": None,
        "vjudge_username": None,
        "codeforces_username": None,
        "is_active": 1,
    }
    try:
        db.users.insert_one(document)
    except DuplicateKeyError:
        return None

    return serialize_user(document)


def update_user(
    db: DatabaseClient,
    user_id: str,
    updates: dict[str, object | None],
) -> UserDocument | None:
    if not updates:
        return get_user_by_id(db, user_id)

    document = db.users.find_one_and_update(
        {"id": user_id},
        {"$set": updates},
        return_document=ReturnDocument.AFTER,
    )
    return serialize_user(document)
