# InsightFlow — Design & Architecture Spec

> Status: approved design baseline (2026-05-30). This is the source-of-truth contract for the build. Each feature is implemented on its own branch, mocked for approval first, and documented in a local (gitignored) build-notes file.

## 1. Product

InsightFlow is a SaaS app where a user uploads a dataset, asks questions in plain English, and gets back a written answer, a table, a chart, and the exact query the AI ran — saved into projects as reusable insights.

**User flow:** marketing page → sign up / log in → upload CSV/Excel or type a table → app profiles the dataset → user asks a data question → AI writes a safe query → backend executes it → UI shows NL answer + table + chart + generated SQL + saved history.

**Hard rule:** the assistant only answers questions about the loaded dataset. Anything off-topic is politely declined.

## 2. Decisions (locked)

| Area | Decision |
|---|---|
| Stack | Next.js (App Router, TS) · FastAPI (Python 3.13) · PostgreSQL · Docker Compose |
| v1 data sources | CSV + Excel upload, and manual table entry. External DB/API/Sheets connectors are out of scope (designed for later). |
| AI | Provider-abstracted. Default **Claude Sonnet 4.6** (Opus 4.8 for "deep" questions); OpenAI/local swappable via env. Prompt caching on. |
| Execution | **Read-only, SELECT-only SQL on Postgres.** Sandboxed Python deferred. |
| Auth | Native FastAPI + JWT (bcrypt, HTTP-only cookies). |
| Build approach | Phased vertical slices; one feature branch each; mock per feature. |
| Visual design | Dark "ocean" theme (see §6). |

## 3. Architecture

Three tiers + a swappable model:

- **Web (Next.js):** landing, auth, upload/manual entry, dataset profile, ask workspace, projects/history. Calls the API over JSON with a JWT in an HTTP-only cookie.
- **API (FastAPI):** Auth, Datasets (ingestion), Profiling, and the **Ask engine** (guardrail → SQL-gen → validator → executor → summarizer).
- **PostgreSQL:** an **app schema** (users, projects, datasets, profiles, questions, insights) and a **data schema** holding one physical table per uploaded dataset. Query execution uses a dedicated **read-only role**.
- **LLM provider:** behind one `LLMProvider` interface. Receives schema + profile + question for SQL-gen, and the (capped) result rows for summarization — never the full raw dataset.

## 4. Data model (app schema)

- **users** — id, email (unique), password_hash, name, created_at.
- **projects** — id, user_id, name, created_at. Groups datasets + insights.
- **datasets** — id, project_id, user_id, name, original_filename, source_type (`csv|xlsx|manual`), table_name (in data schema), status (`profiling|ready|error`), row_count, column_count, size_bytes, created_at.
- **dataset_columns** (the profile) — id, dataset_id, name, position, data_type (`text|number|date|boolean|id`), nullable, null_count, distinct_count, min, max, mean, median, std, top_values (jsonb), sample_values (jsonb).
- **questions** — id, dataset_id, project_id, user_id, question_text, status (`ok|refused|error`), nl_answer, generated_sql, result_columns (jsonb), result_rows (jsonb, capped), chart_spec (jsonb), model, duration_ms, refusal_reason, created_at.
- **insights** — id, project_id, question_id, title, pinned, created_at. ("Save insight".)

**Data schema:** each dataset gets a real table `data.ds_<id>` created from the uploaded file with inferred column types. Read by the read-only role only.

## 5. The Ask engine (safety-critical)

Pipeline for each question:

1. **Guardrail** — determine if the question is answerable from this dataset's schema/profile. If not → refuse with a friendly reason (no SQL run). Implemented as part of the model contract (it must return either a SQL plan or a structured refusal) plus a cheap pre-check.
2. **SQL generation** — model is given the dataset schema + profile (not raw rows) and returns a single `SELECT`.
3. **Validation** — parse the SQL (sqlglot): exactly one statement; `SELECT`-only (reject any DDL/DML/CTE writes, multiple statements, `;` injection); only references this dataset's table(s) and columns; ban dangerous functions (`pg_read_file`, `COPY`, etc.); enforce a `LIMIT`.
4. **Execution** — run via the **read-only role**, inside a `READ ONLY` transaction, with a `statement_timeout` and a row cap. Even a malformed/abusive query cannot mutate or hang the system.
5. **Summarization** — model turns the (small, capped) result set into a plain-English answer with key figures.
6. **Chart spec** — infer a chart type from the result shape (bar/line/area/pie/scatter/KPI); persisted with the question.
7. **Render & persist** — UI shows NL answer + table + chart + generated SQL; the question is saved to history; user may "Save insight" into the project.

