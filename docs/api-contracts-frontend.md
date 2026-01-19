# API Contracts - Frontend (frontend)

Base URL: `/api/v1` (configured in `apps/app/src/services/api.ts`)

The frontend consumes the backend contracts defined in `docs/api-contracts-src.md`. Request/response schemas below match the backend validators and route responses.

## Auth
- POST `/auth/signup`
- POST `/auth/login`
- POST `/auth/logout`
- POST `/auth/refresh` (used by axios interceptor)
- GET `/auth/me`

## Accounts
- GET `/accounts`
- POST `/accounts`
- PATCH `/accounts/:id`
- DELETE `/accounts/:id`
- GET `/accounts/:id/credit-card-status`

## Transactions
- GET `/transactions` (supports query params)
- POST `/transactions`
- PATCH `/transactions/:id`
- DELETE `/transactions/:id`
- PATCH `/transactions/:id/clear`
- POST `/transactions/:id/split`
- GET `/transactions/:id/splits`
- PATCH `/transactions/:id/splits`
- DELETE `/transactions/:id/split`

## Budgets
- GET `/budgets/:month/summary`
- GET `/budgets/:month/allocations`
- POST `/budgets/:month/allocations`
- POST `/budgets/assign-account-balance`
- PUT `/budgets/:month/notes`

## Categories & Sections
- GET `/categories`
- POST `/categories`
- PATCH `/categories/:id`
- DELETE `/categories/:id`
- GET `/categories/sections`
- POST `/categories/sections`
- PATCH `/categories/sections/:id`
- DELETE `/categories/sections/:id`

## Income
- GET `/income`
- POST `/income`
- PATCH `/income/:id`
- DELETE `/income/:id`

## Debts
- GET `/debts`
- GET `/debts/:id`
- POST `/debts`
- PATCH `/debts/:id`
- DELETE `/debts/:id`
- POST `/debts/:id/payments`
- GET `/debts/:id/payments`
- POST `/debts/calculate-payoff`
- POST `/debts/commit-plan`
- GET `/debts/active-plan`

## Recurring Transactions
- GET `/recurring-transactions`
- GET `/recurring-transactions/:id`
- POST `/recurring-transactions`
- PATCH `/recurring-transactions/:id`
- DELETE `/recurring-transactions/:id`
- POST `/recurring-transactions/:id/toggle-auto-post`
- POST `/recurring-transactions/:id/generate-instances`
- GET `/recurring-transactions/instances/pending?days=...`
- GET `/recurring-transactions/instances/all?status=...`
- POST `/recurring-transactions/instances/:id/approve`
- POST `/recurring-transactions/instances/:id/skip`
- POST `/recurring-transactions/instances/:id/post`
- PATCH `/recurring-transactions/instances/:id`

## Goals
- GET `/goals`
- GET `/goals/:id`
- POST `/goals`
- PATCH `/goals/:id`
- DELETE `/goals/:id`
- POST `/goals/:id/contributions`
- GET `/goals/:id/contributions`

## Assignments
- GET `/assignments/:month`
- POST `/assignments`
- POST `/assignments/auto`
- DELETE `/assignments/:id`
- GET `/assignments/transaction/:transactionId`
- POST `/assignments/transfer`
- POST `/assignments/assign-to-categories`
- POST `/assignments/auto-assign-all`

## Extra Money
- GET `/extra-money`
- GET `/extra-money/pending`
- POST `/extra-money`
- POST `/extra-money/:id/assign`
- POST `/extra-money/:id/assign-goals`
- POST `/extra-money/:id/ignore`
- DELETE `/extra-money/:id`
- POST `/extra-money/scan`
- GET `/extra-money/preferences`
- POST `/extra-money/preferences`
- POST `/extra-money/recommendations`

## Household & Settings
- GET `/households/current`
- PATCH `/households/setup-wizard`
- GET `/households/members`
- POST `/households/reset`
- GET `/settings`
- PATCH `/settings`

## Noted Usage Gaps
- `apps/app/src/stores/recurring.ts` calls `/users/preferences` (GET/PATCH), but no matching backend route was found in `apps/api/src/routes/api/v1`.
