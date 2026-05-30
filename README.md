# InsightFlow

Upload a dataset, ask questions in plain English, and get answers, tables, charts, and the exact query the AI ran — saved into projects.

**Stack:** Next.js · FastAPI · PostgreSQL · Docker. See [`docs/DESIGN.md`](docs/DESIGN.md) for the full design & architecture spec.

## Quickstart

```bash
cp .env.example .env          # then add your ANTHROPIC_API_KEY (only needed once the ask engine lands)
docker compose up --build
```

- Web: http://localhost:3000
- API health: http://localhost:8000/health
- API DB readiness: http://localhost:8000/readyz

## Local development

**API tests (in a venv — never install globally):**

```bash
cd api
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements-dev.txt
python -m pytest -v
```

**Web:**

```bash
cd web
npm install
npm run dev
```

## Project structure

| Path | Purpose |
|---|---|
| `web/` | Next.js front end (App Router, TypeScript, Tailwind v4) |
| `api/` | FastAPI back end (Python 3.13) |
| `docs/DESIGN.md` | design & architecture spec |
| `docs/design/` | design tokens + approved mockups |
| `docker-compose.yml` | local three-service stack |
