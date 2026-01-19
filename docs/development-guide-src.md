# Development Guide - Backend

## Prerequisites
- Node.js >= 20
- npm
- PostgreSQL

## Install
```
cd src
npm install
```

## Local Development
```
npm run dev
```

## Build
```
npm run build
```

## Run (compiled)
```
npm run start
```

## Migrations
```
npm run migrate:latest
npm run seed:run
```

## Tests
```
npm test
```

## Notes
- Env config is expected in `apps/api/.env` (see `apps/api/.env.example`).
- API routes are mounted in `apps/api/src/app.ts` under `/api/v1`.
