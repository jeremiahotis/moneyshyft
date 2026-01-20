# Story 0.6b: Remove Legacy frontend/src Paths (Cleanup Stage)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want to remove the legacy `frontend/` and `src/` roots after the apps migration is stable,
so that there is one authoritative repo layout and CI/deploy tooling is simplified.

## Acceptance Criteria

1. **Given** Story 0.6a has shipped and development + production run from `apps/app` and `apps/api`
   **When** I remove the legacy paths
   **Then**:
   - `frontend/` is removed (or reduced to docs-only if needed) and no longer referenced by scripts/docs/deploy
   - `src/` is removed (or reduced to docs-only if needed) and no longer referenced by scripts/docs/deploy
   - CI only targets `apps/app` and `apps/api` (and shared packages)
   - All docs and scripts use the new paths consistently

## Tasks / Subtasks

- [x] Task 1: Remove legacy wrappers and workspace entries (AC: 1)
  - [x] Delete `frontend/` and `src/` wrapper packages (or reduce to docs-only if explicitly required)
  - [x] Remove legacy workspace entries from `pnpm-workspace.yaml`
  - [x] Remove wrapper-specific tests/scripts (e.g., `scripts/apps-compat.test.js`) and update `pnpm test` if needed

- [x] Task 2: Update repo scripts, CI, and docs to drop legacy paths (AC: 1)
  - [x] Search and remove any `frontend/` or `src/` references in root scripts and CI workflows
  - [x] Update docs to only reference `apps/app` and `apps/api`
  - [x] Confirm nginx/deploy references already point at `apps/app` and `apps/api` only

- [x] Task 3: Validate clean apps-only flow (AC: 1)
  - [x] Run `pnpm lint`
  - [x] Run `pnpm typecheck`
  - [x] Run `pnpm build`
  - [x] Run `pnpm test` and `pnpm -C apps/api test`

## Dev Notes

- This is cleanup only: remove temporary compatibility layers introduced in Story 0.6a.
- Do not upgrade dependencies or change tooling behavior; only remove legacy path references.
- Preserve CI/quality gate logic; only remove legacy-path targeting.
- No product or runtime behavior changes.
- Authoritative paths are `apps/app` and `apps/api`; `packages/shared` remains the only shared import surface.
- Expect to touch workspace config, root scripts, docs, and any lingering legacy references.

### Project Structure Notes

- Repo structure is now apps-only; remove the 0.6a compatibility wrappers and any references to them. [Source: AGENTS.md]
- `pnpm-workspace.yaml` currently includes legacy wrappers for compatibility and must be cleaned up. [Source: pnpm-workspace.yaml]
- Known legacy touchpoints to clean up: `frontend/package.json`, `src/package.json`, `scripts/apps-compat.test.js`. [Source: _bmad-output/implementation-artifacts/0-6a-migrate-to-apps-layout-compatibility-stage.md]
- Keep workspace boundary enforcement intact; re-run boundary checks after removing wrappers. [Source: _bmad-output/implementation-artifacts/0-6-set-up-baseline-ci-quality-gate.md]

### References

- Epic 0, Story 0.6b definition and ACs. [Source: _bmad-output/planning-artifacts/epics.md]
- Temporary wrappers are explicitly documented as a 0.6a-only compatibility phase. [Source: AGENTS.md]
- Wrapper packages still listed in workspace config. [Source: pnpm-workspace.yaml]
- Prior story context for compatibility stage and expectations. [Source: _bmad-output/implementation-artifacts/0-6a-migrate-to-apps-layout-compatibility-stage.md]

## Dev Agent Record

### Agent Model Used

GPT-5 (Codex CLI)

### Debug Log References

- `node --test scripts/*.test.js` (fail, then pass)
- `pnpm test`
- `node --test scripts/*.test.js` (fail, then pass)
- `pnpm test`
- `pnpm lint` (warnings only)
- `pnpm typecheck`
- `pnpm build`
- `pnpm test`
- `pnpm -C apps/api test`

### Completion Notes List

- Ultimate context engine analysis completed - comprehensive developer guide created
- Identified cleanup scope from epics (remove legacy wrappers and references)
- Collected repo structure constraints and wrapper status from AGENTS and workspace config
- Captured prior story learnings from 0.6a for compatibility removal
- Git history reviewed for recent CI/quality gate updates
- No external web research performed (network restricted)
- Removed legacy `frontend/` and `src/` wrappers and dropped workspace entries.
- Removed `scripts/apps-compat.test.js` and added `scripts/legacy-paths.test.js` to enforce cleanup.
- Updated docs and scripts to remove legacy path references and added a docs/scripts guard test.
- Validation complete for lint/typecheck/build/tests; lint has existing warnings only.
- Code review fixes: guard test now scans scripts (except self/legacy guard), corrected apps/api build message.

### File List

- _bmad-output/implementation-artifacts/0-6b-remove-legacy-frontend-src-paths-cleanup-stage.md
- _bmad-output/implementation-artifacts/sprint-status.yaml
- AGENTS.md
- SETUP.md
- docs/development-guide-frontend.md
- docs/index.md
- docs/project-overview.md
- docs/project-scan-outputs.md
- eslint.config.js
- pnpm-workspace.yaml
- scripts/no-legacy-paths-docs.test.js
- scripts/legacy-paths.test.js
- scripts/apps-compat.test.js
- scripts/shared-types-package.test.js
- frontend/package.json
- src/package.json

### Change Log

- 2026-01-20: removed legacy wrappers, cleaned docs/scripts, and validated apps-only flow.
- 2026-01-20: code review fixes for legacy-paths guard and apps/api test message.
