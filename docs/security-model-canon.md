# Security Model Canon — MoneyShyft

## 1. Core Principles

1. Database-enforced isolation (PostgreSQL RLS) is mandatory.
2. All authenticated state changes require CSRF protection.
3. Crisis Mode is operationally and security-isolated.
4. Security decisions favor boring, mainstream best practice over cleverness.

---

## 2. Authentication Model (Ecosystem Default)

The ecosystem default authentication model is:

- one-time code exchange,
- token-based authentication,
- no cookie-based auth,
- no tokens in URLs.

JWTs MUST include:
- `kid` (key identifier),
- `tenant_id`,
- `aud` (audience).

---

## 3. MoneyShyft Authentication Exception (ECO-3A)

MoneyShyft is granted a temporary exception to the ecosystem authentication model.

### Allowed (Temporary)
- Cookie-based JWT authentication
- HttpOnly cookies
- CSRF protection (double-submit + origin allowlist)

### Required
- Migration to ecosystem authentication in a future major version
- No new features may deepen reliance on cookie-based auth

This exception exists solely to support active development and must not be treated as precedent.

Migration Plan: `_bmad-output/planning-artifacts/ecosystem-auth-migration-plan.md`

---

## 4. Stateless API Requirement

All APIs MUST remain stateless.

For MoneyShyft:
- Statelessness is preserved under the ECO-3A exception by using cookie-based JWTs.
- No server-side session state is permitted.

Migration to token-only auth is required to maintain ecosystem consistency.

---

## 5. Refusal Semantics (Security Boundary)

Business refusals are not security failures.

- They MUST NOT be logged as errors.
- They MUST NOT trigger alerts, retries, or anomaly detection.
- They MUST NOT be conflated with authorization failures.

Security monitoring applies only to auth, validation, and system faults.

---

## 6. CSRF Protection Model (Authoritative)

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

## Deployment & Origin Model

All MoneyShyft components MUST comply with ecosystem origin and routing constraints.

- Web UI and API MUST be served from the same origin.
- Crisis Mode is static and is served under `/crisis/*` on the same origin.
  - This is an explicit ECO-2 exception granted to preserve offline capability and safety guarantees.
- Crisis Mode MUST NOT be deployed on a separate subdomain.

Path-based separation is permitted only for Crisis Mode.
Subdomain-based separation for Crisis Mode is forbidden.

Same-origin deployment is required for:
- SPA ↔ API interaction
- Crisis Mode ↔ application environment consistency

Enforcement Notes (implicit, not optional)
- Any reference to crisis.<domain> or equivalent must be removed
- Any infrastructure template that provisions a separate Crisis subdomain violates canon
- Offline guarantees are preserved via static /crisis/* delivery, not isolation

Why This Exists (alignment rationale)

This change ensures:
- a single, auditable security boundary,
- consistent CSP injection at ingress,
- elimination of cross-origin ambiguity during crisis use,
- compliance with ECO-2 without weakening Crisis guarantees.

---

## 8. Crisis Mode Security Boundary

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

## 9. Data Access & Isolation

- Every authenticated request runs inside a single database transaction.
- SET LOCAL variables establish security context:
  - app.user_id
  - app.household_id
- PostgreSQL Row-Level Security enforces tenant and household isolation.
- Application checks are defense-in-depth only.

---

## 10. Logging & Audit Safety

- Logs use surrogate actor IDs, never stable user IDs.
- Logs are immutable and retained after user deletion.
- Identifying fields are anonymized at deletion time.
- X-Request-ID is required; generated if missing.

---

## 11. Explicit Non-Goals (MVP)

The following are explicitly out of scope for MVP:
- Cross-origin authentication
- Authorization headers
- Service Worker mutation replay
- Third-party identity providers
- Token storage in localStorage
- Authenticated fallback paths in Crisis Mode

---

## 12. Cultural Rule

If a change makes the system more clever, more implicit, or more magical, it is probably wrong.

These rules ensure that ecosystem security constraints do not leak into user harm,
misclassified failures, or coercive UX patterns.

Boundaries are enforced by the system.
Agency remains with the person.
