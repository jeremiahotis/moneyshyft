# Story 0.1: Initialize Monorepo Structure

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want a pnpm workspace monorepo with apps/ and packages/ structure,
So that all applications and shared code are organized in a single repository with proper dependency management.

## Acceptance Criteria

**Given** a fresh repository  
**When** I initialize the monorepo structure  
**Then** the repository has:
- Root `package.json` with workspace configuration
- `pnpm-workspace.yaml` file defining workspace packages
- `apps/` directory for applications (crisis, app, api)
- `packages/` directory for shared packages (shared)
- Root-level scripts placeholder (`dev`, `build`, `test`, `lint`)
**And** pnpm recognizes the workspace structure (`pnpm -r list` works)

## Tasks / Subtasks

- [x] Task 1: Initialize root workspace (AC: Root package.json, pnpm-workspace.yaml)
  - [x] Create root `package.json` with workspace configuration
  - [x] Create `pnpm-workspace.yaml` file defining workspace packages
  - [x] Verify pnpm recognizes workspace (`pnpm -r list` works)
- [x] Task 2: Create directory structure (AC: apps/, packages/)
  - [x] Create `apps/` directory
  - [x] Create `packages/` directory
  - [x] Create placeholder directories: `apps/crisis/`, `apps/app/`, `apps/api/`, `packages/shared/`
- [x] Task 3: Add root-level script placeholders (AC: Root scripts)
  - [x] Add `dev` script placeholder to root `package.json`
  - [x] Add `build` script placeholder to root `package.json`
  - [x] Add `test` script placeholder to root `package.json`
  - [x] Add `lint` script placeholder to root `package.json`
  - [x] Note: Scripts will be implemented in Story 0.6 (CI)

## Dev Notes

### Migration Strategy (CRITICAL)

**Recommended Approach: New Branch + Incremental Migration**

Since this is a structural rewrite with existing production code, use this approach:

1. **Create a new branch:**
   ```bash
   git checkout -b feature/monorepo-restructure
   ```

2. **Incremental Migration Strategy:**
   - **DO NOT** delete existing `frontend/` or `src/` directories yet
   - **DO** create new `apps/` and `packages/` structure alongside existing code
   - **DO** update root `package.json` and create `pnpm-workspace.yaml`
   - **DO** verify pnpm workspace recognizes new structure
   - **DO NOT** migrate existing code in this story (that happens in Stories 0.4 and 0.7)

3. **Why This Approach:**
   - Preserves git history and allows rollback
   - Keeps existing code working during migration
   - Enables incremental testing and review
   - Allows parallel work (old structure still works, new structure being built)
   - Production deployments can continue on main branch until migration complete

4. **Migration Timeline:**
   - **Story 0.1 (this story):** Create new monorepo structure (empty directories)
   - **Story 0.4:** Migrate `src/` → `apps/api/` (backend code)
   - **Story 0.7:** Migrate `frontend/` → `apps/app/` (frontend code)
   - **After migration complete:** Remove old `frontend/` and `src/` directories

5. **Verification:**
   - Old structure (`frontend/`, `src/`) should still work independently
   - New structure (`apps/`, `packages/`) should be recognized by pnpm
   - Both can coexist temporarily

**Alternative Approaches (NOT Recommended):**
- ❌ **New empty repo:** Loses git history, breaks CI/CD, requires manual migration
- ❌ **Delete and recreate:** Too risky, breaks production, no rollback path
- ❌ **Force push to main:** Too disruptive, breaks production deployments

### Architecture Compliance

**Monorepo Structure (Required):**
- **Package Manager:** pnpm workspaces (hard requirement, not optional)
- **Structure:**
  ```
  /
  ├── apps/
  │   ├── crisis/     (11ty static site)
  │   ├── app/        (Vue 3 SPA)
  │   └── api/        (Express/TypeScript API)
  ├── packages/
  │   └── shared/     (types + constants + shared models)
  ├── package.json    (root workspace config)
  └── pnpm-workspace.yaml
  ```

**Key Architectural Decisions:**
- pnpm workspaces is a hard requirement (not optional) - [Source: `_bmad-output/planning-artifacts/epics.md` Story 0.1 Technical Notes]
- Structure must support isolated deployment while maintaining code cohesion - [Source: `_bmad-output/planning-artifacts/architecture.md` Monorepo Structure section]
- Root-level tooling will be added in Story 0.2 (TypeScript, ESLint, Prettier) - [Source: `_bmad-output/planning-artifacts/epics.md` Story 0.2]

**Current Project State:**
- Project currently has `frontend/` and `src/` directories (legacy structure)
- This story establishes the new monorepo structure
- Migration of existing code will happen in subsequent stories (0.7 for frontend, 0.4 for backend)

### Technical Requirements

**pnpm Workspace Configuration:**
- Root `package.json` must include workspace configuration
- `pnpm-workspace.yaml` must define workspace packages using glob patterns:
  ```yaml
  packages:
    - 'apps/*'
    - 'packages/*'
  ```
