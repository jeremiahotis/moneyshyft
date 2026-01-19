# ECO-3A Authentication Migration Plan — MoneyShyft

**Status:** Binding (ECO-3A exception management)  
**Owner:** Product Manager / Architect  
**Audience:** Engineering + Product  
**Last Updated:** 2026-01-14

---

## 1. Purpose

MoneyShyft currently operates under a temporary ECO-3A exception allowing cookie-based JWT authentication with CSRF protection. This document defines the required migration to the ecosystem default authentication model and the conditions that end the exception.

---

## 2. Scope

**In scope:**
- Authentication model migration from cookie-based JWT + CSRF to ecosystem default (one-time code exchange + token-based auth).
- Token issuance, rotation, and validation aligned to ecosystem requirements.
- Tenant identity resolution enforced via Host header + JWT claims (`tenant_id`, `aud`, `kid`).

**Out of scope:**
- Feature changes unrelated to authentication.
- UI redesigns not required for auth migration.

---

## 3. Migration Trigger and Version Boundary

- **Target boundary:** Next major version release (vX.0). Exact version TBD.
- **Hard requirement:** The ECO-3A exception ends at the target boundary.
- **No silent migration:** Changes must be explicit, versioned, and documented.
- **Accountability:** The PM / Architect declares the exact target version no later than the first beta of the next major release.

---

## 4. Required End-State (Ecosystem Default)

The target authentication model MUST:
- Use one-time code exchange for guest authentication.
- Use token-based authentication (no cookie-based auth).
- Prohibit tokens in URLs.
- Ensure JWTs include `kid`, `tenant_id`, and `aud`.
- Enforce refusal vs error semantics (ECO-4).
- Keep tenant resolution authoritative per request (Host + JWT claims).

---

## 5. Transition Phases (Proposed)

### Phase 0: Preparation (Current)
- Canon documents updated to describe ECO-3A exception.
- CI guards in place; exception explicitly recorded.

### Phase 1: Dual-Path Readiness
- Implement token-based auth flow alongside existing cookie-based auth.
- Gate new auth flow behind explicit configuration or environment toggle.
- Verify tenant resolution and refusal semantics consistency.
- Dual-path operation MUST NOT be used as a permanent state and MUST include a documented sunset date or version marker.

### Phase 2: Default Switch
- Make token-based auth the default in non-production environments.
- Run compatibility testing (API clients, mobile browsers, cross-origin rules).
- Update integration docs and developer workflows.

### Phase 3: Decommission Cookie Auth
- Remove cookie-based auth endpoints and CSRF dependencies.
- Remove any auth middleware that assumes cookies.
- Enforce token-only auth in production.

---

## 6. Deprecation Conditions (Explicit)

ECO-3A exception MUST be revoked when ALL are true:
- Token-based auth meets ecosystem default requirements.
- No production endpoints depend on cookie auth or CSRF.
- Observability confirms stable auth success rates and refusal handling.
- Security review confirms no tokens in URLs and correct JWT claims.

---

## 7. Compliance Checks

Before exception removal:
- CI guard verifies ECO-3 compliance in code and docs.
- Integration architecture updated to remove cookie auth language.
- Security canon updated to remove ECO-3A exception section.

After exception removal:
- CI guard MUST fail builds if cookie-based auth or CSRF dependencies remain.

---

## 8. Risks and Mitigations

**Risk:** Client breakage due to auth flow change.  
**Mitigation:** Dual-path period with explicit testing gates.

**Risk:** Cross-origin issues under token-based auth.  
**Mitigation:** Enforce ECO-2 same-origin routing and avoid CORS reliance.

**Risk:** Loss of CSRF protections.  
**Mitigation:** CSRF protections are intentionally removed as part of this migration; XSS prevention and token storage discipline become the primary browser-side threat mitigations.

---

## 9. Exception Freeze Rule

While the ECO-3A exception is active, no new features or endpoints may be introduced that expand reliance on cookie-based authentication or CSRF mechanisms.

---

## 10. Ownership and Accountability

- **PM / Architect:** Owns plan updates, version boundary, and exception expiration.
- **Engineering Lead:** Owns implementation sequencing and decommission steps.
- **Security Lead:** Owns validation of JWT claims and token handling.

---

## 11. Approval

Approved by: Jeremiah  
Approval date: 2026-01-14
