# Sprint Change Proposal — Repo Structure Migration to `apps/*`

**Date:** 2026-01-13  
**Project:** moneyshyft  
**Change Type:** Structural / platform enablement (no product behavior changes)

## 1) Issue Summary

Planning artifacts assume a monorepo layout using `apps/app` (SPA) and `apps/api` (API). The current repo implementation and documentation are based on `frontend/` (Vue SPA) and `src/` (Express API). This mismatch surfaced while preparing Story 0.6 (CI/quality gate) and creates ongoing risk:

- Stories/CI may target paths that do not match the running code.
- Developers may implement duplicate scaffolding under `apps/*` while the real code remains elsewhere.
- Deployment documentation and infra drift from architecture assumptions.

## 2) Impact Analysis

### Epic Impact

- **Epic 0 (Platform Enablement):** still viable, but requires inserting a migration sequence before proceeding further.

### Story Impact

- **Directly impacted:** Story 0.6 (CI/quality gate) and all subsequent stories that reference paths/commands.
- **Mitigation:** Introduce a two-step migration to make `apps/*` the authoritative layout while keeping legacy paths working temporarily.

### Artifact Conflicts

Artifacts requiring updates or alignment:

- `AGENTS.md` and `docs/*` currently describe `frontend/` + `src/` as authoritative.
- Deployment/config references `frontend/dist` and `src/` paths (e.g., nginx, docker compose, deployment docs).
- Workspace membership and scripts must be updated to avoid broken installs/builds.

## 3) Recommended Approach

**Selected approach:** Option 1 — Direct Adjustment (two-step)

### Stage A (Compatibility Stage)

- Physically migrate code:
  - `frontend/` → `apps/app/`
  - `src/` → `apps/api/`
- Keep legacy roots working via thin compatibility wrappers (temporary):
  - `frontend/` delegates to `apps/app`
  - `src/` delegates to `apps/api`
- Update production deployment to new paths.

### Stage B (Cleanup Stage)

- Remove `frontend/` and `src/` legacy roots and all references once migration is stable.

**Rationale:** Minimizes disruption while avoiding prolonged dual-structure maintenance. Allows prod changes as needed, but provides a rollback-ish path by keeping legacy wrappers during Stage A.

## 4) Detailed Change Proposals

### Epics / Story Plan Updates

Add two stories to Epic 0:

- **Story 0.6a:** Migrate to apps/* Layout (Compatibility Stage)
- **Story 0.6b:** Remove Legacy frontend/src Paths (Cleanup Stage)

Update sprint tracking to include these stories ahead of 0.7+.

## 5) Implementation Handoff

- **SM/PO:** owns updating epics + sprint tracking + story creation for 0.6a/0.6b (this proposal).
- **Dev:** implements 0.6a and 0.6b in order, running CI and verifying production deployment paths.

## Approval

Approved by: Jeremiah  
Mode: Incremental
