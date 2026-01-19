# MoneyShyft Setup Guide

## Local Development Setup

### 1. Create your local docker-compose.yml

Copy the example file and customize for your local environment:

```bash
cp docker-compose.example.yml docker-compose.yml
```

Then edit `docker-compose.yml` and update:
- Database username and password
- JWT secrets (generate strong random strings)
- Any other environment-specific settings

**Important**: `docker-compose.yml` is in `.gitignore` and should NEVER be committed to git.

### 1a. Optional: Start a standalone test database

If you only need a local Postgres instance for tests, use the minimal test DB compose file:

```bash
docker compose -f docker-compose.test-db.yml up -d
```

This starts a `moneyshyft_test` database on port `5432` with credentials defined in `docker-compose.test-db.yml` or `apps/api/.env.test` (legacy `src/.env.test` remains during 0.6a).

### 2. Remote Server Deployment

On the remote server:
- Nginx runs directly on the host (not containerized)
- Docker Compose only runs `postgres` and `node` services
- Create a separate `docker-compose.yml` configured for production

### 3. Environment Files

The `.env` file in `apps/api/` contains configuration. For production:
- Use strong, unique passwords
- Generate secure JWT secrets: `openssl rand -base64 32`
- Never commit `.env` files to git

For tests, copy `apps/api/.env.test.example` to `apps/api/.env.test` and adjust as needed. `.env.test` is ignored by git.

Database env options (backend):
- `DATABASE_URL` (preferred) or `DB_HOST`, `DB_PORT` (default `5432`), `DB_NAME`, `DB_USER`, `DB_PASSWORD`.

## Security Notes

- All credentials should be unique per environment
- The `.gitignore` file prevents sensitive files from being committed
- Always use environment variables for secrets in production

## QA Regression (Playwright)

Playwright tests run against a live app. Set these env vars before running:

```bash
export BASE_URL=http://localhost:5173
export TEST_EMAIL=you@example.com
export TEST_PASSWORD=yourpassword
```

Run the suite:

```bash
npx playwright test
```

CI uses the same variables via GitHub Secrets:
- `STAGING_URL` (mapped to `BASE_URL`)
- `TEST_EMAIL`
- `TEST_PASSWORD`

## Admin Utilities

Reset household data (keeps users + household, clears everything else and resets wizard):

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-reset-token: <RESET_TOKEN>" \
  -b "access_token=<cookie>" \
  -d '{"confirm":"RESET","resetToken":"<RESET_TOKEN>"}' \
  https://<your-domain>/api/v1/households/reset
```

Notes:
- Requires an authenticated session plus `RESET_TOKEN` (set in the server environment).
- This is destructive and intended for recovery/testing workflows.
