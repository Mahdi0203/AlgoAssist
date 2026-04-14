from pymongo import MongoClient
from pymongo.collection import Collection
from pymongo.database import Database

from app.core.config import settings

client = MongoClient(settings.database_url)
database = client[settings.database_name]


def get_database() -> Database:
    return database


def get_user_collection(db: Database | None = None) -> Collection:
    active_db = db or database
    return active_db["users"]
