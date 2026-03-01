"""Health check endpoint."""

from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health")
def health() -> dict:
    """Return health status for readiness probes."""
    return {"status": "ok", "service": "backend"}
