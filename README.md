# Template Web FastAPI

A production-ready monorepo template with React + Vite + shadcn/ui + Tailwind 4 frontend and FastAPI backend. MongoDB-ready with Motor (async driver).

## Using This Template for a New Project

To start a new project from this template:

1. **Create a new repo from the template**
   - On GitHub: Click **Use this template** → **Create a new repository**. Give it your project name and create.
   - Or manually: Clone this repo, remove the `.git` folder (`rm -rf .git` on macOS/Linux, or `Remove-Item -Recurse -Force .git` in PowerShell), then run `git init` to start fresh history.

2. **Open your new repo in Cursor**
   - In Cursor: **Clone repository** (or File → Open Folder → Clone Repository).
   - Paste the URL of *your new repo* (e.g. `https://github.com/your-username/your-project.git`), not the template URL.
   - Choose a local folder and clone.

3. **Customize for your project**
   - Update `README.md` — project name, description, and any project-specific setup.
   - Update `frontend/package.json` — set `"name"` to your project name (e.g. `"my-app"`).
   - Update `backend/pyproject.toml` — set `name` and `version` under `[project]`.

4. **Follow the setup steps below** (Prerequisites, MongoDB, Quick Start).

## Prerequisites

- **Node.js** 18+ and **npm** (for frontend)
- **Python** 3.11+ (for backend)
- **MongoDB** (for the backend database)

## MongoDB Setup

The backend uses MongoDB. Install MongoDB locally and optionally MongoDB Compass (GUI) for viewing and editing data.

### macOS (Homebrew)

1. Install [Homebrew](https://brew.sh) if you don't have it.
2. Tap the MongoDB repo and install:
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   ```
3. Start MongoDB:
   ```bash
   brew services start mongodb-community
   ```

### Windows

1. Download the MongoDB Community Server MSI from:  
   [MongoDB Community Download](https://www.mongodb.com/try/download/community)
2. Run the installer. On the final screen, optionally check **Install MongoDB Compass** to install the GUI.
3. MongoDB runs as a Windows service by default after install.

### MongoDB Compass (GUI, optional)

- **macOS**: Download from [MongoDB Compass Download](https://www.mongodb.com/try/download/compass), or run `./install_compass` from the MongoDB `bin` directory if you installed via tarball.
- **Windows**: Often installed with MongoDB during setup; otherwise download from the same link.
- Connect to `mongodb://localhost:27017` to inspect your local database.

## Quick Start

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate   # Windows
# or: source .venv/bin/activate  # macOS/Linux
pip install -e ".[dev]"
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

API docs: http://localhost:8000/docs

Ensure MongoDB is running first; the backend connects to `mongodb://localhost:27017` by default. Set `MONGODB_URI` in `backend/.env` to override.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App: http://localhost:5173

### Run Both

Start the backend in one terminal, then the frontend in another. The frontend proxies `/api` to the backend automatically.

## Project Structure

```
├── frontend/     # React + Vite + shadcn + Tailwind 4
├── backend/      # FastAPI + Motor (MongoDB)
└── README.md
```

## Features

- **Frontend**: React 19, Vite 7, TypeScript, shadcn/ui, Tailwind 4
- **Backend**: FastAPI, pydantic-settings, Motor (async MongoDB), versioned API (`/api/v1`)
- **Database**: MongoDB with Motor; use `Depends(get_database)` in routes
- **Communication**: Vite proxy for `/api` in dev; CORS configured for frontend origin
