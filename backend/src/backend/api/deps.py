"""Shared API dependencies."""

from backend.config import Settings, get_settings
from backend.database import get_database

__all__ = ["get_settings", "Settings", "get_database"]
