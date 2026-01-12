# Integration Architecture

## Overview
MoneyShyft is a monorepo with a Vue 3 SPA (`frontend/`) and an Express API (`src/`). The frontend communicates with the backend over REST endpoints mounted at `/api/v1`.

## Runtime Topology
- **Frontend (Vite SPA)**
  - Runs at `http://localhost:5173` in dev.
  - Uses Axios client (`frontend/src/services/api.ts`) with cookie-based auth.
- **Backend (Express API)**
  - Runs at `http://localhost:3000` in dev.
  - CORS origin defaults to `http://localhost:5173` (configurable via `FRONTEND_URL`).
- **Database (PostgreSQL)**
  - Accessed via Knex (`src/src/config/knex.ts`).

## Auth & Session Flow
1. User signs up or logs in via `/api/v1/auth/signup` or `/api/v1/auth/login`.
2. Backend sets HTTP-only cookies (access + refresh tokens).
3. Frontend uses `withCredentials: true` on all API calls.
4. Axios response interceptor triggers `/api/v1/auth/refresh` on 401s and retries original request.

## Key Domain Flows

### Budgeting & Transactions
- Frontend creates income sources, categories, and allocations.
- Transactions are created and updated via `/api/v1/transactions`.
- Budget summary uses `/api/v1/budgets/:month/summary`.

### Extra Money Plan
- Frontend records extra money entries (`/api/v1/extra-money`).
- Assignments and goals allocation happen through `/api/v1/extra-money/:id/assign` and `/assign-goals`.
- Preferences stored in `/api/v1/extra-money/preferences`.

### Recurring Transactions
- Templates created via `/api/v1/recurring-transactions`.
- Instances generated and managed via `/api/v1/recurring-transactions/instances/*`.

### Households & Settings
- Household metadata via `/api/v1/households/current`.
- Setup wizard completion via `/api/v1/households/setup-wizard`.
- Settings via `/api/v1/settings` (e.g., extra money threshold).

## Integration Touchpoints
- API base path: `/api/v1`
- Cookie-based auth: both frontend and backend must share the same origin or proper CORS + credentials settings.
- Environment variables:
  - Backend: `FRONTEND_URL`, `RESET_TOKEN`, database envs.
  - Frontend: `BASE_URL` (Playwright) and Vite envs.

## Known Integration Gaps
- Frontend uses `/users/preferences` in `frontend/src/stores/recurring.ts`, but no matching backend route found in `src/src/routes/api/v1`.
