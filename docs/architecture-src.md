# Architecture - Backend

## Overview
- Node.js + Express API
- Knex for database access and migrations
- JWT + cookies for authentication
- Middleware pipeline for auth, validation, error handling

## Structure
- Entry: `src/src/server.ts`
- App wiring: `src/src/app.ts`
- Routes: `src/src/routes/api/v1/*`
- Services: `src/src/services/*`
- DB config: `src/src/config/*`
- Migrations: `src/src/migrations/*`

## Key Flows
- Authentication: signup/login/refresh -> JWT/cookies -> `authenticateToken`
- Household context: `requireHouseholdAccess` protects household-scoped endpoints
- Budgeting: income + allocations + assignments + transactions
- Recurring: templates -> instances -> approval/posting
- Extra Money Plan: entries + preferences + assignments

## Integration Points
- Frontend uses `/api/v1` routes with axios
- Database via PostgreSQL (knex + migrations)
