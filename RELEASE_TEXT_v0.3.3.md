v0.3.3 fixes a remaining production TypeScript build blocker in AuthService.

Fixes
- Guarded createRecommendedSections call when household_id is missing.

Deployment notes
- Rebuild backend image.
- Run migrations (npm run migrate:latest:prod inside the container).
