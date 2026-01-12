# Story 0.0: Commit Agent/Tooling Scaffolding (Tracked Fully)

Status: review

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
  - [x] Stage `_bmad/`
  - [x] Stage `_bmad-output/`
  - [x] Stage `.claude/` (commands only; exclude local settings)
  - [x] Stage `.codex/` (prompts/skills only; exclude auth/session/history)
  - [x] Stage `.cursor/rules/`
  - [x] Stage `.github/agents/`
  - [x] Stage `docs/`
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

- `git add .gitignore docs _bmad _bmad-output .claude .codex .cursor/rules .github/agents`
- `git diff --cached --name-only`

### Completion Notes List

- Staged tooling-only scope (explicit paths) and validated no runtime sources were staged.
- Security guardrail: local auth/session files are explicitly excluded and ignored:
  - `.codex/auth.json`, `.codex/history.jsonl`, `.codex/sessions/`
  - `.claude/settings.local.json`

### File List

- .gitignore
- .claude/
- .codex/
- .cursor/rules/
- .github/agents/
- _bmad/
- _bmad-output/
- docs/

