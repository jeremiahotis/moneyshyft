# Testing Guide

## Test Runner
- Playwright (`@playwright/test`) configured in `playwright.config.ts`.
- Default base URL: `http://localhost:5173` (override with `BASE_URL`).

## Environment Variables
- `TEST_EMAIL`: login email for Playwright tests
- `TEST_PASSWORD`: login password for Playwright tests
- `BASE_URL`: override frontend URL (optional)

## Run Tests
```
npx playwright test
```

## Test Suites Overview

### Auth
- `tests/auth/login.spec.ts`: logs in with valid credentials and expects dashboard.

### Dashboard
- `tests/dashboard/load.spec.ts`: verifies dashboard widgets load after login.

### Navigation
- `tests/navigation/core.spec.ts`: clicks through main sections (Accounts, Transactions, Recurring, Budget, Extra Money, Debts, Goals, Settings).

### Transactions
- `tests/transactions/create.spec.ts`: creates a transaction and validates API record.
- `tests/transactions/split.spec.ts`: splits a transaction across categories and verifies totals.

### Debts
- `tests/debts/payment.spec.ts`: creates a debt, records a payment, and cleans up.

### Goals
- `tests/goals/create-contribute.spec.ts`: creates a goal and adds a contribution.

### Recurring
- `tests/recurring/approve-post.spec.ts`: creates a recurring template, generates instances, approves and posts.

### Extra Money
- `tests/extra-money/assign.spec.ts`: creates an entry and assigns to a category.
- `tests/extra-money/multi-assign.spec.ts`: assigns across multiple categories.
- `tests/extra-money/reserve-goals.spec.ts`: allocates savings reserve to a goal.

## Test Helpers
- `tests/helpers/auth.ts`: login flow using `TEST_EMAIL`/`TEST_PASSWORD`.
- `tests/helpers/forms.ts`: select helpers + date utilities.
- `tests/helpers/cleanup.ts`: cleanup via API delete calls.

## Notes
- Most tests rely on API cleanup via Playwright request context.
- Ensure backend and database are running and seeded appropriately before running UI tests.
