# Story 0.6: Set Up Baseline CI / Quality Gate

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want CI that enforces code quality and workspace boundaries,
so that the repository stays runnable and dependencies are properly managed.

## Acceptance Criteria

1. **Given** Stories 0.1–0.5 are complete and the repo uses pnpm workspaces
   **When** CI runs on GitHub Actions for `pull_request` and `push` to `main`
   **Then** the workflow runs (and fails fast on any failure):
   - Install deps via pnpm using the repo lockfile (`pnpm install --frozen-lockfile`)
   - Lint the repo (root ESLint flat config) via `pnpm lint`
   - Typecheck all TypeScript code via `pnpm typecheck`
   - Build all buildable packages/apps via `pnpm build`
   - Run tests via `pnpm test` and `pnpm -C apps/api test`

2. **And** CI enforces workspace dependency boundaries:
   - No deep imports into another workspace’s source tree (e.g., `../../packages/shared/src/...`)
   - No cross-app imports between `apps/app` and `apps/api` (they may only share code via `packages/shared`)
   - CI fails if a boundary violation is introduced

3. **And** CI caches the pnpm store (nice-to-have) to speed up installs.

4. **And** existing scheduled regression workflow (`.github/workflows/regression.yml`) continues to run; baseline CI does not require Playwright to pass for PR gating.

## Tasks / Subtasks

- [ ] Task 1: Add baseline CI workflow (AC: 1, 3, 4)
  - [ ] Add `.github/workflows/ci.yml` triggered on `pull_request` + `push` to `main`
  - [ ] Use Node 20 + pnpm (Corepack or `pnpm/action-setup`)
  - [ ] Cache pnpm store (either `actions/setup-node` cache for pnpm or explicit `actions/cache`)
  - [ ] Run `pnpm install --frozen-lockfile`
  - [ ] Run `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test`, and `pnpm -C apps/api test`

- [ ] Task 2: Implement root quality-gate scripts (AC: 1)
  - [ ] Replace placeholder root scripts in `package.json` for `dev`, `build`, `lint`, `test`
  - [ ] Add `typecheck` script at repo root that typechecks:
    - `packages/shared`: `pnpm -C packages/shared exec tsc --noEmit -p tsconfig.json`
    - `apps/api`: `pnpm -C apps/api exec tsc --noEmit`
    - `apps/app`: `pnpm -C apps/app exec vue-tsc --noEmit`
  - [ ] Ensure scripts are runnable locally from repo root without extra setup beyond `pnpm install`

- [ ] Task 3: Enforce workspace boundary rules (AC: 2)
  - [ ] Implement a boundary check as either:
    - ESLint rule(s) (preferred if sufficiently expressive), or
    - A Node test under `scripts/` wired into `pnpm test`
  - [ ] If implementing via Node test, add `scripts/workspace-boundaries.test.js` using `node:test` that fails on:
    - Any relative import from `apps/app` that resolves into `apps/api` (and vice versa)
    - Any relative import that resolves into another workspace’s internal `src/` instead of a package import (e.g., `../../packages/shared/src/...`)
  - [ ] Define the concrete boundaries for this repo:
    - `apps/app` must not import from `apps/api` via relative paths
    - `apps/api` must not import from `apps/app` via relative paths
    - Any workspace may import shared code only via `@moneyshyft/shared` (no deep paths)
  - [ ] Ensure boundary check runs in CI and fails PRs on violation

- [ ] Task 4: Validate locally (AC: 1–3)
  - [ ] Run `pnpm lint`
  - [ ] Run `pnpm typecheck`
  - [ ] Run `pnpm build`
  - [ ] Run `pnpm test` and `pnpm -C apps/api test`

## Dev Notes

### Developer Context

- Repo is a pnpm workspace and currently has:
  - Frontend app under `apps/app` (Vue 3 + Vite)
  - Backend app under `apps/api` (Express + TypeScript)
  - Shared workspace package under `packages/shared/`
- There is already a scheduled Playwright regression workflow in `.github/workflows/regression.yml`; baseline CI should be separate and PR-gating.

### Technical Requirements

- Prefer pnpm-native workflow in CI: Node 20 + pnpm (Corepack) + `pnpm install --frozen-lockfile`.
- CI should run on `pull_request` and `push` to `main`.
- CI must be deterministic: no `npm install` / `npm ci` in baseline CI.
- Boundary enforcement must be explicit and automated (not “developer discipline”).
  - Example forbidden import: `frontend/src/...` importing `../../src/src/...` (or vice versa)
  - Example forbidden deep import: importing `../../packages/shared/src/...` instead of `@moneyshyft/shared`

### Architecture Compliance

- This story is “platform enablement”: it should not introduce product/domain functionality.
- Do not move code between `apps/app` and `apps/api` to “fit” CI; the CI must match the repo structure defined in `AGENTS.md`.

### Library / Framework Requirements

- Use existing tooling already in repo where possible:
  - ESLint v9 flat config at repo root (`eslint.config.js`)
  - Existing Node-based root tests under `scripts/` (`node --test ...`)
- Avoid adding new CI-only dependencies unless unavoidable.

### File Structure Requirements

- CI workflows live in `.github/workflows/`.
- Root scripts live in `package.json`.
- Any new boundary tests should live under `scripts/` and be executed from root `pnpm test`.

### Testing Requirements

- Baseline CI must run, at minimum:
  - `pnpm test` (root Node tests)
  - `pnpm -C apps/api test` (backend Jest tests)
- CI must not require a live Postgres instance for gating; DB-dependent tests must be skipped or mocked unless a service container is explicitly configured.

### Previous Story Intelligence

- Story 0.5 introduced DB connectivity tests and migration harness; ensure CI does not accidentally pick up local dev DB env and that DB tests do not require a running Postgres for PR gating. [Source: `_bmad-output/implementation-artifacts/0-5-set-up-database-connectivity-migration-harness.md`]

### Git Intelligence Summary

- Latest commits show the DB harness work landed recently; CI should prevent regressions in root scripts, linting, and tests. [Source: `git log -5 --oneline`]

### Latest Tech Information

- No external web research performed (network restricted). Use versions already pinned in repo `package.json` files.

### Project Context Reference

- No `**/project-context.md` found in repo.

### References

- Story definition: `_bmad-output/planning-artifacts/epics.md` (Story 0.6: Set Up Baseline CI / Quality Gate)
- Repo structure + conventions: `AGENTS.md`
- Workspace membership: `pnpm-workspace.yaml`
- Root script placeholders (to replace): `package.json`
- Root ESLint config: `eslint.config.js`
- Existing scheduled regression workflow: `.github/workflows/regression.yml`

## Dev Agent Record

### Agent Model Used

GPT-5.2 (Codex CLI)

### Debug Log References

### Completion Notes List

- Ultimate context engine analysis completed - comprehensive developer guide created

### File List

- _bmad-output/implementation-artifacts/0-6-set-up-baseline-ci-quality-gate.md
