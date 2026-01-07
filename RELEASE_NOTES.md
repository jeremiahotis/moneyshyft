# Release Notes

## v0.3.3

Fixes
- Guarded createRecommendedSections call when household_id is missing.

Deployment notes
- Rebuild backend image.
- Run migrations (use npm run migrate:latest:prod inside the container).

## v0.3.2

Fixes
- Guarded extra money recommendations when household_id is missing.

Deployment notes
- Rebuild backend image.
- Run migrations (use npm run migrate:latest:prod inside the container).

## v0.3.1

Fixes
- Guarded extra money routes when household_id is missing to satisfy TypeScript strictness.
- Avoided analytics event logging when household_id is null during signup.

Deployment notes
- Rebuild backend image.
- Run migrations (use npm run migrate:latest:prod inside the container).

## v0.3.0

Highlights
- QA regression suite added with Playwright and scheduled CI workflow.
- Expanded coverage for core flows: transactions (create + splits), recurring approve/post + history, extra money (single, multi-category, savings reserve to goals), goals, debts, dashboard, and navigation.
- Stable data-testid selectors added across key UI flows for reliable automation.
- Test data cleanup hooks added to keep environments tidy.
- Recurring templates now generate pending instances immediately on creation.

Details
- QA: Playwright tests and helpers in `tests/`; config in `playwright.config.ts`.
- CI: workflow in `.github/workflows/regression.yml`.
- Docs: Playwright env vars documented in `SETUP.md`.
- UI: added selectors in transaction, recurring, extra money, debt, goal, and split flows.
- Backend: analytics events migration and service; recurring generation tweaks.
