# AI Agent Guidelines

This file provides context for AI coding assistants (Cursor, Copilot, Cline, Windsurf, etc.) working in this monorepo.

## Project Overview

Full-stack template: **React + Vite + shadcn/ui + Tailwind 4** frontend and **FastAPI** backend.

```
frontend/    → React app (port 5173, proxies /api to backend)
backend/     → FastAPI app (port 8000, entry: backend.main:app)
```

**MongoDB**: Backend uses Motor (async). MongoDB must be running locally. Use `Depends(get_database)` in routes to access the database.

## Running the Project

1. Backend: `cd backend && .venv\Scripts\activate && uvicorn backend.main:app --reload --port 8000`
2. Frontend: `cd frontend && npm run dev`
3. The Vite proxy forwards `/api` to `http://localhost:8000` in development.

## Pillars: Performance, Correctness, Best Practices

Every change should respect these three:

- **Performance**: Avoid obvious waste (N+1, unbounded lists, heavy work on every render). Paginate, project, index. Use async. Measure before optimizing, but prefer fast-by-default patterns.
- **Correctness**: Validate at boundaries. Handle null, empty, and error states. Use stable keys. Design for edge cases and retries.
- **Best practices**: Security baseline (no secrets in code, validate inputs). Fail fast with clear errors. Readable over clever.

## Key Conventions

### Design Philosophy

- **KISS**: Choose the simplest approach that solves the actual problem. Do not over-engineer.
- **DRY**: Extract shared code only when there is a real second usage. One call site is not a pattern.
- **No premature abstraction**: Do not create base classes, factories, or generic wrappers unless a concrete need exists today.
- **Reuse with reason**: Components and utilities should be shared when two or more consumers exist. Otherwise keep them colocated.

### Frontend

- **UI components**: Use shadcn/ui (`frontend/src/components/ui/`). Add new ones with `npx shadcn@latest add <name>`.
- **API calls**: All backend requests go through `src/api/client.ts` using `apiFetch<T>()`. Never use raw `fetch` in components.
- **Styling**: Tailwind utility classes only. Use theme variables (`bg-primary`, `text-muted-foreground`), not hardcoded colors.
- **TypeScript**: Strict mode. No `any`.

### Backend

- **Endpoints**: `backend/src/backend/api/v1/endpoints/<domain>.py` with `APIRouter`.
- **Schemas (DTOs)**: Pydantic models for all request/response payloads. No raw dicts.
- **Config**: `pydantic-settings` in `config.py`. Access via `Depends(get_settings)`.
- **Thin routes**: Route handlers validate and delegate. Business logic goes in a `service.py` only when non-trivial.

### Verification (Critical)

- After creating/modifying any endpoint: **hit it and confirm the response** (curl, Swagger, or browser).
- After changing frontend API code: **load the page and verify** the data renders.
- Do not mark work complete if the server is returning errors.

### Non-Developer Support

This template is used by non-developers. Reduce guesswork:

- **Do the verification yourself**: Run curl, snapshots, tests. Don't only tell the user to test—run it and confirm.
- **When debugging**: Tell the user exactly what to copy (e.g., "Copy the full error from the terminal"), where to paste it, and explain in plain language. Provide copy-paste ready commands for their OS.
- **Be proactive**: Explain what you changed. Confirm and report what you verified before closing a task.

### Adding a New Feature (Checklist)

1. Create the backend endpoint + Pydantic schema.
2. Register the router in `api/v1/router.py`.
3. Verify the endpoint via `/docs` or curl.
4. Create the frontend API function in `src/api/`.
5. Build the UI component using shadcn/ui primitives.
6. Verify the full flow in the browser.
