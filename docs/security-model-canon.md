# Security Model Canon — MoneyShyft

## 1. Core Principles

1. Cookies, not headers, are the source of truth for authentication.
2. Database-enforced isolation (PostgreSQL RLS) is mandatory.
3. All authenticated state changes require CSRF protection.
4. Crisis Mode is operationally and security-isolated.
5. Security decisions favor boring, mainstream best practice over cleverness.

---

## 2. Authentication Model (Authoritative)

- Authentication mechanism: Cookie-based JWT
- Access token:
  - Short-lived (10–15 minutes)
  - Stored in HttpOnly; Secure; SameSite=Lax cookie
  - Scoped to Path=/api
- Refresh token:
  - Longer-lived (7–30 days)
  - Rotated on every use with reuse detection
  - Stored in HttpOnly; Secure; SameSite=Lax cookie
  - Scoped to Path=/api
- Authorization headers are not used.
- API is stateless.

---

## 3. CSRF Protection Model (Authoritative)

MoneyShyft uses a double-submit cookie CSRF pattern plus Origin validation.

Required on:
- All POST / PUT / PATCH / DELETE requests
- Login
- Token refresh
- Logout

Mechanism:
- Non-HttpOnly csrf_token cookie
- X-CSRF-Token request header must match cookie
- Strict Origin allowlist

Token lifecycle:
- Minted via GET /api/v1/csrf
- Rotated on login, logout, refresh
- Never rotated per request
- Rotation occurs in the same database transaction as the auth state change

---

## 4. Deployment & Origin Model

- SPA and API are deployed on the same origin.
- /api/* is proxied to the backend API.
- Crisis Mode is static and may live at /crisis/* or a separate subdomain.
- Same-origin deployment is required for SPA ↔ API, not for Crisis Mode.

---

## 5. Crisis Mode Security Boundary

Crisis Mode is intentionally non-authenticated.

Rules:
- No cookies are read
- No cookies are written
- No auth middleware
- No CSRF
- Anonymous analytics only
- Service Worker is cache-only (GET requests)

Crisis Mode must remain safe even if all authenticated services fail.

---

## 6. Data Access & Isolation

- Every authenticated request runs inside a single database transaction.
- SET LOCAL variables establish security context:
  - app.user_id
  - app.household_id
- PostgreSQL Row-Level Security enforces tenant and household isolation.
- Application checks are defense-in-depth only.

---

## 7. Logging & Audit Safety

- Logs use surrogate actor IDs, never stable user IDs.
- Logs are immutable and retained after user deletion.
- Identifying fields are anonymized at deletion time.
- X-Request-ID is required; generated if missing.

---

## 8. Explicit Non-Goals (MVP)

The following are explicitly out of scope for MVP:
- Cross-origin authentication
- Authorization headers
- Service Worker mutation replay
- Third-party identity providers
- Token storage in localStorage
- Authenticated fallback paths in Crisis Mode

---

## 9. Cultural Rule

If a change makes the system more clever, more implicit, or more magical, it is probably wrong.
