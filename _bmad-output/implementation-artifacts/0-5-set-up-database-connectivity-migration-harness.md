# Story 0.5: Set Up Database Connectivity + Migration Harness

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want PostgreSQL connectivity and migration infrastructure,
so that database migrations can be run and the connection is verified.

## Acceptance Criteria

1. **Given** the backend API skeleton exists (Story 0.4) in `src/`
   **When** I set up database connectivity
   **Then** the backend in `src/` has:
   - Knex.js configuration (`src/src/knexfile.ts`)
   - Connection config via environment variables (`DATABASE_URL` or `DB_*`)
   - Migration runner works: `pnpm -C src migrate:latest` runs successfully
   - PostgreSQL connection is verified (connection test succeeds)

2. **And** the migration pipeline can run without introducing new domain schema
   - If a placeholder/no-op migration is added, it must create no tables
   - Do not delete or rewrite existing migrations

3. **And** local development has a documented Postgres path (Docker Compose or local install)

## Tasks / Subtasks

- [x] Task 1: Verify Knex config + env wiring (AC: 1)
  - [x] Confirm `src/src/knexfile.ts` uses `DATABASE_URL` or `DB_*`
  - [x] Confirm `src/src/config/knex.ts` selects correct env and initializes Knex
  - [x] Ensure `.env` usage remains in `src/.env` (gitignored)

- [x] Task 2: Migration harness validation (AC: 1, 2)
  - [x] Confirm migration scripts in `src/package.json` are functional
  - [x] Run `pnpm -C src migrate:latest` against local Postgres
  - [x] If a placeholder migration is required, add a no-op migration with the next numeric prefix in `src/src/migrations/`

- [x] Task 3: Connection verification (AC: 1)
  - [x] Add a lightweight connection check (test or script) that verifies DB connectivity
  - [x] Ensure the check does not create or mutate schema

- [x] Task 4: Local Postgres setup guidance (AC: 3)
  - [x] Confirm docker compose path for local Postgres (`docker-compose.example.yml` or `docker-compose.test-db.yml`)
  - [x] Document any required env vars or default ports

## Dev Notes

### Developer Context

- Backend lives in `src/` (not `apps/api/`). Do not create new `apps/api` scaffolding. [Source: `AGENTS.md`]
- Use Knex.js for migrations; Kysely is reserved for runtime queries in later stories. [Source: `_bmad-output/planning-artifacts/architecture.md`]
- Database is PostgreSQL; RLS is part of the long-term architecture but is not implemented in this story. [Source: `_bmad-output/planning-artifacts/architecture.md`]

### Technical Requirements

- Connection env options: `DATABASE_URL` or `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`. [Source: `_bmad-output/planning-artifacts/epics.md`]
- Verify connection without mutating schema (e.g., `SELECT 1`), and keep any placeholder migration as a no-op.
- If pnpm permission issues occur, use `pnpm <cmd> --store-dir .pnpm-store`. [Source: `_bmad-output/implementation-artifacts/0-4-set-up-backend-api-skeleton.md`]

### Architecture Compliance

- Keep migration tooling in Knex; do not introduce ORM or query-layer changes in this story.
- Transaction-per-request and SET LOCAL context are architectural requirements but are not part of this story’s implementation scope. [Source: `_bmad-output/planning-artifacts/architecture.md`]

### Library / Framework Requirements

- Knex.js for migrations; PostgreSQL as the database. [Source: `_bmad-output/planning-artifacts/architecture.md`]
- No additional DB libraries unless required by existing setup.

### File Structure Requirements

- Backend code: `src/src/` with `routes/`, `services/`, `middleware/`, `validators/`, `utils/`.
- Migrations: `src/src/migrations/` with ordered numeric prefixes.
- Knex config: `src/src/knexfile.ts` and `src/src/config/knex.ts`.
- Env parsing: `src/src/config/database.ts`.

### Testing Requirements

- Required: `pnpm -C src migrate:latest` against a local Postgres instance.
- If a connectivity test is added, ensure it is read-only (no schema changes).
- If changes touch TypeScript compilation, run `pnpm -C src build`.

### Previous Story Intelligence

