# Story 0.0: Commit Agent/Tooling Scaffolding (Tracked Fully)

Status: done

## Story

As a developer,
I want the agent/tooling scaffolding tracked in git (including planning outputs),
so that a fresh clone contains everything needed for the AI-assisted workflow without “untracked churn.”

## Acceptance Criteria

**Given** a clean clone  
**When** I run the agent tooling commands we expect to use  
**Then** the required directories and configs exist and the commands can run (even if they generate additional output later)  
**And** git diff contains only tooling directories and repo-level configs that support them  
**And** a reviewer can see a single commit that is “tooling only.”  

## Tasks / Subtasks

- [x] Task 1: Define scope + guardrails (AC: tooling-only)
  - [x] Add “Tracked Generated Artifacts Policy” doc and link it in `docs/index.md`
  - [x] Record explicit non-scope: no runtime source changes in `frontend/**` or backend code
- [x] Task 2: Ensure tooling directories are tracked (AC: clean clone has scaffolding)
  - [x] Verify `_bmad/` is tracked
  - [x] Verify `_bmad-output/` is tracked
  - [x] Verify `.claude/` (commands only; exclude local settings)
  - [x] Verify `.codex/` (prompts/skills only; exclude auth/session/history)
  - [x] Verify `.cursor/rules/`
  - [x] Verify `.github/agents/`
  - [x] Verify `docs/` is tracked
- [x] Task 3: Verify “tooling only” diff boundary (AC: reviewer sees one tooling-only commit)
  - [x] Verify no changes staged under `frontend/**` or runtime backend code
  - [x] Verify staged file list matches tooling-only scope
  - [x] Prepare a single commit message that is “tooling only”

## Dev Notes

### Staging Discipline (Binding)

- Stage tooling scaffolding **only** for this story/commit.
- Do **not** stage product/runtime changes here.

## Dev Agent Record

### Agent Model Used

GPT-5.2 (Cursor)

### Debug Log References

- `git status --porcelain`
- `git diff --name-only`
- `git diff --cached --name-only`
- `git rm --cached .codex/version.json`

### Completion Notes List

- Verified tooling directories are already tracked; no runtime sources touched.
- Removed `.codex/version.json` from tracking and ignored it to prevent update churn.
- Security guardrail: local auth/session files are explicitly excluded and ignored:
  - `.codex/auth.json`, `.codex/history.jsonl`, `.codex/sessions/`
  - `.claude/settings.local.json`

### File List

- .gitignore
- _bmad-output/implementation-artifacts/0-0-commit-agent-tooling-scaffolding-tracked-fully.md
- _bmad-output/implementation-artifacts/sprint-status.yaml
