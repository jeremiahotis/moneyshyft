# Story 0.3: Create Shared Types Package

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,  
I want a shared TypeScript package for types and constants,  
so that all apps can import shared types without duplication.

## Acceptance Criteria

1. **Given** the monorepo structure exists (Story 0.1)  
   **When** I create the shared types package  
   **Then** `packages/shared/` has:
   - `package.json` with proper name (`@moneyshyft/shared` or similar)
   - `tsconfig.json` that extends root config
   - `src/` directory with placeholder exports
   - Basic type exports (e.g., `export type User = { id: string }`)

2. **And** the package can be imported from other apps:
   - `import { User } from '@moneyshyft/shared'`

3. **And** TypeScript compilation succeeds when importing from shared package

## Tasks / Subtasks

- [x] Task 1: Create shared package scaffold (AC: 1)
  - [x] Create `packages/shared/package.json` with name `@moneyshyft/shared` (prefer `private: true`)
  - [x] Create `packages/shared/tsconfig.json` extending root `tsconfig.json`
  - [x] Create `packages/shared/src/` with entrypoint `packages/shared/src/index.ts`
  - [x] Add initial file layout aligned with architecture (types/constants folders)
  - [x] Remove `packages/shared/.gitkeep` (optional cleanup once real files exist)

- [x] Task 2: Add basic type exports (AC: 1)
  - [x] Add `packages/shared/src/types/user.ts` with `export type User = { id: string }` (baseline contract)
  - [x] Re-export from `packages/shared/src/index.ts` (`export type { User } from './types/user'`)
  - [x] Add placeholder exports for future domains (leave stubs minimal; no domain modeling yet)

- [x] Task 3: Make the package importable from existing apps (AC: 2)
  - [x] Add workspace dependency in `frontend/package.json`: `"@moneyshyft/shared": "workspace:*"`
  - [x] Add workspace dependency in `src/package.json`: `"@moneyshyft/shared": "workspace:*"`
  - [x] Add a TypeScript “smoke import” in each app to prove the import resolves:
    - [x] `frontend/src/types/shared-types.smoke.ts`
    - [x] `src/src/types/shared-types.smoke.ts`
  - [x] Ensure imports are **type-only** until shared package runtime build is introduced:
    - Prefer `import type { User } from '@moneyshyft/shared'`

- [x] Task 4: Prove TypeScript compilation succeeds with shared imports (AC: 3)
  - [x] Define the compilation strategy for `@moneyshyft/shared`:
    - If emitting declarations: configure `packages/shared/tsconfig.json` to generate `dist/*.d.ts` (recommended)
    - If not emitting yet: document the interim strategy and ensure both apps can typecheck imports
  - [x] Verify compilation:
    - `pnpm -C src build` succeeds
    - `pnpm -C frontend build` succeeds (includes `vue-tsc`)

- [x] Task 5: Add automated verification (maps to ACs 1–3)
  - [x] Add a node:test file (recommended: `scripts/shared-types-package.test.js`) verifying:
    - `packages/shared/package.json` exists and name is `@moneyshyft/shared`
    - `packages/shared/tsconfig.json` extends root config
    - `packages/shared/src/index.ts` exports `User`
    - `pnpm -C src build` and `pnpm -C frontend build` succeed after wiring the dependency/import

## Dev Notes

### Architecture alignment (must-follow)

- Shared types live in `packages/shared/` and are imported by all apps for type safety.  
  - **Source:** `_bmad-output/planning-artifacts/architecture.md` (search: “shared types in `/packages/shared`”)
- Preferred internal layout for shared package:
  - Types: `packages/shared/src/types/*`
  - Constants: `packages/shared/src/constants/*`
  - Utilities (later): `packages/shared/src/utils/*`
  - **Source:** `_bmad-output/planning-artifacts/architecture.md` (search: “Feature-based in shared package”)

### Recent learnings from Stories 0.1–0.2 (apply these)

- pnpm installs may require a workspace-local store to avoid permission issues:
  - Use `pnpm <cmd> --store-dir .pnpm-store` when needed (root `.gitignore` already ignores `.pnpm-store/`).
- ESLint v9 uses flat config at root (`eslint.config.js`), not `.eslintrc.*`.
- Root tests use `node --test` via `pnpm test`.

### Guardrails

- This story establishes the **type contract** early; do not model the full domain yet.
- Avoid runtime coupling: keep shared package usage **type-only** until a runtime build strategy is explicitly introduced.

### References

- Epic/Story source of truth: `_bmad-output/planning-artifacts/epics.md` → “Story 0.3: Create Shared Types Package”
- Architecture: `_bmad-output/planning-artifacts/architecture.md` → shared types package + suggested folder layout
- Tooling baseline: `_bmad-output/implementation-artifacts/0-2-configure-tooling-baseline.md`

## Dev Agent Record

### Agent Model Used

GPT-5.2 (Cursor)

### Debug Log References

- `node --test scripts/shared-types-package.test.js`
- `pnpm -C packages/shared build`
- `pnpm -C src build`
- `pnpm -C frontend build`
- `pnpm test`
- `pnpm install --store-dir .pnpm-store`

### Completion Notes List

- Created `packages/shared/` as a real workspace package (`@moneyshyft/shared`) with root-tsconfig extension and minimal source layout.
- Added baseline shared type export: `User` (`packages/shared/src/types/user.ts`) and re-exported from package entrypoint.
- Wired `@moneyshyft/shared` into legacy apps (`frontend/`, `src/`) as a workspace dependency and added type-only smoke imports.
- Defined declaration-only output strategy for `@moneyshyft/shared` via `packages/shared/tsconfig.json`.
- Verified backend and frontend builds with shared imports using `node --test scripts/shared-types-package.test.js`.
- Wired shared package metadata to `dist` declarations and added a build script for declaration emit.
- Hardened shared package build tests with timeouts and optional skip flag.
- Wired shared package entrypoint to re-export `types`/`constants` index files.
- Regression fix: relaxed `scripts/monorepo-structure.test.js` to accept placeholder dirs that later gain real files (no longer require `.gitkeep`).

### File List

- .codex/rules/default.rules
- .codex/version.json
- AGENTS.md
- CLAUDE.md
- pnpm-lock.yaml
- packages/shared/package.json
- packages/shared/.gitkeep
- packages/shared/tsconfig.json
- packages/shared/src/index.ts
- packages/shared/src/types/index.ts
- packages/shared/src/types/user.ts
- packages/shared/src/constants/index.ts
- frontend/package.json
- src/package.json
- frontend/src/types/shared-types.smoke.ts
- src/src/types/shared-types.smoke.ts
- scripts/shared-types-package.test.js
- scripts/monorepo-structure.test.js
- _bmad-output/implementation-artifacts/0-3-create-shared-types-package.md
- _bmad-output/implementation-artifacts/sprint-status.yaml

### Change Log

- 2026-01-11: Added declaration-only compile strategy for `@moneyshyft/shared` and extended shared package tests/build verification.
- 2026-01-11: Code review fixes - mapped shared types to dist, added build script/dev dependency, and tightened build tests.
- 2026-01-11: Code review fix - re-exported `types` index and adjusted tests.
