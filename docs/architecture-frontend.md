# Architecture - Frontend

## Overview
- Vue 3 SPA bootstrapped with Vite
- Pinia stores for state management
- Vue Router for navigation
- Axios client with refresh flow

## Structure
- Entry: `frontend/src/main.ts`
- Root component: `frontend/src/App.vue`
- Router: `frontend/src/router/index.ts`
- API client: `frontend/src/services/api.ts`
- State: `frontend/src/stores/*`
- Views: `frontend/src/views/*`
- Components: `frontend/src/components/*`

## Key Flows
- Authentication: login/signup -> JWT + cookies -> `/auth/me` for session verification
- Budgeting: budget setup wizard -> allocations -> assignments
- Extra Money Plan: preferences -> recommendations -> assignments

## Noted Integration Points
- `/api/v1` backend endpoints
- Cookie-based auth + refresh handler
