"""MongoDB connection and database access."""

from typing import Annotated

from fastapi import Request
from motor.motor_asyncio import AsyncIOMotorDatabase


def get_database(request: Request) -> AsyncIOMotorDatabase:
    """
    FastAPI dependency that returns the MongoDB database instance.
    Use in route handlers: db: Annotated[AsyncIOMotorDatabase, Depends(get_database)]
    """
    return request.app.state.mongo_client["template"]
