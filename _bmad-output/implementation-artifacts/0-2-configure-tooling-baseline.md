# Story 0.2: Configure Tooling Baseline

Status: done

## Story

As a developer,  
I want shared TypeScript, ESLint, and Prettier configuration at the root,  
So that all apps and packages follow consistent code quality standards.

## Acceptance Criteria

**Given** the monorepo structure exists (Story 0.1)  
**When** I configure tooling  
**Then** the root has:
- `tsconfig.json` with base TypeScript configuration
- `eslint.config.js` (or `.eslintrc`) with shared rules
- `.prettierrc` (or `prettier.config.js`) with formatting rules
- `.prettierignore` file  
**And** all apps can extend the root configs  
**And** running `pnpm -r exec eslint --version` works from root  
**And** running `pnpm -r exec prettier --version` works from root  

## Tasks / Subtasks

- [x] Task 1: Add root TypeScript base config (AC: `tsconfig.json`)
  - [x] Create root `tsconfig.json` with `strict: true` baseline
  - [x] Ensure it is safe for both Node (API) and Vue (frontend) to extend (no app-specific paths)
- [x] Task 2: Add root ESLint config (AC: `eslint.config.js` or `.eslintrc`)
  - [x] Decide config format (prefer `eslint.config.js` flat config unless repo requires legacy)
  - [x] Configure rules for TypeScript + Vue + Node (shared baseline)
  - [x] Ensure config is extensible by packages/apps (apps can override)
- [x] Task 3: Add root Prettier config (AC: `.prettierrc` or `prettier.config.js` + `.prettierignore`)
  - [x] Create Prettier config (choose `.prettierrc` or `prettier.config.js`)
  - [x] Create `.prettierignore` appropriate for monorepo (node_modules, dist, build outputs)
- [x] Task 4: Ensure tooling binaries are available for recursive exec (AC: `pnpm -r exec ... --version`)
  - [x] Add `eslint` + `prettier` as dev dependencies in a place that satisfies `pnpm -r exec` (verify by running the AC commands)
  - [x] If needed, add minimal per-package devDependencies (e.g., `frontend/`, `src/`) to make recursive exec succeed
- [x] Task 5: Validate extensibility across current packages (AC: “all apps can extend root configs”)
  - [x] Confirm current workspaces (`frontend/`, `src/`) can extend the root configs
  - [x] Document (in Dev Agent Record) any required per-package override patterns

## Dev Notes

### Current repo state (important context)

- Root workspace exists (Story 0.1) and uses pnpm workspaces.
- Current workspace packages include:
  - Legacy `frontend/` (Vue 3) with its own `frontend/tsconfig.json`
  - Legacy `src/` (Express/TS) with its own `src/tsconfig.json`
  - Future targets: `apps/*` and `packages/*` (currently placeholders from Story 0.1)
- There are currently **no root-level** ESLint/Prettier configs in repo.

### Tooling goals (binding)

- **TypeScript strict mode enabled** (root base config).
- **ESLint rules appropriate for TypeScript + Vue + Node** (shared baseline).
- **Prettier configured for consistent formatting**.
- **Configs must be extensible** (packages can override if needed).
- **Verification is concrete**: the acceptance criteria commands must succeed from repo root:
  - `pnpm -r exec eslint --version`
  - `pnpm -r exec prettier --version`

### Guardrails

- This story is tooling-only; avoid product/runtime behavior changes.
- Follow the repo’s “Tracked Generated Artifacts Policy” when updating `_bmad-output/` (document what changed + why).

## Dev Agent Record

### Agent Model Used

GPT-5.2 (Cursor)

### Debug Log References

- `node --test scripts/tooling-baseline.test.js`
- `pnpm test`
- `pnpm add -w -D eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-vue vue-eslint-parser --store-dir <workspace>/.pnpm-store`
- `pnpm -r exec eslint --version`
- `pnpm -r exec prettier --version`
- `pnpm exec eslint --print-config scripts/tooling-baseline.test.js`

### Completion Notes List

- Added root `tsconfig.json` strict baseline (safe to extend for both `frontend/` and `src/`).
- Added `scripts/tooling-baseline.test.js` (verifies root configs + pnpm exec ACs).
- Added root ESLint config (`eslint.config.js`) baseline for ESLint v9+ covering TS + Vue + Node.
- Added root Prettier config (`.prettierrc`) and `.prettierignore`.
- Installed ESLint + Prettier (and TS/Vue lint deps) at workspace root and verified recursive exec version commands succeed.
- Extensibility patterns (validated/documented):
  - TypeScript: `frontend/tsconfig.json` or `src/tsconfig.json` can add `"extends": "../tsconfig.json"` and keep their app-specific overrides.
  - ESLint: subprojects can rely on root `eslint.config.js` (ESLint discovers it up the tree) or add a local `eslint.config.js` that imports/extends the root array.
  - Prettier: subprojects inherit root `.prettierrc` automatically; add a local config only if overriding.

### File List

- .gitignore
- package.json
- pnpm-lock.yaml
- tsconfig.json
- eslint.config.js
- .prettierrc
- .prettierignore
- scripts/tooling-baseline.test.js
- _bmad-output/implementation-artifacts/0-2-configure-tooling-baseline.md
- _bmad-output/implementation-artifacts/sprint-status.yaml

## Change Log

- 2026-01-12: Added root TS/ESLint/Prettier baselines + pnpm-managed lint/format deps; validated `pnpm -r exec eslint/prettier --version`.
- 2026-01-12: Code review fixes: migrated ESLint config to v9 flat config (`eslint.config.js`), strengthened tests, and updated root `pnpm test` coverage.

## Senior Developer Review (AI)

**Reviewer:** Jeremiah  
**Date:** 2026-01-12  
**Outcome:** Approved (after fixes)

### Issues Found (and fixed)

- **HIGH:** ESLint v9 ignored `.eslintrc.cjs` (no `eslint.config.*` present) → added `eslint.config.js` (flat config) and removed legacy `.eslintrc.cjs`.
- **MEDIUM:** Tests didn’t validate ESLint could load config → added `eslint --print-config` assertion in `scripts/tooling-baseline.test.js`.
- **MEDIUM:** Root `pnpm test` didn’t include Story 0.2 tests → updated root `package.json` test script to run both Story 0.1 + 0.2 test files.
- **MEDIUM:** Root `tsconfig.json` set `lib` to only ES2022 (could constrain frontend inheritance) → removed `lib` from root base config.
- **LOW:** Removed duplicate/overlapping ignore patterns in `.gitignore` and `.prettierignore`.

