# Backend (FastAPI)

## Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate   # Windows
# or: source .venv/bin/activate  # Unix
pip install -e ".[dev]"
```

**MongoDB required:** Ensure MongoDB is running locally (see root README). The app connects to `mongodb://localhost:27017` by default. Override via `MONGODB_URI` in `.env`.

## Run

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

API docs: http://localhost:8000/docs

## MongoDB Usage

Use `Depends(get_database)` in route handlers to access the database:

```python
from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from backend.database import get_database

router = APIRouter()

@router.get("/items")
async def list_items(db: AsyncIOMotorDatabase = Depends(get_database)):
    cursor = db.items.find({})
    items = await cursor.to_list(100)
    return items
```
