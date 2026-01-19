# Deployment Guide

## Overview
- Backend runs as a Node/Express service built from `apps/api/Dockerfile`.
- Postgres runs in Docker Compose.
- Nginx is host-managed and proxies `/api/` to the backend.
- Vue SPA is built in `apps/app/` and served from `apps/app/dist`.

## Key Files
- `docker-compose.yml` / `docker-compose.example.yml`
- `apps/api/Dockerfile` / `apps/api/Dockerfile.production`
- `nginx/nginx.conf`
- `PRODUCTION_DEPLOYMENT_GUIDE.md`

## Build & Run (Production)
- Build backend in Docker: `npm run build` inside `apps/api/Dockerfile`
- Run migrations: `npm run migrate:latest:prod`

## Notes
- Backend env config: `apps/api/.env` (gitignored)
- Nginx serves frontend from `/home/jeremiahotis/projects/moneyshyft/apps/app/dist` in prod config
