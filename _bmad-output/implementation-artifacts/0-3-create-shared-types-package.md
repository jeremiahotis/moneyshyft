# Story 0.3: Create Shared Types Package

Status: ready-for-dev

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

- [ ] Task 1: Create shared package scaffold (AC: 1)
  - [ ] Create `packages/shared/package.json` with name `@moneyshyft/shared` (prefer `private: true`)
  - [ ] Create `packages/shared/tsconfig.json` extending root `tsconfig.json`
  - [ ] Create `packages/shared/src/` with entrypoint `packages/shared/src/index.ts`
  - [ ] Add initial file layout aligned with architecture (types/constants folders)
  - [ ] Remove `packages/shared/.gitkeep` (optional cleanup once real files exist)

- [ ] Task 2: Add basic type exports (AC: 1)
  - [ ] Add `packages/shared/src/types/user.ts` with `export type User = { id: string }` (baseline contract)
  - [ ] Re-export from `packages/shared/src/index.ts` (`export type { User } from './types/user'`)
  - [ ] Add placeholder exports for future domains (leave stubs minimal; no domain modeling yet)

- [ ] Task 3: Make the package importable from existing apps (AC: 2)
  - [ ] Add workspace dependency in `frontend/package.json`: `"@moneyshyft/shared": "workspace:*"`
  - [ ] Add workspace dependency in `src/package.json`: `"@moneyshyft/shared": "workspace:*"`
  - [ ] Add a TypeScript “smoke import” in each app to prove the import resolves:
    - [ ] `frontend/src/types/shared-types.smoke.ts`
    - [ ] `src/src/types/shared-types.smoke.ts`
  - [ ] Ensure imports are **type-only** until shared package runtime build is introduced:
    - Prefer `import type { User } from '@moneyshyft/shared'`

- [ ] Task 4: Prove TypeScript compilation succeeds with shared imports (AC: 3)
  - [ ] Define the compilation strategy for `@moneyshyft/shared`:
    - If emitting declarations: configure `packages/shared/tsconfig.json` to generate `dist/*.d.ts` (recommended)
    - If not emitting yet: document the interim strategy and ensure both apps can typecheck imports
  - [ ] Verify compilation:
    - `pnpm -C src build` succeeds
    - `pnpm -C frontend build` succeeds (includes `vue-tsc`)

- [ ] Task 5: Add automated verification (maps to ACs 1–3)
  - [ ] Add a node:test file (recommended: `scripts/shared-types-package.test.js`) verifying:
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

_To be filled by dev agent_

### Completion Notes List

_To be filled by dev agent_

### File List

_To be filled by dev agent_

