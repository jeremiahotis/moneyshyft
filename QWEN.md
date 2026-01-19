# MoneyShyft Project Context

## Project Overview

MoneyShyft is a trauma-informed, multi-tenant financial planning platform designed to support vulnerable populations. The application features a three-mode progressive disclosure architecture: Crisis → Foundation → Builder, with each mode offering increasing levels of financial planning capabilities.

**Key Features:**
- **Crisis Mode**: Static HTML decision tree for immediate crisis resources (works without JavaScript)
- **Foundation Mode**: Transaction logging and basic budgeting for individuals
- **Builder Mode**: Advanced household financial planning with goals, scenarios, and forecasting
- **Multi-tenant Architecture**: Organization → Household → User hierarchy with row-level security
- **Trauma-Informed Design**: Non-coercive, privacy-focused interface supporting vulnerable users

**Technology Stack:**
- **Frontend**: Vue 3 SPA (Vite) with Pinia state management
- **Backend**: Express/TypeScript API with PostgreSQL database
- **Crisis Mode**: 11ty static site generator
- **Database**: PostgreSQL with Knex.js migrations and Kysely query builder
- **Authentication**: Cookie-only JWT with CSRF protection
- **Architecture**: Monorepo with pnpm workspaces

## Project Structure

```
moneyshyft/
├── apps/
│   ├── crisis/           # 11ty static site (Crisis Mode)
│   ├── app/              # Vue 3 SPA (Foundation + Builder Modes)
│   └── api/              # Express/TypeScript API
├── packages/
│   └── shared/           # Shared types, constants, utilities
├── docker-compose*.yml   # Docker configuration
├── nginx/                # Nginx configuration
└── docs/                 # Documentation
```

### Backend Structure (`apps/api/src/`)

- **Routes**: `routes/api/v1/<resource>.ts` - REST API endpoints
- **Services**: `services/<Resource>Service.ts` - Business logic
- **Repositories**: `repositories/<Resource>Repository.ts` - Database queries
- **Middleware**: `middleware/*.ts` - Authentication, validation, error handling
- **Migrations**: `migrations/` - Database schema changes (numbered prefixes)
- **Validators**: `validators/<resource>.validators.ts` - Zod validation schemas

### Frontend Structure (`apps/app/src/`)

- **Components**: `components/<domain>/` - Reusable UI components
- **Views**: `views/<domain>/` - Route-level pages
- **Stores**: `stores/<domain>.ts` - Pinia state management
- **Router**: `router/index.ts` - Vue Router configuration
- **Services**: `services/api.ts` - API client with interceptors

## Building and Running

### Prerequisites
- Node.js (LTS version)
- pnpm (package manager)
- Docker and Docker Compose
- PostgreSQL (via Docker)

### Setup Commands

```bash
# Install dependencies
pnpm install

# Local development (starts all services)
pnpm dev

# Build all applications
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint

# Type check
pnpm typecheck
```

### Individual App Commands

**Backend API:**
```bash
cd apps/api
npm run dev                    # Development server
npm run build                  # Compile TypeScript
npm run start                  # Production server
npm run migrate:latest         # Run pending migrations
npm run seed:run               # Run seed data
npm test                       # Run tests
```

**Frontend App:**
```bash
cd apps/app
npm run dev                    # Development server (port 5173)
npm run build                  # Production build
npm run preview                # Preview production build
```

**Crisis Mode:**
```bash
cd apps/crisis
npm run dev                    # Development server
npm run build                  # Static site build
```

### Database Setup

1. Copy `docker-compose.example.yml` to `docker-compose.yml`
2. Update database credentials and JWT secrets
3. Start services: `docker-compose up -d`
4. Run migrations: `cd apps/api && npm run migrate:latest`
5. Run seeds: `npm run seed:run`

## Development Conventions

### Naming Conventions
- **Database**: `snake_case` for tables/columns, `id` as PK consistently
- **API**: `kebab-case` for endpoints, `camelCase` for JSON fields
- **Code**: `camelCase` for variables/functions, `PascalCase` for components/classes
- **Files**: `PascalCase` for components, `camelCase` for utilities

