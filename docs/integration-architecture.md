# Integration Architecture

## Overview
MoneyShyft is a monorepo with a Vue 3 SPA (`apps/app/`) and an Express API (`apps/api/`). The frontend communicates with the backend over REST endpoints mounted at `/api/v1`.

## Runtime Topology
- **Frontend (Vite SPA)**
  - Runs at `http://localhost:5173` in dev.
  - Uses Axios client (`apps/app/src/services/api.ts`) with cookie-based auth under the ECO-3A exception.
- **Backend (Express API)**
  - Runs at `http://localhost:3000` in dev.
  - CORS origin defaults to `http://localhost:5173` for local development only (configurable via `FRONTEND_URL`).
- **Database (PostgreSQL)**
  - Accessed via Knex (`apps/api/src/config/knex.ts`).

**Production requirement:** Web UI and API are same-origin per ECO-2. CORS is not used for production browser flows.

## Auth & Session Flow
**Temporary (ECO-3A exception):** Cookie-based auth is permitted until migration. See `_bmad-output/planning-artifacts/ecosystem-auth-migration-plan.md`.

1. User signs up or logs in via `/api/v1/auth/signup` or `/api/v1/auth/login`.
2. Backend sets HTTP-only cookies (access + refresh tokens).
3. Frontend uses `withCredentials: true` on all API calls.
4. Axios response interceptor triggers `/api/v1/auth/refresh` on 401s and retries original request.

## Tenant Resolution (Canonical)

Tenant identity is resolved exclusively at request time using:

- the inbound `Host` header, and
- authenticated JWT claims (`tenant_id`, `aud`, `kid`).

Applications MUST NOT:
- implement independent tenant registries,
- infer tenant identity from request paths, query parameters, or payload data,
- cache tenant identity outside the request lifecycle.

Tenant resolution occurs at the integration boundary (ingress + auth layer) and is treated as authoritative for the lifetime of the request.

## Application Boundary & Routing

Each application is served from a single logical origin.

- Web UI and API MUST be same-origin per application.
- Cross-application routing MUST NOT rely on path-based multiplexing.

### MoneyShyft Exception — Crisis Mode
Crisis Mode MAY be served as static content under `/crisis/*` on the same origin.
This exception exists to preserve offline capability and safety guarantees.

## Refusal vs Error Semantics

Integrations MUST distinguish between business refusals and system errors.

### Business Refusals
- Returned as HTTP 200
- Response shape: `{ success: false, reason }`
- Used for eligibility limits, policy boundaries, or intentional denials

### Errors
- Returned as HTTP 4xx/5xx
- Reserved strictly for:
  - authentication failures,
  - validation errors,
  - system or infrastructure faults

Clients MUST NOT treat business refusals as failures, retries, or error states.

These rules ensure that ecosystem security constraints do not leak into user harm,
misclassified failures, or coercive UX patterns.

Boundaries are enforced by the system.
Agency remains with the person.

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
- Cookie-based auth (ECO-3A exception): production requires same-origin; no CORS-based auth flows.
- Environment variables:
  - Backend: `FRONTEND_URL`, `RESET_TOKEN`, database envs.
  - Frontend: `BASE_URL` (Playwright) and Vite envs.

## Known Integration Gaps
- Frontend uses `/users/preferences` in `apps/app/src/stores/recurring.ts`, but no matching backend route found in `apps/api/src/routes/api/v1`.
