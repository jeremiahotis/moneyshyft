v0.3.1 is a patch release fixing production build blockers introduced in v0.3.0.

Fixes
- Guarded extra money routes when household_id is missing to satisfy TypeScript strictness.
- Avoided analytics event logging when household_id is null during signup.

Deployment notes
- Rebuild backend image.
- Run migrations (use npm run migrate:latest:prod inside the container).
