# Source Tree Analysis

## Repository Overview
- **Type:** Monorepo with two primary parts
- **Parts:**
  - `apps/app/` (Vue 3 + Vite SPA)
  - `apps/api/` (Node/Express API)

## Frontend (`apps/app/`)
```
apps/app/
├── index.html                # Vite entry HTML
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS config
├── postcss.config.js         # PostCSS config
├── public/
│   └── sw.js                  # Service worker
└── src/
    ├── main.ts                # App bootstrap
    ├── App.vue                # Root component
    ├── router/                # Vue Router setup
    ├── services/              # API client
    ├── stores/                # Pinia state stores
    ├── views/                 # Route-level views
    ├── components/            # Domain UI components
    ├── types/                 # Shared TS types
    ├── utils/                 # Helpers
    └── assets/                # Global styles
```

## Backend (`apps/api/`)
```
apps/api/
├── Dockerfile*               # Docker build configurations
├── package.json              # API dependencies + scripts
├── knexfile.js               # Knex runtime config (compiled)
├── src/
│   ├── server.ts             # Server bootstrap
│   ├── app.ts                # Express app wiring + routes
│   ├── routes/api/v1/         # REST endpoints
│   ├── services/             # Business logic services
│   ├── migrations/           # DB schema changes
│   ├── seeds/                # Seed data
│   ├── middleware/           # Auth/validation/error handling
│   ├── validators/           # Joi request validation
│   ├── config/               # DB + Knex config
│   ├── utils/                # Logger, JWT, helpers
│   └── types/                # TS type augmentations
```

## Integration Touchpoints
- Frontend calls backend through `/api/v1` via axios client (`apps/app/src/services/api.ts`).
- Backend serves REST routes under `/api/v1` in `apps/api/src/app.ts`.
- Environment variables tie frontend and backend (CORS origin, API base URL, auth cookies).