- `.env.test` support and Jest setup already exist; prefer using them for any DB-related tests. [Source: `_bmad-output/implementation-artifacts/0-4-set-up-backend-api-skeleton.md`]
- A minimal test Postgres compose file exists: `docker-compose.test-db.yml`. [Source: `_bmad-output/implementation-artifacts/0-4-set-up-backend-api-skeleton.md`]

### Git Intelligence Summary

- Recent commits: `chore: mark story 0.4 done`, `chore: update backend test env, uuid alignment, and docs`, `chore: create Story 0.3 (shared types package)`, `Fix: Story 0.2 ESLint v9 flat config + review closeout`, `chore: configure tooling baseline (Story 0.2)`. [Source: `git log -5 --oneline`]

### Latest Tech Information

- No external web research performed (network restricted). Use versions already pinned in `src/package.json`.

### Project Context Reference

- No `**/project-context.md` found in repo. [Source: filesystem scan]

### References

- Epic/Story source of truth: `_bmad-output/planning-artifacts/epics.md` → “Story 0.5: Set Up Database Connectivity + Migration Harness”
- Architecture decisions: `_bmad-output/planning-artifacts/architecture.md` → Backend API, Database, Knex/Kysely split
- Repo structure: `AGENTS.md` → Project Structure & Module Organization
- Backend env/config: `src/src/config/database.ts`, `src/src/knexfile.ts`, `src/src/config/knex.ts`
- Local setup: `docker-compose.example.yml`, `docker-compose.test-db.yml`, `SETUP.md`

## Dev Agent Record

### Agent Model Used

GPT-5 (Codex CLI)

### Debug Log References

- `pnpm -C src test`
- `DATABASE_URL= DB_HOST=127.0.0.1 DB_PORT=5432 DB_NAME=moneyshyft_test DB_USER=jeremiahotis DB_PASSWORD=Oiurueu12 pnpm -C src migrate:latest` (esc)
- `pnpm test`
- `pnpm -C src test`
- `pnpm test`
- `pnpm -C src test`
- `pnpm test`
- `pnpm -C src test`
- `pnpm test`

### Completion Notes List

- Ultimate context engine analysis completed - comprehensive developer guide created
- Updated knex env wiring to respect `DB_*` when `DATABASE_URL` is unset and added coverage for config selection.
- Fixed Knex migration scripts to use the CLI with ts-node registration and verified migrations against local Postgres.
- Added a read-only DB connection check with Jest coverage and ensured test env does not pick up dev `DATABASE_URL`.
- Documented DB env options and default port in setup guidance.
- Hardened test env loading to avoid dev `.env`, skipped DB connection test when no DB config is present, removed default creds from DB config, and fixed prod migration script paths.
- Added test-specific migration/seed scripts and ran rollback in test DB; seed run failed due to missing `src/src/seeds/dev`.
- Re-ran test migrations and added `src/src/seeds/dev/.gitkeep` to enable seed script.
- Added dev seed with invitation codes; seed run now succeeds.
- Added cleanup seed to delete the test household before reseeding.

### File List

- _bmad-output/implementation-artifacts/0-5-set-up-database-connectivity-migration-harness.md
- _bmad-output/implementation-artifacts/sprint-status.yaml
- SETUP.md
- src/src/__tests__/db-connection.test.ts
- src/src/__tests__/knexfile.test.ts
- src/src/__tests__/setupEnv.ts
- src/package.json
- src/src/config/database.ts
- src/src/knexfile.ts
- src/src/utils/dbConnectionCheck.ts
- src/src/seeds/dev/.gitkeep
- src/src/seeds/dev/001_test_seed.ts
- src/src/seeds/dev/000_cleanup_test_household.ts

### Change Log

- 2026-01-13: Updated Knex env wiring, fixed migration scripts, added DB connection check, and documented DB envs.
- 2026-01-13: Hardened test env loading, made DB tests conditional on config, removed default creds, and fixed prod migration script paths.
- 2026-01-13: Added test-specific migrate/seed scripts; rollback tested, seed run failed (no dev seeds directory).
- 2026-01-13: Re-ran test migrations; added dev seeds directory placeholder.
- 2026-01-13: Added dev seed data and verified seed run succeeds.
- 2026-01-13: Added cleanup seed for repeatable dev seeding.
