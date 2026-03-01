"""FastAPI application factory and entry point."""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

from backend.api.deps import get_settings
from backend.api.v1.router import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan: connect MongoDB at startup, close at shutdown."""
    settings = get_settings()
    client = AsyncIOMotorClient(settings.mongodb_uri)
    app.state.mongo_client = client
    yield
    client.close()


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    settings = get_settings()
    app = FastAPI(
        title="Template API",
        description="FastAPI backend for template monorepo",
        version="0.1.0",
        debug=settings.debug,
        lifespan=lifespan,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(api_router, prefix=settings.api_v1_prefix)

    @app.get("/")
    def root() -> dict:
        """Root endpoint."""
        return {"message": "Template API", "docs": "/docs"}

    return app


app = create_app()
