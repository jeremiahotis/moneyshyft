# Story 0.4: Set Up Backend API Skeleton

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want a basic Express + TypeScript API server with a health endpoint,
so that other work has a target API to integrate with.

## Acceptance Criteria

1. **Given** the monorepo structure exists (Story 0.1)
   **When** I set up the backend API skeleton
   **Then** the backend in `src/` (current repo location) has:
   - Express server with TypeScript
   - Basic structure: `src/src/app.ts`, `src/src/server.ts`
   - Health endpoint: `GET /health` returns JSON including `{ status: 'ok' }`
   - Dev server runs: `pnpm -C src dev` starts server
   - Server listens on configurable port (default 3000)

2. **And** the health endpoint is accessible: `curl http://localhost:3000/health` returns 200

3. **And** TypeScript compilation succeeds with strict mode (`pnpm -C src build`)

## Tasks / Subtasks

- [x] Task 1: Verify/align backend skeleton in `src/` (AC: 1)
  - [x] Confirm `src/src/app.ts` and `src/src/server.ts` exist; create if missing
  - [x] Ensure `GET /health` returns JSON including `status: 'ok'` (no removal of extra fields)
  - [x] Ensure server uses `PORT` env with default `3000` and listens on all interfaces

- [x] Task 2: Ensure dev server and config wiring (AC: 1)
  - [x] Verify `src/package.json` has `dev` script using `ts-node-dev` and `src/server.ts`
  - [x] Confirm `pnpm -C src dev` boots the server without runtime errors

- [x] Task 3: Add backend health check test (AC: 2, 3)
  - [x] Add Jest + Supertest test at `src/src/__tests__/health.test.ts`
  - [x] Test expects status 200 and JSON containing `{ status: 'ok' }`
  - [x] Run `pnpm -C src test` and `pnpm -C src build`

## Dev Notes

### Architecture alignment (must-follow)

- Epic 0 Story 0.4 defines a basic Express + TypeScript API skeleton with `app.ts`/`server.ts`, health endpoint, and dev server. [Source: `_bmad-output/planning-artifacts/epics.md` → “Story 0.4: Set Up Backend API Skeleton”]

### Repo reality vs architecture

- The current backend lives in `src/` (not `apps/api/`). Follow repo guidance and avoid moving or duplicating the API into `apps/api/` unless explicitly requested. [Source: `AGENTS.md` → Project Structure & Module Organization]
- Existing backend is already more advanced than a skeleton; do NOT delete routes or restructure directories. Keep changes minimal and additive. [Source: `src/src/app.ts`, `src/src/server.ts`]

### Recent learnings from previous stories

- pnpm installs may require a workspace-local store to avoid permission issues: `pnpm <cmd> --store-dir .pnpm-store`. [Source: `_bmad-output/implementation-artifacts/0-3-create-shared-types-package.md`]
- Root tests use `node --test` via `pnpm test`. [Source: `_bmad-output/implementation-artifacts/0-3-create-shared-types-package.md`]

### Project Structure Notes

- Backend code lives under `src/src/` with existing `routes/`, `services/`, `middleware/`, `validators/`, and `utils/`. Do not create new top-level `apps/api` scaffolding. [Source: `AGENTS.md`]
- Jest is already configured in `src/jest.config.js` for `src/src/**/__tests__/**/*.test.ts`. [Source: `src/jest.config.js`]

### Previous Story Intelligence

- Story 0.3 established the shared types package in `packages/shared/` and wired workspace deps into `frontend/` and `src/`. Preserve workspace setup and avoid breaking type-only imports. [Source: `_bmad-output/implementation-artifacts/0-3-create-shared-types-package.md`]
- Build/test checks now include `scripts/shared-types-package.test.js`; keep backend changes compatible with existing `pnpm test` workflows. [Source: `_bmad-output/implementation-artifacts/0-3-create-shared-types-package.md`]

### Git Intelligence Summary

- Recent commits: `chore: create Story 0.3 (shared types package)`, `Fix: Story 0.2 ESLint v9 flat config + review closeout`, `chore: configure tooling baseline (Story 0.2)`, `Security: ignore local AI auth/session artifacts`, `chore: code review Story 0.1 (mark done)`. [Source: `git log -5 --oneline`]

### Latest Tech Information

- No external web research performed. Use the versions already pinned in `src/package.json` for Express, TypeScript, and ts-node-dev unless explicitly upgrading. [Source: `src/package.json`]

### Project Context Reference

- No `**/project-context.md` found in repo. [Source: filesystem scan]

### References

- Epic/Story source of truth: `_bmad-output/planning-artifacts/epics.md` → “Story 0.4: Set Up Backend API Skeleton”
- Repo structure: `AGENTS.md` → Project Structure & Module Organization
- Backend entrypoints: `src/src/app.ts`, `src/src/server.ts`
- Backend tests: `src/jest.config.js`

## Dev Agent Record

### Agent Model Used

GPT-5 (Codex CLI)

### Debug Log References

- `pnpm install --store-dir .pnpm-store`
- `PORT=3001 pnpm -C src dev` (esc)
- `pnpm -C src test` (esc)
- `pnpm -C src build`
- `pnpm test`
- `pnpm install --store-dir .pnpm-store` (esc)
- `cp src/.env.test.example src/.env.test`
- `pnpm -C src test`
- `pnpm test`

### Completion Notes List

- Confirmed existing `src/src/app.ts` and `src/src/server.ts` health endpoint meets ACs.
- Downgraded `uuid` in `src/package.json` to restore CommonJS dev server compatibility.
- Added health endpoint test and adjusted Jest config to ignore `dist/` mock collisions.
- Added test env handling (.env.test) and auto-select test knex config during Jest runs.
- Added a minimal docker compose file for a standalone test database.
- Added a local uuid module declaration and pnpm override to keep uuid versions aligned.

### File List

- .codex/rules/
- .codex/version.json
- AGENTS.md
- CLAUDE.md
- SETUP.md
- _bmad-output/implementation-artifacts/0-3-create-shared-types-package.md
- _bmad-output/implementation-artifacts/0-4-set-up-backend-api-skeleton.md
- _bmad-output/implementation-artifacts/sprint-status.yaml
- _bmad-output/implementation-artifacts/validation-report-20260112-190713.md
- docker-compose.test-db.yml
- frontend/package.json
- frontend/src/types/shared-types.smoke.ts
- package.json
- packages/shared/.gitkeep (deleted)
- packages/shared/package.json
- packages/shared/src/
- packages/shared/tsconfig.json
- pnpm-lock.yaml
- scripts/monorepo-structure.test.js
- scripts/shared-types-package.test.js
- src/.env.test
- src/.env.test.example
- src/jest.config.js
- src/package.json
- src/src/__tests__/health.test.ts
- src/src/__tests__/setupEnv.ts
- src/src/config/knex.ts
- src/src/knexfile.ts
- src/src/types/shared-types.smoke.ts
- src/src/types/uuid.d.ts
