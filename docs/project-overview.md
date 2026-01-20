# MoneyShyft Project Overview

## Purpose
MoneyShyft is a budgeting app for people new to financial wellness, designed with trauma‑informed language and small‑wins reinforcement. It blends envelope/zero‑based budgeting with forecasting and future planning. A key feature is the **Extra Money Plan**, which lets users pre‑decide how windfalls (e.g., refunds, gifts) will be used, while allowing easy overrides without judgment.

## Repository Structure
- **Type:** Monorepo with two parts
- **Frontend:** `apps/app/` (Vue 3 + Vite SPA)
- **Backend:** `apps/api/` (Node/Express API)
- **Compatibility:** Legacy wrappers removed; use `apps/app` and `apps/api` only.

## Quick Reference
| Area | Details |
| --- | --- |
| Frontend | Vue 3, Vite, Pinia, Tailwind, TypeScript |
| Backend | Node.js, Express, Knex, PostgreSQL |
| Auth | JWT + cookies, axios refresh flow |
| API Base | `/api/v1` |

## Key Domains
- **Budgets:** allocations by month, sections, and categories
- **Transactions:** income/expense tracking, splits, clearing/reconciling
- **Accounts:** balances, credit card status
- **Goals:** savings goals and contributions
- **Debts:** payment plans and payoff strategies
- **Recurring:** templates + generated instances
- **Extra Money Plan:** windfall detection and allocation
- **Households:** members and setup wizard flow

## Related Docs
- Source Tree Analysis: `docs/source-tree-analysis.md`
- API Contracts (Backend): `docs/api-contracts-src.md`
- API Contracts (Frontend usage): `docs/api-contracts-frontend.md`
- Data Models (Backend): `docs/data-models-src.md`
- Data Models (Frontend types): `docs/data-models-frontend.md`
