from bson import ObjectId
from pymongo.database import Database
from pymongo.errors import DuplicateKeyError

UserDocument = dict[str, object]

USER_FIELDS = [
    "name",
    "email",
    "password_hash",
    "phone_number",
    "institute",
    "facebook_link",
    "discord_username",
    "vjudge_username",
    "codeforces_username",
    "is_active",
]

def serialize_user(document: UserDocument | None) -> UserDocument | None:
    if document is None:
        return None

    serialized = {key: document.get(key) for key in USER_FIELDS}
    serialized["id"] = str(document["_id"])
    return serialized


def get_user_by_email(db: Database, email: str) -> UserDocument | None:
    document = db["users"].find_one({"email": email})
    return serialize_user(document)


def get_user_by_id(db: Database, user_id: str) -> UserDocument | None:
    if not ObjectId.is_valid(user_id):
        return None

    document = db["users"].find_one({"_id": ObjectId(user_id)})
    return serialize_user(document)


def create_user(
    db: Database,
    *,
    name: str,
    email: str,
    password_hash: str,
) -> UserDocument | None:
    payload = {
        "name": name,
        "email": email,
        "password_hash": password_hash,
        "phone_number": None,
        "institute": None,
        "facebook_link": None,
        "discord_username": None,
        "vjudge_username": None,
        "codeforces_username": None,
        "is_active": True,
    }
    collection = db["users"]

    try:
        result = collection.insert_one(payload)
    except DuplicateKeyError:
        return None

    document = collection.find_one({"_id": result.inserted_id})
    return serialize_user(document)


def update_user(db: Database, user_id: str, updates: dict) -> UserDocument | None:
    if not ObjectId.is_valid(user_id):
        return None

    db["users"].update_one({"_id": ObjectId(user_id)}, {"$set": updates})
    document = db["users"].find_one({"_id": ObjectId(user_id)})
    return serialize_user(document)
