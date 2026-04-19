from collections.abc import Generator

from app.core.config import settings
from pymongo import MongoClient
from pymongo.database import Database as MongoDatabase

DatabaseClient = MongoDatabase

_mongo_client: MongoClient | None = None


def get_mongodb_database() -> MongoDatabase:
    global _mongo_client

    if _mongo_client is None:
        _mongo_client = MongoClient(settings.mongodb_uri)

    return _mongo_client[settings.mongodb_db_name]


def init_database() -> None:
    database = get_mongodb_database()
    database.users.create_index("id", unique=True)
    database.users.create_index("email", unique=True)


def get_database() -> Generator[DatabaseClient, None, None]:
    yield get_mongodb_database()
