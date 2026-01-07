v0.3.0 delivers a stronger QA foundation with Playwright regression coverage and CI wiring, plus stability improvements across key money flows.

Highlights
- Playwright regression suite + scheduled CI workflow.
- Coverage for transactions (create + split), recurring approve/post + history, extra money allocations (single, multi-category, reserve to goals), goals, debts, dashboard, and navigation.
- Stable data-testid hooks across core UI surfaces for reliable automation.
- Cleanup hooks to remove QA-created data after runs.
- Recurring templates now generate pending instances immediately on creation.

Notes
- Playwright env vars: BASE_URL, TEST_EMAIL, TEST_PASSWORD (see SETUP.md).
