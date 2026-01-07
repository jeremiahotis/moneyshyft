v0.3.4 fixes a production migration mismatch for legacy databases.

Fixes
- Added a compatibility shim for the missing 004_add_envelope_budgeting migration.
- Made the envelope budgeting migration idempotent to prevent re-apply failures.

Deployment notes
- Rebuild backend image.
- Run migrations with: docker compose run --rm node npm run migrate:latest:prod
