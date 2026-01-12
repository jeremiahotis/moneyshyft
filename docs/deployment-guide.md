# Deployment Guide

## Overview
- Backend runs as a Node/Express service built from `src/Dockerfile`.
- Postgres runs in Docker Compose.
- Nginx is host-managed and proxies `/api/` to the backend.
- Vue SPA is built in `frontend/` and served from `frontend/dist`.

## Key Files
- `docker-compose.yml` / `docker-compose.example.yml`
- `src/Dockerfile` / `src/Dockerfile.production`
- `nginx/nginx.conf`
- `PRODUCTION_DEPLOYMENT_GUIDE.md`

## Build & Run (Production)
- Build backend in Docker: `npm run build` inside `src/Dockerfile`
- Run migrations: `npm run migrate:latest:prod`

## Notes
- Backend env config: `src/.env` (gitignored)
- Nginx serves frontend from `/home/jeremiahotis/projects/moneyshyft/frontend/dist` in prod config