- Verify workspace recognition: `pnpm -r list` should show all workspace packages
- **Binding note:** `frontend/**` is intentionally included in `pnpm-workspace.yaml` to support incremental migration; remove once `apps/app` replaces it.

**Directory Structure:**
- Create `apps/` directory at root
- Create `packages/` directory at root
- Create placeholder directories:
  - `apps/crisis/` (will be initialized in Story 0.8)
  - `apps/app/` (will be initialized in Story 0.7)
  - `apps/api/` (will be initialized in Story 0.4)
  - `packages/shared/` (will be initialized in Story 0.3)

**Root Scripts:**
- Add placeholder scripts to root `package.json`:
  - `dev`: Will orchestrate all dev servers (implemented in Story 0.6)
  - `build`: Will build all apps (implemented in Story 0.6)
  - `test`: Will run all tests (implemented in Story 0.6)
  - `lint`: Will lint all code (implemented in Story 0.6)
- Scripts can be empty or throw "Not implemented" errors for now

### File Structure Requirements

**Files to Create:**
- `/package.json` (root workspace config)
- `/pnpm-workspace.yaml` (workspace definition)
- `/apps/.gitkeep`
- `/apps/crisis/.gitkeep`
- `/apps/app/.gitkeep`
- `/apps/api/.gitkeep`
- `/packages/.gitkeep`
- `/packages/shared/.gitkeep`

**Files NOT to Create Yet:**
- Individual app `package.json` files (created in their respective stories)
- TypeScript configs (Story 0.2)
- ESLint/Prettier configs (Story 0.2)
- Source code directories (created in app-specific stories)

### Testing Requirements

**Verification Steps:**
1. Run `pnpm -r list` from root - should recognize workspace structure
2. Verify directories exist: `apps/crisis/`, `apps/app/`, `apps/api/`, `packages/shared/`
3. Verify root `package.json` has workspace configuration
4. Verify `pnpm-workspace.yaml` exists and defines correct packages

**No Unit Tests Required:**
- This is infrastructure setup, not application code
- Verification is manual/integration-based

### Project Structure Notes

**Alignment with Unified Project Structure:**
- This story establishes the foundation for the unified monorepo structure
- Current project has `frontend/` and `src/` directories - these will be migrated in later stories
- New structure aligns with architecture document: [Source: `_bmad-output/planning-artifacts/architecture.md` Monorepo Structure section]

**Detected Conflicts/Variances:**
- **Current state:** Project uses `frontend/` and `src/` directories
- **Target state:** `apps/app/` and `apps/api/` directories
- **Migration plan:** Existing code will be migrated in Stories 0.4 (API) and 0.7 (Frontend)
- **Rationale:** Establishing monorepo structure first allows clean migration path

### References

**Epic Context:**
- Epic: Platform Enablement (Pre-Epic) - [Source: `_bmad-output/planning-artifacts/epics.md` Platform Enablement section]
- Purpose: Foundation and infrastructure setup to enable all user-value epics
- This is a delivery convenience, not a user-value epic

**Architecture References:**
- Monorepo Structure: [Source: `_bmad-output/planning-artifacts/architecture.md` lines 233-260]
- Package Manager: pnpm workspaces (recommended) - [Source: `_bmad-output/planning-artifacts/architecture.md` lines 251-254]
- Initialization Approach: [Source: `_bmad-output/planning-artifacts/architecture.md` lines 377-399]

**Related Stories:**
- Story 0.2: Configure Tooling Baseline (depends on this story)
- Story 0.3: Create Shared Types Package (depends on this story)
- Story 0.4: Set Up Backend API Skeleton (depends on this story)
- Story 0.7: Set Up Frontend SPA Skeleton (depends on this story)
- Story 0.8: Set Up Crisis Mode 11ty Skeleton (depends on this story)

**Technical Notes from Epic:**
- pnpm workspaces is a hard requirement (not optional) - [Source: `_bmad-output/planning-artifacts/epics.md` Story 0.1 Technical Notes]
- Root scripts will be implemented in Story 0.6 (CI) - [Source: `_bmad-output/planning-artifacts/epics.md` Story 0.1 Technical Notes]

## Dev Agent Record

### Agent Model Used

GPT-5.2 (Cursor)

### Debug Log References

- `node --test scripts/monorepo-structure.test.js`
- `pnpm -r list`

### Completion Notes List

- Implemented pnpm workspace root config (`package.json`, `pnpm-workspace.yaml`) and verified `pnpm -r list` works.
- Added monorepo scaffold dirs via tracked `.gitkeep` files (so empty dirs exist after clone).
- Added root scripts placeholders (`dev`, `build`, `test`, `lint`) with `test` wired to node:test.

### File List

- package.json
- pnpm-workspace.yaml
- scripts/monorepo-structure.test.js
- apps/.gitkeep
- apps/crisis/.gitkeep
- apps/app/.gitkeep
- apps/api/.gitkeep
- packages/.gitkeep
- packages/shared/.gitkeep
- _bmad-output/implementation-artifacts/0-1-initialize-monorepo-structure.md
- _bmad-output/implementation-artifacts/sprint-status.yaml