### Architecture Patterns
- **Transaction-per-request**: All authenticated DB operations use transactions with `SET LOCAL` for RLS
- **Cookie-only JWT**: HTTP-only cookies for access/refresh tokens with CSRF protection
- **Repository Pattern**: Database queries in repository layer, business logic in services
- **Type Safety**: Shared types in `packages/shared` used across all apps via TypeScript project references

### Error Handling
- Standardized error responses with supportive, trauma-informed messages
- Custom error classes for different error types
- Global error handler for consistent formatting

### Testing
- Unit tests co-located with source files (`<file>.test.ts`)
- Integration tests for API routes and services
- E2E tests using Playwright in `tests/` directory
- RLS policy testing with transaction context setup

## Key Architectural Decisions

### Multi-Tenancy & Security
- **Row-Level Security**: PostgreSQL RLS policies with `SET LOCAL app.user_id` and `app.household_id`
- **Data Isolation**: All queries must filter by household context
- **Authentication**: Cookie-only JWT with CSRF protection using double-submit + Origin allowlist
- **Privacy**: Actor surrogate IDs in logs instead of user IDs, immediate anonymization on deletion

### Household & Sponsorship Model
- **Household Ownership**: One household per user (MVP), owned by one user who can transfer ownership
- **Sponsorship**: Non-revocable organization sponsorship that can end financially but not access
- **Billing**: Grace period → Discount → Standard pricing when sponsorship ends
- **Owner Failover**: Automatic ownership transfer after 30 days of owner inactivity

### Offline Support
- **IndexedDB Queue**: Client writes to queue, sync worker flushes when online
- **Foundation Mode**: Transaction logging works offline
- **Crisis Mode**: Static HTML with Service Worker caching

### Progressive Enhancement
- **Crisis Mode**: Works without JavaScript (static HTML links)
- **Foundation/Builder**: Client-rendered SPA with graceful degradation
- **Trauma-Informed**: Non-coercive, supportive error messages and UI patterns

## Environment Configuration

### Backend Environment (`apps/api/.env`)
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret for JWT signing
- `REFRESH_JWT_SECRET`: Secret for refresh tokens
- `FRONTEND_URL`: Frontend origin for CORS
- `RESET_TOKEN`: Admin reset endpoint token

### Frontend Environment
- Uses Vite environment variables via `import.meta.env`
- Proxy configuration in `vite.config.ts` for API requests

### Docker Configuration
- Copy `docker-compose.example.yml` to `docker-compose.yml`
- Configure database credentials and JWT secrets
- Production uses `NODE_ENV=production` and separate nginx configuration

## Deployment

### Production Architecture
- **Frontend**: Static files served by nginx
- **Backend**: Node.js service in Docker container
- **Database**: PostgreSQL in Docker container
- **Reverse Proxy**: nginx on host (not containerized) serving frontend and proxying `/api/` to backend
- **SSL**: TLS termination handled by nginx

### Deployment Steps
1. Build frontend: `cd apps/app && npm run build`
2. Build backend: `cd apps/api && npm run build`
3. Run migrations: `docker exec -it <container> npm run migrate:latest:prod`
4. Restart services: `docker-compose restart`

## Special Considerations

### Trauma-Informed Design
- Avoid coercive prompts or blocking flows
- Supportive error messages that don't blame users
- Easy exit options at every stage
- Privacy-focused with right to deletion

### Compliance Requirements
- WCAG 2.1 Level AA accessibility
- GDPR/CCPA compliance with data portability
- GLBA privacy requirements
- Right to deletion (actual deletion, not soft-delete)

### Performance Targets
- Crisis Mode: <2s load on 3G
- Authenticated pages: <4s Time to Interactive
- Transaction logging: <500ms typical
- Scenario calculations: <2s

### Security Requirements
- Multi-tenant data isolation at database level
- Encryption at rest and in transit (TLS 1.3)
- CSRF protection with double-submit + Origin allowlist
- No credential exposure to JavaScript

This project prioritizes user safety, privacy, and accessibility while providing comprehensive financial planning tools for vulnerable populations.