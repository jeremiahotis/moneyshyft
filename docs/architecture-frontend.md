# Architecture - Frontend

## Overview
- Vue 3 SPA bootstrapped with Vite
- Pinia stores for state management
- Vue Router for navigation
- Axios client with refresh flow

## Structure
- Entry: `apps/app/src/main.ts`
- Root component: `apps/app/src/App.vue`
- Router: `apps/app/src/router/index.ts`
- API client: `apps/app/src/services/api.ts`
- State: `apps/app/src/stores/*`
- Views: `apps/app/src/views/*`
- Components: `apps/app/src/components/*`

## Key Flows
- Authentication: login/signup -> JWT + cookies -> `/auth/me` for session verification
- Budgeting: budget setup wizard -> allocations -> assignments
- Extra Money Plan: preferences -> recommendations -> assignments

## Noted Integration Points
- `/api/v1` backend endpoints
- Cookie-based auth + refresh handler
