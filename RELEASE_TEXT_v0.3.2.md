v0.3.2 fixes a production TypeScript build blocker in extra money recommendations.

Fixes
- Guarded extra money recommendations when household_id is missing.

Deployment notes
- Rebuild backend image.
- Run migrations (npm run migrate:latest:prod inside the container).
