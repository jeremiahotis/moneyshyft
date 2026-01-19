# Sprint Change Proposal — Ecosystem Compliance Alignment

**Date:** 2026-01-14  
**Owner:** Jeremiah  
**Mode:** Incremental

---

## 1. Issue Summary

Governance change. New ECO-* rules are mandatory and binding across the ecosystem. Existing MoneyShyft defaults (cookie auth, routing model, refusal semantics) are now non-compliant and must be aligned immediately. Enforcement is mandated by the ecosystem rulebook and CI guards; non-alignment will fail builds.

**Trigger:** Governance change (no story-level trigger).  
**Mandated by:**
- `_bmad-output/planning-artifacts/ecosystem-rule-book.md`
- `_bmad-output/planning-artifacts/ci-guards.yml`
- `_bmad-output/planning-artifacts/ci-guards-baseline.yml`

---

## 2. Impact Analysis

### Epic Impact
- **New Epic 0: Ecosystem Compliance & Platform Alignment** is required and must precede all other epics.
- **All epics are blocked** pending compliance.
- Epic 2 (Auth), Epic 5–6 (Org/Billing), Epic 8 (Privacy/Security) are highest blast radius.

### Artifact Conflicts
- **PRD** required explicit ecosystem constraints and exceptions (ECO-2, ECO-3A, ECO-4, ECO-5).
- **Architecture** required canonical ECO-* constraints, routing exception, and auth migration exception; separate Crisis subdomain is now forbidden.
- **UX Spec** required refusal/error semantics, auth-gate neutrality, and tenancy transparency rules.
- **Integration Architecture** required canonical tenant resolution and refusal semantics.
- **Security Canon** required ecosystem auth model + MoneyShyft exception, refusal semantics, and same-origin Crisis constraints.
- **CI Guards** required ECO-* references and a dedicated workflow; tenant registry detection is intentionally softened to warning pending migration.

### Technical Impact
- Tenant identity resolution must be Host header + JWT claims only.
- Cookie auth is allowed only under ECO-3A exception; migration is required in a future major version.
- Refusal semantics standardized: HTTP 200 with `{ success:false, reason }`.
- CSP must be injected at ingress only.
- Crisis Mode must be same-origin under `/crisis/*` (no separate subdomain).

---

## 3. Recommended Approach

**Selected Path:** Hybrid (Option 1 + Option 3)

- **Direct adjustments** resolve architectural and UX ambiguity without rollback.
- **PRD addendum** prevents future drift and clarifies governance boundaries.
- No scope reduction required.

**Effort:** Medium  
**Risk:** Low

---

## 4. Detailed Change Proposals

### PRD
**File:** `_bmad-output/planning-artifacts/prd.md`
- Added “PRD Addendum — Ecosystem Constraints (ECO-* Binding)” with explicit ECO-1 through ECO-5 rules and ECO-3A exception.

### Architecture
**File:** `architecture.md` (canonical) and `_bmad-output/planning-artifacts/architecture.md` (derived)
- Added “Ecosystem Constraints (ECO-* Binding)” section.
- Removed Crisis subdomain deployment option; Crisis is same-origin `/crisis/*` only.
- Clarified cookie-based auth is temporary under ECO-3A with migration requirement.

### UX Specification
**File:** `_bmad-output/planning-artifacts/ux-design-specification.md`
- Added “UX Specification Addendum — Ecosystem Compliance” with:
  - Refusal ≠ error rule (ECO-4)
  - Neutral auth gate rules (ECO-3A)
  - Tenancy transparency (ECO-2)
  - Crisis Mode safety override

### Integration Architecture
**File:** `docs/integration-architecture.md`
- Added canonical tenant resolution rules.
- Added ECO-2 routing constraints and Crisis exception.
- Added refusal vs error integration contract.

### Security Canon
**File:** `docs/security-model-canon.md`
- Replaced auth model with ecosystem default + MoneyShyft ECO-3A exception.
- Added refusal semantics as a security boundary.
- Updated deployment/origin model to ban Crisis subdomain.

### CI Enforcement
**Files:**
- `_bmad-output/planning-artifacts/ci-guards.yml`
- `_bmad-output/planning-artifacts/ci-guards-baseline.yml`
- `.github/workflows/ecosystem-guards.yml`

Changes:
- ECO-4/ECO-5 references now canonical.
- Dedicated workflow added to enforce drift, CSP location, refusal semantics.
- Tenant registry detection softened to warning pending migration.

---

## 5. Implementation Handoff

**Scope Classification:** Moderate

**Handoff Recipients:**
- **Product Manager / Architect:** Own canon updates (done) and define ECO-3A migration plan.
- **Product Owner / Scrum Master:** Create Epic 0 and reorder backlog to block all epics until compliance tasks are completed.
- **Development Team:** Implement future compliance work (tenant registry integration, routing enforcement, auth migration plan, refusal semantics hardening).

**Success Criteria:**
- Canon documents aligned and approved.
- CI guard passes without waivers.
- Backlog execution gated by Epic 0 completion.
- ECO-3A auth migration plan documented with explicit deprecation conditions.

---

## 6. Approval

Approved by: Jeremiah  
Approval date: 2026-01-14

---

## 7. Next Actions

1. Create Epic 0 immediately.
2. Define ECO-3A migration plan with version boundary.
3. Align runtime routing and auth code to canon.
4. Defer tenant registry enforcement tightening until post-migration review.
