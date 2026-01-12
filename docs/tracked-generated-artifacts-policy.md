# Tracked Generated Artifacts Policy (Engineering Canon)

**Intent:** Keep the repo reviewable while tracking planning + agent outputs.

## Scope

This policy applies to all changes under:
- `_bmad-output/`

## Rules (Binding)

1. **Story/commit accountability**
   - Any change under `_bmad-output/` MUST be tied to an explicit story and a commit/PR summary explaining **what changed** and **why**.

2. **No drive-by regeneration**
   - Do not mix unrelated regeneration of `_bmad-output/` into feature commits.
   - If `_bmad-output/` needs regeneration, isolate it into its own commit with clear scope.

3. **Staging discipline**
   - Stage only files that are in-scope for the story/commit. If the repo becomes “always dirty,” story-level accountability collapses.

4. **Review expectation**
   - Reviewers must be able to verify, at a glance:
     - Which workflow ran (or which file(s) were manually edited)
     - What changed in outputs
     - Why the change matters