**Privacy/secrets:** API key + DB creds live only in a gitignored `.env`. The public repo gets `.env.example` with placeholders. The full raw dataset is never sent to the model.

## 6. Design system (locked — dark "ocean")

Craft reference: Stripe/Mercury quality (hairlines, soft depth, tabular numbers, restraint), applied to a dark ocean palette. Single coral accent + neutrals (no multi-color clutter). Canonical mock: the Ask workspace (`hero-final`). Tokens + the approved mock HTML are committed under `docs/design/` and the Tailwind theme is derived from them (no eyeballing).

**Tokens**
- App/shell bg: `linear-gradient(162deg, #072B40 → #0C4A66)` ("Abyss"), fixed.
- Sidebar/rail `#06273A`; topbar `#0A3346`; borders `rgba(255,255,255,.12)`; hairlines `rgba(255,255,255,.07)`.
- Panels/cards `#0C3A54`; lifted sub-areas (table/viz headers) `#0E4361`; code inset `#06222F`.
- Accent coral `#FB7A5C`; label/link on dark `#FF8E72`; dim `rgba(251,122,92,.28)`; soft `rgba(251,122,92,.13)`; text-on-coral `#06222F`.
- Text `#EAF3F7` / `#A6C3D0` / `#7BA0B2`. Success `#54D6A0` (sparing).
- Fonts: **Satoshi** (UI/display) + **JetBrains Mono** (code/data). `tabular-nums` on all figures.
- Radii: 8px controls, 11–14px panels. Soft low shadows.

## 7. Tech choices

- **Frontend:** Next.js App Router + TypeScript, Tailwind (theme from tokens), self-hosted Satoshi + JetBrains Mono, charts via a thin chart layer (Recharts to start, themed to tokens), auth via HTTP-only cookie.
- **Backend:** FastAPI, async SQLAlchemy + Alembic, Pydantic v2, pandas + openpyxl (parsing), **sqlglot** (SQL validation), passlib[bcrypt] + python-jose (auth), asyncpg, `anthropic` + `openai` SDKs, uvicorn.
- **DB:** PostgreSQL 16; app + data schemas; dedicated read-only role.
- **Infra:** Docker Compose (`web`, `api`, `db`); per-service Dockerfiles; `.env` (+ `.env.example`).
- **Testing:** backend **pytest** — security-critical units (SQL validator, profiler, auth) + an integration test of the ask pipeline against a throwaway DB with the LLM mocked. Frontend: Vitest + Testing Library; Playwright e2e optional in v1.

## 8. Feature roadmap (one branch each; mock → build → test → document → PR → approve & merge)

| # | Branch | Delivers |
|---|---|---|
| 0 | `chore/scaffold` | Monorepo, Docker Compose, DB, env, `.gitignore`, README, committed design tokens |
| 1 | `feat/landing` | Marketing/landing page |
| 2 | `feat/auth` | Signup/login/logout, JWT cookies, protected routes |
| 3 | `feat/data-ingestion` | CSV/Excel upload + manual entry → data table + datasets list |
| 4 | `feat/data-profiling` | Profile compute/store + profile view & rail |
| 5 | `feat/ask-engine` | Composer → guardrail → SQL-gen → validate → read-only execute → summarize → answer UI |
| 6 | `feat/visualizations` | Chart spec + themed chart rendering, type switching |
| 7 | `feat/projects` | Projects, save insights, history |

## 9. Working constraints

- Feature branch per feature; **no Claude co-author trailer** on commits.
- **Every feature ships as a PR to `main`.** After building/testing/documenting a feature, I open a PR and **pause for your review and merge approval before starting the next feature.** Full per-feature loop: branch → mock approval → build → test → document → PR → your approval & merge → next.
- Public repo → **never commit secrets**; `.env` gitignored, `.env.example` committed.
- Gitignore all agent artifacts (`.claude/`, `.superpowers/`) and the local build-notes doc.
- All Python deps installed in a **venv** (never global); pinned in `requirements.txt`.
- Each feature records a local, gitignored **build-notes** entry: files changed, what & why, exact commands run (incl. tests), and packages needed — so the work is replicable without AI.

## 10. Out of scope (v1)

External DB/API/Google-Sheets connectors · sandboxed Python execution · team sharing/permissions beyond a single user's projects · billing.
