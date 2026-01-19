---
stepsCompleted: [1, 2, 3, 4]
inputDocuments: [
  "_bmad-output/planning-artifacts/prd.md",
  "_bmad-output/planning-artifacts/architecture.md",
  "_bmad-output/planning-artifacts/ux-design-specification.md"
]
workflowStatus: complete
validated: true
---

# moneyshyft - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for moneyshyft, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories.

## Global Canon (Non-Negotiable Foundations)

### Session Definition (Hard Canon)

**Definition:**
A session is a continuous foreground interaction period, ending after 30 minutes of inactivity or app close / backgrounding.

**Why this matters:**
"Session" is doing critical moral and technical work:
- Insight limits (one per session)
- Silence measurement
- Dismissal behavior
- Analytics interpretation

Without a numeric boundary, teams will invent their own definitions, normalize different meanings, and unintentionally re-trigger insights. This definition is not about correctness; it is about shared reality.

**Reference:** This definition must be used consistently across all epics and stories.

---

### Silence Philosophy (Explicit Ethos Lock)

**Canon:**
Silence is the default posture. Direction is a safety intervention, not a UX strategy.

**Why this matters:**
Without naming this explicitly, future teams will reinterpret:
- "break silence" → "nudge"
- "safety" → "engagement rescue"
- "help" → "optimization opportunity"

This sentence prevents silence from becoming a tactic. It anchors silence as ethical posture, not interaction style.

**Enforcement:** All stories must respect silence as the default. Any deviation requires explicit safety justification.

---

### Trust vs Engagement Arbitration (Confirmed Canon)

**Rule:**
In cases of conflict, trust metrics override engagement metrics by default unless an explicit exception is approved by the Product Lead.

**Why this matters:**
This is not about dashboards—it is about who gets to define success. Without this:
- Engagement becomes the silent default
- Trust metrics become "nice to have"
- Erosion happens invisibly

Naming an owner turns philosophy into governance.

**Enforcement:** All metric decisions must be evaluated against this rule. Product Lead approval required for any exception.

---

### Foundation Mode Success Definition (Critical Reframe)

**Canon:**
Foundation Mode is successful when a user gains clarity, regardless of continuation, return, or account creation. One-time use, early exit, or no return are valid success states.

**Why this matters:**
This is the most important Foundation clarification. Without it:
- Exits become failures
- Retention becomes proxy success
- UX pressure creeps in

This sentence explicitly rejects the SaaS growth reflex and preserves the core ethic: **clarity is the outcome, not behavior change.**

**Enforcement:** All Foundation Mode stories must align with this success definition. Retention metrics must not be used as primary success indicators.

---

### Foundation Non-Expectation Invariant (Global)

**Canon:**
Foundation Mode must never imply that improvement is expected, measurable, or required.

**Why this matters:**
This protects against:
- "you're doing better" language
- Implied trajectory
- Moral framing

Foundation is a mirror, not a ladder.

**Enforcement:** All Foundation Mode language, insights, and patterns must be observational only, never evaluative or prescriptive.

---

### Data-Triggered UI Gate (Anti-Optimization)

**Rule:**
Any UI triggered by data patterns requires a prior explicit user intent flag.

**Why this matters:**
This is the strongest defense against:
- "we noticed…"
- "based on your data…"
- "helpful suggestions"

It forces consent before inference.

**Enforcement:** No data-driven UI elements may appear without explicit user action (e.g., "View patterns", "Show insights", "Explore options").

---

### Builder Mode Warmth Constraint

**Canon:**
Builder Mode warmth is expressive, not motivational; it must never introduce urgency, reward framing, or evaluative tone.

**Why this matters:**
Builder can feel good—but must never feel:
- Gamified
- Success-oriented
- Competitive with self

This sentence prevents Builder from becoming a productivity app in disguise.

**Enforcement:** All Builder Mode stories must maintain expressive warmth without motivational pressure.

---

## Requirements Inventory

### Functional Requirements

FR-M1: Users in crisis can access Crisis Mode without creating an account
FR-M2: Users in crisis can answer the 72-hour question ("What happens in the next 72 hours if nothing changes?")
FR-M3: System can process crisis responses through a deterministic decision tree
FR-M4: System can categorize crisis type based on user response
FR-M5: Users can receive actionable next steps (resource links, pre-filled forms, scripts)
FR-M6: Users can access filtered resources based on crisis type and location
FR-S7: System can display resource trust scores (from ResourcesHyft integration)
FR-M8: Users can exit Crisis Mode at any time with explicit completion or assistance request options
FR-M9: Crisis Mode can be completed on devices with limited scripting support (progressive enhancement)
FR-M10: Crisis Mode can function with unreliable network connectivity (offline-capable)
FR-M11: Users can log transactions manually (description, amount, date)
FR-M12: Users can start using Foundation Mode without creating an account (anonymous mode)
FR-M13: System can offer account creation after user logs multiple transactions
FR-M14: Users can create an account to save progress across devices
FR-M15: System can reveal spending patterns immediately after minimal transaction logging (simple aggregates)
FR-S16: Users can focus on one spending category after logging sufficient transactions
FR-M17: System can show aggregated spending patterns after extended logging period ("Reality Mirror")
FR-S18: Users can define a small win during onboarding (optional)
FR-S19: System can check in on small win progress after extended use
FR-F20: Users can access weekly reflections (only if logging consistently)
FR-F21: System can detect advanced patterns after extended use (e.g., spending variations by day of week)
FR-M22: Users can export their transaction data (machine-readable format)
FR-M23: Users can delete all their data with reason capture (confirmation and feedback collection)
FR-M24: Users can import Foundation Mode data when entering Builder Mode
FR-M25: Users can set a single active goal (debt payoff, savings target, emergency fund)
FR-M26: Users can compare two scenarios for their goal (e.g., different payment strategies)
FR-M27: System can calculate basic forecasting for goal achievement timeline
FR-M28: Users can track progress toward their goal (progress indication)
FR-M29: Users can see how different actions affect goal timeline (scenario comparison)
FR-M30: Users can adjust their goal plan (extend timeline, increase payments, pause goal)
FR-M31: System can handle goal setbacks (user falls behind) with plan adjustment options
FR-M32: System can acknowledge goal achievements (early completion, milestone reached)
FR-F33: Users can add a second goal after achieving first goal (post-MVP)
FR-S34: Users can downgrade from Builder Mode to Foundation Mode (if they no longer need advanced features)
FR-M35: Organization admins can create organization accounts
FR-M36: Organization admins can assign licenses to clients via email invitation
FR-M37: Organization admins can view client list (name, email, mode, status, last active)
FR-M38: Organization admins can see client engagement metrics (activated/not activated, session frequency)
FR-M39: Organization admins can view aggregated, anonymized outcomes data (if clients opt-in)
FR-F40: Organization admins can generate automated engagement reports (PDF export)
FR-M41: Organization admins can view billing information (usage, payment method, invoices)
FR-S42: Organization admins can extend individual client licenses (duration options)
FR-S43: System can notify organization admins before licenses expire (with renewal decision support)
FR-M44: Organization admins can end sponsorship for individual clients (client enters transition period)
FR-M45: System can track license lifecycle states (org-sponsored → discounted → standard pricing)
FR-M46: Users can create accounts (email + password, minimal info required)
FR-M47: Users can log in to their accounts
FR-M48: Users can reset forgotten passwords
FR-M49: Users can switch between modes based on behavior triggers (not time-based)
FR-M50: Users can access their data from multiple devices (when logged in)
FR-M51: System can migrate anonymous data to account (when user creates account after anonymous use)
FR-M52: Users can delete their accounts (with data deletion and reason capture)
FR-M53: System can anonymize client data for organization admins (never show individual transactions, balances, goals)
FR-M54: Users can opt in to share aggregated outcomes data with their organization
FR-M55: System can enforce multi-tenant data isolation (row-level security)
FR-S56: System can log all data access events (who accessed what, when, why)
FR-S57: System can log all organization admin actions (license issuance, resource assignment, user management)
FR-M58: System can export user data in machine-readable format (data portability)
FR-M59: System can delete user data completely (not just soft-delete) for right to deletion compliance
FR-M60: System can encrypt data at rest and in transit
FR-M61: Organization admins can only see aggregated engagement data, never individual financial data
FR-M62: System can display resources filtered by crisis type and location
FR-S63: System can display resource trust scores (from ResourcesHyft integration)
FR-M64: System can show pre-filled forms and scripts for crisis actions
FR-M65: System can provide direct contact information for programs (phone numbers, addresses)
FR-M66: System can show application status checking guides (step-by-step instructions)
FR-M67: System can provide timeline clarifications (why timelines vary for different programs)
FR-M68: System can track active clients (engagement-based definition)
FR-M69: System can calculate billing based on active clients (base + overage pricing model)
FR-M70: System can handle license transitions (org-sponsored → discount period → standard pricing)
FR-M71: System can notify clients when license transitions occur (email notifications)
FR-M72: System can support fixed-term licenses (duration options) and indefinite licenses
FR-S73: System can handle license expiration and renewal workflows (automated)
FR-M74: Users can decline or defer mode progression offers without penalty, repeated prompts, or feature restriction
FR-S75: System can track mode progression intent (not just outcomes)
FR-M76: System can detect behavior-based triggers for Builder Mode (explicit feature request, consistent tracking, goal achievement, financial stability)
FR-M77: System can offer Builder Mode when user meets behavior criteria (not time-based)
FR-F78: System can track progression attempts (not just completions) for learning

**Total: 69 Functional Requirements** (58 MVP Must-Have, 8 MVP Should-Have, 3 Future)

### NonFunctional Requirements

NFR-P1: Crisis Mode pages should typically load within 2 seconds on low-bandwidth mobile connections (target: <1.8s, tolerance for 3G variability)
NFR-P2: Authenticated pages should typically become interactive within 4 seconds (target: <3.8s)
NFR-P3: Transaction logging should complete quickly enough to feel immediate (<500ms typical)
NFR-P4: Scenario calculations in Builder Mode should complete within 2 seconds
NFR-P5: Performance must be validated on real 3G connections and older devices (Android 8+, iOS 14+)
NFR-S1: All user data must be encrypted at rest
NFR-S2: All data in transit must use TLS 1.3 minimum
NFR-S3: Multi-tenant data isolation must be enforced at database level (row-level security)
NFR-S4: API layer must enforce permissions on every query (never trust client-side checks alone)
NFR-S5: Organization admins must only access aggregated, anonymized data (never individual financial data)
NFR-S6: System must support right to deletion (actually delete data, not soft-delete)
NFR-S7: System must support data portability (export all user data in machine-readable format)
NFR-A1: System must meet WCAG 2.1 Level AA standards
NFR-A2: All functionality must be accessible via keyboard (no mouse-only interactions)
NFR-A3: System must be compatible with screen readers (VoiceOver, NVDA, JAWS)
NFR-A4: Content must reflow at 400% zoom without horizontal scrolling
NFR-A5: Color contrast must meet 4.5:1 for normal text, 3:1 for large text
NFR-A6: Information must not be conveyed by color alone (use icons + color)
NFR-A7: Error messages must be clear and actionable (not technical or blaming)
NFR-PR1: Users must be able to opt in to share aggregated outcomes data (explicit consent)
NFR-PR2: System must support consent management (GDPR compliance if EU users)
NFR-PR3: System must support opt-out mechanisms (CCPA compliance if CA users)
NFR-PR4: Privacy policy must comply with GLBA requirements
NFR-GD1: Crisis Mode must work on devices with limited scripting support (progressive enhancement)
NFR-GD2: System must gracefully degrade for unsupported browsers (show simplified version, don't block access)
NFR-GD3: System must handle network failures gracefully (offline-capable where feasible)
NFR-GD4: System must handle API failures gracefully (ResourcesHyft failures don't break Crisis Mode)
NFR-MV1: All features must be fully functional on mobile devices (320px width minimum)
NFR-MV2: Touch targets must be minimum 44x44px
NFR-MV3: Navigation must be thumb-friendly on mobile (bottom navigation)

**Total Product Quality NFRs: 25 requirements (MVP Binding)**

### Additional Requirements

**From Architecture:**

- Root monorepo structure: Workspace monorepo with pnpm workspaces (hard requirement, not optional)
- Crisis Mode: Minimal 11ty setup (from scratch), custom data structure for nodes and resources
- Frontend SPA: create-vue starter (Vue 3 + Vite), TypeScript enabled, Router, Pinia, ESLint, Tailwind CSS
- Backend API: Manual scaffold with Express + TypeScript, Knex.js for migrations, Kysely for queries
- Shared package: TypeScript package for shared types, license state machine types, node/resource model types
- Database: PostgreSQL with row-level security (RLS) for multi-tenant isolation
- Authentication: Cookie-only JWT (HttpOnly, Secure, SameSite=Lax), CSRF protection via double-submit cookie pattern
- Crisis Mode deployment: Independent deployment, pre-rendered static HTML, no server-rendered, not SPA
- Progressive enhancement: HTML → CSS → JS → Advanced features, core functionality works without JavaScript
- Offline support: Crisis Mode cacheable for offline access (Service Worker), transaction logging persists locally (IndexedDB), offline data syncs when connection restored
- Browser support: Last 3-4 years (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+), Android 8+ and iOS 14+
- Horizontal scaling: Support horizontal scaling without architectural redesign (no single-server assumptions)
- Transaction-per-request pattern: All authenticated DB routes must use single database transaction per request
- SET LOCAL context variables: app.user_id and app.household_id for RLS enforcement

**From UX Design:**

- Responsive design: Mobile-first always, Crisis Mode single-column everywhere, Foundation Mode restrained expansion, Builder Mode multi-column on desktop (two-column max)
- Breakpoints: Tailwind defaults (0-767px mobile, 768-1023px tablet, 1024px+ desktop), 1280px+ wide desktop for Builder Mode only
- Accessibility: WCAG 2.1 Level AA mandatory baseline, selective Level AAA for safety-critical areas (Crisis Mode, errors, touch targets)
- Design system: Radix Vue (headless primitives) + Tailwind CSS + custom component library (@moneyshyft/ui)
- Visual foundation: Option A "Public Service Calm" for Crisis/Foundation modes, Option B "Human Utility" for Builder Mode
- Typography: Noto Sans for Crisis/Foundation, Krub for Builder Mode
- UX consistency patterns: Stillness After Action, No Judgment Feedback, Exit Always Available, User Controls Depth (global meta-patterns)
- Button hierarchy: One visually primary action max per screen, primary ≠ "recommended", exit always available
- Feedback patterns: Confirmation (not Success), Problem (not Error), Attention (not Warning), Information (not Info)
- Form patterns: Required fields must be justified, validation descriptive not evaluative, partial completion always valid
- User journey flows: 5 critical journeys documented (First-time Crisis, Crisis → Foundation, Foundation daily return, Builder planning, Cross-mode return)
- Component strategy: Priority-ordered custom components (MsModeSwitcher, MsResourceCard, MsTransactionEntryForm, MsInsightCard, etc.)

### FR Coverage Map

**Platform Enablement (Pre-Epic):**
- Infrastructure requirements from Architecture (starter template, monorepo setup)

**Epic 1: Crisis Intervention**
- FR-M1: Crisis Mode access without account → Epic 1
- FR-M2: Answer 72-hour question → Epic 1
- FR-M3: Process crisis responses through decision tree → Epic 1
- FR-M4: Categorize crisis type → Epic 1
- FR-M5: Receive actionable next steps → Epic 1
- FR-M6: Access filtered resources by type/location → Epic 1
- FR-M8: Exit Crisis Mode at any time → Epic 1
- FR-M9: Crisis Mode on limited scripting devices → Epic 1
- FR-M10: Crisis Mode offline-capable → Epic 1
- FR-M62: Display resources filtered by crisis type and location → Epic 1
- FR-M64: Show pre-filled forms and scripts → Epic 1
- FR-M65: Provide direct contact information → Epic 1
- FR-M66: Show application status checking guides → Epic 1
- FR-M67: Provide timeline clarifications → Epic 1
- FR-S7: Display resource trust scores → Epic 1
- FR-S63: Display resource trust scores (ResourcesHyft) → Epic 1

**Epic 2: User Authentication & Account Management**
- FR-M46: Create accounts (email + password) → Epic 2
- FR-M47: Log in to accounts → Epic 2
- FR-M48: Reset forgotten passwords → Epic 2
- FR-M50: Access data from multiple devices → Epic 2
- FR-M51: Migrate anonymous data to account → Epic 2
- FR-M52: Delete accounts with data deletion → Epic 2
- FR-M58: Export user data (machine-readable) → Epic 2
- FR-M59: Delete user data completely (not soft-delete) → Epic 2

**Epic 3: Financial Awareness (Foundation Mode)**
- FR-M11: Log transactions manually → Epic 3
- FR-M12: Start Foundation Mode without account (anonymous) → Epic 3
- FR-M13: Offer account creation after multiple transactions → Epic 3
- FR-M14: Create account to save progress → Epic 3
- FR-M15: Reveal spending patterns immediately → Epic 3
- FR-M17: Show aggregated spending patterns ("Reality Mirror") → Epic 3
- FR-M22: Export transaction data → Epic 3
- FR-M23: Delete all data with reason capture → Epic 3
- FR-S16: Focus on one spending category → Epic 3
- FR-S18: Define small win during onboarding → Epic 3
- FR-S19: Check in on small win progress → Epic 3

**Epic 4: Goal Achievement (Builder Mode)**
- FR-M24: Import Foundation Mode data → Epic 4
- FR-M25: Set single active goal → Epic 4
- FR-M26: Compare two scenarios for goal → Epic 4
- FR-M27: Calculate basic forecasting for goal timeline → Epic 4
- FR-M28: Track progress toward goal → Epic 4
- FR-M29: See how actions affect goal timeline → Epic 4
- FR-M30: Adjust goal plan → Epic 4
- FR-M31: Handle goal setbacks → Epic 4
- FR-M32: Acknowledge goal achievements → Epic 4
- FR-S34: Downgrade from Builder to Foundation Mode → Epic 4

**Epic 5: Organization Management**
- FR-M35: Organization admins create organization accounts → Epic 5
- FR-M36: Assign licenses to clients via email → Epic 5
- FR-M37: View client list → Epic 5
- FR-M38: See client engagement metrics → Epic 5
- FR-M39: View aggregated anonymized outcomes data (opt-in) → Epic 5
- FR-M41: View billing information → Epic 5
- FR-M44: End sponsorship for individual clients → Epic 5
- FR-S42: Extend individual client licenses → Epic 5
- FR-S43: Notify before licenses expire → Epic 5
- FR-F40: Generate automated engagement reports → Epic 5

**Epic 6: License & Billing Management**
- FR-M45: Track license lifecycle states → Epic 6
- FR-M68: Track active clients (engagement-based) → Epic 6
- FR-M69: Calculate billing based on active clients → Epic 6
- FR-M70: Handle license transitions → Epic 6
- FR-M71: Notify clients when license transitions occur → Epic 6
- FR-M72: Support fixed-term and indefinite licenses → Epic 6
- FR-S73: Handle license expiration and renewal workflows → Epic 6

**Epic 7: Mode Progression & Safe Return**
- FR-M49: Switch between modes based on behavior triggers → Epic 7
- FR-M74: Decline/defer mode progression without penalty → Epic 7
- FR-M76: Detect behavior-based triggers for Builder Mode → Epic 7
- FR-M77: Offer Builder Mode when user meets behavior criteria → Epic 7
- FR-S75: Track mode progression intent → Epic 7
- FR-F78: Track progression attempts for learning → Epic 7

**Epic 8: Data Privacy & Security (System Constraint — Cross-Cutting, Gating)

### Gating Rule (System Constraint — Binding)

Epic 8 is a **gating, cross-cutting system constraint**, not a sequential epic.

**Rules:**
- Any story that creates or modifies a persisted data model **MUST** implement Row-Level Security (RLS) policies at creation time.
- Any story that exposes organization-admin views **MUST** enforce anonymization and aggregation at the database layer before UI implementation.
- Any story that exposes outcomes data **MUST** verify explicit opt-in state before data access.

Failure to meet these rules **blocks completion** of the dependent story.
**
- FR-M53: Anonymize client data for organization admins → Epic 8
- FR-M54: Opt in to share aggregated outcomes data → Epic 8
- FR-M55: Enforce multi-tenant data isolation (RLS) → Epic 8
- FR-M60: Encrypt data at rest and in transit → Epic 8
- FR-M61: Organization admins only see aggregated engagement data → Epic 8
- FR-S56: Log all data access events → Epic 8
- FR-S57: Log all organization admin actions → Epic 8

## Epic List

### Platform Enablement (Pre-Epic)

**Purpose:** Foundation and infrastructure setup to enable all user-value epics. This is a delivery convenience, not a user-value epic. Treated as a pre-epic enabling milestone.

**User Outcome:** System is ready for development and deployment (technical foundation, not user-facing value)

**Implementation Scope:**
- Root monorepo initialization (pnpm workspaces - hard requirement)
- Crisis Mode static site build (11ty minimal setup)
- Frontend SPA setup (Vue 3 + Vite with create-vue starter)
- Backend API setup (Express + TypeScript, manual scaffold)
- Shared types package (TypeScript package for cross-app type safety)
- Database schema foundation (PostgreSQL with RLS structure)
- Root-level tooling (TypeScript config, ESLint, Prettier, scripts)

**FRs covered:** Infrastructure requirements from Architecture (starter template approach)

**Implementation Notes:**
- This enables all other epics but must deliver working builds
- First story: Initialize monorepo with all three applications
- All apps must build, run dev servers, and share types successfully
- This is NOT evaluated as a user-value epic in prioritization discussions

---

### Epic 1: Crisis Intervention (Standalone)

**User Outcome:** Users in crisis can get immediate help without barriers, extraction, or account requirements

**User Value Delivered:**
- Immediate relief without extraction
- Access to actionable resources without signup
- Offline-capable support when network is unreliable
- Progressive enhancement for devices with limited scripting

**FRs covered:** FR-M1, FR-M2, FR-M3, FR-M4, FR-M5, FR-M6, FR-M8, FR-M9, FR-M10, FR-M62, FR-M64, FR-M65, FR-M66, FR-M67, FR-S7, FR-S63

**Implementation Notes:**
- Standalone epic with no dependencies on other user-value epics
- Must work without authentication, cookies, or API dependencies
- Pre-rendered static HTML (11ty), deployable independently
- Core functionality works without JavaScript (progressive enhancement)
- Service Worker for offline caching (optional enhancement)
- Anonymous analytics only (session-scoped, no persistent identifiers)

**Trust Measurement (Epic 8 Subset):**
- Minimal instrumentation ships alongside this epic: "Observation without intervention"
- Track: completion without escalation, exit context, action origin
- This enables trust measurement before Foundation Mode launches
- No user-facing instrumentation, no prompts, no intervention

---

### Epic 2: User Authentication & Account Management

**User Outcome:** Users can create accounts, log in, and manage their data across devices with full control and reversibility

**User Value Delivered:**
- Cross-device data persistence
- Secure account access
- Data portability (export)
- Account deletion with complete data removal
- Anonymous-to-authenticated data migration

**FRs covered:** FR-M46, FR-M47, FR-M48, FR-M50, FR-M51, FR-M52, FR-M58, FR-M59

**Implementation Notes:**
- Cookie-only JWT authentication (HttpOnly, Secure, SameSite=Lax)
- CSRF protection via double-submit cookie pattern
- Password reset flow
- Data export in machine-readable format
- Complete data deletion (not soft-delete) for right to deletion compliance

**Dependency Note:**
- Anonymous-to-auth migration assumes Foundation data schemas are finalized
- Clear rules about what migrates (Foundation transactions) vs. what doesn't (Crisis data unless explicitly claimed)
- Migration logic must be stable before Foundation Mode anonymous usage begins

---

### Epic 3: Financial Awareness (Foundation Mode)

**User Outcome:** Users can track spending and see patterns without judgment, shame, or pressure

**User Value Delivered:**
- Awareness without judgment
- Transaction logging (anonymous or authenticated)
- Immediate pattern revelation after minimal logging
- Aggregated spending patterns ("Reality Mirror")
- Foundation Mode as a valid end state (not probationary)

**FRs covered:** FR-M11, FR-M12, FR-M13, FR-M14, FR-M15, FR-M17, FR-M22, FR-M23, FR-S16, FR-S18, FR-S19

**Implementation Notes:**
- Can work anonymously (local storage), enhanced with authentication
- Account creation offer after multiple transactions (non-coercive)
- Pattern insights: collapsed by default, one per session, observational not prescriptive
- Category focus (optional, should-have)
- Small win tracking (optional, should-have)
- Data export and deletion with reason capture

**Trust Measurement:**
- Return after absence without penalty (measured but not user-facing)
- No guilt language, no recap pressure, no punishment for inconsistency
- Silence respected as valid state

---

### Epic 4: Goal Achievement (Builder Mode)

**User Outcome:** Users can set goals, compare scenarios, and track progress without commitment pressure or optimization framing

**User Value Delivered:**
- Planning without commitment
- Exploration, not optimization
- Agency over accuracy
- Scenario comparison without "best option" labeling
- Goal adjustment and setback handling without shame

**FRs covered:** FR-M24, FR-M25, FR-M26, FR-M27, FR-M28, FR-M29, FR-M30, FR-M31, FR-M32, FR-S34

**Implementation Notes:**
- Requires Foundation Mode data (imports transaction history)
- Single active goal (MVP), multiple goals deferred to post-MVP
- Scenario comparison: equal visual weight, no sorting by performance
- Forecasting calculations: descriptive, not prescriptive
- Mode downgrade option (should-have)
- All changes reversible, no locked states

---

### Epic 5: Organization Management

**User Outcome:** Organizations can sponsor clients and track engagement without accessing individual financial data

**User Value Delivered:**
- Sponsorship without surveillance
- Client engagement visibility (aggregated only)
- License assignment and management
- Billing transparency

**FRs covered:** FR-M35, FR-M36, FR-M37, FR-M38, FR-M39, FR-M41, FR-M44, FR-S42, FR-S43, FR-F40

**Implementation Notes:**
- Organization account creation
- License assignment via email invitation
- Client list: name, email, mode, status, last active (no financial data)
- Engagement metrics: activated/not activated, session frequency
- Aggregated outcomes data (opt-in only, never individual transactions/balances/goals)
- Billing information viewing
- License extension (should-have)
- End sponsorship (client enters transition period)

---

### Epic 6: License & Billing Management

**User Outcome:** System manages license lifecycle and billing automatically, supporting stable transitions without revoking access

**User Value Delivered:**
- License transitions are explicit and non-revoking
- Billing based on active clients (engagement-based, not time-based)
- Fixed-term and indefinite license support
- Graceful transitions (org-sponsored → discount → standard)

**FRs covered:** FR-M45, FR-M68, FR-M69, FR-M70, FR-M71, FR-M72, FR-S73

**Implementation Notes:**
- License lifecycle state machine (org-sponsored → discounted → standard pricing)
- Active client tracking (engagement-based definition)
- Billing calculation (base + overage pricing model)
- Client notifications on license transitions (email)
- Automated renewal workflows (should-have)
- Once issued, licenses cannot be revoked (trust-building requirement)

---

### Epic 7: Mode Progression & Safe Return

**User Outcome:** Users can switch modes naturally, leave and return without penalty, and resume without shame, loss, or pressure

**User Value Delivered:**
- Safe return after absence without penalty
- No guilt on return, no recap pressure, no punishment for inconsistency
- Mode switching based on behavior triggers (not time-based)
- Decline/defer mode progression without penalty
- Silence respected as valid state

**FRs covered:** FR-M49, FR-M74, FR-M76, FR-M77, FR-S75, FR-F78

**Implementation Notes:**
- Mode switching logic (behavior-based triggers, not time-based)
- Builder Mode readiness detection (explicit feature request, consistent tracking, goal achievement, financial stability)
- Mode progression offers (non-coercive, dismissible, no repeated prompts)
- Progression intent tracking (should-have, MVP-light, non-blocking)
- Progression attempt tracking (future, feature-flagged)

**Trust Measurement:**
- Return after absence: 14, 30, 60-day return windows
- No time-referential guilt ("You haven't logged in X days")
- No backlog framing ("Here's what you missed")
- Return to last stable user-authored state
- One primary action, silence by default

**Instrumentation Scope:**
- MVP-light instrumentation: observation without intervention
- Mode transition attempts vs. completions
- Return after absence signals
- Defer detailed analytics to post-MVP (feature-flagged)

---

### Epic 8: Data Privacy & Security (System Constraint — Cross-Cutting, Gating)

**User Outcome:** User data is protected, isolated, and compliant across all modes and features

**User Value Delivered:**
- Safety, reversibility, and dignity
- Multi-tenant data isolation
- Data anonymization for organization admins
- Opt-in outcomes sharing
- Encryption and compliance

**FRs covered:** FR-M53, FR-M54, FR-M55, FR-M60, FR-M61, FR-S56, FR-S57

**Implementation Notes:**
- **This epic is implemented incrementally alongside Epics 1-7; not sequenced at the end**
- Multi-tenant data isolation: PostgreSQL row-level security (RLS) from day one
- Transaction-per-request pattern: SET LOCAL context variables (app.user_id, app.household_id)
- Data anonymization: Organization admins never see individual transactions, balances, or goals
- Opt-in outcomes sharing: Explicit consent required
- Encryption at rest and in transit (TLS 1.3 minimum)
- Audit logging (should-have): Data access events, organization admin actions

**Cross-Cutting Implementation:**
- RLS policies implemented with each data model (Epic 2, 3, 4, 5)
- Encryption configured at infrastructure level (Pre-Epic)
- Privacy controls built into each feature (not retrofitted)

---

## Platform Enablement (Pre-Epic): Stories

### Story 0.0: Commit Agent/Tooling Scaffolding (Tracked Fully)

As a developer,
I want the agent/tooling scaffolding tracked in git (including planning outputs),
So that a fresh clone contains everything needed for the AI-assisted workflow without “untracked churn.”

**Acceptance Criteria:**

**Given** a clean clone
**When** I run the agent tooling commands we expect to use
**Then** the required directories and configs exist and the commands can run (even if they generate additional output later)
**And** git diff contains only tooling directories and repo-level configs that support them
**And** a reviewer can see a single commit that is “tooling only.”

**Scope (include):**
- `_bmad/`, `_bmad-output/`, `.claude/`, `.codex/`, `docs/`, `.cursor/rules/`, `.github/agents/`

**Explicit non-scope (enforced):**
- No changes to `frontend/**` source, API source, or runtime logic
- No dependency changes beyond what’s required for tooling to run (prefer none)
- No user-local auth/session artifacts or secrets (never commit):
  - `.codex/auth.json`, `.codex/history.jsonl`, `.codex/sessions/`
  - `.claude/settings.local.json`

**Guardrails:**
- Track `_bmad-output/` fully, but enforce staging discipline and avoid drive-by regeneration.

---

### Story 0.1: Initialize Monorepo Structure

As a developer,
I want a pnpm workspace monorepo with apps/ and packages/ structure,
So that all applications and shared code are organized in a single repository with proper dependency management.

**Acceptance Criteria:**

**Given** a fresh repository
**When** I initialize the monorepo structure
**Then** the repository has:
- Root `package.json` with workspace configuration
- `pnpm-workspace.yaml` file defining workspace packages
- `apps/` directory for applications (crisis, app, api)
- `packages/` directory for shared packages (shared)
- Root-level scripts placeholder (`dev`, `build`, `test`, `lint`)
**And** pnpm recognizes the workspace structure (`pnpm -r list` works)

**Technical Notes:**
- pnpm workspaces is a hard requirement (not optional)
- Structure: `/apps/crisis`, `/apps/app`, `/apps/api`, `/packages/shared`
- Root scripts will be implemented in Story 0.6 (CI)

---

### Story 0.2: Configure Tooling Baseline

As a developer,
I want shared TypeScript, ESLint, and Prettier configuration at the root,
So that all apps and packages follow consistent code quality standards.

**Acceptance Criteria:**

**Given** the monorepo structure exists (Story 0.1)
**When** I configure tooling
**Then** the root has:
- `tsconfig.json` with base TypeScript configuration
- `eslint.config.js` (or `.eslintrc`) with shared rules
- `.prettierrc` (or `prettier.config.js`) with formatting rules
- `.prettierignore` file
**And** all apps can extend the root configs
**And** running `pnpm -r exec eslint --version` works from root
**And** running `pnpm -r exec prettier --version` works from root

**Technical Notes:**
- TypeScript strict mode enabled
- ESLint rules appropriate for TypeScript + Vue + Node
- Prettier configured for consistent formatting
- Configs are extensible (apps can override if needed)

---

### Story 0.3: Create Shared Types Package

As a developer,
I want a shared TypeScript package for types and constants,
So that all apps can import shared types without duplication.

**Acceptance Criteria:**

**Given** the monorepo structure exists (Story 0.1)
**When** I create the shared types package
**Then** `packages/shared/` has:
- `package.json` with proper name (`@moneyshyft/shared` or similar)
- `tsconfig.json` that extends root config
- `src/` directory with placeholder exports
- Basic type exports (e.g., `export type User = { id: string }`)
**And** the package can be imported from other apps: `import { User } from '@moneyshyft/shared'`
**And** TypeScript compilation succeeds when importing from shared package

**Technical Notes:**
- Package will contain license state machine types, user models, node/resource model types
- Types will be added incrementally as needed by user-facing stories
- This establishes the contract early for API and frontend

---

### Story 0.4: Set Up Backend API Skeleton

As a developer,
I want a basic Express + TypeScript API server with health endpoint,
So that other work has a target API to integrate with.

**Acceptance Criteria:**

**Given** the monorepo structure exists (Story 0.1)
**When** I set up the backend API skeleton
**Then** `apps/api/` has:
- Express server with TypeScript
- Basic structure: `src/app.ts`, `src/server.ts`
- Health endpoint: `GET /health` returns `{ status: 'ok' }`
- Dev server runs: `pnpm -C apps/api dev` starts server
- Server listens on configurable port (default 3000)
**And** the health endpoint is accessible: `curl http://localhost:3000/health` returns 200
**And** TypeScript compilation succeeds with strict mode

**Technical Notes:**
- Manual scaffold (not using a generator)
- Express + TypeScript + ts-node-dev for dev server
- Structure: `src/app.ts` (app setup), `src/server.ts` (server entry)
- Routes, services, middleware, validators directories will be added in user-facing stories
- This establishes the API contract early

---

### Story 0.5: Set Up Database Connectivity + Migration Harness

As a developer,
I want PostgreSQL connectivity and migration infrastructure,
So that database migrations can be run and the connection is verified.

**Acceptance Criteria:**

**Given** the backend API skeleton exists (Story 0.4)
**When** I set up database connectivity
**Then** `apps/api/` has:
- Knex.js configuration (`knexfile.ts`)
- Connection config via environment variables
- One noop/placeholder migration (`001_placeholder.ts`) that proves the pipeline
- Migration runner works: `pnpm -C apps/api migrate:latest` runs successfully
**And** PostgreSQL connection is verified (connection test succeeds)
**And** the placeholder migration creates no tables (proves pipeline without premature schema)

**Technical Notes:**
- **Knex.js for migrations** (locked in - not Kysely for migrations)
- **Kysely for queries** (locked in - will be added in user-facing stories)
- Docker Compose for local PostgreSQL (Story 0.5b or included here)
- Connection via env: `DATABASE_URL` or `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- No domain tables yet - those will be created in user-facing stories when needed
- Migration structure: `src/migrations/` with numeric prefixes

**Docker Setup:**
- Local development: Docker Compose for PostgreSQL
- Production: Docker for PostgreSQL, but NOT nginx (nginx is host-managed in production)

---

### Story 0.6: Set Up Baseline CI / Quality Gate

As a developer,
I want CI that enforces code quality and workspace boundaries,
So that the repository stays runnable and dependencies are properly managed.

**Acceptance Criteria:**

**Given** all previous stories are complete
**When** I set up CI
**Then** GitHub Actions (or chosen CI) runs:
- Install dependencies: `pnpm install`
- Typecheck: `pnpm -r exec tsc --noEmit`
- Lint: `pnpm -r exec eslint .`
- Build: `pnpm -r exec npm run build` (for apps that have build scripts)
- Test: `pnpm -r exec npm test` (if test scripts exist)
**And** CI enforces workspace dependency boundaries (no deep imports across workspace boundaries)
**And** CI caches pnpm store (nice-to-have for performance)
**And** CI runs on pull requests and main branch

**Technical Notes:**
- This is the difference between "it runs on my machine" and "the platform is actually enabled"
- Enforce boundaries: apps cannot import from other apps directly (only through shared packages)
- CI should fail if any step fails
- Cache pnpm store to speed up CI runs

---

### Story 0.6a: Migrate to apps/* Layout (Compatibility Stage)

As a developer,
I want the repo to standardize on the `apps/app` and `apps/api` layout while keeping legacy paths working temporarily,
So that we align with the monorepo architecture without breaking development or production during the transition.

**Acceptance Criteria:**

**Given** the repo currently runs from `frontend/` (Vue SPA) and `src/` (Express API)
**When** I introduce the `apps/*` structure and migrate code
**Then** the primary build/run entrypoints are under:
- `apps/app` (replacing `frontend/`)
- `apps/api` (replacing `src/`)
**And** legacy paths remain working during the transition:
- `frontend/` continues to run (by delegating to `apps/app` or otherwise kept in sync)
- `src/` continues to run (by delegating to `apps/api` or otherwise kept in sync)
**And** production deployment is updated to use the new paths (nginx, compose, Dockerfiles, build outputs)
**And** workspace boundaries are enforced so apps do not import from each other directly (shared code only via `packages/shared`)

**Technical Notes:**
- This is a structural refactor only; no product behavior changes.
- Prefer a “compatibility wrapper” approach for `frontend/` and `src/` during this stage (thin wrappers, redirects, or delegated scripts) so existing workflows keep working until cleanup.
- Update documentation to reflect the new primary paths and the temporary compatibility layer.

---

### Story 0.6b: Remove Legacy frontend/src Paths (Cleanup Stage)

As a developer,
I want to remove the legacy `frontend/` and `src/` roots after the apps migration is stable,
So that there is one authoritative repo layout and CI/deploy tooling is simplified.

**Acceptance Criteria:**

**Given** Story 0.6a has shipped and development + production run from `apps/app` and `apps/api`
**When** I remove the legacy paths
**Then**:
- `frontend/` is removed (or reduced to docs-only if needed) and no longer referenced by scripts/docs/deploy
- `src/` is removed (or reduced to docs-only if needed) and no longer referenced by scripts/docs/deploy
- CI only targets `apps/app` and `apps/api` (and shared packages)
- All docs and scripts use the new paths consistently

**Technical Notes:**
- Treat this as cleanup: delete wrappers, remove old scripts, update any remaining references.

---

### Story 0.7: Set Up Frontend SPA Skeleton

As a developer,
I want a Vue 3 + Vite frontend application,
So that the authenticated SPA can be developed.

**Acceptance Criteria:**

**Given** the monorepo structure exists (Story 0.1)
**When** I set up the frontend SPA skeleton
**Then** `apps/app/` has:
- Vue 3 application (via `create-vue` starter)
- TypeScript enabled
- Vue Router configured
- Pinia configured
- Tailwind CSS configured
- ESLint configured (extends root config)
- Dev server runs: `pnpm -C apps/app dev` starts Vite dev server
- Build works: `pnpm -C apps/app build` produces production bundle
**And** the app renders a basic page at `http://localhost:5173`
**And** TypeScript compilation succeeds with strict mode

**Technical Notes:**
- Use `create-vue` official starter
- Add: Router, Pinia, ESLint, TypeScript, Tailwind CSS during setup
- Structure will be expanded in user-facing stories
- This establishes the frontend contract early

---

### Story 0.8: Set Up Crisis Mode 11ty Skeleton (Local Build)

As a developer,
I want Crisis Mode to build as static HTML locally,
So that I can develop and test the static site before deployment.

**Acceptance Criteria:**

**Given** the monorepo structure exists (Story 0.1)
**When** I set up Crisis Mode 11ty skeleton
**Then** `apps/crisis/` has:
- 11ty configuration (`.eleventy.js` or `eleventy.config.js`)
- Basic directory structure (`_includes/`, `nodes/`, `resources/`)
- At least one basic route/page
- One "resource card" template exists (even with placeholder content)
- Build works: `pnpm -C apps/crisis build` outputs static HTML to `dist/`
- Dev server runs: `pnpm -C apps/crisis dev` runs and renders
**And** the built HTML is valid and viewable in a browser
**And** TypeScript types from shared package can be imported (via JSDoc `@type` annotations)

**Technical Notes:**
- Minimal 11ty setup (from scratch, not using a template)
- Custom data structure for nodes and resources (will be expanded in Epic 1)
- JSDoc pattern: All 11ty data files use JSDoc `@type` annotations referencing types from `/packages/shared`
- This keeps Story 0.8 "single dev session" sized
- Content and full decision tree will be added in Epic 1 stories

---

### Story 0.9: Deploy Crisis Mode Independently

As a developer,
I want Crisis Mode deployed as static HTML to a CDN,
So that it can be validated on real devices with proper performance and accessibility.

**Acceptance Criteria:**

**Given** Crisis Mode builds locally (Story 0.8)
**When** I set up Crisis Mode deployment
**Then** CI builds 11ty output using Node/pnpm (or build container)
**And** the static artifact is published to static hosting (GitHub Pages, Netlify, Vercel, or similar)
**And** the deployed site is accessible via HTTPS
**And** PR previews are automatically generated (shareable URLs for UX iteration)
**And** the deployment is independent of other apps (can deploy Crisis without deploying API/SPA)

**Technical Notes:**
- Build 11ty inside CI using Node/pnpm (or a build container)
- Treat static hosting as "CDN preview hosting," not as your "platform"
- This enables "it works on real devices" validation early
- Instant HTTPS + caching + global CDN + compression without building that infrastructure
- Shareable PR previews are the killer feature for UX iteration
- Crisis has highest need for real device validation (performance, readability, navigation, offline-ish behavior)

**Why This Is Best Practice for Crisis:**
- Crisis has the highest need for "it works on real devices" validation
- Static hosting platforms give instant HTTPS + caching + global CDN + compression
- You get shareable PR previews (killer feature for UX iteration)
- Keeps Crisis deployment independent from authenticated services

---

## Epic 1: Crisis Intervention - Stories

### Story 1.1: Create Decision Tree Node Structure

As a user in crisis,
I want to navigate through a decision tree to find relevant resources,
So that I can get help without being overwhelmed by all options at once.

**Acceptance Criteria:**

**Given** Crisis Mode is built (Story 0.8)
**When** I create the decision tree node structure
**Then** `apps/crisis/` has:
- `nodes/` directory with node data files (Markdown with front matter)
- Node data structure: `id`, `title`, `question`, `options[]`, `nextNodeIds[]`
- At least one example node file demonstrating the structure
- 11ty data file that loads all nodes
- Template that renders a node page with question and options
- Static link navigation: each option links to next node via `<a href="/nodes/{nextNodeId}">`
**And** navigating to `/nodes/{nodeId}` renders the node page
**And** clicking an option link navigates to the next node (no JavaScript required)
**And** the decision tree is navigable entirely via static HTML links

**Technical Notes:**
- Nodes stored as Markdown files with YAML front matter
- Each node has: `id` (canonical, stable), `title`, `question` (text), `options[]` (array of option objects)
- Each option has: `text`, `action`, `nextNodeId` (or `resourceId` for terminal nodes)
- Static link-based navigation (no JS routing required)
- JSDoc `@type` annotations reference types from `@moneyshyft/shared`

**Canonical IDs & Versioning Contract:**
- Node IDs are canonical and stable (e.g., "node-72hour-intake", "node-housing-resources")
- Node IDs are used for: analytics tracking, offline cache invalidation, deep links
- Versioning approach: Node data files are versioned in git, IDs never change (deprecation instead of deletion)
- Content governance: Nodes/resources edited as Markdown files in repo, deployed via static build

**FRs covered:** FR-M3 (decision tree processing)

---

### Story 1.2: Implement 72-Hour Question Intake
Implementation Clarification:
Crisis type extraction MUST use deterministic keyword matching against a curated, versioned keyword map.
No NLP, ML, or probabilistic inference is permitted in MVP.
If no keywords match, crisis type defaults to "general" and no filtering is applied.


As a user in crisis,
I want to answer the 72-hour question to help the system understand my situation,
So that I can receive relevant resources without being forced to categorize myself.

**Acceptance Criteria:**

**Given** the decision tree structure exists (Story 1.1)
**When** I implement the 72-hour question intake
**Then** there is an intake page at `/intake` (or `/in/{region}/intake` if region selected) with:
- Clear question: "What happens in the next 72 hours if nothing changes?"
- Free-text input field (textarea)
- Reassurance text: "This might feel uncomfortable. That's okay."
- Optional skip link: "Skip to resources"
- Continue button/link that proceeds to categorization
**And** the form works without JavaScript (HTML form submission)
**And** if JavaScript is available, raw text is stored in localStorage (optional enhancement, off by default)
**And** if JavaScript is available, user can opt-in to "Save this note on this device" (explicit affordance)
**And** without JavaScript, raw text is ephemeral and user proceeds via form submission
**And** the intake page does not require account creation or personal information
**And** raw 72-hour text is never exposed in URLs (privacy requirement)

**State Persistence Contract:**
- Raw 72-hour text: Local-only (localStorage if JS available, optional, off by default)
- Raw text never appears in URL (privacy requirement)
- Form submission processes text client-side to extract crisis type, then navigates to filtered resources page

**Technical Notes:**
- Free-text intake is for user reflection and categorization input
- Progressive enhancement: JS stores raw text in localStorage for user's own reference (optional)
- Form processes text client-side to extract crisis type, then navigates to path-based resource route
- No server-side processing required (static site)

**FRs covered:** FR-M2 (72-hour question), FR-M9 (limited scripting support)

---

### Story 1.3: Implement Crisis Type Categorization
Implementation Clarification:
Categorization MUST rely exclusively on the keyword map defined in Story 1.2.
Manual overrides or adaptive logic are explicitly out of scope.


As a user in crisis,
I want the system to understand my crisis type based on my response,
So that I receive relevant resources without having to explicitly categorize myself.

**Acceptance Criteria:**

**Given** the 72-hour question intake exists (Story 1.2)
**When** I implement crisis type categorization
**Then** the system can:
- Process free-text responses to identify crisis types (deterministic keyword matching)
- Categorize into crisis types: housing, utilities, food, transportation, medical, other
- Identify a single primary crisis type (most likely match from keyword analysis)
- Navigate to path-based filtered resources route: `/in/{region}/resources/{primaryType}/`
**And** categorization happens client-side (simple JavaScript pattern matching, no server required)
**And** if no clear category is detected, user proceeds to general resources: `/in/{region}/resources/`
**And** categorization is non-blocking (user can always proceed even if categorization fails)
**And** the derived crisis type (not raw text) is encoded in the URL path

**State Persistence Contract:**
- Crisis type: Encoded in URL path segments (canonical routes)
- Pattern: `/in/{region}/resources/{crisisType}/` (e.g., `/in/region-5/resources/housing/`)
- Single primary type by default (strategy to control combinatorics)
- Multi-type support: User can add secondary types via editable chips on resources page (Story 1.6)
- Raw 72-hour text: Never in URL, local-only if JS available

**Technical Notes:**
- Deterministic keyword matching (not ML/NLP for MVP)
- Simple pattern matching: "rent", "eviction", "housing" → housing crisis
- Client-side processing: Form submission processes text, extracts primary type, navigates to filtered route
- 11ty generates static pages for each region + crisis type combination at build time
- Fallback to general resources (`/in/{region}/resources/`) if categorization unclear

**FRs covered:** FR-M4 (categorize crisis type)

---

### Story 1.4: Implement Region Selection

As a user in crisis,
I want to select my region to see location-specific resources,
So that I receive relevant local help options.

**Acceptance Criteria:**

**Given** crisis type categorization exists (Story 1.3)
**When** I implement region selection
**Then** there is a region selector at Crisis Mode entry:
- Region selector uses URL prefix pattern: `/in/{regionId}/...` for no-JS compatibility
- User can select region from a list (state/region options)
- Selected region persists in URL path for all subsequent pages
- Region schema contract: Region IDs are canonical and stable, region list is versioned
**And** region selection works without JavaScript (URL-based routing)
**And** if JavaScript is available, region can be stored in cookie/localStorage for persistence across sessions (enhancement)
**And** region selector is optional (user can proceed without selecting, defaults to "All regions" or general resources)
**And** all Crisis Mode pages respect region in path: `/in/{region}/nodes/{nodeId}`, `/in/{region}/resources/{type}/`, etc.

**State Persistence Contract:**
- Region: Path segments (`/in/{regionId}/`)
- Region persists across all Crisis Mode pages via URL path
- Region is required dimension for resource filtering (will be used in Story 1.5)
- Region selection is non-blocking (user can proceed without selecting)

**Technical Notes:**
- URL prefix pattern: `/in/{regionId}/nodes/{nodeId}`, `/in/{regionId}/resources/{type}/` for no-JS compatibility
- 11ty generates region-specific pages at build time (data cascade: base + region overlays)
- JS enhancement: cookie/localStorage for region persistence across sessions (optional)
- Region selection is non-blocking (user can always proceed)
- Region schema: Canonical IDs (e.g., "region-5" for Indiana), stable, versioned list

**FRs covered:** FR-M6 (location-based filtering)

---

### Story 1.5: Create Resource Data Structure and Path-Based Filtered Routes

As a user in crisis,
I want to see resources filtered by my crisis type and location,
So that I only see relevant options without being overwhelmed.

**Acceptance Criteria:**

**Given** crisis type categorization exists (Story 1.3) and region selection exists (Story 1.4)
**When** I create the resource data structure and filtering
**Then** `apps/crisis/` has:
- `resources/` directory with resource data files (Markdown with front matter)
- Resource data structure: `id`, `title`, `description`, `crisisTypes[]`, `regions[]`, `contactInfo`, `actions[]`
- Resource schema contract: All fields defined, IDs are canonical and stable, versioning approach documented
- 11ty generates path-based filtered resource pages at build time
**And** 11ty generates static pages for:
- `/in/{region}/resources/` (all resources for region)
- `/in/{region}/resources/{crisisType}/` (filtered by single primary type)
- At least one example resource file for each crisis type
**And** filtering works at build time (11ty data processing, no JS required)
**And** resources are filtered by both region (from path) and crisis type (from path)
**And** region is a first-class filter dimension (included in schema and filtering logic from the start)

**State Persistence Contract:**
- Region: Path segments (`/in/{region}/`)
- Crisis type: Path segments (`/resources/{crisisType}/`)
- Canonical URL pattern: `/in/{region}/resources/{crisisType}/`
- Multi-type support: User-editable chips on resources page allow adding secondary types (links to combined pages)
- Single primary type by default (controls combinatorics: one page per type per region, not all combinations)

**Technical Notes:**
- Resources stored as Markdown files with YAML front matter
- Each resource has: `id` (canonical, stable), `title`, `description`, `crisisTypes[]` (array), `regions[]` (array), `contactInfo{}`, `actions[]`
- 11ty data cascade: Base resources + region overlays + type filtering at build time
- Filtering is build-time (11ty generates pre-filtered static pages)
- Region filtering uses URL prefix pattern: `/in/region-5/...` for no-JS compatibility
- Crisis type filtering uses path segments: `/resources/housing/` for no-JS compatibility
- Multi-type combinations: Generate only singles and common pairs (not all 2^n combinations)

**FRs covered:** FR-M6 (filtered resources by type/location), FR-M62 (display filtered resources)

---

### Story 1.6: Implement Resource Display with Actions and Type Selection

As a user in crisis,
I want to see actionable resources with clear next steps,
So that I can take immediate action without confusion.

**Acceptance Criteria:**

**Given** resource data structure and filtered routes exist (Story 1.5)
**When** I implement resource display
**Then** resource pages at `/in/{region}/resources/{crisisType}/` display:
- Resource title and description
- Direct contact information (phone numbers, addresses) - FR-M65
- Pre-filled forms or scripts (if applicable) - FR-M64
- Application status checking guides (step-by-step instructions) - FR-M66
- Timeline clarifications (why timelines vary) - FR-M67
- One clear primary action per resource (Call, Apply, Download, Learn More)
- Non-judgmental, user-editable type chips: "Showing: {primaryType}" (editable)
- Optional "Add another type" link that navigates to combined type pages (e.g., `/in/{region}/resources/housing+utilities/`)
**And** each resource card has a "Done for now" exit option (always visible, non-punitive)
**And** resource cards follow UX consistency patterns (no judgment language, observational tone)
**And** resources are displayed in a scannable list format
**And** clicking a resource action does not require JavaScript (static links or forms)
**And** type selection chips are non-judgmental ("Showing: Housing" not "Recommended: Housing")
**And** if user adds secondary types, system navigates to combined type page (pre-built static page)

**State Persistence Contract:**
- Primary crisis type: In URL path (`/resources/{crisisType}/`)
- Secondary types: User adds via chips, navigates to combined pages (`/resources/housing+utilities/`)
- Combined type pages: Pre-built for common pairs, fallback to "All resources" for rare combinations
- Type chips are editable: User can change primary type, which navigates to new filtered page

**Technical Notes:**
- Resource cards use the `MsResourceCard` component pattern from UX spec
- Pre-filled forms: links to external forms with query parameters or downloadable PDFs
- Scripts: downloadable text files or inline display
- Contact info: phone numbers as `tel:` links, addresses as text
- All actions work without JavaScript (progressive enhancement for better UX)
- Type chips: Static links to pre-built combined type pages (no JS filtering)
- Combined pages: 11ty generates common combinations (singles + pairs) at build time

**FRs covered:** FR-M5 (actionable next steps), FR-M64, FR-M65, FR-M66, FR-M67

---

### Story 1.7: Implement Exit and Completion Handling

As a user in crisis,
I want to exit Crisis Mode at any time without pressure or guilt,
So that I feel in control and can leave when I need to.

**Acceptance Criteria:**

**Given** Crisis Mode pages exist (Stories 1.1-1.6: Decision Tree, 72-Hour Intake, Crisis Type, Region Selection, Resource Data Structure, Resource Display)
**When** I implement exit handling
**Then** every Crisis Mode page has:
- "Done for now" exit link/button (always visible, non-punitive)
- Exit is not visually emphasized (only one action emphasized per screen)
- No confirmation dialogs or guilt language
- Exit can be explicit completion or assistance request
**And** exit works without JavaScript (static link)
**And** exit does not require account creation or data submission
**And** user can return later without penalty (no "you left off here" language)
**And** exit does not wipe state (region selection persists if user returns, but no "you left off here" framing)

**Definition of "Exit and Completion" Contract:**
- **Exit:** User-initiated action to leave Crisis Mode (explicit "Done for now" click)
- **Completion:** User reaches a resource and takes action (implicit completion, no explicit "complete" required)
- **What counts as "complete":** User takes at least one concrete action (called a number, filled a form, accessed a resource)
- **What does NOT count as failure:** Leaving mid-flow, not taking action, closing browser
- **State on exit:** Region selection may persist locally (if JS available), but never framed as "you left off here"
- **Return behavior:** Generic, non-personalized return (no time references, no backlog framing)
- **Crisis Return Safeguard:** Crisis Mode return states must remain generic and non-personalized unless the user explicitly opts into continuity. This blocks "Welcome back" personalization, inferred recognition, and "last time you…" language. It keeps Crisis Mode existentially anonymous.

**Technical Notes:**
- Exit link goes to a completion page or closes the flow
- Completion page: neutral, no follow-up prompts, no account creation offers
- Assistance request: optional link to get help (phone number, chat, etc.)
- Follows UX consistency patterns: Exit Always Available meta-pattern
- Region state: May persist in localStorage if JS available, but never required for return

**FRs covered:** FR-M8 (exit at any time)

---

### Story 1.8: Implement Offline Support (Service Worker)

As a user in crisis,
I want Crisis Mode to work when my network connection is unreliable,
So that I can access help even with poor connectivity or no connection.

**Acceptance Criteria:**

**Given** Crisis Mode pages exist (Stories 1.1-1.7: Decision Tree, 72-Hour Intake, Crisis Type, Region Selection, Resource Data Structure, Resource Display, Exit/Completion)
**When** I implement offline support
**Then** there is a Service Worker that implements a three-tier caching strategy:

**Precache (Install-Time):**
- App shell + navigation chrome
- Decision tree pages (all nodes) for current region or region-less base
- Critical static assets (CSS, icons, minimal JS enhancement bundle)
- Region selection page
**And** precache is kept tight to avoid slow first load or storage pressure on older devices
**And** decision tree is available offline after Service Worker installation completes (not immediately on first visit)

**Runtime Cache (First-Visit / Stale-While-Revalidate):**
- Resources list pages (`/in/{region}/resources/{type}/`) - cached on first visit
- Resource detail pages (scripts, phone numbers, addresses) - cached when opened
- Static resource dataset files (if JSON-based) - cached on first access
**And** resources are available offline only if user has previously opened those specific pages while online
**And** cached resource pages include all linked detail pages (no dead links when offline)

**Network-Only (Live Data):**
- Live availability data ("open now", "beds available", "accepting applications")
- Dynamic status information that changes frequently
**And** live data is never cached (always requires connection)
**And** if offline, live data sections show clear "needs connection" messaging

**Offline Contract:**
- **Decision tree:** Available offline after Service Worker installation completes (works in airplane mode after install)
- **Resources:** Available offline only after user has visited those pages while online (flaky connectivity support, not guaranteed airplane mode)
- **Live availability:** Always requires connection (network-only)

**Freshness Signaling:**
- Cached resource pages display neutral messaging: "Showing saved info from this device" or "Last updated: [date/time]" (if timestamp available)
- Live availability sections show: "Live availability needs a connection" with non-shaming actions ("Call anyway", "Try again when connected")
- No warning tone, no guilt language, no "outdated" framing that implies failure

**Service Worker Behavior:**
- Service Worker is registered on Crisis Mode pages
- Offline functionality is optional enhancement (core functionality works without it)
- Service Worker only handles GET requests (cache-only, no mutation replay)
- If Service Worker registration fails, Crisis Mode continues to work normally (graceful degradation)
- Cache eviction policy: Reasonable size limits to avoid storage pressure on older devices

**Technical Notes:**
- **Precache strategy:** Install event caches decision tree pages and critical assets
- **Runtime cache strategy:** Cache resources on first visit, stale-while-revalidate for updates
- **Network-only strategy:** Live availability data never cached, always requires connection
- **Cache coverage:** Ensure filtered resource pages and their linked detail pages are cached together (no dead links offline)
- **Storage limits:** Keep precache tight, use runtime caching for heavier pages
- Service Worker is optional (progressive enhancement)
- No mutation replay (Service Worker is read-only for Crisis Mode)

**FRs covered:** FR-M10 (offline-capable - "unreliable network connectivity", not "fully usable airplane mode" for all features)

---

### Story 1.9: Implement Progressive Enhancement (JavaScript Enhancements)

As a user in crisis,
I want an enhanced experience when JavaScript is available,
So that navigation and interactions feel smoother without breaking core functionality.

**Acceptance Criteria:**

**Given** Crisis Mode works without JavaScript (Stories 1.1-1.7) and offline support exists (Story 1.8)
**When** I implement JavaScript enhancements
**Then** JavaScript (when available) provides:
- Smoother navigation (no full page reloads)
- Prefetching of next nodes for faster navigation
- Enhanced form interactions (auto-save 72-hour question to localStorage, optional)
- Region persistence via cookie/localStorage (enhancement, not required)
- Better visual feedback (loading states, transitions)
**And** all enhancements are optional (core functionality works without them)
**And** enhancements degrade gracefully (if JS fails, static links still work)
**And** no JavaScript is required for any core functionality
**And** Service Worker (Story 1.8) is an enhancement that never blocks navigation
**And** if Service Worker fails to register, nothing changes (core functionality unaffected)

**Service Worker Clarification:**
- Service Worker is JavaScript, but it's an optional enhancement
- Core flow works with JS disabled (static links, form submissions)
- Service Worker caches pages for offline access, but never blocks navigation
- If Service Worker registration fails, Crisis Mode continues to work normally

**Technical Notes:**
- Progressive enhancement pattern: HTML → CSS → JS → Advanced features
- Core functionality must work without JavaScript
- JavaScript enhances UX but never blocks functionality
- Follows architecture constraint: Progressive Enhancement (AC4, AC5, AC6)

**FRs covered:** FR-M9 (limited scripting support), NFR-GD1 (progressive enhancement)

---

### Story 1.10: Implement Anonymous Analytics (Minimal Instrumentation)
Contract Reference:
Event taxonomy is defined in architecture.md (Instrumentation Invariants section).


As a product team,
I want to observe user behavior without intervention,
So that I can measure trust signals and improve the experience without violating user privacy.

**Acceptance Criteria:**

**Given** Crisis Mode is functional (Stories 1.1-1.9: All core features, offline support, progressive enhancement)
**When** I implement anonymous analytics
**Then** the system tracks (session-scoped only):
- Page views (which nodes/resources were viewed, using canonical node/resource IDs)
- Action origin (user-initiated vs. system-suggested)
- Exit context (explicit exit button vs. browser close)
- Crisis Mode session completion without escalation or identity capture (finished flow without creating account or capturing identity)
**And** analytics are strictly session-scoped (no persistent identifiers: cookies, localStorage, fingerprints)
**And** analytics endpoint ignores auth cookies (anonymous endpoint: `POST /api/v1/analytics/crisis-events`)
**And** no user-facing instrumentation, prompts, or intervention
**And** analytics are "observation without intervention" (Epic 7 subset)
**And** analytics respect Do Not Track (DNT) header (if DNT is set, no tracking occurs)
**And** analytics failures never break Crisis Mode (graceful degradation: if endpoint fails, Crisis Mode continues)

**Event Taxonomy Contract:**
- Event types: `page_view`, `action_taken`, `exit`, `completion`
- Event properties: `nodeId` (canonical), `resourceId` (canonical), `actionType`, `exitMethod`, `crisisType` (derived, not raw text)
- Event schema is versioned and documented
- Events use canonical IDs from nodes/resources (enables offline cache invalidation, deep links)

**Instrumentation Ethics Contract:**
- Retention: Session-scoped only, no cross-session persistence
- What's captured: Event metadata only (node IDs, action types), never raw user input
- Where stored: Anonymous analytics endpoint, no persistent identifiers
- Opt-out mechanism: Respects Do Not Track (DNT) header - if `DNT: 1` or `navigator.doNotTrack === '1'`, no analytics tracking occurs
- No in-UI toggle for MVP: Keeps Crisis Mode simple, avoids anxiety, preserves silence principle
- Privacy policy disclosure: Clear statement that analytics are session-scoped, anonymous, and respect DNT (transparency without in-app prompts)
- Future consideration: If authenticated modes are added, consider opt-in/opt-out toggles in settings (not in Crisis Mode)
- Privacy: Raw 72-hour text never sent to analytics (only derived crisis type)

**Silence Metric Interpretation (Anti-Misread):**
- **Pairing requirement:** Silence Acceptance Rate must always be evaluated alongside:
  - Low help invocation (user doesn't need help)
  - Low backtracking (user doesn't need to go back)
- **Why this matters:** Silence alone can mean calm or confusion. This pairing prevents false positives that lead to unnecessary intervention.
- **Enforcement:** Never interpret silence metrics in isolation. Always pair with help invocation and backtracking metrics to distinguish calm from confusion.

**Technical Notes:**
- Anonymous endpoint: `POST /api/v1/analytics/crisis-events`
- Server ignores cookies on this endpoint (no auth required)
- Origin allowlist and rate limiting for abuse control
- Session-scoped only: no cross-session tracking
- Events use canonical node/resource IDs (from Story 1.1, 1.5)
- DNT check: Client-side (`navigator.doNotTrack === '1'`) or server-side (`DNT: 1` header) - if DNT is set, no analytics events are sent
- No in-UI toggle: Keeps implementation simple, avoids state management, preserves silence principle
- This enables trust measurement before Foundation Mode launches
- Analytics failures are silent (never break Crisis Mode)

**FRs covered:** Trust measurement (Epic 7 subset), NFR-GD4 (API failures don't break Crisis Mode)

---

### Story 1.11: Implement Internal Resource Trust Scores (Should-Have)

As a product team,
I want to use trust scores internally for resource quality control,
So that we can curate high-quality resources without introducing judgment into the user experience.

**Acceptance Criteria:**

**Given** resource data structure exists (Story 1.5)
**When** I implement internal trust scores
**Then** resource data structure includes:
- Internal trust score field (numeric or boolean, not user-visible)
- Trust score used for content curation (which resources to include)
- Trust score used for internal sorting (order resources by quality, but don't label)
- Trust score used for QA (flag resources needing review)
**And** trust scores are never displayed to users in Crisis Mode
**And** trust scores are never labeled as "trusted", "recommended", or "highly trusted"
**And** resources are filtered and sorted by trust score internally, but displayed neutrally
**And** trust scores can be sourced from ResourcesHyft API (post-MVP integration) or manual verification
**And** if ResourcesHyft API fails, manual trust scores still work (graceful degradation)

**Trust Score Visibility Policy (Non-Negotiable):**
- **Internal use only:** Trust scores are never user-visible in Crisis Mode
- **No evaluative language:** Resources never labeled as "trusted", "recommended", "best", or similar
- **Factual information only (if visibility added later):** If trust-related information is ever displayed, it must be factual ("Last verified: [date]", "Source: [name]"), opt-in (user expands "About this resource"), and never evaluative
- **Rationale:** Aligns with trauma-informed principles (no judgment, no evaluation), avoids "Premature Optimization Framed as Help" anti-pattern, keeps Crisis Mode neutral and non-paternalistic

**Technical Notes:**
- ResourcesHyft integration is post-MVP
- For MVP: Trust score field exists in resource data structure, used internally only
- Trust scores affect: which resources are included (content curation), resource ordering (internal sorting), QA flags (resources needing review)
- Trust scores are never exposed in UI, API responses to Crisis Mode, or any user-facing context
- Internal scoring enables quality control without introducing judgment into user experience

**FRs covered:** FR-S7, FR-S63 (resource trust scores - should-have, internal use only)

---

## Epic 2: User Authentication & Account Management: Stories

### Security Contract (Locked - Cannot Drift)

**CSRF Protection (Authoritative):**
- **Topology:** Same-origin SPA + API (`/api/*` routed to API). Crisis Mode under `/crisis/*` (fully separate, no auth endpoints, no CSRF needed, no cookies relied on).
- **Required on:** Every state-changing request (POST / PUT / PATCH / DELETE), including login, refresh, logout, signup, password reset, account deletion.
- **Mechanism:**
  - Origin exact-match allowlist check (Origin header must exactly match app origin, fallback to Referer if Origin unavailable)
  - `X-CSRF-Token` header must equal `csrf_token` cookie value (double-submit pattern)
- **CSRF Minting:** `GET /api/v1/csrf` sets `csrf_token` cookie (NOT HttpOnly; Secure; SameSite=Lax; Path=/) and returns 204 (or `{ok: true}`)
- **CSRF Rotation:** Rotate `csrf_token` on:
  - Login success
  - Logout
  - Refresh rotation (when refresh token is rotated)
- **CSRF Behavior:** Do NOT rotate per request (stable until auth boundary event)
- **Frontend:** Call `/api/v1/csrf` on SPA boot if cookie missing; call before login if needed; on 403 CSRF mismatch, call `/csrf` once then retry original request once (single retry rule)

**Cookie Settings (Authoritative):**
- **Access token:** HttpOnly; Secure; SameSite=Lax; Path=/api
- **Refresh token:** HttpOnly; Secure; SameSite=Lax; Path=/api
- **CSRF token:** Secure; SameSite=Lax; Path=/ (NOT HttpOnly, readable by JavaScript)

**Session Model:**
- **Multi-device support:** Multiple concurrent device sessions supported (each device has separate refresh token)
- **Refresh token storage:** Server-side refresh token store keyed by session/device
- **Logout behavior:** "Logout this device" (revoke current session) for MVP; "Logout everywhere" (revoke all sessions) post-MVP
- **Session management:** Refresh token rotation with reuse detection; if reuse detected, revoke all sessions for that user

**Crisis Mode Scope:**
- Crisis Mode never uses auth endpoints; it's fully separate, no CSRF needed, no cookies relied on
- Crisis Mode is static (11ty), no JS for core functionality, no API calls to authenticated endpoints

---

### Story 2.1: Implement CSRF Token Minting (Requires Origin Allowlist + CSRF Double-Submit)

As a developer,
I want CSRF tokens to be minted and validated for all state-changing requests,
So that authenticated requests are protected against cross-site request forgery attacks.

**Acceptance Criteria:**

**Given** the backend API skeleton exists (Story 0.4)
**When** I implement CSRF token minting
**Then** there is a `GET /api/v1/csrf` endpoint that:
- Sets `csrf_token` cookie (NOT HttpOnly; Secure; SameSite=Lax; Path=/)
- Returns 204 No Content (or `{ ok: true }`)
- Cookie is readable by JavaScript (for X-CSRF-Token header)
- Endpoint is accessible to anonymous users (no auth required)
- **Mint-if-missing behavior:** If `csrf_token` cookie missing, mint and set cookie; if present, return 204 with no change
**And** the SPA calls this endpoint on boot if the cookie is missing
**And** the SPA calls this endpoint before login if needed
**And** on 403 CSRF mismatch, SPA calls `/csrf` once then retries original request once (single retry rule)
**And** if CSRF minting fails, state-changing requests (including login) must fail with a supportive error (no fallback path for MVP)
**And** CSRF token rotation occurs only on auth boundary events (login success, logout, refresh rotation) in the same database transaction as the auth state change
**And** CSRF token is never rotated per request (stable until auth boundary event)

**CSRF Validation Contract (Locked):**
- **Required on:** Every state-changing request (POST / PUT / PATCH / DELETE), including login, refresh, logout, signup, password reset, account deletion
- **Validation mechanism:**
  1. Origin exact-match allowlist check (Origin header must exactly match app origin, fallback to Referer if Origin unavailable)
  2. `X-CSRF-Token` header must equal `csrf_token` cookie value (double-submit pattern)
- **Exceptions:** Anonymous endpoints that ignore cookies (e.g., Crisis Mode analytics) do not require CSRF validation, but must still apply abuse controls (Origin allowlist when present, rate limiting)
- **Crisis Mode:** Crisis Mode never uses auth endpoints; it's fully separate, no CSRF needed, no cookies relied on

**Technical Notes:**
- CSRF cookie: NOT HttpOnly, Secure, SameSite=Lax, Path=/ (readable by JavaScript)
- Auth cookies remain HttpOnly (access/refresh tokens not readable by JS)
- CSRF rotation: Occurs in same database transaction as auth state change
- Frontend retry rule: On 403 CSRF mismatch, call `/csrf` once, then retry original request once (single retry, no loops)
- Aligns with Security Model Canon (Section 3: CSRF Protection Model)

**FRs covered:** NFR-S1 (CSRF protection), Security Model Canon compliance

---

### Story 2.2: Implement Account Creation (Signup)
Gating Requirement:
This story MUST NOT be implemented until Epic 8, Story 8.1 (Row-Level Security) is complete.
 (Requires Origin Allowlist + CSRF Double-Submit)

As a user,
I want to create an account with minimal information,
So that I can access my data across devices and sessions.

**Acceptance Criteria:**

**Given** CSRF token minting exists (Story 2.1) and database foundation exists (Story 0.5)
**When** I implement account creation
**Then** there is a `POST /api/v1/auth/signup` endpoint that:
- Accepts: email, password (minimal info required)
- Validates email format and password strength (reasonable requirements, not punitive)
- Hashes password using bcrypt (or equivalent secure hashing)
- Creates user record in database
- Sets access token and refresh token cookies (HttpOnly; Secure; SameSite=Lax; Path=/api)
- Returns user information (id, email, no sensitive data)
**And** signup requires:
  - Origin exact-match allowlist check (Origin header must exactly match app origin)
  - CSRF double-submit validation (`X-CSRF-Token` header must equal `csrf_token` cookie value)
  - Frontend sends `X-CSRF-Token` header (copied from `csrf_token` cookie value)
**And** on successful signup:
  - Sets auth cookies (access token, refresh token)
  - Rotates `csrf_token` (call `/csrf` or rotate server-side in same transaction)
**And** duplicate email addresses are rejected with clear, non-shaming error message
**And** password requirements are reasonable (not punitive, aligned with trauma-informed principles)
**And** signup works without requiring additional personal information (minimal data collection)
**And** email verification is optional for MVP (password reset becomes verification mechanism if verification is skipped)

**CSRF Validation:**
- **Given** valid Origin + matching CSRF header/cookie, **when** signup, **then** 201 and auth cookies set
- **Given** CSRF mismatch, **then** 403 (neutral error, non-shaming)
- **Given** missing/invalid Origin, **then** 403 (neutral error, non-shaming)

**Authentication Cookie Contract:**
- Access token: Short-lived (10-15 minutes), HttpOnly; Secure; SameSite=Lax; Path=/api
- Refresh token: Longer-lived (7-30 days), HttpOnly; Secure; SameSite=Lax; Path=/api
- Cookies are scoped to Path=/api (not readable by Crisis Mode)
- Frontend sends requests with `withCredentials: true` (Axios) or `credentials: 'include'` (fetch)

**Technical Notes:**
- Password hashing: bcrypt with appropriate cost factor
- Email validation: Standard format validation, no email verification required for MVP
- User record: Includes id, email, password_hash, created_at, updated_at
- Aligns with Security Model Canon (Section 2: Authentication Model)

**FRs covered:** FR-M46 (create accounts)

---

### Story 2.3: Implement Login (Requires Origin Allowlist + CSRF Double-Submit)

As a user,
I want to log in to my account,
So that I can access my data and continue where I left off.

**Acceptance Criteria:**

**Given** account creation exists (Story 2.2)
**When** I implement login
**Then** there is a `POST /api/v1/auth/login` endpoint that:
- Accepts: email, password
- Validates credentials against database
- Sets access token and refresh token cookies (HttpOnly; Secure; SameSite=Lax; Path=/api)
- Returns user information (id, email, no sensitive data)
- Creates refresh token record in server-side token store (keyed by session/device)
- Rotates refresh token on every use (new token issued, old token invalidated)
- Detects refresh token reuse (security: if old token is used, invalidate all tokens for that user)
**And** login requires:
  - Origin exact-match allowlist check (Origin header must exactly match app origin)
  - CSRF double-submit validation (`X-CSRF-Token` header must equal `csrf_token` cookie value)
  - Frontend sends `X-CSRF-Token` header (copied from `csrf_token` cookie value)
**And** on successful login:
  - Sets auth cookies (access token, refresh token)
  - Rotates `csrf_token` (call `/csrf` or rotate server-side in same transaction)
**And** invalid credentials return clear, non-shaming error message (does not reveal whether email exists)
**And** login works with cookie-based authentication (no Authorization headers)

**Session Model:**
- **Refresh token storage:** Server-side refresh token store keyed by session/device (enables multi-device support and "logout this device" vs "logout everywhere")
- **Multi-device support:** Multiple concurrent device sessions supported (each device has separate refresh token)
- **Logout behavior:** "Logout this device" (revoke current session) for MVP; "Logout everywhere" (revoke all sessions) post-MVP

**CSRF Validation:**
- **Given** valid Origin + matching CSRF header/cookie, **when** login, **then** 200 and auth cookies set
- **Given** CSRF mismatch, **then** 403 (neutral error, non-shaming)
- **Given** missing/invalid Origin, **then** 403 (neutral error, non-shaming)

**Refresh Token Rotation Contract:**
- Refresh token is rotated on every use (new token issued, old token invalidated)
- Reuse detection: If old token is used after rotation, invalidate all tokens for that user (security measure)
- Token rotation occurs in same database transaction as login

**Technical Notes:**
- Credential validation: Compare hashed password with stored hash
- Token generation: JWT with appropriate expiration times
- Cookie settings: HttpOnly; Secure; SameSite=Lax; Path=/api
- Aligns with Security Model Canon (Section 2: Authentication Model)

**FRs covered:** FR-M47 (log in to accounts)

---

### Story 2.4: Implement Token Refresh
Implementation Clarification:
Frontend MUST implement a single-flight refresh guard:
- Only one refresh request may be active at a time
- Concurrent 401s await the same refresh promise
- Refresh failure clears auth state
 (Requires Origin Allowlist + CSRF Double-Submit)

As a user,
I want my session to remain active without re-entering my password,
So that I can use the app continuously without interruption.

**Acceptance Criteria:**

**Given** login exists (Story 2.3)
**When** I implement token refresh
**Then** there is a `POST /api/v1/auth/refresh` endpoint that:
- Accepts refresh token from HttpOnly cookie (not from request body)
- Validates refresh token (signature, expiration, not revoked, exists in server-side token store)
- Issues new access token and refresh token (both rotated)
- Sets new cookies (HttpOnly; Secure; SameSite=Lax; Path=/api)
- Returns new access token expiration time (for frontend timing)
**And** refresh requires:
  - Origin exact-match allowlist check (Origin header must exactly match app origin)
  - CSRF double-submit validation (`X-CSRF-Token` header must equal `csrf_token` cookie value)
  - Frontend sends `X-CSRF-Token` header (copied from `csrf_token` cookie value)
**And** on successful refresh rotation:
  - Sets new auth cookies (access token, refresh token)
  - Rotates `csrf_token` (call `/csrf` or rotate server-side in same transaction)
**And** refresh token rotation follows reuse detection (if old token is used, invalidate all tokens for that user)
**And** frontend automatically calls refresh on 401 responses (Axios interceptor)
**And** frontend retries original request after successful refresh

**Refresh Interceptor Concurrency Guard (Critical):**
- **Single-flight guard:** Only one refresh request in-flight at a time
- **Queued requests:** Multiple concurrent requests that fail with 401 are queued; after refresh resolves, all queued requests retry with new access token
- **Hard-fail rule:** If refresh fails, all queued requests fail (no retry loops, user must re-authenticate)
- **Implementation:** Frontend maintains a refresh promise; concurrent 401s wait for the same refresh promise to resolve

**CSRF Validation:**
- **Given** valid refresh cookie + valid CSRF + valid Origin, **when** refresh, **then** new access cookie is set (+ new refresh cookie if rotating)
- **Given** CSRF mismatch, **then** 403 (not 401, neutral error)
- **Given** missing/invalid Origin, **then** 403 (not 401, neutral error)
- **Given** refresh reuse detected, **then** revoke all sessions for that user and require re-auth (clear auth cookies, return 401)

**Session Management Clarity:**
- **Unexpected logout handling:** If refresh token reuse is detected and user is logged out, provide clear, non-shaming message: "For safety, we signed you out. Sign back in." (no blame, no technical details)
- **Session expiration:** If refresh token expires, user must re-authenticate (clear messaging, no shame)

**Token Refresh Flow:**
- Frontend detects 401 response
- Frontend calls `/api/v1/auth/refresh` with CSRF token
- Backend validates refresh token, issues new tokens
- Frontend retries original request with new access token
- If refresh fails, user is logged out (redirect to login)

**Technical Notes:**
- Refresh token validation: Check signature, expiration, revocation status
- Token rotation: New access and refresh tokens issued on every refresh
- Reuse detection: Track token usage, invalidate on reuse
- Aligns with Security Model Canon (Section 2: Authentication Model)

**FRs covered:** FR-M50 (access data from multiple devices - session persistence)

---

### Story 2.5: Implement Logout (Requires Origin Allowlist + CSRF Double-Submit)

As a user,
I want to log out of my account,
So that I can securely end my session and protect my data.

**Acceptance Criteria:**

**Given** login exists (Story 2.3)
**When** I implement logout
**Then** there is a `POST /api/v1/auth/logout` endpoint that:
- Clears access token and refresh token cookies
- Invalidates refresh token in server-side token store (marks as revoked for current session)
- Rotates `csrf_token` (new token issued, old token cleared)
- Returns success response
**And** logout requires:
  - Origin exact-match allowlist check (Origin header must exactly match app origin)
  - CSRF double-submit validation (`X-CSRF-Token` header must equal `csrf_token` cookie value)
  - Frontend sends `X-CSRF-Token` header (copied from `csrf_token` cookie value)
**And** on successful logout:
  - Clears auth cookies (access token, refresh token)
  - Invalidates refresh token server-side (revokes current session)
  - Rotates `csrf_token` (call `/csrf` or rotate server-side in same transaction)
**And** logout works even if user is already logged out (idempotent, no error)
**And** logout clears all auth-related cookies (access, refresh)
**And** frontend redirects to login or home page after logout

**Logout Behavior:**
- **MVP:** "Logout this device" (revoke current session only)
- **Post-MVP:** "Logout everywhere" (revoke all sessions for that user)
- **Session revocation:** Refresh token is removed from server-side token store (cannot be reused)

**Logout Contract:**
- Clears HttpOnly auth cookies (access token, refresh token)
- Clears non-HttpOnly CSRF cookie (csrf_token)
- Invalidates refresh token in database (prevents reuse)
- Rotates CSRF token (new anonymous token issued)
- Idempotent: Multiple logout calls are safe

**Technical Notes:**
- Cookie clearing: Set cookies with expired date and empty value
- Token invalidation: Mark refresh token as revoked in database
- CSRF rotation: Issue new anonymous CSRF token after logout
- Aligns with Security Model Canon (Section 2: Authentication Model, Section 3: CSRF Protection)

**FRs covered:** Security Model Canon compliance (logout with CSRF rotation)

---

### Story 2.6: Implement Password Reset Flow (Requires Origin Allowlist + CSRF Double-Submit)

As a user,
I want to reset my password if I forget it,
So that I can regain access to my account without losing my data.

**Acceptance Criteria:**

**Given** account creation exists (Story 2.2)
**When** I implement password reset
**Then** there is a password reset flow with two endpoints:

**Request Reset (`POST /api/v1/auth/password-reset/request`):**
- Accepts email
- Generates secure reset token (cryptographically random, time-limited)
- Stores reset token in database (hashed, with expiration)
- Sends reset email with reset link (if email service configured)
- Returns success response (does not reveal whether email exists - security best practice)
- Rate limits reset requests (prevents abuse)
- **Requires:** Origin exact-match allowlist check + CSRF double-submit validation
- **Note:** User may be logged out, so SPA must fetch `/csrf` first if cookie missing

**Complete Reset (`POST /api/v1/auth/password-reset/complete`):**
- Accepts reset token and new password
- Validates reset token (signature, expiration, not used)
- Updates password hash in database
- Invalidates reset token (one-time use)
- Optionally logs user in automatically (sets auth cookies) or requires login
- **Requires:** Origin exact-match allowlist check + CSRF double-submit validation
- **On successful reset:** Optionally rotate `csrf_token` and issue auth cookies (product decision)
**And** reset tokens expire after reasonable time (e.g., 1 hour)
**And** reset tokens are single-use (invalidated after use)
**And** reset flow follows trauma-informed principles (clear, non-shaming language)

**Email Strategy:**
- **Dev fallback:** Log reset link to server logs in dev (e.g., `console.log('Reset link: /reset-password?token=...')`)
- **Production:** Optional SMTP integration (SendGrid, SES, etc.) - configured via environment variables
- **Email content:** Clear instructions, expiration time, non-shaming language
- **Email delivery:** If email service not configured, log reset link (dev) or return error (production)

**CSRF Validation:**
- **Request reset:** Requires CSRF + Origin allowlist (state-changing request)
- **Complete reset:** Requires CSRF + Origin allowlist (state-changing request)
- **Frontend:** Must fetch `/csrf` before password reset request if cookie missing (user may be logged out)

**Password Reset Contract:**
- Reset token: Cryptographically random, time-limited (e.g., 1 hour), single-use
- Token storage: Hashed in database, with expiration timestamp
- Email delivery: Reset link includes token (e.g., `/reset-password?token=...`)
- Security: Does not reveal whether email exists (prevents email enumeration)
- Rate limiting: Prevents abuse (e.g., max 3 requests per email per hour)

**Technical Notes:**
- Reset token generation: Use crypto.randomBytes or equivalent
- Token hashing: Hash before storing in database (similar to password hashing)
- Email service: Use configured email service (e.g., SendGrid, SES) or log for dev
- Token expiration: Store expiration timestamp, validate on use
- Aligns with Security Model Canon (password reset is auth boundary event)

**FRs covered:** FR-M48 (reset forgotten passwords)

---

### Story 2.7: Implement Anonymous-to-Authenticated Data Migration (Requires Origin Allowlist + CSRF Double-Submit)

As a user,
I want my anonymous Foundation Mode data to be preserved when I create an account,
So that I don't lose my progress and can continue seamlessly.

**Acceptance Criteria:**

**Given** account creation exists (Story 2.2) and Foundation Mode data schemas are finalized (Epic 3: Financial Awareness)
**When** I implement anonymous-to-auth data migration
**Then** the system can:
- Detect when a user creates an account after anonymous Foundation Mode usage
- Migrate Foundation Mode data (transactions, categories, etc.) to the new account
- Preserve data integrity (no data loss, no duplicates)
- Link anonymous data to user account (using session identifier or device fingerprint)
**And** migration is explicit and user-initiated (user chooses to create account, migration happens automatically)
**And** migration does not migrate Crisis Mode data (unless explicitly claimed by user)
**And** migration is idempotent (safe to run multiple times)
**And** migration preserves data timestamps and relationships
**And** migration follows clear rules about what migrates vs. what doesn't
**And** migration is state-changing → requires CSRF + Origin allowlist (writes/moves data)

**Migration Contract:**
- **What migrates:** Foundation Mode data (transactions, categories, allocations, notes)
- **What does NOT migrate:** Crisis Mode data (unless explicitly claimed by user)
- **Migration trigger:** User creates account after anonymous Foundation Mode usage
- **Migration method:** Session identifier or device fingerprint links anonymous data to account
- **Data integrity:** No data loss, no duplicates, timestamps preserved
- **Idempotency:** Migration can be run multiple times safely (no duplicate data)

**Technical Notes:**
- Anonymous data identification: Use session identifier (localStorage key) or device fingerprint
- Migration logic: Must be stable before Foundation Mode anonymous usage begins (Epic 2 dependency note)
- Data linking: Link anonymous records to user account on migration
- Timestamp preservation: Maintain original created_at timestamps
- Aligns with Epic 2 dependency note: "Anonymous-to-auth migration assumes Foundation data schemas are finalized"

**FRs covered:** FR-M51 (migrate anonymous data to account)

---

### Story 2.8: Implement Data Export

As a user,
I want to export my data in a machine-readable format,
So that I have full control over my information and can use it elsewhere.

**Acceptance Criteria:**

**Given** user authentication exists (Stories 2.2-2.5) and Foundation Mode data exists (Epic 3: Financial Awareness)
**When** I implement data export
**Then** there is a `GET /api/v1/users/export` endpoint that:
- Requires authentication (user must be logged in)
- Exports all user data in machine-readable format (JSON)
- Includes: transactions, categories, allocations, goals, scenarios, notes, household data
- Excludes: passwords, tokens, internal system data
- Returns downloadable file or JSON response
- Respects data privacy (only user's own data, no household data unless user is household owner)
**And** export is available on-demand (user can request export anytime)
**And** export format is documented (schema, field descriptions)
**And** export includes metadata (export date, data range, version)
**And** export follows data portability principles (machine-readable, complete, usable)
**And** export is GET-only and read-only → CSRF not required (only state-changing requests require CSRF)
**And** export depends on "user data inventory" contract (checklist of all tables/fields to export, prevents drift as tables are added)

**User Data Inventory Contract:**
- **Purpose:** Define complete list of all user data tables/fields to export and delete
- **Format:** Checklist or documentation (even if just in docs, prevents drift)
- **Scope:** All user data (transactions, categories, goals, scenarios, notes, household data if owner)
- **Exclusions:** Passwords, tokens, internal system data, other users' data
- **Maintenance:** Update inventory as new tables/fields are added (ensures export/delete stay complete)

**Data Export Contract:**
- **Format:** JSON (machine-readable, standard format)
- **Scope:** All user data (transactions, categories, goals, scenarios, notes, household data if owner)
- **Exclusions:** Passwords, tokens, internal system data, other users' data
- **Metadata:** Export date, data range (earliest to latest record), export version
- **Privacy:** Only user's own data, household data only if user is household owner
- **Completeness:** All data, not just visible data (complete export)

**Technical Notes:**
- Export format: JSON with clear schema
- Data serialization: Include all relevant fields, preserve relationships
- File delivery: Return as downloadable file (Content-Disposition header) or JSON response
- Documentation: Export schema documented (field names, types, descriptions)
- Aligns with data portability requirements (GDPR, CCPA)

**FRs covered:** FR-M58 (export user data in machine-readable format)

---

### Story 2.9: Implement Account Deletion with Complete Data Removal (Requires Origin Allowlist + CSRF Double-Submit)

As a user,
I want to delete my account and have all my data completely removed,
So that I have full control over my information and can exercise my right to deletion.

**Acceptance Criteria:**

**Given** user authentication exists (Stories 2.2-2.5) and data export exists (Story 2.8)
**When** I implement account deletion
**Then** there is a `DELETE /api/v1/users/account` endpoint that:
- Requires authentication (user must be logged in)
- Requires:
  - Origin exact-match allowlist check (Origin header must exactly match app origin)
  - CSRF double-submit validation (`X-CSRF-Token` header must equal `csrf_token` cookie value)
  - Frontend sends `X-CSRF-Token` header (copied from `csrf_token` cookie value)
- Captures deletion reason (optional, user-provided)
- Deletes all user data completely (not soft-delete, hard delete)
- Anonymizes identifying fields in logs (surrogate IDs retained, identifying fields anonymized)
- Deletes user record, transactions, categories, goals, scenarios, notes, household data (if user is owner)
- Logs deletion event (for audit, with anonymized data)
- Returns success response
**And** on successful deletion:
  - Clears all auth cookies (access token, refresh token)
  - Invalidates all refresh tokens for that user (revoke all sessions)
  - Rotates `csrf_token` (rotation becomes moot after deletion, but clearing cookies is the real outcome)
**And** deletion is irreversible (no recovery possible)
**And** deletion follows right to deletion compliance (GDPR, CCPA)
**And** deletion reason is optional (user can skip, no pressure)
**And** deletion flow includes clear warnings about irreversibility (non-coercive, factual)
**And** deletion depends on "user data inventory" contract (same contract as export, ensures complete deletion)

**Operational Logging vs Account Deletion:**
- **Retained logs:** Security/abuse prevention logs (e.g., failed login attempts, suspicious activity)
- **Anonymized logs:** Identifying fields (email, name) anonymized, surrogate IDs retained (for audit trail, not user tracking)
- **Purged logs:** User data logs (transactions, goals, scenarios) completely deleted
- **Log retention policy:** Security logs retained for abuse prevention; user data logs purged on deletion
- **Compliance:** Right to deletion (GDPR Article 17, CCPA) - complete data removal, not soft-delete

**Account Deletion Contract:**
- **Deletion scope:** All user data (user record, transactions, categories, goals, scenarios, notes)
- **Household data:** If user is household owner, household is deleted; if not, user is removed from household
- **Log anonymization:** Identifying fields anonymized, surrogate IDs retained (for audit trail)
- **Deletion method:** Hard delete (not soft-delete), complete removal from database
- **Irreversibility:** No recovery possible, deletion is permanent
- **Compliance:** Right to deletion (GDPR Article 17, CCPA)

**Technical Notes:**
- Deletion order: Delete dependent records first (transactions, goals, scenarios), then user record
- Household handling: If user is household owner, delete household; if not, remove user from household
- Log anonymization: Replace identifying fields (email, name) with anonymized values, retain surrogate IDs
- Audit logging: Log deletion event with anonymized data (for compliance, not user tracking)
- CSRF protection: Deletion requires CSRF token (state-changing request)
- Aligns with Security Model Canon (Section 7: Logging & Audit Safety)

**FRs covered:** FR-M52 (delete accounts with data deletion), FR-M59 (delete user data completely, not soft-delete)

---

## Epic 3: Financial Awareness (Foundation Mode): Stories

### Epic 3 Success Definition (Critical Reframe)

**Canon:**
Foundation Mode is successful when a user gains clarity, regardless of continuation, return, or account creation. One-time use, early exit, or no return are valid success states.

**Why this matters:**
This is the most important Foundation clarification. Without it:
- Exits become failures
- Retention becomes proxy success
- UX pressure creeps in

This sentence explicitly rejects the SaaS growth reflex and preserves the core ethic: **clarity is the outcome, not behavior change.**

**Enforcement:**
- All Foundation Mode stories must align with this success definition
- Retention metrics must not be used as primary success indicators
- One-time use is success, not failure
- Early exit is success, not failure
- No return is success, not failure

---

### Story 3.1: Create Foundation Mode Entry and Anonymous Support

As a user,
I want to start using Foundation Mode without creating an account,
So that I can try it with zero commitment and no pressure.

**Acceptance Criteria:**

**Given** the frontend SPA skeleton exists (Story 0.7)
**When** I implement Foundation Mode entry
**Then** there is a Foundation Mode entry point that:
- Allows users to start without account creation (anonymous mode)
- Provides clear, non-coercive messaging: "Foundation Mode - Free. No signup needed."
- Offers simple entry: "Let's start simple. Just log one thing you spent money on recently."
- Saves data in browser localStorage by default (local-only persistence)
- Does not require authentication or account creation upfront
- Provides optional account creation offer after multiple transactions (non-coercive, Story 3.5)
**And** entry works on mobile and desktop (responsive design)
**And** entry follows trauma-informed principles (no pressure, no judgment, clear exit options)
**And** entry state is calm and stable (no urgency cues, no progress indicators)

**Anonymous Support Contract:**
- **Local storage:** Data persisted in browser localStorage (on-device only)
- **Session identifier:** Generate unique session ID for anonymous users (enables data migration later)
- **No cookies:** Anonymous mode does not set auth cookies (aligns with Crisis Mode isolation)
- **Data migration:** Anonymous data can be migrated to account when user creates account (Story 2.7)
- **Privacy:** Anonymous data is local-only until user opts into account/cloud sync

**Technical Notes:**
- Entry point: `/foundation` or `/foundation/home` route
- LocalStorage key: `moneyshyft_foundation_anonymous_{sessionId}` or similar
- Session ID: Generate on first entry, persist in localStorage
- No backend required for anonymous mode (fully client-side until account creation)
- Aligns with UX Journey 3: Foundation Daily Return Loop

**FRs covered:** FR-M12 (start Foundation Mode without account)

---

### Story 3.2: Implement Transaction Data Structure and Local Persistence
Migration Note:
Structure MUST be compatible with Story 2.7 (Anonymous-to-Authenticated Migration).


As a user,
I want my transaction data to be stored locally and persist across sessions,
So that I can log transactions and see them later without losing my progress.

**Acceptance Criteria:**

**Given** Foundation Mode entry exists (Story 3.1)
**When** I implement transaction data structure and persistence
**Then** there is a transaction data model that includes:
- Transaction fields: `id`, `description`, `amount`, `date`, `createdAt`, `updatedAt`
- Optional fields: `category` (for future category focus, Story 3.7), `notes` (user-added context)
- Transaction IDs are unique and stable (enables data migration)
- Transaction timestamps are preserved (createdAt, updatedAt)
**And** transactions are stored in browser localStorage (anonymous mode)
**And** transactions persist across browser sessions (localStorage persists)
**And** transactions can be exported (for data portability, Story 3.9)
**And** transaction data structure is compatible with authenticated mode (enables migration)
**And** transaction validation: amount is required and numeric, date defaults to today (editable, not required), description is optional

**Local Persistence Contract:**
- **Storage:** Browser localStorage (anonymous mode)
- **Key structure:** `moneyshyft_foundation_transactions_{sessionId}` or similar
- **Data format:** JSON array of transaction objects
- **Persistence:** Survives browser restarts, cleared only on explicit user action or browser data clearing
- **Migration:** Transaction structure must match authenticated mode schema (enables Story 2.7 migration)

**Technical Notes:**
- Transaction model: TypeScript interface/type definition
- LocalStorage API: Use browser localStorage with error handling (quota exceeded, private browsing)
- Data validation: Client-side validation before storage (amount numeric, date valid)
- Default values: Date defaults to today, editable, not required (UX Journey 3)
- Aligns with UX Journey 3: Transaction logging flow

**FRs covered:** FR-M11 (log transactions manually - data structure foundation)

---

### Story 3.3: Implement Transaction Logging UI and Flow

As a user,
I want to log transactions manually with minimal friction,
So that I can track my spending without feeling overwhelmed or judged.

**Acceptance Criteria:**

**Given** transaction data structure exists (Story 3.2)
**When** I implement transaction logging UI
**Then** there is a transaction entry screen that:
- Shows simple form: "What did you spend money on?" (text input), "How much?" (number input), "When?" (date picker, defaults to today)
- Uses non-judgmental language: "That's it. No categories, no judgment. Just one thing."
- Validates input: amount is numeric and required, date defaults to today (editable, not required), description is optional
- Saves transaction to localStorage (anonymous mode) or backend (authenticated mode)
- Shows confirmation: "Got it. You spent $X on [description] [date]. That's one thing logged."
- Follows post-save stillness rule: After save, remain on same screen context, no auto-navigation, no new affordances
- Provides clear exit: "Done for now" always visible, non-punitive
**And** transaction entry works without JavaScript (progressive enhancement: form submission works, JS enhances UX)
**And** transaction entry follows trauma-informed principles (no pressure, no judgment, clear exit)
**And** transaction entry is mobile-friendly (touch targets ≥ 44px, keyboard-friendly)

**Post-Save Stillness Contract:**
- **No auto-navigation:** After save, remain on same screen context (no route changes)
- **No new affordances:** Do not show new buttons, prompts, or actions after save
- **Confirmation only:** Show simple confirmation ("Got it. You spent..."), then stillness
- **User controls next step:** User can choose to add another, view patterns, or exit
- **Stillness guardrail:** No new affordances after save (prevents "Premature Optimization Framed as Help" anti-pattern)

**Technical Notes:**
- Form component: Use `MsField` component from UX consistency patterns (non-blaming errors)
- Date picker: Default to today, editable, not required (UX Journey 3)
- Validation: Client-side validation before save, clear error messages (factual, not judgmental)
- LocalStorage save: Save transaction to localStorage array, update UI optimistically
- Progressive enhancement: Form works without JS (HTML form submission), JS enhances with localStorage
- Aligns with UX Journey 3: Transaction logging flow, post-save stillness

**FRs covered:** FR-M11 (log transactions manually - UI and flow)

---

### Story 3.4: Implement Foundation Mode Home Screen
UX Reference:
Neutral data summary MUST align with UX Design Specification Journey 3.
Example: "You've logged some entries across a few days."


As a user,
I want to see a calm overview of my logged transactions,
So that I can understand where I am without feeling pressure or judgment.

**Acceptance Criteria:**

**Given** transaction logging exists (Story 3.3)
**When** I implement Foundation Mode home screen
**Then** there is a home screen that:
- Shows calm, stable view (no urgency cues, no progress indicators)
- Displays neutral data summary: "Entries this month: X" (no judgment, no trend, no advice)
- Shows last logged transaction (optional, non-prominent)
- Shows pattern summary (if patterns exist, collapsed by default, Story 3.6)
- Provides one clear action: "Add something" (visually emphasized)
- Uses observational language: "Here's what you've logged" not "You should log more"
- Uses warmth without surveillance: "Here's where things stand" not "Welcome back / we noticed…"
**And** home screen works in anonymous mode (reads from localStorage)
**And** home screen works in authenticated mode (reads from backend)
**And** home screen follows trauma-informed principles (no streaks, no consistency badges, no "missing data" warnings)
**And** home screen is non-evaluative and non-time-referential on return (no "you left off here" framing)

**Home Screen Contract:**
- **Return state:** Non-evaluative, non-time-referential (shows data, no commentary about absence)
- **No pressure:** No streaks, no consistency badges, no progress bars, no urgency cues
- **Observational tone:** "Here's what you've logged" not "You should log more"
- **Warmth without surveillance:** "Here's where things stand" not "Welcome back / we noticed…"
- **One primary action:** "Add something" is visually emphasized, other actions are secondary
- **Pattern insights:** Collapsed by default, user must expand to view (Story 3.6)

**Technical Notes:**
- Home route: `/foundation` or `/foundation/home`
- Data source: localStorage (anonymous) or backend API (authenticated)
- Data aggregation: Calculate summary stats (count, total, last transaction) client-side or server-side
- Pattern insights: Evaluate on Home render, show one per session if eligible (Story 3.6)
- Responsive design: Mobile-first, single column, restrained expansion on desktop
- Aligns with UX Journey 3: Foundation Home / Overview

**FRs covered:** FR-M12 (Foundation Mode home screen)

---

### Story 3.5: Implement Non-Coercive Account Creation Offer

As a user,
I want to be offered account creation after I've logged multiple transactions,
So that I can save my progress across devices when I'm ready, not when the system demands it.

**Acceptance Criteria:**

**Given** transaction logging exists (Story 3.3) and account creation exists (Story 2.2)
**When** I implement account creation offer
**Then** the system offers account creation:
- After N completed save actions (e.g., 3-5 completed saves, configurable threshold)
- As a non-coercive invitation, not a gate or requirement
- With clear value proposition: "Save your progress across devices" (not "You must create an account")
- With clear opt-out: "Not now" or "Skip" always available
- Without pressure or urgency (no countdown, no "limited time" language)
- With dismiss behavior: Dismissal suppresses the offer until a new session following new user action
**And** account creation offer does not interrupt transaction logging flow
**And** account creation offer appears on home screen, not during entry
**And** account creation offer follows trauma-informed principles (invitation, not gate)
**And** if user creates account, anonymous data is migrated automatically (Story 2.7)

**Account Creation Offer Contract:**
- **Trigger:** After N completed save actions (threshold: 3-5 completed saves, configurable)
- **Why this matters:** This shifts the logic from accumulation → pressure to intent → invitation. It prevents the offer from feeling like a nag tied to volume.
- **Placement:** Home screen, not during entry (does not interrupt flow)
- **Tone:** Invitation, not gate ("You can save your progress" not "You must create an account")
- **Dismiss behavior:** Dismissal suppresses the offer until a new session following new user action (prevents nagging, respects agency)
- **No pressure:** No urgency cues, no countdown, no "limited time" language
- **Migration:** If user creates account, anonymous data migrates automatically (Story 2.7)

**Technical Notes:**
- Offer component: Use `MsTransitionCard` pattern from UX spec (informational, not promotional)
- Trigger logic: Count transactions in localStorage or backend, show offer after threshold
- Dismiss state: Store in localStorage or backend, respect dismiss for significant period
- Migration: Link to account creation flow, trigger migration on signup (Story 2.7)
- Aligns with UX Narrative Mode Transitions: Foundation → Account creation

**FRs covered:** FR-M13 (offer account creation after multiple transactions), FR-M14 (create account to save progress)

---

### Story 3.6: Implement Pattern Insights and Reality Mirror
Definition Clarification:
A meaningful pattern requires:
- ≥8 transactions
- ≥2 distinct calendar dates
- Repetition within the same category or merchant descriptor


As a user,
I want to see spending patterns revealed immediately after minimal logging,
So that I can understand my spending without being told what to do.

**Acceptance Criteria:**

**Given** transaction logging exists (Story 3.3) and home screen exists (Story 3.4)
**When** I implement pattern insights
**Then** the system can:
- Calculate simple aggregates: total spent, average per transaction, most frequent descriptions
- Reveal patterns immediately after minimal logging (e.g., after 3 transactions: "You've logged groceries 3 times. Average: $75 per trip.")
- Show aggregated spending patterns after extended logging (e.g., after 10 transactions: "You've logged 10 things. Here's what you're tracking most: Groceries (5 times, $375 total).")
- Display patterns in collapsed state by default (user must expand to view)
- Show one insight per session maximum (evaluated on Home render)
- Use observational language: "It looks like…" or "You might notice…" (not prescriptive)
- Provide dismiss option: "Hide this for now" always available
**And** pattern insights only appear on Home screen, never in Entry screen
**And** pattern insights follow minimum threshold: 8 entries across 2+ dates (prevents noisy insights)
**And** pattern insights describe patterns, don't propose actions unless user asks
**And** pattern insights use neutral, non-judgmental language (no "overspending", no "bad habits")

**Pattern Insights Contract:**
- **Minimum threshold:** 8 entries across 2+ dates (prevents noisy insights from insufficient data)
- **Meaningful pattern:** Stable across 2 intervals or 3+ repeated occurrences (e.g., "groceries" appears 3+ times)
- **One insight per session:** Maximum one insight shown per session (evaluated on Home render)
- **Insight timing:** Only on Home, once per session, evaluated on Home render (never in Entry)
- **Language policy:** Insights describe patterns, don't propose actions unless user asks
- **Collapsed by default:** User must expand to view details (no auto-surfacing)
- **Dismissible:** "Hide this for now" always available, no pressure to view

**Pattern Insights Guardrail (Anti-Judgment):**
- **Epistemic boundary:** Pattern insights may describe correlations and distributions only. They must not imply causality, responsibility, or prescription.
- **Why this matters:** This blocks a subtle but dangerous slide:
  - "Most spending happens on X" → fine (observation)
  - "X is driving your situation" → judgment (causality)
  - "You might want to…" → prescription (advice)
- **Bright line:** Observation ≠ explanation ≠ advice
- **Enforcement:** All pattern insights must be purely descriptive. Any interpretation or suggestion requires explicit user request.

**Insight Surfacing Enforcement (Anti-Stacking):**
- **Hard rule:** Once an insight is shown or dismissed, no additional insights may surface until a new session begins.
- **Why this matters:** Without this, teams will justify "just one more insight", re-trigger on minor actions, and erode the silence contract.
- **Enforcement:** This converts a principle into an enforceable rule. Session boundary is defined by Global Canon (30 minutes of inactivity or app close/backgrounding).

**Technical Notes:**
- Insight calculation: Client-side (anonymous) or server-side (authenticated) aggregation
- Pattern detection: Simple frequency analysis (most common descriptions, totals, averages)
- Insight storage: Store insight eligibility in session state (prevents multiple insights per session)
- Insight component: Use `MsInsightCard` from UX spec (collapsed by default, expandable)
- Language: Observational ("It looks like…") not prescriptive ("You should…")
- Aligns with UX Journey 3: Pattern insight presentation

**FRs covered:** FR-M15 (reveal spending patterns immediately), FR-M17 (show aggregated spending patterns - "Reality Mirror")

---

### Story 3.7: Implement Category Focus (Should-Have)

As a user,
I want to focus on one spending category after logging sufficient transactions,
So that I can understand my spending in a specific area without being overwhelmed.

**Acceptance Criteria:**

**Given** transaction logging exists (Story 3.3) and pattern insights exist (Story 3.6)
**When** I implement category focus
**Then** the system can:
- Detect when user has logged sufficient transactions (e.g., 10+ transactions across multiple categories)
- Offer category focus: "You've logged transactions in several areas. Want to focus on one?" (optional, non-coercive)
- Allow user to select one category to focus on (e.g., "Groceries", "Transportation", "Eating out")
- Filter transactions by selected category (show only transactions in that category)
- Show category-specific patterns and aggregates (total, average, frequency)
- Allow user to change or remove focus at any time (no lock-in)
**And** category focus is optional (user can skip or dismiss)
**And** category focus does not hide other transactions (user can view all transactions)
**And** category focus follows trauma-informed principles (no pressure, no judgment)
**And** category focus is user-initiated (system offers, user chooses)

**Category Focus Contract:**
- **Trigger:** After user logs sufficient transactions (e.g., 10+ transactions across multiple categories)
- **Offer:** Non-coercive invitation, not requirement ("Want to focus on one?" not "You must focus")
- **Selection:** User chooses category, system filters view (not permanent, can change)
- **No lock-in:** User can change or remove focus at any time
- **Optional:** User can skip or dismiss, no pressure to use

**Technical Notes:**
- Category detection: Simple keyword matching or user-defined categories (start with description-based)
- Category filtering: Filter transactions by category, show category-specific aggregates
- Category storage: Store selected category in localStorage (anonymous) or backend (authenticated)
- Category UI: Category selector component, filtered transaction list
- Aligns with UX Journey 3: Optional category focus

**FRs covered:** FR-S16 (focus on one spending category - should-have)

---

### Story 3.8: Implement Small Win Tracking (Should-Have)

As a user,
I want to define a small win during onboarding and track its progress,
So that I can see incremental progress without feeling pressure to be perfect.

**Acceptance Criteria:**

**Given** Foundation Mode entry exists (Story 3.1) and transaction logging exists (Story 3.3)
**When** I implement small win tracking
**Then** the system can:
- Offer small win capture during onboarding (optional, after first transaction)
- Ask: "What made you want to try this?" with options (e.g., "I want to understand where my money goes", "I want to spend less on something", "I want to save money", "I'm just curious", "Something else")
- If user selects "I want to spend less on something", ask: "What do you want to spend less on?" (text input or skip)
- Store small win in localStorage (anonymous) or backend (authenticated)
- Check in on small win progress after extended use (e.g., after 2 weeks or 20 transactions)
- Show progress in non-judgmental way: "You've logged X transactions related to [small win]" (not "You're failing" or "Great job!")
- Allow user to update or remove small win at any time
**And** small win capture is optional (user can skip)
**And** small win tracking is non-coercive (no pressure to achieve, no failure framing)
**And** small win check-ins are infrequent (e.g., once every 2 weeks, not daily)

**Small Win Tracking Contract:**
- **Capture:** Optional during onboarding, after first transaction
- **Storage:** Store in localStorage (anonymous) or backend (authenticated)
- **Check-ins:** Infrequent (e.g., once every 2 weeks or 20 transactions), non-judgmental
- **Language:** Observational ("You've logged X transactions related to...") not evaluative ("Great job!" or "You're failing")
- **Update:** User can update or remove small win at any time
- **No pressure:** No failure framing, no achievement pressure, no streaks

**Small Wins Isolation Rule (Anti-Gamification):**
- **Isolation requirement:** Small wins must not influence:
  - Insights (pattern insights are independent of small wins)
  - Mode progression (Foundation → Builder readiness detection ignores small wins)
  - Prompts (no prompts triggered by small win progress)
  - Builder readiness detection (small wins are not signals for Builder Mode)
- **User-authored only:** Small wins are user-authored reflections, not system-evaluated goals.
- **Why this matters:** Without this, "small wins" slowly become scores, signals, and progress indicators. This locks them as expressive, not instrumental.
- **Enforcement:** Small wins are stored and displayed, but never used as input to any system logic, insights, or progression decisions.

**Technical Notes:**
- Small win model: `id`, `description`, `type` (e.g., "spend less on X", "understand where money goes"), `createdAt`
- Small win storage: localStorage (anonymous) or backend (authenticated)
- Check-in logic: Calculate time since creation or transaction count, show check-in after threshold
- Check-in component: Use `MsNotice` or similar (informational, not promotional)
- Aligns with UX Journey 3: Optional small win capture

**FRs covered:** FR-S18 (define small win during onboarding - should-have), FR-S19 (check in on small win progress - should-have)

---

### Story 3.9: Implement Foundation Mode Data Export

As a user,
I want to export my Foundation Mode data in a machine-readable format,
So that I have full control over my information and can use it elsewhere.

**Acceptance Criteria:**

**Given** transaction logging exists (Story 3.3) and data export exists (Story 2.8)
**When** I implement Foundation Mode data export
**Then** there is a data export feature that:
- Exports all Foundation Mode data: transactions, categories (if used), small wins (if defined)
- Works in anonymous mode (exports from localStorage as JSON file)
- Works in authenticated mode (exports from backend via API, Story 2.8)
- Returns machine-readable format (JSON)
- Includes metadata: export date, data range, version
- Excludes: internal system data, session identifiers (unless needed for migration)
- Respects data privacy (only user's own data)
**And** export is available on-demand (user can request export anytime)
**And** export format is documented (schema, field descriptions)
**And** export follows data portability principles (machine-readable, complete, usable)

**Foundation Mode Export Contract:**
- **Anonymous mode:** Export from localStorage as downloadable JSON file
- **Authenticated mode:** Export from backend via API (Story 2.8)
- **Format:** JSON with clear schema (transactions array, categories array, smallWins array)
- **Metadata:** Export date, data range (earliest to latest transaction), export version
- **Completeness:** All user data, not just visible data

**Technical Notes:**
- Anonymous export: Read from localStorage, generate JSON, trigger download
- Authenticated export: Use existing export endpoint (Story 2.8), include Foundation Mode data
- Export schema: Document transaction fields, category fields, small win fields
- File delivery: Return as downloadable file (Content-Disposition header) or JSON response
- Aligns with data portability requirements (GDPR, CCPA)

**FRs covered:** FR-M22 (export transaction data - Foundation Mode specific)

---

### Story 3.10: Implement Foundation Mode Data Deletion

As a user,
I want to delete all my Foundation Mode data with reason capture,
So that I have full control over my information and can exercise my right to deletion.

**Acceptance Criteria:**

**Given** transaction logging exists (Story 3.3) and account deletion exists (Story 2.9)
**When** I implement Foundation Mode data deletion
**Then** there is a data deletion feature that:
- Deletes all Foundation Mode data: transactions, categories, small wins
- Works in anonymous mode (clears localStorage, confirms deletion)
- Works in authenticated mode (deletes from backend via API, Story 2.9)
- Captures deletion reason (optional, user-provided)
- Shows clear confirmation: "This will delete all your Foundation Mode data. This cannot be undone."
- Returns success response after deletion
**And** deletion is irreversible (no recovery possible)
**And** deletion reason is optional (user can skip, no pressure)
**And** deletion flow includes clear warnings about irreversibility (non-coercive, factual)
**And** deletion follows right to deletion compliance (GDPR, CCPA)

**Foundation Mode Deletion Contract:**
- **Anonymous mode:** Clear localStorage, confirm deletion, no backend call needed
- **Authenticated mode:** Delete from backend via API (Story 2.9), includes Foundation Mode data
- **Deletion scope:** All Foundation Mode data (transactions, categories, small wins)
- **Reason capture:** Optional, user-provided, no pressure
- **Irreversibility:** No recovery possible, deletion is permanent

**Data Deletion Emotional Contract (Trust Moment):**
- **What to avoid:** Data deletion flows must avoid:
  - Loss-framed warnings ("You'll lose all your data!")
  - Retention nudges ("Are you sure? Your progress will be lost!")
  - Escalating confirmation loops (multiple "are you sure?" prompts)
- **What to do:** Deletion confirmation must be calm, final, and non-dramatic.
- **Why this matters:** Deletion is a trust test. Most products treat it as a last chance to retain or an emotional manipulation moment. MoneyShyft treats it as agency completion and dignity preservation. This codifies that difference.
- **Enforcement:** Deletion flow must be single confirmation, factual language, no emotional manipulation, no retention pressure.

**Technical Notes:**
- Anonymous deletion: Clear localStorage keys, confirm deletion, show success message
- Authenticated deletion: Use existing deletion endpoint (Story 2.9), include Foundation Mode data
- Deletion confirmation: Clear, non-coercive warning about irreversibility
- Reason capture: Optional text input, stored for feedback (not required)
- Aligns with right to deletion requirements (GDPR Article 17, CCPA)

**FRs covered:** FR-M23 (delete all data with reason capture - Foundation Mode specific)

---

## Epic 4: Goal Achievement (Builder Mode): Stories

### Epic 4 Success Definition (Critical Reframe)

**Canon:**
Builder Mode is successful when a user externalizes their thinking and explores possibilities, regardless of whether they set a goal, achieve it, or continue using Builder Mode. Exploration without commitment is a valid success state.

**Why this matters:**
Builder Mode exists to externalize cognition, not guide outcomes. Without this:
- Goal achievement becomes the only success metric
- Exploration feels like failure if no goal is set
- Scenario comparison becomes optimization pressure

This sentence explicitly preserves the core ethic: **externalization is the outcome, not goal achievement.**

**Enforcement:**
- All Builder Mode stories must align with this success definition
- Goal achievement metrics must not be used as primary success indicators
- Exploration without goal-setting is success, not failure
- Scenario comparison without decision is success, not failure
- Leaving without resolution is success, not failure

**Language Consistency (Internal Alignment):**
- **Consistent terminology:** Use "model, explore, adjust" language consistently in copy and comments
- **Avoid "achievement" language:** Except in the narrow acknowledgment story (Story 4.9), avoid "achievement" language
- **Why this matters:** Builder Mode is "Goal Modeling" not "Goal Achievement" in the motivational sense. This keeps internal language aligned with philosophy.

**Leave Without Resolution Outcome (Cross-Cutting):**
- **Core outcome:** "I can stop thinking and leave" - user can exit Builder Mode at any point without resolution
- **Explicit affordance:** "Done for now" must be available on:
  - Scenario comparison screens
  - Goal progress screens
  - Adjustment screens
- **Leaving behavior:** Leaving does not mark goals as paused/failed by default (user controls state)
- **Why this matters:** This is philosophically important and prevents later drift. Leaving without resolution is a valid success state in trauma-informed planning.

---

### Story 4.1: Create Builder Mode Entry and Foundation Data Import

As a user,
I want to enter Builder Mode and import my Foundation Mode data,
So that I can build on my existing awareness without starting over.

**Acceptance Criteria:**

**Given** Foundation Mode exists (Epic 3) and user authentication exists (Epic 2)
**And** Epic 8 contracts are defined (soft dependency: Builder Mode must respect decline/defer rules, not generate progression pressure events, emit neutral "entered/exited Builder" signals if instrumentation exists)
**When** I implement Builder Mode entry
**Then** there is a Builder Mode entry point that:
- Allows users to enter Builder Mode (from Foundation Mode or direct navigation)
- Imports Foundation Mode data (transactions, categories, patterns) automatically
- Shows calm, stable view (no urgency cues, no progress indicators)
- Displays last known scenarios/goals (if exist, non-prominent)
- Provides one clear action: "Explore scenarios" or "Create a scenario"
- Uses observational language: "Here are your scenarios" not "You should plan more"
- Offers optional "What is Builder?" explainer (dismissible, shown only once, never resurfaced)
**And** entry works in authenticated mode (reads from backend)
**And** entry works in anonymous mode (reads from localStorage, with migration path)
**And** entry follows trauma-informed principles (no pressure, no judgment, clear exit options)
**And** entry is non-evaluative and non-time-referential on return (no "you left off here" framing)

**Foundation Data Import Contract:**
- **Import scope:** Transactions, categories, spending patterns from Foundation Mode
- **Import method:** Automatic on Builder Mode entry (no manual import step required)
- **Read-only by default:** Foundation import is read-only by default; Builder never mutates Foundation data automatically
- **Why this matters:** This preserves mental separation between "recording reality" (Foundation) and "imagining futures" (Builder)
- **Data preservation:** All Foundation Mode data remains intact (import is copy, not move)
- **Migration:** Anonymous Foundation data can be imported to authenticated Builder Mode (via Story 2.7 migration)
- **Data integrity:** No data loss, timestamps preserved, relationships maintained

**Builder Mode Entry Contract:**
- **Return state:** Non-evaluative, non-time-referential (shows data, no commentary about absence)
- **No pressure:** No "incomplete goals" warnings, no catch-up pressure, no urgency cues
- **Observational tone:** "Here are your scenarios" not "You should plan more"
- **One primary action:** "Explore scenarios" or "Create a scenario" is visually emphasized
- **Optional explainer:** "What is Builder?" shown only once, dismissible, never resurfaced

**Technical Notes:**
- Entry route: `/builder` or `/builder/home`
- Data import: Read from Foundation Mode data store (localStorage or backend)
- Import logic: Copy transactions, categories, patterns to Builder Mode data structure
- Explainer component: Dismissible modal or card, shown only on first entry
- Responsive design: Mobile-first, multi-column layouts on desktop (supports thinking)
- Aligns with UX Journey 4: Builder Planning Session

**FRs covered:** FR-M24 (import Foundation Mode data when entering Builder Mode)

---

### Story 4.2:

Gating Requirement:
- Epic 8 Story 8.1 (Row-Level Security) MUST be implemented and verified before this story is started.
 Implement Goal Data Structure and Single Active Goal

As a user,
I want to set a single active goal,
So that I can focus on one financial objective without being overwhelmed.

**Acceptance Criteria:**

**Given** Builder Mode entry exists (Story 4.1)
**When** I implement goal data structure
**Then** there is a goal data model that includes:
- Goal fields: `id`, `type` (debt payoff, savings target, emergency fund), `targetAmount`, `currentAmount`, `timeline`, `createdAt`, `updatedAt`
- Goal status: `active`, `paused`, `completed`, `cancelled`
- Goal metadata: `description` (user-authored), `notes` (optional)
- Single active goal constraint: Only one goal can be active at a time (MVP)
- Goal IDs are unique and stable (enables data migration and progress tracking)
**And** goals are stored in backend (authenticated) or localStorage (anonymous)
**And** goals can be paused, adjusted, or cancelled at any time (no locked states)
**And** goal structure is compatible with scenario comparison (Story 4.3)
**And** goal structure supports progress tracking (Story 4.5)

**Single Active Goal Contract:**
- **MVP constraint:** Only one goal can be active at a time (multiple goals deferred to post-MVP)
- **Goal types:** Debt payoff, savings target, emergency fund (extensible for post-MVP)
- **Goal states:** Active (current focus), paused (temporarily stopped), completed (achieved), cancelled (abandoned)
- **No lock-in:** User can pause, adjust, or cancel goal at any time (all changes reversible)
- **Goal priority:** Active goal takes precedence; other goals must be paused or cancelled

**Goal State Constraints (Anti-Drift):**
- **No auto-transitions:** Goal completion does not auto-transition mode (user controls all transitions)
- **No failure framing:** Goal pause/cancel does not imply failure (framed as adaptation, not failure)
- **Why this matters:** This protects later UI copy and analytics from drifting into judgmental language or automatic mode progression

**Technical Notes:**
- Goal model: TypeScript interface/type definition
- Goal storage: Backend database (authenticated) or localStorage (anonymous)
- Goal validation: Target amount must be positive, timeline must be reasonable (not punitive)
- Goal state machine: Active → Paused/Completed/Cancelled (all transitions allowed)
- Aligns with UX Journey 4: Goal creation and management

**FRs covered:** FR-M25 (set a single active goal)

---

### Story 4.3: Implement Scenario Comparison (Two Scenarios)
Default Ordering:
Scenarios display in creation order. No outcome-based sorting.


As a user,
I want to compare two scenarios for my goal,
So that I can explore "what if" possibilities without commitment pressure.

**Acceptance Criteria:**

**Given** goal data structure exists (Story 4.2)
**When** I implement scenario comparison
**Then** there is a scenario comparison feature that:
- Allows user to create two scenarios for their active goal
- Displays scenarios side-by-side with equal visual weight (no sorting by performance)
- Shows scenario details: payment strategy, timeline, assumptions
- Calculates basic forecasting for each scenario (timeline, total cost, milestones)
- Uses neutral comparison layout (no "best option" labeling, no performance sorting)
- Allows user to edit scenarios (all changes reversible)
- Provides clear visual distinction between scenarios (equal prominence)
**And** scenario comparison works without JavaScript (progressive enhancement: static comparison, JS enhances with interactivity)
**And** scenario comparison follows trauma-informed principles (exploration, not optimization)
**And** scenario comparison uses descriptive language ("If you continue at this rate..." not "You should...")
**And** scenarios can be saved, edited, or discarded at any time (no locked states)
**And** scenario comparison screen has explicit "Done for now" affordance (user can leave without resolution)

**Scenario Comparison Contract:**
- **Two scenarios minimum:** MVP requires two scenarios to demonstrate "what if" thinking (one scenario feels incomplete)
- **Second scenario creation:** The second scenario can be auto-duplicated from the first as a starting point (reduces cognitive load at creation time, keeps "what if" framing gentle)
- **Equal visual weight:** Scenarios displayed side-by-side with equal prominence (no performance-based sorting)
- **No "best option" labeling:** Scenarios are descriptive, not prescriptive (no "Recommended" or "Best" labels)
- **Reversible changes:** All scenario edits are reversible (no locked states, no commitment pressure)
- **Descriptive forecasting:** Calculations are descriptive ("If you continue at this rate, you'll hit your goal in X months") not prescriptive ("You should do this")
- **Visual constraint:** Charts must not sort scenarios by performance (prevents implicit ranking)

**Technical Notes:**
- Scenario model: `id`, `goalId`, `name` (user-editable, neutral defaults), `assumptions`, `timeline`, `forecast`
- Scenario storage: Backend (authenticated) or localStorage (anonymous)
- Comparison layout: Side-by-side on desktop, stacked on mobile (equal visual weight)
- Forecasting calculation: Basic timeline and cost calculations (descriptive, not prescriptive)
- Scenario editing: All fields editable, changes saved automatically (no confirmation required)
- Aligns with UX Journey 4: Scenario exploration without commitment

**FRs covered:** FR-M26 (compare two scenarios for goal)

---

### Story 4.4: Implement Basic Forecasting Calculations

As a user,
I want to see basic forecasting for my goal scenarios,
So that I can understand potential timelines and outcomes without being told what to do.

**Acceptance Criteria:**

**Given** scenario comparison exists (Story 4.3)
**When** I implement forecasting calculations
**Then** the system can calculate:
- Goal achievement timeline (months to reach target)
- Total cost/contribution required (sum of payments or savings)
- Milestone dates (quarterly or monthly progress points)
- Basic projections based on current rate (if user continues at current pace)
**And** forecasting is descriptive, not prescriptive ("If you continue at this rate..." not "You should...")
**And** forecasting shows ranges or single estimates (user preference, not system decision)
**And** forecasting calculations are transparent (user can see assumptions)
**And** forecasting updates automatically when scenario assumptions change
**And** forecasting does not imply urgency or pressure (no "you're behind" language)

**Forecasting Contract:**
- **Descriptive only:** Forecasting describes potential outcomes, not recommended actions
- **Transparency:** All assumptions are visible and editable (user controls inputs)
- **No urgency:** Forecasting does not imply time pressure or "behind schedule" framing
- **Basic calculations:** MVP includes simple timeline and cost calculations (advanced ranges deferred to post-MVP)
- **Automatic updates:** Forecasting recalculates when scenario assumptions change (no manual refresh required)

**Forecasting Output Constraints (Trust Protection):**
- **Rounded outputs:** Forecasting outputs are rounded (not displayed with false precision)
- **Approximate framing:** All forecasts are framed as "estimates" or "approximately" (not exact predictions)
- **Why this matters:** This protects trust and prevents perceived false precision. Users understand these are estimates, not guarantees.

**Technical Notes:**
- Forecasting engine: Simple calculation based on target amount, current amount, and payment/savings rate
- Timeline calculation: `(targetAmount - currentAmount) / monthlyRate = months`
- Milestone calculation: Quarterly or monthly progress points based on timeline
- Assumption visibility: Show all inputs (target, current, rate) in forecasting display
- Update logic: Recalculate on scenario edit, no manual refresh needed
- Aligns with UX Journey 4: Descriptive forecasting without pressure

**FRs covered:** FR-M27 (calculate basic forecasting for goal achievement timeline)

---

### Story 4.5: Implement Goal Progress Tracking

As a user,
I want to track my progress toward my goal,
So that I can see how I'm doing without feeling judged or pressured.

**Acceptance Criteria:**

**Given** goal data structure exists (Story 4.2) and forecasting exists (Story 4.4)
**When** I implement progress tracking
**Then** there is a progress tracking feature that:
- Shows visual progress indicator (progress bar, percentage complete)
- Displays current amount vs. target amount
- Shows timeline progress (months elapsed vs. months projected)
- Updates automatically when transactions are logged (if linked to goal)
- Uses neutral, observational language ("You're at 45% of your goal" not "You're behind!")
- Provides milestone acknowledgments (quarterly or monthly milestones reached)
- Allows user to manually update progress (if not auto-linked)
**And** progress tracking does not imply urgency or pressure (no "you're behind" language)
**And** progress tracking does not shame setbacks (no "you failed" language)
**And** progress tracking is optional (user can hide or dismiss)
**And** progress updates are non-intrusive (no popups, no alerts)
**And** goal progress screen has explicit "Done for now" affordance (user can leave without resolution)

**Progress Tracking Contract:**
- **Visual indicator:** Progress bar or percentage display (clear, non-judgmental)
- **Non-directional visuals:** Visual indicators must be non-directional (avoid arrows, "ahead/behind," or red/green semantics; use neutral bars, dots, or timelines)
- **Why this matters:** This belongs in acceptance criteria so design doesn't drift later. Non-directional visuals prevent implicit judgment.
- **Observational language:** "You're at X% of your goal" not "You're behind!" or "Great job!"
- **No shame:** Setbacks are acknowledged neutrally ("Your timeline has adjusted" not "You failed")
- **Optional visibility:** User can hide or dismiss progress tracking (no forced visibility)
- **Non-intrusive updates:** Progress updates are visible but not alerting (no popups, no notifications)
- **Milestone acknowledgments:** Acknowledge milestones reached ("You've reached 25% of your goal") without pressure

**Technical Notes:**
- Progress calculation: `(currentAmount / targetAmount) * 100 = percentage`
- Timeline progress: `monthsElapsed / monthsProjected = timeline percentage`
- Auto-update: Link transactions to goal (optional, user-controlled)
- Manual update: Allow user to adjust current amount manually
- Progress component: Use `MsProgress` from UX spec (no streaks, no judgment)
- Aligns with UX Journey 4: Progress tracking without pressure

**FRs covered:** FR-M28 (track progress toward goal)

---

### Story 4.6: Implement Scenario Action Impact Visualization

As a user,
I want to see how different actions affect my goal timeline,
So that I can explore options without being told what to do.

**Acceptance Criteria:**

**Given** scenario comparison exists (Story 4.3) and forecasting exists (Story 4.4)
**When** I implement action impact visualization
**Then** the system can:
- Show how changing payment/savings rate affects timeline
- Display impact of one-time contributions (windfalls, bonuses)
- Visualize timeline changes when assumptions are adjusted
- Compare impact across scenarios (side-by-side comparison)
- Use descriptive language ("Increasing your payment by $50 shortens your timeline by 2 months" not "You should increase your payment")
- Update visualizations in real-time as user adjusts inputs
**And** action impact visualization is descriptive, not prescriptive (shows outcomes, not recommendations)
**And** action impact visualization does not imply urgency or pressure
**And** action impact visualization is interactive (user can adjust inputs and see results)
**And** all changes are reversible (no locked states)

**Action Impact Contract:**
- **Descriptive only:** Visualizations describe potential outcomes, not recommended actions
- **Interactive exploration:** User can adjust inputs and see results in real-time (no commitment)
- **No recommendations:** System shows "if you do X, then Y" not "you should do X"
- **Reversible changes:** All input adjustments are reversible (no locked states)
- **Equal comparison:** Impact comparisons show equal visual weight (no "best option" highlighting)

**No Action Recommendations (Anti-Drift Guardrail):**
- **Explicit constraint:** No default action suggestions anywhere in action impact visualization
- **Explicit constraint:** No "try this instead" prompts or recommendations
- **Why this matters:** This guards against future PM "helpfulness" that would erode the exploration-first philosophy

**Technical Notes:**
- Impact calculation: Recalculate timeline when inputs change (payment rate, one-time contributions)
- Real-time updates: Update visualizations as user types or adjusts sliders
- Comparison display: Side-by-side impact comparison (equal visual weight)
- Input controls: Sliders, number inputs, date pickers (all reversible)
- Visualization component: Charts or graphs showing timeline impact (descriptive, not prescriptive)
- Aligns with UX Journey 4: Exploring "what if" safely

**FRs covered:** FR-M29 (see how different actions affect goal timeline)

---

### Story 4.7: Implement Goal Plan Adjustment

As a user,
I want to adjust my goal plan when my situation changes,
So that I can adapt without feeling like I've failed.

**Acceptance Criteria:**

**Given** goal data structure exists (Story 4.2) and progress tracking exists (Story 4.5)
**When** I implement goal plan adjustment
**Then** the system allows users to:
- Extend timeline (adjust target date)
- Increase or decrease payments/savings rate
- Pause goal (temporarily stop progress tracking)
- Adjust target amount (increase or decrease goal)
- Cancel goal (permanently stop, with optional reason capture)
**And** all adjustments are reversible (no locked states)
**And** adjustments use neutral, non-shaming language ("Adjust your plan" not "You're behind!")
**And** adjustments do not imply failure or judgment (no "you failed" language)
**And** adjustments are saved automatically (no confirmation required, user can undo)
**And** paused goals can be resumed at any time (no time limit, no penalty)
**And** goal adjustment screen has explicit "Done for now" affordance (user can leave without resolution)

**Goal Adjustment Contract:**
- **All changes reversible:** Timeline, rate, target amount, pause, cancel (all reversible)
- **No shame:** Adjustments are framed as adaptation, not failure ("Adjust your plan" not "You're behind!")
- **Pause behavior:** Paused goals can be resumed at any time (no time limit, no penalty)
- **Cancel behavior:** Cancelled goals can be recreated (no permanent lock-out)
- **Automatic save:** All adjustments saved automatically (no confirmation, user can undo)
- **Undo visibility:** Automatic save must preserve undo - visible undo window, no irreversible writes
- **Why this matters:** This is critical to Builder trust. Users must be able to revert changes even with auto-save.
- **Neutral language:** "Adjust your plan" not "You're failing" or "You need to catch up"

**Technical Notes:**
- Adjustment UI: Form inputs for timeline, rate, target amount (all editable)
- Pause/resume: Toggle goal state (active ↔ paused)
- Cancel/recreate: Delete goal, allow recreation (no permanent lock-out)
- Auto-save: Save adjustments automatically (localStorage or backend)
- Undo capability: Allow user to revert recent changes (optional, post-MVP)
- Aligns with UX Journey 4: Reversible changes, no locked states

**FRs covered:** FR-M30 (adjust goal plan)

---

### Story 4.8: Implement Goal Setback Handling

As a user,
I want the system to handle setbacks gracefully,
So that I don't feel judged when my situation changes or I fall behind.

**Acceptance Criteria:**

**Given** goal plan adjustment exists (Story 4.7) and progress tracking exists (Story 4.5)
**When** I implement setback handling
**Then** the system can:
- Detect when user falls behind timeline (current progress < projected progress)
- Offer plan adjustment options (extend timeline, adjust rate, pause goal)
- Use neutral, non-shaming language ("Your timeline has adjusted" not "You're behind!" or "You failed!")
- Acknowledge setbacks without judgment ("Things change. Want to adjust your plan?" not "You need to catch up!")
- Provide clear adjustment options (extend timeline, adjust rate, pause, cancel)
- Allow user to dismiss setback notification (no forced action)
**And** setback handling does not imply failure or judgment (no "you failed" language)
**And** setback handling does not create urgency or pressure (no "you need to catch up" language)
**And** setback handling is optional (user can dismiss, no forced adjustment)
**And** setback notifications are non-intrusive (no popups, no alerts, visible but calm)

**Setback Handling Contract:**
- **Neutral language:** "Your timeline has adjusted" not "You're behind!" or "You failed!"
- **No judgment:** Setbacks are acknowledged as normal ("Things change" not "You need to catch up!")
- **Optional response:** User can dismiss setback notification (no forced action)
- **Adjustment options:** Offer clear options (extend timeline, adjust rate, pause, cancel) without pressure
- **Non-intrusive:** Setback notifications are visible but calm (no popups, no alerts)
- **No shame:** Setbacks are framed as adaptation, not failure

**Setback Detection Constraint (Soft Inference Only):**
- **Soft inference required:** "Detection" must be soft inference, never hard rules
- **Language framing:** Use "It looks like things changed" not "You missed your target"
- **Why this matters:** Document this now to avoid future logic creep. Soft inference preserves agency and prevents system from making definitive judgments.
- **Threshold-based detection:** Compare current progress to projected progress, but frame as observation, not fact

**Technical Notes:**
- Setback detection: Compare current progress to projected progress (threshold-based, soft inference)
- Notification component: Use `MsNotice` pattern (visible but calm, dismissible)
- Adjustment flow: Link to goal adjustment UI (Story 4.7)
- Dismiss behavior: Allow user to dismiss notification (no forced action)
- Frequency: Show setback notification once per setback event (not repeatedly)
- Aligns with UX Journey 4: Setback handling without shame

**FRs covered:** FR-M31 (handle goal setbacks with plan adjustment options)

---

### Story 4.9: Implement Goal Achievement Acknowledgment

As a user,
I want my goal achievements to be acknowledged,
So that I can celebrate milestones without feeling pressure to set new goals.

**Acceptance Criteria:**

**Given** progress tracking exists (Story 4.5)
**When** I implement goal achievement acknowledgment
**Then** the system can:
- Detect when goal is achieved (current amount >= target amount)
- Detect when milestone is reached (quarterly or monthly milestones)
- Acknowledge achievements with neutral, warm language ("You've reached your goal" not "Great job!" or "You did it!")
- Acknowledge milestones without pressure ("You've reached 25% of your goal" not "Keep going!")
- Allow user to mark goal as completed (optional, not required)
- Offer option to set new goal (optional, non-coercive, not required)
- Allow user to dismiss acknowledgment (no forced action)
**And** achievement acknowledgment does not create pressure to set new goals (no "What's next?" prompts)
**And** achievement acknowledgment is non-intrusive (no popups, no alerts, visible but calm)
**And** achievement acknowledgment uses warm but not motivational language (expressive, not motivational)
**And** completed goals can be archived or deleted (user choice, no pressure)

**Achievement Acknowledgment Contract:**
- **Neutral warmth:** "You've reached your goal" not "Great job!" or "You did it!" (warm but not motivational)
- **No pressure:** Achievement acknowledgment does not create pressure to set new goals (no "What's next?" prompts)
- **Optional next step:** Offer option to set new goal (optional, non-coercive, not required)
- **Non-intrusive:** Acknowledgment is visible but calm (no popups, no alerts)
- **Dismissible:** User can dismiss acknowledgment (no forced action)
- **Silence-after-achievement opt-out:** User can explicitly close acknowledgment without reading, and never see celebration again
- **Why this matters:** Silence after success is as important as silence after failure. Users must be able to opt out of celebration.
- **Archive/delete:** Completed goals can be archived or deleted (user choice, no pressure)

**Technical Notes:**
- Achievement detection: Compare current amount to target amount (threshold-based)
- Milestone detection: Calculate quarterly or monthly milestones based on timeline
- Acknowledgment component: Use `MsNotice` pattern (visible but calm, dismissible)
- Goal completion: Allow user to mark goal as completed (optional, not automatic)
- New goal offer: Optional, non-coercive link to goal creation (no pressure)
- Aligns with UX Journey 4: Achievement acknowledgment without pressure

**FRs covered:** FR-M32 (acknowledge goal achievements)

---

### Story 4.10: Implement Builder Mode Downgrade to Foundation (Should-Have)

As a user,
I want to downgrade from Builder Mode to Foundation Mode,
So that I can return to simpler tools when I no longer need advanced features.

**Acceptance Criteria:**

**Given** Builder Mode exists (Stories 4.1-4.9) and Foundation Mode exists (Epic 3)
**When** I implement mode downgrade
**Then** there is a mode downgrade feature that:
- Allows user to switch from Builder Mode to Foundation Mode
- Preserves Foundation Mode data (transactions, categories, patterns)
- Preserves Builder Mode data (scenarios, goals) for potential return
- Uses neutral, non-shaming language ("Switch to Foundation Mode" not "You're not ready for Builder!")
- Provides clear explanation of what changes ("You'll keep your transactions, but goals and scenarios will be paused")
- Requires explicit user action (no automatic downgrade)
- Allows user to return to Builder Mode later (no permanent lock-out)
**And** mode downgrade does not imply failure or judgment (no "you're not ready" language)
**And** mode downgrade does not create pressure to stay in Builder Mode (no retention nudges)
**And** mode downgrade is reversible (user can return to Builder Mode later)
**And** downgraded Builder data is preserved (scenarios, goals saved but hidden)

**Mode Downgrade Contract:**
- **Explicit action:** User must explicitly choose to downgrade (no automatic downgrade)
- **User-initiated only:** Downgrade is user-initiated only; never triggered by system heuristics (no "smart nudges" to downgrade)
- **Why this matters:** This prevents later "smart nudges" that would erode agency. System never suggests or triggers downgrade.
- **Data preservation:** Foundation data preserved, Builder data preserved but hidden (for potential return)
- **Neutral language:** "Switch to Foundation Mode" not "You're not ready for Builder!" or "Downgrade"
- **Reversible:** User can return to Builder Mode later (no permanent lock-out)
- **No shame:** Downgrade is framed as choice, not failure ("You can switch back anytime" not "You're giving up")
- **Clear explanation:** Explain what changes (transactions kept, goals/scenarios paused)

**Technical Notes:**
- Downgrade UI: Settings or mode switcher option (explicit, not hidden)
- Data handling: Preserve Builder data in database/localStorage (hidden but not deleted)
- Mode switch: Update user mode preference (Builder → Foundation)
- Return path: Allow user to return to Builder Mode (restore hidden data)
- Aligns with UX Narrative Mode Transitions: Mode downgrade/pause

**FRs covered:** FR-S34 (downgrade from Builder Mode to Foundation Mode - should-have)

---

## Epic 5: Organization Management: Stories

### Epic 5 Success Definition (Critical Reframe)

**Canon:**
Organization Management is successful when organizations can sponsor clients and track engagement without accessing individual financial data. Sponsorship without surveillance is the core ethic.

**Why this matters:**
This is the most important Organization Management clarification. Without it:
- Individual financial data becomes visible to org admins
- Surveillance replaces sponsorship
- Trust between clients and organizations erodes

This sentence explicitly preserves the core ethic: **sponsorship enables access, it does not enable surveillance.**

**Enforcement:**
- All Organization Management stories must align with this success definition
- Individual financial data must never be visible to organization admins
- Aggregated data only, with explicit opt-in for outcomes data
- Client list shows engagement metrics, not financial details

**Canonical Principle (Non-Negotiable):**
Organizations fund access. People retain agency. Data serves learning, not control.

If a feature violates any part of that sentence, it does not ship.

**Client-Facing Outcomes (Explicit Protection):**
While this epic is organization-facing, the following client outcomes must be preserved:
- **Clients are never ranked, scored, or compared** (no client-level performance metrics)
- **Clients are never penalized for inactivity** (no inactivity-based consequences)
- **Sponsorship changes never feel punitive or abrupt** (graceful transitions, clear communication)
- **Clients always retain autonomy over mode usage** (org sponsorship enables access, does not control behavior)

**Anti-Goals (Explicit Prohibitions):**
- No client ranking or scoring
- No inactivity penalties
- No behavioral nudging via org pressure
- No financial performance framing tied to individuals
- No cost-per-client or cost-per-outcome framing (prevents instrumentalizing people)

**Language Consistency (Internal Alignment):**
- **Avoid "management" in UI copy:** Prefer "sponsorship," "support," or "access"
- **Why this matters:** This keeps organizations psychologically positioned as funders of access, not overseers of behavior
- **Epic positioning:** Epic 5 is about relationship stewardship, not administration

**Dependencies (Critical Clarifications):**
- **Epic 2 (User Authentication & Account Management):** Hard dependency - all org admin features require authentication
- **Epic 6 (License & Billing Management):** Hard dependency - license lifecycle, transitions, and billing calculation
- **Epic 8 (Data Privacy & Security):** Contract dependency (critical) - this epic relies heavily on:
  - RLS correctness (organization-level isolation at database level)
  - Anonymization guarantees (client identifiers removed from aggregated results)
  - Aggregation thresholds (minimum thresholds to prevent re-identification)
  - Opt-in consent mechanism (clients must explicitly opt in to share outcomes)
  - Instrumentation boundaries (what is tracked, what is not tracked, what is permanently excluded)
- **Why this matters:** Even org metrics depend on what is tracked, what is not tracked, and what is permanently excluded. Epic 8 should be treated as a contract dependency, even if implementation lags.

---

### Story 5.1:

Gating Requirement:
- Epic 8 Story 8.1 (Row-Level Security) MUST be implemented and verified before this story is started.
 Implement Organization Account Creation

As an organization administrator,
I want to create an organization account,
So that I can sponsor clients and manage licenses.

**Acceptance Criteria:**

**Given** user authentication exists (Epic 2)
**When** I implement organization account creation
**Then** there is an organization account creation flow that:
- Allows organization admins to create organization accounts
- Collects organization details: organization name, primary contact (email, phone), Tax ID (EIN) for invoicing
- Sets up organization admin users (who can assign licenses and view reports)
- Configures license settings: license duration options (6 months, 12 months, 18 months, indefinite)
- Creates organization record in database with admin users
- Links organization to admin user accounts (many-to-many relationship)
**And** organization account creation requires authentication (admin must be logged in)
**And** organization account creation requires CSRF token (Origin allowlist + double-submit)
**And** organization account creation follows trauma-informed principles (clear, non-coercive language)
**And** for MVP, organization setup can be done manually (hands-on onboarding call)

**Organization Account Contract:**
- **Organization fields:** `id`, `name`, `primaryContactEmail`, `primaryContactPhone`, `taxId` (EIN), `createdAt`, `updatedAt`
- **Admin users:** Many-to-many relationship (multiple admins per org, admins can belong to multiple orgs)
- **License configuration:** Duration options (6 months, 12 months, 18 months, indefinite)
- **Manual onboarding (MVP):** Organizations cannot self-serve into advanced capabilities in MVP; manual onboarding is a safeguard, not a limitation
- **Why this matters:** This prevents pressure to automate prematurely and ensures proper setup and training before orgs gain access to client management features
- **Post-MVP:** Self-serve onboarding with video tutorials (after manual onboarding proves safe and effective)

**Technical Notes:**
- Organization model: TypeScript interface/type definition
- Organization storage: Backend database (PostgreSQL with RLS)
- Admin relationship: Many-to-many join table (organizations_users or similar)
- CSRF protection: Required on organization creation (state-changing request)
- MVP workflow: Manual setup during onboarding call (post-MVP: self-serve with video tutorials)
- Aligns with Security Model Canon (multi-tenant isolation via RLS)

**FRs covered:** FR-M35 (organization admins create organization accounts)

---

### Story 5.2:

Gating Requirement:
- Epic 8 Story 8.1 (Row-Level Security) MUST be implemented and verified before this story is started.
 Implement License Assignment via Email Invitation

As an organization administrator,
I want to assign licenses to clients via email invitation,
So that I can sponsor client access without requiring them to have accounts first.

**Acceptance Criteria:**

**Given** organization account creation exists (Story 5.1) and email service exists (Story 2.6)
**When** I implement license assignment
**Then** there is a license assignment feature that:
- Allows org admin to assign license to client via email invitation
- Collects client information: client name, client email, license duration (6 months, 12 months, 18 months, indefinite)
- Creates license record in database (linked to organization and client email)
- Sends email invitation to client with license details and activation link
- Shows clear explanation: "What client gets" (Foundation Mode free, Builder Mode free while sponsored)
- Shows clear explanation: "What happens when license ends" (6-month discount, then standard pricing, no benefit cliff)
- Tracks license status: `pending` (invited, not activated), `active` (client activated), `expired` (not activated within 30 days)
**And** license assignment requires authentication (org admin must be logged in)
**And** license assignment requires CSRF token (Origin allowlist + double-submit)
**And** license assignment works for MVP via email only (code-based and CSV bulk import deferred to post-MVP)
**And** email invitation includes clear activation instructions and link

**License Assignment Contract:**
- **Assignment method:** Email invitation only for MVP (code-based and CSV bulk import deferred to post-MVP)
- **License status:** `pending` (invited, not activated), `active` (client activated), `expired` (not activated within 30 days)
- **License duration:** 6 months, 12 months, 18 months, indefinite (until org ends sponsorship)
- **Client access:** Foundation Mode (always free), Builder Mode (free while org-sponsored)
- **Transition clarity:** Email explains what happens when license ends (6-month discount, then standard pricing)

**Email Invitation Contract:**
- **Email content:** Clear explanation of license benefits, activation link, organization name
- **Activation link:** Links to client account creation or license activation flow
- **Language constraints (non-negotiable):**
  - Invitation language emphasizes access, not obligation
  - Declining or ignoring an invite has no negative consequence (explicitly stated or implied)
  - No urgency language ("Act now", "Limited time", "Don't miss out")
  - No obligation framing ("You must", "You should", "You need to")
  - Clear, non-coercive, explains benefits without pressure
- **Email delivery:** Uses configured email service (SendGrid, SES, etc.) or logs for dev

**Technical Notes:**
- License model: `id`, `organizationId`, `clientEmail`, `clientName`, `duration`, `status`, `createdAt`, `activatedAt`, `expiresAt`
- License storage: Backend database (PostgreSQL with RLS)
- Email service: Use configured email service (Story 2.6) or log for dev
- Activation flow: Client receives email, clicks link, creates account or activates license
- Status tracking: Update license status when client activates (pending → active)
- Aligns with Security Model Canon (multi-tenant isolation)

**FRs covered:** FR-M36 (assign licenses to clients via email invitation)

---

### Story 5.3: Implement Client List View

As an organization administrator,
I want to view my client list with engagement information,
So that I can see who is using the platform without accessing their financial data.

**Acceptance Criteria:**

**Given** license assignment exists (Story 5.2)
**When** I implement client list view
**Then** there is a client list view that displays:
- Client name (from license assignment)
- Client email (from license assignment)
- Client mode (Crisis, Foundation, Builder - current mode)
- License status (pending, active, expired)
- Last active date (last login or session, not financial activity)
- License expiration date (if applicable)
**And** client list does NOT display:
- Individual financial data (transactions, balances, goals, scenarios)
- Household composition or household-level data
- Personal financial details of any kind
**And** client list is filtered by organization (org admin only sees their clients)
**And** client list supports basic filtering (by status, mode, expiration date)
**And** client list supports basic sorting (by name, last active, expiration date)
**And** client list requires authentication (org admin must be logged in)
**And** client list respects RLS policies (organization-level isolation)

**Client List Data Boundary (Non-Negotiable):**
- **What is visible:** Name, email, mode, status, last active, expiration date
- **What is NOT visible:** Individual financial data, transactions, balances, goals, scenarios, household composition
- **Why this matters:** This preserves the "sponsorship without surveillance" ethic. Organizations sponsor access, they do not monitor financial behavior.
- **Enforcement:** RLS policies must enforce this boundary at the database level (defense-in-depth)

**Activity Timestamp Constraints (Critical):**
- **"Last active" is a risk field** - precise timestamps become evaluative
- **Activity timestamps must be rounded:** e.g., "this week", "this month", "last 30 days"
- **Not precise:** Never show "3 days ago" or exact timestamps (becomes passive surveillance)
- **Why this matters:** Rounded timestamps prevent org admins from inferring patterns or making judgments about client activity frequency

**Technical Notes:**
- Client list endpoint: `GET /api/v1/organizations/{orgId}/clients`
- Data aggregation: Join licenses with user accounts (if activated), aggregate mode and last active
- RLS enforcement: Organization-level RLS policies ensure org admins only see their clients
- Filtering: Query parameters for status, mode, expiration date
- Sorting: Query parameters for sort field and direction
- Aligns with Security Model Canon (Section 6: Data Access & Isolation)

**FRs covered:** FR-M37 (view client list - name, email, mode, status, last active)

---

### Story 5.4: Implement Client Engagement Metrics

As an organization administrator,
I want to see client engagement metrics,
So that I can understand usage patterns without accessing individual financial data.

**Acceptance Criteria:**

**Given** client list view exists (Story 5.3)
**When** I implement engagement metrics
**Then** there is an engagement metrics dashboard that displays:
- Total licenses assigned (count)
- Active licenses (count of clients who activated and are active in last 30 days)
- Activation rate (percentage of assigned licenses that were activated)
- Session frequency (average sessions per client, aggregated)
- Mode distribution (count of clients in Crisis, Foundation, Builder modes)
- Recent activity (list of recent activations, mode switches, last active dates)
**And** engagement metrics are aggregated only (no individual client details in metrics)
**And** engagement metrics do NOT include:
- Individual financial data
- Individual transaction counts or amounts
- Individual goal progress or achievement
- Household-level financial data
**And** engagement metrics are filtered by organization (org admin only sees their org's metrics)
**And** engagement metrics require authentication (org admin must be logged in)
**And** engagement metrics respect RLS policies (organization-level isolation)

**Engagement Metrics Contract:**
- **Aggregated only:** All metrics are aggregated (counts, averages, percentages)
- **No individual data:** No individual client details in metrics (no "Client X did Y")
- **Session-based:** Metrics based on sessions, logins, mode usage (not financial activity)
- **Time windows:** Metrics calculated over time windows (last 30 days, last 90 days, etc.)
- **Privacy boundary:** Engagement metrics never include financial data (transactions, balances, goals)

**Explicit Prohibitions (Non-Negotiable):**
- **No client-level drill-down:** Org admins cannot click into individual client details from metrics
- **No export of raw engagement logs:** Metrics are aggregated only; raw logs are never exported
- **Why this matters:** This prevents org admins from reconstructing individual client behavior patterns, preserving the "sponsorship without surveillance" ethic

**Technical Notes:**
- Metrics endpoint: `GET /api/v1/organizations/{orgId}/metrics`
- Metrics calculation: Aggregate license status, user sessions, mode usage (server-side aggregation)
- RLS enforcement: Organization-level RLS policies ensure org admins only see their org's metrics
- Time windows: Configurable time windows (default: last 30 days)
- Caching: Consider caching aggregated metrics (post-MVP optimization)
- Aligns with Security Model Canon (Section 6: Data Access & Isolation)

**FRs covered:** FR-M38 (see client engagement metrics - activated/not activated, session frequency)

---

### Story 5.5: Implement Aggregated Outcomes Data View (Opt-In Only)

As an organization administrator,
I want to view aggregated, anonymized outcomes data if clients opt in,
So that I can understand program effectiveness without accessing individual financial data.

**Acceptance Criteria:**

**Given** engagement metrics exist (Story 5.4) and client opt-in exists (Epic 8)
**When** I implement aggregated outcomes data view
**Then** there is an outcomes data view that displays:
- Aggregated outcomes metrics (only if clients have opted in)
- Anonymized data only (no individual client identification)
- Aggregate statistics: average outcomes, distribution ranges, trends over time
- Opt-in status: Clear indication of how many clients have opted in
- Data scope: Only outcomes data that clients explicitly opted in to share
**And** outcomes data view requires explicit client opt-in (Epic 8: clients must opt in to share outcomes)
**And** outcomes data is aggregated only (no individual client data)
**And** outcomes data is anonymized (no client identification in outcomes)
**And** outcomes data does NOT include:
- Individual financial transactions
- Individual balances or account details
- Individual goals or scenarios
- Household-level financial data
**And** outcomes data view requires authentication (org admin must be logged in)
**And** outcomes data view respects RLS policies (organization-level isolation)

**Aggregated Outcomes Data Contract:**
- **Opt-in required:** Clients must explicitly opt in to share outcomes data (Epic 8)
- **Aggregated only:** All outcomes data is aggregated (averages, distributions, trends)
- **Anonymized:** No individual client identification in outcomes data
- **Scope:** Only outcomes data that clients opted in to share (not all data)
- **Privacy boundary:** Outcomes data never includes individual financial transactions, balances, or goals

**Dependency Notes (Critical):**
- **Epic 8 (Data Privacy & Security) - Contract Dependency:** This story depends on Epic 8 for:
  - Opt-in consent mechanism (clients must explicitly opt in)
  - Anonymization guarantees (client identifiers removed from aggregated results)
  - RLS correctness (organization-level isolation enforced at database level)
  - Aggregation thresholds (minimum thresholds to prevent re-identification)
- **Why this matters:** Even org metrics depend on what is tracked, what is not tracked, and what is permanently excluded. This should be a contract dependency, even if implementation lags.

**Technical Notes:**
- Outcomes endpoint: `GET /api/v1/organizations/{orgId}/outcomes`
- Opt-in check: Verify client opt-in status before including data in aggregation
- Aggregation: Server-side aggregation of opted-in outcomes data
- Anonymization: Remove client identifiers from aggregated results (Epic 8 guarantees)
- RLS enforcement: Organization-level RLS policies ensure org admins only see their org's outcomes (Epic 8 guarantees)
- Aligns with Epic 8: Data Privacy & Security (opt-in outcomes sharing, anonymization, RLS)

**FRs covered:** FR-M39 (view aggregated anonymized outcomes data - opt-in only)

---

### Story 5.6: Implement Billing Information View

As an organization administrator,
I want to view billing information for my organization,
So that I can understand usage and manage payment.

**Acceptance Criteria:**

**Given** organization account exists (Story 5.1) and license assignment exists (Story 5.2)
**When** I implement billing information view
**Then** there is a billing information view that displays:
- Current billing period usage (number of active clients, billing calculation)
- Payment method (current payment method on file)
- Invoices (list of past invoices with amounts, dates, status)
- Billing history (past billing periods and amounts)
- License usage summary (total assigned, active, expiring)
**And** billing information view requires authentication (org admin must be logged in)
**And** billing information view requires CSRF token for payment method updates (Origin allowlist + double-submit)
**And** billing information is filtered by organization (org admin only sees their org's billing)
**And** billing information respects RLS policies (organization-level isolation)
**And** billing information follows trauma-informed principles (clear, transparent, no hidden fees)

**Billing Information Contract:**
- **Usage display:** Clear display of active clients and billing calculation
- **No cost-per-client framing:** Billing data must never be framed as "cost per client" or "cost per outcome" (prevents instrumentalizing people)
- **Stick to totals:** Display totals and license counts only (not per-client breakdowns)
- **Payment method:** Current payment method on file (can be updated)
- **Invoices:** List of past invoices (amounts, dates, status, downloadable)
- **Transparency:** Clear billing structure (base fee + per-client fee, no hidden costs)
- **Pilot support:** MVP supports manual billing (hands-on), post-MVP automated billing

**Technical Notes:**
- Billing endpoint: `GET /api/v1/organizations/{orgId}/billing`
- Payment method update: `PUT /api/v1/organizations/{orgId}/billing/payment-method` (requires CSRF)
- Invoice storage: Store invoices in database or external billing system
- Billing calculation: Calculate based on active clients (Epic 6: License & Billing Management)
- RLS enforcement: Organization-level RLS policies ensure org admins only see their org's billing
- Aligns with Security Model Canon (CSRF protection for payment method updates)

**FRs covered:** FR-M41 (view billing information - usage, payment method, invoices)

---

### Story 5.7: Implement End Sponsorship for Individual Clients

As an organization administrator,
I want to end sponsorship for individual clients,
So that I can manage my license portfolio while ensuring clients have a smooth transition.

**Acceptance Criteria:**

**Given** license assignment exists (Story 5.2) and license lifecycle exists (Epic 6)
**When** I implement end sponsorship
**Then** there is an end sponsorship feature that:
- Allows org admin to end sponsorship for individual clients
- Transitions client license to transition period (6-month discount period, Epic 6)
- Notifies client of sponsorship end (email notification with transition details)
- Preserves client data and access (client retains access during transition period)
- Uses clear, non-coercive language ("Your sponsorship is ending" not "Your access is being revoked")
- Provides clear explanation of transition period (6-month discount, then standard pricing)
**And** end sponsorship requires authentication (org admin must be logged in)
**And** end sponsorship requires CSRF token (Origin allowlist + double-submit)
**And** end sponsorship is reversible (org admin can extend license before transition period ends)
**And** end sponsorship does not revoke client access immediately (transition period preserves access)
**And** end sponsorship follows trauma-informed principles (clear communication, no abrupt access loss)

**End Sponsorship Contract:**
- **Transition period:** Client enters 6-month discount period (Epic 6: License & Billing Management)
- **Grace period:** Explicit grace period before transition period begins (client retains full access during grace period)
- **Explicit client notice:** Client must receive explicit notice before transition period begins (email notification with clear transition details)
- **No silent downgrades:** End sponsorship never happens silently; client is always notified in advance
- **Access preservation:** Client retains access during transition period (no abrupt access loss)
- **Client notification:** Email notification with clear transition details (discount period, standard pricing, when it takes effect)
- **Reversible:** Org admin can extend license before transition period ends (undo end sponsorship)
- **No benefit cliff:** Gradual transition (discount period → standard pricing), not abrupt access loss
- **Language:** "Your sponsorship is ending" not "Your access is being revoked" (clear, non-coercive)
- **Why this matters:** This is one of the highest emotional-risk actions in the system. Grace period, explicit notice, and no silent downgrades are critical for preserving trust.

**Technical Notes:**
- End sponsorship endpoint: `POST /api/v1/organizations/{orgId}/licenses/{licenseId}/end-sponsorship`
- License transition: Update license status to transition period (Epic 6: License lifecycle state machine)
- Client notification: Send email notification with transition details (uses email service)
- Reversibility: Allow org admin to extend license before transition period ends
- CSRF protection: Required on end sponsorship (state-changing request)
- Aligns with Epic 6: License & Billing Management (transition period handling)

**FRs covered:** FR-M44 (end sponsorship for individual clients - client enters transition period)

---

### Story 5.8: Implement License Extension (Should-Have)

As an organization administrator,
I want to extend individual client licenses,
So that I can continue sponsoring clients who need more time.

**Acceptance Criteria:**

**Given** license assignment exists (Story 5.2)
**When** I implement license extension
**Then** there is a license extension feature that:
- Allows org admin to extend individual client licenses
- Provides duration options (extend by 6 months, 12 months, 18 months, indefinite)
- Updates license expiration date (if fixed-term) or extends indefinite license
- Notifies client of license extension (optional email notification)
- Preserves client data and access (no interruption)
- Uses clear, non-coercive language ("License extended" not "License renewed!")
**And** license extension requires authentication (org admin must be logged in)
**And** license extension requires CSRF token (Origin allowlist + double-submit)
**And** license extension is reversible (org admin can end sponsorship later)
**And** license extension does not interrupt client access (seamless extension)

**License Extension Contract:**
- **Duration options:** Extend by 6 months, 12 months, 18 months, or make indefinite
- **Seamless extension:** No interruption to client access (extension happens automatically)
- **Client notification:** Optional email notification (org admin choice, not required)
- **Reversible:** Org admin can end sponsorship later (extension does not lock in)
- **Language:** "License extended" not "License renewed!" (neutral, not celebratory)

**Technical Notes:**
- License extension endpoint: `POST /api/v1/organizations/{orgId}/licenses/{licenseId}/extend`
- License update: Update license expiration date or set to indefinite
- Client notification: Optional email notification (if org admin chooses)
- CSRF protection: Required on license extension (state-changing request)
- Aligns with Epic 6: License & Billing Management (license lifecycle)

**FRs covered:** FR-S42 (extend individual client licenses - should-have)

---

### Story 5.9: Implement License Expiration Notifications (Should-Have)

As an organization administrator,
I want to be notified before licenses expire,
So that I can make renewal decisions with clear information about value and usage.

**Acceptance Criteria:**

**Given** license assignment exists (Story 5.2) and engagement metrics exist (Story 5.4)
**When** I implement expiration notifications
**Then** there is a license expiration notification system that:
- Notifies org admin 30 days before licenses expire (email notification)
- Provides renewal decision support (proactive value summary)
- Shows engagement metrics: activation rate, active clients, mode distribution, outcomes (if opted in)
- Offers renewal options: "Yes, renew" / "No, let licenses expire" / "Need more info"
- Uses clear, value-focused language ("Here's what we've seen" not "You need to renew!")
- Does not create urgency or pressure (no countdown, no "limited time" language)
**And** expiration notifications are sent via email (org admin email)
**And** expiration notifications include clear renewal options (no forced action)
**And** expiration notifications respect opt-in boundaries (only show outcomes data if clients opted in)
**And** expiration notifications follow trauma-informed principles (clear information, no pressure)

**Expiration Notification Contract:**
- **Timing:** Notify 30 days before licenses expire (proactive, not last-minute)
- **Dual notifications:** Notifications go to:
  - **Org admins:** Renewal decision support with value summary
  - **Clients (separately, differently worded):** Client messaging must emphasize continuity and agency, not dependency
- **Client messaging:** Client notifications emphasize:
  - Continuity ("Your access continues during transition")
  - Agency ("You can continue at a discounted rate, then standard pricing")
  - No dependency framing ("You're not dependent on sponsorship" not "Your access depends on renewal")
- **Value summary:** Show engagement metrics and outcomes (if opted in) to support renewal decision
- **Renewal options:** Clear options (renew, let expire, need more info) without pressure
- **No urgency:** No countdown, no "limited time" language, no pressure
- **Opt-in respect:** Only show outcomes data if clients opted in (Epic 8)

**Renewal Decision Support Contract:**
- **Proactive value:** Show value 30 days before expiration (activation rate, active clients, mode distribution, outcomes)
- **Clear options:** "Yes, renew" / "No, let licenses expire" / "Need more info"
- **No pressure:** Makes renewal easy by showing value, not by creating urgency
- **Language:** "Here's what we've seen" not "You need to renew!" (informational, not directive)

**Technical Notes:**
- Notification system: Background job or scheduled task (check expiring licenses daily)
- Email delivery: Use configured email service (SendGrid, SES, etc.) or log for dev
- Value summary: Aggregate engagement metrics and outcomes (if opted in) for renewal decision support
- Renewal flow: Link to license extension or renewal UI (Story 5.8)
- Aligns with Epic 6: License & Billing Management (expiration handling)

**FRs covered:** FR-S43 (notify before licenses expire - with renewal decision support - should-have)

---

### Story 5.10: Implement Automated Engagement Reports (Future)

As an organization administrator,
I want to generate automated engagement reports,
So that I can provide compliance reporting for grants without accessing individual financial data.

**Acceptance Criteria:**

**Given** engagement metrics exist (Story 5.4) and aggregated outcomes exist (Story 5.5)
**When** I implement engagement reports
**Then** there is an engagement report generation feature that:
- Generates PDF reports with engagement metrics (activation rate, active clients, mode distribution)
- Includes aggregated outcomes data (only if clients opted in)
- Excludes individual financial data (no transactions, balances, goals)
- Provides report templates (standard engagement report format)
- Allows report download (PDF export)
- Uses clear, compliance-friendly language (suitable for grant reporting)
**And** engagement reports require authentication (org admin must be logged in)
**And** engagement reports respect opt-in boundaries (only include outcomes data if clients opted in)
**And** engagement reports exclude individual financial data (aggregated only)
**And** engagement reports are filtered by organization (org admin only sees their org's reports)
**And** engagement reports respect RLS policies (organization-level isolation)

**Engagement Report Contract:**
- **Report content:** Engagement metrics, aggregated outcomes (if opted in), mode distribution
- **Exclusions:** No individual financial data, no transactions, no balances, no goals
- **Format:** PDF export (machine-readable, suitable for grant reporting)
- **Templates:** Standard engagement report template (post-MVP: custom report builder)
- **Opt-in respect:** Only include outcomes data if clients opted in (Epic 8)

**Future-Only Rationale (Values Decision, Not Just Scope):**
- **Why deferred:** Keeping this future-only is a values decision, not just scope management
- **Risk if pulled forward:** Automated reports can become compliance tools that pressure orgs to optimize for metrics rather than client outcomes
- **Documentation requirement:** This rationale must be documented so it doesn't get pulled forward casually
- **When to reconsider:** Only after manual reporting proves safe and effective, and after orgs demonstrate they use reports for learning, not control

**Technical Notes:**
- Report generation: Server-side PDF generation (library: PDFKit, jsPDF, or similar)
- Report template: Standard engagement report format (post-MVP: customizable templates)
- Report storage: Generate on-demand or store generated reports (post-MVP optimization)
- Data aggregation: Aggregate engagement metrics and outcomes (if opted in) for report
- RLS enforcement: Organization-level RLS policies ensure org admins only see their org's reports
- Aligns with Epic 8: Data Privacy & Security (aggregated data only)

**FRs covered:** FR-F40 (generate automated engagement reports - PDF export - future)

---

## Epic 6: License & Billing Management: Stories

### Epic 6 Success Definition (Critical Reframe)

**Canon:**
License & Billing Management is successful when the system manages license lifecycle and billing automatically, supporting stable transitions without revoking access. Once issued, licenses cannot be revoked—this is a trust-building requirement.

**Why this matters:**
This is the most important License & Billing Management clarification. Without it:
- Licenses become revocable, eroding trust
- Transitions become abrupt, causing anxiety
- Billing becomes punitive, not supportive
- Clients lose access when they need it most

This sentence explicitly preserves the core ethic: **licenses enable access, they do not control it.**

**Core Principles:**
- **Non-revocable licenses:** Once issued, licenses cannot be revoked (trust-building requirement)
- **Graceful transitions:** License transitions are explicit and non-revoking
- **Engagement-based billing:** Billing based on active clients (engagement-based, not time-based)
- **No benefit cliff:** Gradual transitions (org-sponsored → discount → standard), not abrupt access loss
- **Client agency:** Clients always retain agency over mode usage and payment decisions

**Enforcement:**
- All License & Billing Management stories must align with this success definition
- License transitions must never revoke access
- Billing must be engagement-based, not punitive
- Client notifications must be clear, non-coercive, and advance notice

**Core Assets to Protect (Threat Model):**
Epic 6 sits at a dangerous intersection: Money, Access, Time, Organizational power. This is where many trauma-informed products quietly fail.

1. **Continuity of access** — loss of funding must not equal loss of dignity or tools
2. **Client agency** — payment transitions are choices, not penalties
3. **Trust durability** — billing mechanics never feel like behavioral enforcement
4. **Privacy integrity** — billing never implies surveillance
5. **Mode neutrality** — financial pressure does not steer people into or out of modes

**Threat Surfaces & Hard Lines (Non-Negotiable Guardrails):**

**T1. Engagement-Based Billing → Behavioral Surveillance**
- **Threat:** Billing tied to "active clients" quietly incentivizes monitoring engagement
- **Hard Line:** Engagement affects billing math, not human judgment
- **Mitigations (Must Be Explicit):**
  - Active = binary, coarse, time-boxed (e.g., any session in last 30 days)
  - No gradations ("highly active", "barely active")
  - No per-client visibility to orgs
  - No alerts tied to client inactivity

**T2. License States Becoming Moral States**
- **Threat:** States like DISCOUNTED_SELF_PAY or FOUNDATION_ONLY become read as "lesser"
- **Hard Line:** License states are accounting constructs, not identity markers
- **Mitigations:**
  - License state labels are never shown verbatim to clients
  - Client-facing language always frames: "Your options", "Your choice", "Nothing is being taken away"

**T3. "Non-Revocable" Undermined by Edge Cases**
- **Threat:** Operational edge cases reintroduce revocation "for safety," "for billing," or "for abuse"
- **Hard Line:** Licenses can expire; access does not disappear
- **Mitigations:**
  - Explicitly define what non-revocable means:
    - Access cannot be removed
    - Data cannot be deleted
    - Modes may be reduced only via client-initiated downgrade
    - Any forced access change requires Product Lead + documented exception

**T4. Grace Period Becomes Pressure Funnel**
- **Threat:** Grace periods become countdowns that induce urgency
- **Hard Line:** Grace is temporal buffering, not a behavioral lever
- **Mitigations:**
  - Grace period messaging: calm, non-countdown, non-urgent
  - No timers, no red states, no escalating copy

**T5. Billing Granularity Invites Cost-Per-Person Thinking**
- **Threat:** Base + overage pricing invites "is this client worth $3?" logic
- **Hard Line:** Billing is about capacity, not people
- **Mitigations:**
  - Billing surfaces show ranges, not counts tied to people
  - No cost attribution to individuals
  - Invoices framed as "program access units"

**T6. Mode-Based Pricing Pressure**
- **Threat:** Builder Mode seen as "premium," pushing upsell mechanics
- **Hard Line:** Progression is not monetization
- **Mitigations:**
  - Same billing rate for Foundation and Builder (already encoded)
  - Explicitly forbid mode-based pricing

**T7. Notifications Become Coercive**
- **Threat:** Transition emails drift toward urgency or guilt
- **Hard Line:** Billing communication must preserve calm
- **Mitigations:**
  - Copy canon applies here explicitly: observational, choice-oriented, no threats
  - Mandatory copy review for license communications

**Conceptual Tension Resolution (Philosophical Lock):**
**Engagement-Based Billing vs Non-Surveillance Ethos**

Engagement is used to size programs, not to evaluate people.

This sentence closes the loop: engagement affects billing math (program capacity), not human judgment (individual worth).

**Pressure Test Responses (Canonical Answers):**

**Q: "Can we charge only for highly active users?"**
A: We intentionally do not segment people by intensity. Our pricing reflects access provided, not behavior extracted.

**Q: "Can we suspend access for non-payment?"**
A: No. Access continuity is core to our trust model. Payment transitions are handled without access loss.

**Q: "Can we see which clients are costing us money?"**
A: We don't attribute cost to individuals. Billing is program-level by design.

**Q: "Can Builder Mode be a paid upgrade?"**
A: No. Builder is a cognitive support mode, not a premium feature.

**Final Verdict:**
Epic 6 is aligned with MoneyShyft's values if and only if:
- Engagement remains binary and opaque
- License states stay invisible to clients
- Billing never implies worth or compliance
- Transitions are gentle, not urgent
- Non-revocable truly means non-revocable

This epic is where many ethical systems collapse under financial gravity. These guardrails are non-negotiable.

---

### Story 6.1: Implement License Lifecycle State Machine

As a system,
I want to track license lifecycle states and transitions,
So that licenses can transition gracefully without revoking access.

**Acceptance Criteria:**

**Given** license assignment exists (Epic 5, Story 5.2)
**When** I implement license lifecycle state machine
**Then** there is a license lifecycle state machine that tracks:
- **State 1: Org-Sponsored** (client pays $0)
  - Foundation Mode: Free (always free)
  - Builder Mode: Free (covered by org sponsorship)
  - Duration: As long as org continues sponsoring (6 months, 12 months, 18 months, or indefinite)
- **State 2: Transition Period** (client pays 50% discount)
  - Trigger: Org sponsorship ends (license expires, org doesn't renew, or org ends sponsorship)
  - Foundation Mode: Still free (always free)
  - Builder Mode: $4/month (50% discount from standard $8/month)
  - Duration: 6 months from end of org sponsorship
- **State 3: Standard Pricing** (client pays full price)
  - Trigger: 6-month transition period ends
  - Foundation Mode: Still free (always free)
  - Builder Mode: $8/month (standard price)
  - Duration: Ongoing (month-to-month)
**And** license state machine supports:
- Fixed-term licenses (6 months, 12 months, 18 months)
- Indefinite licenses (continues until org explicitly ends it)
- State transitions (org-sponsored → transition period → standard pricing)
- Grace period (client retains full Builder Mode access for defined grace period after sponsorship ends)
**And** license state machine never revokes access (transitions preserve access, only payment source changes)
**And** license state machine preserves client data (no data loss on transitions)

**License Lifecycle State Machine Contract:**
- **States:**
  - `ORG_SPONSORED`: Client pays $0, org sponsors Builder Mode
  - `GRACE_PERIOD`: Client retains full Builder Mode access, no payment required (30-60 days after sponsorship ends)
  - `DISCOUNTED_SELF_PAY`: Client pays $4/month Builder Mode (50% discount, 6 months)
  - `STANDARD_SELF_PAY`: Client pays $8/month Builder Mode (standard pricing)
  - `FOUNDATION_ONLY`: Client uses free Foundation Mode only
- **Transitions:**
  - `ORG_SPONSORED` → `GRACE_PERIOD` (when org sponsorship ends)
  - `GRACE_PERIOD` → `DISCOUNTED_SELF_PAY` (after grace period, client offered discount)
  - `DISCOUNTED_SELF_PAY` → `STANDARD_SELF_PAY` (after 6 months, client offered standard pricing)
  - Any state → `FOUNDATION_ONLY` (client can downgrade at any time)
- **Non-revocable:** Once issued, licenses cannot be revoked (trust-building requirement)
- **No benefit cliff:** Gradual transitions, not abrupt access loss

**Threat Model Mitigations:**

**T2: License States Becoming Moral States**
- **Hard line:** License states are accounting constructs, not identity markers
- **Mitigations:**
  - License state labels are never shown verbatim to clients (e.g., never show "DISCOUNTED_SELF_PAY" in UI)
  - Client-facing language always frames: "Your options", "Your choice", "Nothing is being taken away"
  - States are internal accounting only; client-facing copy is always choice-oriented and non-judgmental

**T3: "Non-Revocable" Undermined by Edge Cases**
- **Hard line:** Licenses can expire; access does not disappear
- **Explicit definition of non-revocable:**
  - Access cannot be removed (even if org stops paying, client retains access during grace period)
  - Data cannot be deleted (even if license expires, client data is preserved)
  - Modes may be reduced only via client-initiated downgrade (never system-forced)
  - Any forced access change requires Product Lead + documented exception (no silent access loss)
- **Canonical answer:** "No. Access continuity is core to our trust model. Payment transitions are handled without access loss."

**Technical Notes:**
- License state machine: State machine implementation (TypeScript enum or state machine library)
- License storage: Backend database (PostgreSQL with state tracking)
- State transitions: Automated transitions based on time and events (background jobs)
- Grace period: Configurable grace period (30-60 days, default: 30 days)
- Aligns with Architecture: License Lifecycle Management (Non-Revocable Sponsorship Model)

**FRs covered:** FR-M45 (track license lifecycle states - org-sponsored → discounted → standard pricing)

---

### Story 6.2: Implement Active Client Tracking (Engagement-Based)

As a system,
I want to track active clients based on engagement,
So that billing can be calculated based on actual usage, not time-based assumptions.

**Acceptance Criteria:**

**Given** license assignment exists (Epic 5, Story 5.2) and user sessions exist (Epic 2)
**When** I implement active client tracking
**Then** there is an active client tracking system that:
- Defines "active client" as: Client who has logged in or had a session in the last 30 days
- Tracks active clients per organization (engagement-based, not time-based)
- Updates active client status daily (background job or scheduled task)
- Supports billing calculation (base + overage pricing model)
- Preserves engagement history (for reporting and analytics)
**And** active client tracking is engagement-based (not time-based)
**And** active client tracking respects privacy (no individual financial data tracked)
**And** active client tracking is aggregated per organization (org admins see aggregated counts, not individual client details)

**Active Client Tracking Contract:**
- **Definition:** Active client = client who has logged in or had a session in the last 30 days
- **Engagement-based:** Based on actual usage (sessions, logins), not time-based assumptions
- **Tracking frequency:** Daily updates (background job or scheduled task)
- **Privacy boundary:** No individual financial data tracked (only session/login metadata)
- **Aggregation:** Active client counts aggregated per organization (for billing calculation)

**Threat Model Mitigations (T1: Engagement-Based Billing → Behavioral Surveillance):**
- **Binary definition:** Active = binary, coarse, time-boxed (any session in last 30 days = active, else inactive)
- **No gradations:** No "highly active", "barely active", or intensity segmentation
- **No per-client visibility:** Org admins see aggregated counts only, never individual client activity status
- **No alerts:** No alerts tied to client inactivity (no "Client X hasn't logged in" notifications)
- **Hard line:** Engagement affects billing math (program capacity), not human judgment (individual worth)
- **Philosophical lock:** Engagement is used to size programs, not to evaluate people

**Technical Notes:**
- Active client tracking: Background job or scheduled task (daily updates)
- Engagement data: Track sessions, logins (not financial activity)
- Storage: Backend database (PostgreSQL with engagement tracking table)
- Billing integration: Active client counts feed into billing calculation (Story 6.3)
- Aligns with Epic 5: Organization Management (engagement metrics)

**FRs covered:** FR-M68 (track active clients - engagement-based definition)

---

### Story 6.3: Implement Billing Calculation (Base + Overage Model)

As a system,
I want to calculate billing based on active clients,
So that organizations pay for actual usage, not time-based assumptions.

**Acceptance Criteria:**

**Given** active client tracking exists (Story 6.2) and organization accounts exist (Epic 5, Story 5.1)
**When** I implement billing calculation
**Then** there is a billing calculation system that:
- Calculates billing based on active clients (engagement-based, not time-based)
- Uses base + overage pricing model:
  - Base fee: $50/month (covers up to 15 active clients)
  - Overage fee: $3/month per additional active client (beyond 15)
- Supports billing periods (monthly billing cycles)
- Generates invoices (with clear breakdown of base + overage)
- Tracks billing history (past billing periods and amounts)
**And** billing calculation is engagement-based (based on active clients, not time-based)
**And** billing calculation is transparent (clear breakdown of base + overage)
**And** billing calculation supports pilot pricing (free for 6 months during pilot)
**And** billing calculation never frames as "cost per client" or "cost per outcome" (prevents instrumentalizing people)

**Billing Calculation Contract:**
- **Pricing model:** Base + overage
  - Base fee: $50/month (covers up to 15 active clients)
  - Overage fee: $3/month per additional active client (beyond 15)
- **Engagement-based:** Based on active clients (engagement-based, not time-based)
- **Same rate:** Same $3/month rate whether client uses Foundation or Builder Mode (no upcharge for progression)
- **Pilot pricing:** Free for 6 months during pilot (first 3-5 orgs)
- **Transparency:** Clear breakdown of base + overage in invoices
- **No cost-per-client framing:** Billing data never framed as "cost per client" or "cost per outcome"

**Threat Model Mitigations:**

**T5: Billing Granularity Invites Cost-Per-Person Thinking**
- **Hard line:** Billing is about capacity, not people
- **Mitigations:**
  - Billing surfaces show ranges, not counts tied to people (e.g., "15-30 active clients" not "Client X costs $3")
  - No cost attribution to individuals (no per-client cost breakdowns)
  - Invoices framed as "program access units" not "per-client charges"
  - Canonical answer: "We don't attribute cost to individuals. Billing is program-level by design."

**T6: Mode-Based Pricing Pressure**
- **Hard line:** Progression is not monetization
- **Mitigations:**
  - Same billing rate for Foundation and Builder Mode (already encoded, must remain)
  - Explicitly forbid mode-based pricing (no Builder Mode upcharge, ever)
  - Canonical answer: "No. Builder is a cognitive support mode, not a premium feature."

**Billing Calculation Example:**
- Organization has 30 active clients
- 20 in Foundation Mode, 10 in Builder Mode
- Billing: $50 base + (15 overage × $3) = $95/month total
- Same $3/month rate for all clients (no upcharge for Builder Mode progression)

**Technical Notes:**
- Billing calculation: Server-side calculation (background job or scheduled task)
- Billing periods: Monthly billing cycles (configurable)
- Invoice generation: Generate invoices with clear breakdown (base + overage)
- Billing storage: Backend database (PostgreSQL with billing and invoice tables)
- Integration: Active client tracking (Story 6.2) feeds into billing calculation
- Aligns with Epic 5: Organization Management (billing information view)

**FRs covered:** FR-M69 (calculate billing based on active clients - base + overage pricing model)

---

### Story 6.4: Implement License Transition Handling

As a system,
I want to handle license transitions automatically,
So that licenses can transition gracefully without revoking access.

**Acceptance Criteria:**

**Given** license lifecycle state machine exists (Story 6.1) and license assignment exists (Epic 5, Story 5.2)
**When** I implement license transition handling
**Then** there is a license transition handling system that:
- Handles transitions: org-sponsored → grace period → discounted self-pay → standard self-pay
- Supports transition triggers:
  - Org sponsorship ends (license expires, org doesn't renew, or org ends sponsorship)
  - Grace period ends (after 30-60 days, client offered discount)
  - Discount period ends (after 6 months, client offered standard pricing)
- Preserves client access (no access loss on transitions)
- Preserves client data (no data loss on transitions)
- Updates license state (state machine transitions)
- Triggers client notifications (email notifications on transitions)
**And** license transitions are explicit and non-revoking (transitions preserve access, only payment source changes)
**And** license transitions preserve client data (no data loss, goals, or historical progress)
**And** license transitions are communicated clearly to the client in advance (email notifications)
**And** license transitions support downgrade option (client can downgrade to Foundation Mode at any transition point)

**License Transition Handling Contract:**
- **Transitions:**
  - `ORG_SPONSORED` → `GRACE_PERIOD` (when org sponsorship ends)
  - `GRACE_PERIOD` → `DISCOUNTED_SELF_PAY` (after grace period, client offered discount)
  - `DISCOUNTED_SELF_PAY` → `STANDARD_SELF_PAY` (after 6 months, client offered standard pricing)
  - Any state → `FOUNDATION_ONLY` (client can downgrade at any time)
- **Non-revoking:** Transitions preserve access, only payment source changes
- **Data preservation:** No data loss, goals, or historical progress on transitions
- **Client communication:** Clear, advance notice of transitions (email notifications)
- **Downgrade option:** Client can downgrade to Foundation Mode at any transition point (no data loss, no punitive language)

**Threat Model Mitigations:**

**T4: Grace Period Becomes Pressure Funnel**
- **Hard line:** Grace is temporal buffering, not a behavioral lever
- **Mitigations:**
  - Grace period messaging: calm, non-countdown, non-urgent
  - No timers, no red states, no escalating copy
  - No "X days left" banners or countdown language
  - No implied consequences or urgency framing
  - Grace period is presented as buffer time, not deadline pressure

**Technical Notes:**
- License transition handling: Background job or scheduled task (check for transition triggers daily)
- State machine integration: Update license state via state machine (Story 6.1)
- Client notification: Trigger email notifications on transitions (Story 6.5)
- Data preservation: Ensure no data loss on transitions (database transactions, rollback support)
- Aligns with Architecture: License Lifecycle Management (Non-Revocable Sponsorship Model)

**FRs covered:** FR-M70 (handle license transitions - org-sponsored → discount period → standard pricing)

---

### Story 6.5: Implement Client Notifications on License Transitions

As a system,
I want to notify clients when license transitions occur,
So that clients are informed of changes and can make informed decisions.

**Acceptance Criteria:**

**Given** license transition handling exists (Story 6.4) and email service exists (Epic 2, Story 2.6)
**When** I implement client notifications
**Then** there is a client notification system that:
- Sends email notifications on license transitions:
  - Org sponsorship ends (transition to grace period)
  - Grace period ends (transition to discounted self-pay)
  - Discount period ends (transition to standard pricing)
- Uses clear, non-coercive language (explains changes, not pressure)
- Provides clear explanation of transition (what changes, what stays the same)
- Offers client options (continue with Builder, switch to Foundation, take a break)
- Includes advance notice (notifications sent before transitions take effect)
**And** client notifications are clear and non-coercive (explains changes, not pressure)
**And** client notifications emphasize continuity and agency (not dependency)
**And** client notifications provide clear options (continue, switch, take a break)
**And** client notifications are sent in advance (not after transitions take effect)

**Client Notification Contract:**
- **Transition notifications:**
  - Org sponsorship ends: "Your [Org Name] sponsorship has ended, but you're not alone. What this means: Foundation Mode still free, Builder Mode $4/month for 6 months (50% off). After 6 months, Builder Mode will be $8/month."
  - Discount period ends: "Starting [date], Builder Mode will be $8/month. You've come a long way. Your options: Continue with Builder at $8/month, Switch to Foundation (free), Take a break - you can always come back."
- **Language:** Clear, non-coercive, emphasizes continuity and agency (not dependency)
- **Options:** Clear options (continue, switch, take a break) without pressure
- **Advance notice:** Notifications sent before transitions take effect (not after)

**Threat Model Mitigations:**

**T7: Notifications Become Coercive**
- **Hard line:** Billing communication must preserve calm
- **Mitigations:**
  - Copy canon applies here explicitly: observational, choice-oriented, no threats
  - Mandatory copy review for license communications (all transition emails must be reviewed)
  - Prohibited language:
    - "Action required"
    - "Avoid losing access"
    - "Don't miss out"
    - "Limited time"
    - Escalating subject lines
  - Required language:
    - "Your options"
    - "You can choose"
    - "Nothing is being taken away"
    - Observational, non-urgent tone

**Technical Notes:**
- Client notifications: Email notifications via configured email service (SendGrid, SES, etc.) or log for dev
- Notification triggers: Triggered by license transition handling (Story 6.4)
- Email templates: Clear, non-coercive email templates for each transition type
- Advance notice: Send notifications before transitions take effect (configurable advance notice period)
- Aligns with Epic 5: Organization Management (client notifications on sponsorship end)

**FRs covered:** FR-M71 (notify clients when license transitions occur - email notifications)

---

### Story 6.6: Implement Fixed-Term and Indefinite License Support

As a system,
I want to support both fixed-term and indefinite licenses,
So that organizations can choose the license duration that fits their program model.

**Acceptance Criteria:**

**Given** license assignment exists (Epic 5, Story 5.2) and license lifecycle state machine exists (Story 6.1)
**When** I implement fixed-term and indefinite license support
**Then** there is a license duration system that supports:
- **Fixed-term licenses:**
  - Duration options: 6 months, 12 months, 18 months
  - Auto-expires at end of term
  - Org gets renewal notification 30 days before expiration
  - Good for: Time-limited programs (workforce dev, financial counseling cohorts)
- **Indefinite licenses:**
  - License continues until org explicitly ends it
  - Org can end sponsorship anytime for any client
  - Org pays monthly based on active clients
  - Good for: Ongoing case management, long-term support programs
**And** fixed-term licenses auto-expire at end of term (transition to grace period)
**And** indefinite licenses continue until org explicitly ends them (no auto-expiration)
**And** license duration is configurable per license (org chooses duration when assigning license)
**And** license duration supports renewal (org can renew fixed-term licenses)

**License Duration Contract:**
- **Fixed-term licenses:**
  - Duration options: 6 months, 12 months, 18 months
  - Auto-expires at end of term (transition to grace period)
  - Renewal notification: Org gets notification 30 days before expiration
  - Use case: Time-limited programs (workforce dev, financial counseling cohorts)
- **Indefinite licenses:**
  - License continues until org explicitly ends it
  - No auto-expiration (org controls duration)
  - Org pays monthly based on active clients
  - Use case: Ongoing case management, long-term support programs
- **Configurable:** License duration is configurable per license (org chooses when assigning)

**Technical Notes:**
- License duration: Stored in license record (duration field: fixed-term or indefinite)
- Auto-expiration: Background job checks for expiring fixed-term licenses (daily)
- Renewal notification: Trigger renewal notification 30 days before expiration (Story 6.7)
- Indefinite handling: Indefinite licenses never auto-expire (org must explicitly end sponsorship)
- Aligns with Epic 5: Organization Management (license assignment with duration options)

**FRs covered:** FR-M72 (support fixed-term licenses - duration options - and indefinite licenses)

---

### Story 6.7: Implement License Expiration and Renewal Workflows (Should-Have)

As a system,
I want to handle license expiration and renewal workflows,
So that organizations can renew licenses proactively with clear decision support.

**Acceptance Criteria:**

**Given** fixed-term and indefinite license support exists (Story 6.6) and organization accounts exist (Epic 5, Story 5.1)
**When** I implement license expiration and renewal workflows
**Then** there is a license expiration and renewal system that:
- Detects expiring licenses (fixed-term licenses expiring in 30 days)
- Sends renewal notification to org admin (30 days before expiration)
- Provides renewal decision support (proactive value summary)
- Supports renewal actions:
  - Renew license (extend for chosen duration: 6/12/18 months or indefinite)
  - Let license expire (transition to grace period)
  - Need more info (contact support)
- Automates renewal workflow (if org chooses to renew, extend license automatically)
- Tracks renewal history (past renewals and decisions)
**And** renewal notifications are sent 30 days before expiration (proactive, not last-minute)
**And** renewal decision support shows value (engagement metrics, outcomes if opted in)
**And** renewal workflows are automated (if org chooses to renew, extend license automatically)
**And** renewal workflows respect opt-in boundaries (only show outcomes data if clients opted in)

**License Expiration and Renewal Contract:**
- **Expiration detection:** Detect fixed-term licenses expiring in 30 days (background job)
- **Renewal notification:** Send notification to org admin 30 days before expiration
- **Renewal decision support:** Show value summary (engagement metrics, outcomes if opted in)
- **Renewal actions:**
  - Renew license (extend for chosen duration: 6/12/18 months or indefinite)
  - Let license expire (transition to grace period)
  - Need more info (contact support)
- **Automated renewal:** If org chooses to renew, extend license automatically
- **Renewal history:** Track past renewals and decisions

**Technical Notes:**
- Expiration detection: Background job or scheduled task (check for expiring licenses daily)
- Renewal notification: Email notification to org admin (uses email service)
- Renewal decision support: Aggregate engagement metrics and outcomes (if opted in) for value summary
- Automated renewal: Extend license automatically if org chooses to renew (update license expiration date)
- Renewal history: Store renewal decisions in database (for reporting and analytics)
- Aligns with Epic 5: Organization Management (license expiration notifications, Story 5.9)

**FRs covered:** FR-S73 (handle license expiration and renewal workflows - automated - should-have)

---

## Epic 7: Mode Progression & Safe Return: Stories

### Epic 7 Success Definition (Critical Reframe)

**Canon:**
Mode Progression & Safe Return is successful when users can switch modes naturally, leave and return without penalty, and resume without shame, loss, or pressure. Silence is respected as a valid state.

**Why this matters:**
This is the most important Mode Progression & Safe Return clarification. Without it:
- Users feel trapped or pressured to progress
- Return after absence becomes shame-inducing
- Mode switching becomes a funnel, not a choice
- Silence and non-action are penalized

This sentence explicitly preserves the core ethic: **modes are spaces, not stages. Progression is optional, not expected.**

**Core Principles:**
- **Safe return after absence:** No guilt on return, no recap pressure, no punishment for inconsistency
- **Mode switching based on behavior triggers:** Not time-based, respects user's pace
- **Behavior-based triggers boundary:** Behavior-based triggers are eligibility signals, not recommendations, nudges, or evaluations
- **Decline/defer without penalty:** Users can decline mode progression offers without penalty, repeated prompts, or feature restriction
- **Silence respected as valid state:** Non-action and absence are valid outcomes, not failures
- **Universal Return Contract:** 6 invariants apply to all modes (no time reference, no backlog, return to last stable state, one primary action, silence by default, no unseen system action)
- **Mode switcher visibility:** The mode switcher is always available but never foregrounded on return

**Enforcement:**
- All Mode Progression & Safe Return stories must align with this success definition
- Mode progression offers must be non-coercive and dismissible
- Return states must never include time-referential guilt or backlog framing
- Silence and non-action must be respected as valid states
- Mode-specific return behavior may add context, but may not violate any Universal Return invariant

---

### Story 7.1: Implement Universal Return Contract (All Modes)

As a system,
I want to implement the Universal Return Contract for all modes,
So that users can return after absence without shame, loss, or pressure.

**Acceptance Criteria:**

**Given** user authentication exists (Epic 2) and mode switching exists (Story 7.2)
**When** I implement Universal Return Contract
**Then** there is a return handling system that enforces 6 invariants across all modes:
1. **No Time Reference:** No "X days ago," "it's been a while," or "welcome back" language
2. **No Backlog Framing:** No missed tasks, overdue states, or "continue where you left off" language
3. **Return to Last Stable User-Authored State:** Show what was, not what's missing
4. **One Primary Action:** Exactly one calm next step, mode-appropriate
5. **Silence by Default:** No auto-prompts, nudges, or suggestions on open
6. **No Unseen System Action:** If background changes occurred, disclose neutrally and dismissibly
**And** Universal Return Contract applies to all modes (Crisis, Foundation, Builder)
**And** return states never include time-referential guilt or backlog framing
**And** return states show last known state, not deficit view
**And** return states respect silence (no auto-prompts on open)

**Universal Return Contract (Non-Negotiable Invariants):**
- **1. No Time Reference:**
  - No "X days ago," "it's been a while," or "welcome back" language
  - No time-based guilt or shame
- **2. No Backlog Framing:**
  - No missed tasks, overdue states, or "continue where you left off" language
  - No catch-up pressure
- **3. Return to Last Stable User-Authored State:**
  - Show what was, not what's missing
  - Resume from stability, not last task
- **4. One Primary Action:**
  - Exactly one calm next step, mode-appropriate
  - No overwhelming choices or multiple highlighted actions
- **5. Silence by Default:**
  - No auto-prompts, nudges, or suggestions on open
  - User controls depth, system does not initiate
- **6. No Unseen System Action:**
  - If background changes occurred, disclose neutrally and dismissibly
  - No hidden state changes

**Technical Notes:**
- Return handling: Server-side and client-side logic (check for last active mode and stable screen)
- State retrieval: Retrieve last active mode and last stable screen from database/localStorage
- Contract enforcement: Apply 6 invariants at render time (suppress reminders, streaks, counts, missed logic)
- Mode-specific behavior: Apply mode-specific return behavior after contract enforcement (Story 7.3)
- Aligns with UX Design: Universal Return Contract (Journey 5: Cross-Mode Return After Absence)

**FRs covered:** FR-M49 (switch between modes based on behavior triggers - includes safe return)

---

### Story 7.2: Implement Mode Switching Logic (Behavior-Based Triggers)

As a system,
I want to support mode switching based on behavior triggers,
So that users can switch modes naturally when ready, not based on time.

**Acceptance Criteria:**

**Given** user authentication exists (Epic 2) and Foundation Mode exists (Epic 3) and Builder Mode exists (Epic 4)
**When** I implement mode switching logic
**Then** there is a mode switching system that:
- Supports mode switching between Crisis, Foundation, and Builder modes
- Uses behavior-based triggers (not time-based)
- Allows user-initiated mode switching (user can switch modes explicitly)
- Preserves user data on mode switch (no data loss)
- Updates user mode preference (store last active mode)
- Supports mode switcher UI (visible but de-emphasized on mode home screens)
**And** mode switching is user-initiated (user controls when to switch)
**And** mode switching preserves data (no data loss on switch)
**And** mode switching respects user agency (no forced progression)

**Mode Switching Logic Contract:**
- **Behavior-based:** Mode switching based on user behavior and readiness, not time
- **User-initiated:** User controls when to switch modes (explicit mode switcher UI)
- **Data preservation:** All user data preserved on mode switch (no data loss)
- **Mode preference:** Store last active mode for return behavior (Story 7.1)
- **Mode switcher visibility (explicit rule):** The mode switcher is always available but never foregrounded on return
  - **Why this matters:** This prevents both dark patterns: hiding exits (trapping users) and pushing upgrades (pressuring progression)
  - **Implementation:** Visible but de-emphasized on mode home screens (not promotional, not hidden)

**Crisis Override Rule:**
- If last mode = Crisis, always return to Crisis on re-entry (safety-first)
- User must explicitly switch modes to leave Crisis
- This prevents accidental escalation into planning or reflection while unstable

**Technical Notes:**
- Mode switching: Client-side and server-side logic (update user mode preference)
- Mode preference storage: Store in database (authenticated) or localStorage (anonymous)
- Mode switcher UI: Component for mode selection (visible but de-emphasized)
- Crisis override: Check last mode on return, enforce Crisis return if last mode was Crisis
- Aligns with UX Design: Mode Switcher Visibility (Journey 5: Cross-Mode Return After Absence)

**FRs covered:** FR-M49 (switch between modes based on behavior triggers - not time-based)

---

### Story 7.3: Implement Mode-Specific Return Behavior

As a system,
I want to implement mode-specific return behavior,
So that users return to appropriate experiences based on their last active mode.

**Acceptance Criteria:**

**Given** Universal Return Contract exists (Story 7.1) and mode switching exists (Story 7.2)
**When** I implement mode-specific return behavior
**Then** there is a mode-specific return system that:
- **Crisis Mode Return:**
  - Returns to Crisis Home (safety-first)
  - Last-used tool visible (not framed as due or incomplete)
  - One primary action: "Start where you are"
  - No automatic promotion to Foundation or Builder
  - No historical summaries unless user explicitly navigates
- **Foundation Mode Return:**
  - Returns to Foundation Home
  - Last known pattern summary (collapsed, if exists)
  - Primary action: "Add something"
  - No resurfacing of missed entries
  - No insight auto-display unless Journey 3 conditions are met
  - Patterns are observational, not evaluative
- **Builder Mode Return:**
  - Returns to Builder Home
  - Last opened scenario visible (neutral)
  - Primary action: "Explore scenarios"
  - No "incomplete" indicators
  - No goal pressure
  - No ranking or optimization framing
**And** mode-specific return behavior applies after Universal Return Contract enforcement
**And** mode-specific return behavior respects mode-specific dignity rules
**And** mode-specific return behavior shows last known state, not deficit view

**Mode-Specific Return Behavior Contract:**
- **Crisis Mode (Safety Override):**
  - Goal: Minimize cognitive load and avoid destabilization
  - Return state: Crisis Home, last-used tool visible, one primary action
  - Rules: Crisis always wins on return if it was the last active mode, no automatic promotion
- **Foundation Mode (Continuity Without Pressure):**
  - Goal: Re-establish neutrality and calm
  - Return state: Foundation Home, last known pattern summary (collapsed), primary action "Add something"
  - Rules: No resurfacing of missed entries, no insight auto-display, patterns are observational
- **Builder Mode (Resume Workspace, Not Agenda):**
  - Goal: Restore exploratory context without nudging decisions
  - Return state: Builder Home, last opened scenario visible (neutral), primary action "Explore scenarios"
  - Rules: No incomplete indicators, no goal pressure, no ranking or optimization framing

**Precedence Rule (Non-Negotiable):**
- **Mode-specific return behavior may add context, but may not violate any Universal Return invariant**
- **Why this matters:** This prevents a future "Builder needs more guidance" argument from eroding the Universal Return Contract
- **Enforcement:** All mode-specific return behavior must be validated against the 6 Universal Return invariants

**Technical Notes:**
- Mode-specific return: Server-side and client-side logic (retrieve last active mode and stable screen)
- Return state rendering: Mode-specific home screens with contract enforcement
- Crisis override: Enforce Crisis return if last mode was Crisis (safety-first)
- Aligns with UX Design: Mode-Specific Return Behavior (Journey 5: Cross-Mode Return After Absence)

**FRs covered:** FR-M49 (switch between modes based on behavior triggers - includes safe return)

---

### Story 7.4: Implement Builder Mode Readiness Detection (Behavior-Based Triggers)

As a system,
I want to detect behavior-based triggers for Builder Mode,
So that Builder Mode can be offered when users are ready, not based on time.

**Acceptance Criteria:**

**Given** Foundation Mode exists (Epic 3) and Builder Mode exists (Epic 4)
**When** I implement Builder Mode readiness detection
**Then** there is a readiness detection system that detects:
- **Trigger 1: Explicit Feature Request**
  - User asks: "How do I set a savings goal?" or similar Builder Mode feature request
  - System detects explicit feature request and offers Builder Mode
- **Trigger 2: Goal Achievement + Consistency**
  - User achieved a goal (e.g., "spend less on eating out") and maintained it for 4+ weeks
  - System detects goal achievement + consistency and offers Builder Mode
- **Trigger 3: High Engagement + Multiple Categories**
  - User is logging 10+ transactions/week across 5+ categories
  - System detects high engagement + multiple categories and offers Builder Mode
- **Trigger 4: Long-Term User (12+ Weeks)**
  - User has been using Foundation for 12+ weeks with no progression signals
  - System offers Builder Mode once (gentle offer, never repeated if declined)
**And** readiness detection is behavior-based (not time-based)
**And** readiness detection respects user pace (not forcing a timeline)
**And** readiness detection allows users to stay in Foundation forever (that's success)

**Builder Mode Readiness Detection Contract:**
- **Behavior-based triggers:**
  - Explicit feature request (user asks for Builder Mode feature)
  - Goal achievement + consistency (goal achieved and maintained for 4+ weeks)
  - High engagement + multiple categories (10+ transactions/week across 5+ categories)
  - Long-term user (12+ weeks in Foundation, one gentle offer)
- **Not time-based:** Readiness detection based on behavior, not time elapsed
- **Respects user pace:** Allows users to stay in Foundation forever (that's success)
- **One-time offers:** Long-term user offer is one-time only (never repeated if declined)

**Critical Clarification: "Consistency" Framing (Trigger #2)**
- **"Consistency" refers to repeated voluntary interaction over time, not adherence, streaks, or completion metrics**
- **Descriptive, not normative:** "Consistency" describes repeated interaction patterns, not evaluative judgments
- **Not evaluative:** No "good behavior," "compliance," or "streaks" language
- **Why this matters:** This keeps readiness detection aligned with Foundation principles (observational, not evaluative)

**Technical Notes:**
- Readiness detection: Background job or scheduled task (check for readiness signals daily)
- Trigger detection: Server-side logic (analyze user behavior for readiness signals)
- Feature request detection: Client-side and server-side logic (detect explicit Builder Mode feature requests)
- Goal achievement tracking: Integrate with Foundation Mode goal tracking (Epic 3)
- Engagement tracking: Integrate with Foundation Mode engagement metrics (Epic 3)
- Aligns with PRD: Mode Progression (Behavior-Based, Not Time-Based)

**FRs covered:** FR-M76 (detect behavior-based triggers for Builder Mode - explicit feature request, consistent tracking, goal achievement, financial stability)

---

### Story 7.5: Implement Builder Mode Progression Offers (Non-Coercive)

As a system,
I want to offer Builder Mode when users meet behavior criteria,
So that users can progress when ready, not based on time.

**Acceptance Criteria:**

**Given** Builder Mode readiness detection exists (Story 7.4) and mode switching exists (Story 7.2)
**When** I implement Builder Mode progression offers
**Then** there is a progression offer system that:
- Offers Builder Mode when user meets behavior criteria (Story 7.4 triggers)
- Uses non-coercive language ("Want to try it?" not "You should upgrade")
- Provides clear options: "Yes" / "Learn More" / "Not now"
- Respects user choice (if user declines, offer is dismissed)
- Never repeats offers if user declines (respect the choice)
- Uses clear explanation: "What changes" / "What stays the same"
**And** progression offers are non-coercive (invitation, not gate)
**And** progression offers are dismissible (user can decline without penalty)
**And** progression offers never repeat if declined (respect the choice)
**And** progression offers use clear, choice-oriented language

**Builder Mode Progression Offer Contract:**
- **Non-coercive language:**
  - "Want to try it?" not "You should upgrade"
  - "Want more tools to keep this going?" not "You're ready for the next level"
  - "Want to see what else we have?" not "You've been here long enough"
- **Clear options:**
  - "Yes" / "Learn More" / "Not now"
  - All options are equal weight (no highlighted default)
- **Respect user choice:**
  - If user declines, offer is dismissed (never repeated)
  - If user says "Not now," NEVER ask again (respect the choice)
- **Clear explanation:**
  - "What changes" / "What stays the same"
  - Observational, not directive

**Progression Offer Examples:**
- **Explicit feature request:** "That's a Builder Mode feature. Want to try it? [Yes] [Learn More] [Not now]"
- **Goal achievement:** "You're doing great. Want more tools to keep this going? [Try Builder Mode] [Stay here]"
- **High engagement:** "You're tracking a lot. Want tools to manage it better? [Try Builder Mode] [Stay here]"
- **Long-term user:** "You've been here a while. Want to see what else we have? [Try Builder] [Stay here]"

**Technical Notes:**
- Progression offers: Client-side UI component (progression offer card or modal)
- Offer triggering: Triggered by readiness detection (Story 7.4)
- Offer dismissal: Store dismissal state in database/localStorage (never repeat if declined)
- Language constraints: Copy must be non-coercive, choice-oriented, observational
- Aligns with UX Design: Narrative Mode Transitions (Crisis → Foundation, Foundation → Builder)

**FRs covered:** FR-M77 (offer Builder Mode when user meets behavior criteria - not time-based)

---

### Story 7.6: Implement Decline/Defer Mode Progression (No Penalty)

As a system,
I want to support decline/defer mode progression without penalty,
So that users can stay in their current mode without pressure or restriction.

**Acceptance Criteria:**

**Given** Builder Mode progression offers exist (Story 7.5)
**When** I implement decline/defer mode progression
**Then** there is a decline/defer system that:
- Allows users to decline mode progression offers (explicit "Not now" or "Stay here" option)
- Respects user choice (if user declines, offer is dismissed permanently)
- Never repeats offers if user declines (respect the choice)
- Never restricts features if user declines (no feature restriction)
- Never penalizes users for declining (no negative consequences)
- Uses affirming language ("That's perfect. Foundation Mode is working for you. Keep going.")
**And** decline/defer is without penalty (no negative consequences)
**And** decline/defer is without repeated prompts (never ask again if declined)
**And** decline/defer is without feature restriction (all current features remain available)
**And** decline/defer uses affirming language (validates user's choice)

**Decline/Defer Mode Progression Contract:**
- **No penalty:**
  - No negative consequences for declining
  - No feature restriction
  - No repeated prompts
- **Respect user choice:**
  - If user declines, offer is dismissed permanently
  - Never ask again (respect the choice)
  - Store dismissal state (never repeat if declined)
- **Affirming language:**
  - "That's perfect. Foundation Mode is working for you. Keep going."
  - "Stay here" is a valid and celebrated choice
  - No shame or pressure language

**Technical Notes:**
- Decline/defer handling: Client-side and server-side logic (store dismissal state)
- Dismissal state storage: Store in database (authenticated) or localStorage (anonymous)
- Language constraints: Copy must be affirming, non-shaming, validating
- Aligns with UX Design: Narrative Mode Transitions (decline/defer behavior)

**FRs covered:** FR-M74 (decline/defer mode progression offers without penalty, repeated prompts, or feature restriction)

---

### Story 7.7: Implement Mode Progression Intent Tracking (Should-Have, MVP-Light)

As a system,
I want to track mode progression intent,
So that we can understand user readiness without intervening.

**Acceptance Criteria:**

**Given** Builder Mode progression offers exist (Story 7.5) and decline/defer exists (Story 7.6)
**When** I implement mode progression intent tracking
**Then** there is an intent tracking system that:
- Tracks progression offer events (offer shown, offer accepted, offer declined)
- Tracks progression intent signals (user behavior indicating readiness)
- Tracks progression outcomes (mode switch completed, mode switch declined)
- Stores intent tracking data (for analytics and learning)
- Respects privacy (no individual financial data tracked)
- Supports MVP-light instrumentation (observation without intervention)
**And** intent tracking is MVP-light (observation without intervention)
**And** intent tracking is non-blocking (does not block mode progression features)
**And** intent tracking respects privacy (no individual financial data tracked)
**And** intent tracking supports learning (not optimization)

**Mode Progression Intent Tracking Contract:**
- **MVP-light instrumentation:** Observation without intervention (tracking only, no automated actions)
- **Non-blocking:** Intent tracking does not block mode progression features (can be disabled without impact)
- **Privacy boundary:** No individual financial data tracked (only progression events and outcomes)
- **Learning-focused:** Intent tracking supports learning about user readiness, not optimization of conversion

**Intent Tracking Events:**
- Progression offer shown (when offer is displayed to user)
- Progression offer accepted (when user accepts offer)
- Progression offer declined (when user declines offer)
- Mode switch completed (when user successfully switches modes)
- Mode switch declined (when user declines mode switch)

**Technical Notes:**
- Intent tracking: Client-side and server-side logic (track progression events)
- Event storage: Store in database (for analytics and learning)
- Privacy: No individual financial data tracked (only progression events)
- MVP-light: Can be disabled without impact (non-blocking)
- Aligns with Epic 1: Crisis Intervention (anonymous analytics, minimal instrumentation)

**FRs covered:** FR-S75 (track mode progression intent - not just outcomes - should-have, MVP-light, non-blocking)

---

### Story 7.8: Implement Progression Attempt Tracking (Future, Feature-Flagged)

As a system,
I want to track progression attempts for learning,
So that we can understand user readiness patterns without intervening.

**Acceptance Criteria:**

**Given** mode progression intent tracking exists (Story 7.7)
**When** I implement progression attempt tracking
**Then** there is an attempt tracking system that:
- Tracks progression attempts (not just completions)
- Tracks attempt outcomes (successful, declined, deferred)
- Tracks attempt patterns (multiple attempts, time between attempts)
- Stores attempt tracking data (for learning and pattern analysis)
- Respects privacy (no individual financial data tracked)
- Supports feature-flagged deployment (can be enabled/disabled)
**And** attempt tracking is future-only (deferred to post-MVP)
**And** attempt tracking is feature-flagged (can be enabled/disabled)
**And** attempt tracking respects privacy (no individual financial data tracked)
**And** attempt tracking supports learning (not optimization)

**Progression Attempt Tracking Contract:**
- **Future-only:** Deferred to post-MVP (not required for MVP)
- **Feature-flagged:** Can be enabled/disabled (not required for core functionality)
- **Privacy boundary:** No individual financial data tracked (only attempt events and outcomes)
- **Learning-focused:** Attempt tracking supports learning about user readiness patterns, not optimization of conversion

**Attempt Tracking Events:**
- Progression attempt initiated (when user shows readiness signal)
- Progression attempt outcome (successful, declined, deferred)
- Attempt patterns (multiple attempts, time between attempts)
- Readiness signal correlation (which triggers lead to successful progression)

**Technical Notes:**
- Attempt tracking: Client-side and server-side logic (track progression attempts)
- Event storage: Store in database (for learning and pattern analysis)
- Privacy: No individual financial data tracked (only attempt events)
- Feature flag: Can be enabled/disabled (not required for core functionality)
- Aligns with Epic 1: Crisis Intervention (anonymous analytics, minimal instrumentation)

**FRs covered:** FR-F78 (track progression attempts - not just completions - for learning - future, feature-flagged)

---

## Epic 8: Data Privacy & Security (Cross-Cutting): Stories

### Epic 8 Success Definition (Critical Reframe)

**Canon:**
Data Privacy & Security is successful when user data is protected, isolated, and compliant across all modes and features. Privacy by design, not retrofitted.

**Why this matters:**
This is the most important Data Privacy & Security clarification. Without it:
- User data becomes exposed to unauthorized access
- Multi-tenant isolation fails, causing data breaches
- Organization admins see individual financial data
- Privacy controls are retrofitted, not built-in

This sentence explicitly preserves the core ethic: **privacy is not a feature—it's the foundation.**

**Core Principles:**
- **Privacy by design:** Privacy controls built into each feature (not retrofitted)
- **Database-enforced isolation:** PostgreSQL Row-Level Security (RLS) is mandatory
- **Multi-tenant data isolation:** Transaction-per-request pattern with SET LOCAL context variables
- **Data anonymization:** Organization admins never see individual transactions, balances, or goals
- **Opt-in outcomes sharing:** Explicit consent required for aggregated outcomes data sharing
- **Encryption:** Data encrypted at rest and in transit (TLS 1.3 minimum)

**Cross-Cutting Implementation:**
- **This epic is implemented incrementally alongside Epics 1-7; not sequenced at the end**
- RLS policies implemented with each data model (Epic 2, 3, 4, 5)
- Encryption configured at infrastructure level (Pre-Epic)
- Privacy controls built into each feature (not retrofitted)

**Enforcement:**
- All Data Privacy & Security stories must align with this success definition
- RLS policies must be implemented with each data model
- Privacy controls must be built into each feature, not retrofitted
- Data anonymization must be enforced at database level, not just UI

**Cross-Cutting Risk: Aggregation Re-Identification Prevention**
- **Aggregated views must enforce minimum cohort sizes and suppress or bucket outliers to prevent re-identification**
- **This covers:** Rare categories, high-variance values, edge cases that math can expose
- **Implementation:** Minimum thresholds (e.g., minimum 5 clients per aggregation), outlier suppression, value bucketing for rare categories
- **Why this matters:** Even aggregated data can be re-identified through small cohorts, rare behaviors, or cross-filtering. This defensive sentence prevents re-identification through math.

**Pressure Test Responses (Canonical Answers):**

**Q: "Can we see individual outcomes to verify impact?"**
A: No. Violates anonymization and surveillance boundary. Alternative: Aggregated outcomes + methodology transparency.

**Q: "Can clients opt in to sharing their individual data with us?"**
A: Still no. Consent does not override structural power imbalance. Opt-in only controls inclusion, not granularity.

**Q: "Can we export raw data for independent analysis?"**
A: No raw data export exists by design. Alternative: Predefined aggregate exports.

**Q: "Can we audit specific cases?"**
A: Audit logs exist, but do not expose user data. Scope: Process integrity, not personal behavior.

---

### Story 8.1: Implement Multi-Tenant Data Isolation (Row-Level Security)

As a system,
I want to enforce multi-tenant data isolation at the database level,
So that user data is protected from unauthorized access, even if application code has bugs.

**Acceptance Criteria:**

**Given** database foundation exists (Pre-Epic, Story 0.5) and user authentication exists (Epic 2)
**When** I implement multi-tenant data isolation
**Then** there is a row-level security (RLS) system that:
- Enforces PostgreSQL Row-Level Security (RLS) policies in migrations
- Uses transaction-per-request pattern for authenticated routes that touch the database
- Sets SET LOCAL context variables within transactions:
  - `app.user_id` (always set)
  - `app.household_id` (set when applicable, for Builder Mode household context)
- Implements RLS access rules:
  - User can read/write rows where `user_id = current_setting('app.user_id')::int` (personal data)
  - User can read/write rows where `household_id IN (SELECT household_id FROM household_members WHERE user_id = current_setting('app.user_id')::int AND left_at IS NULL)` (household data)
  - Org admins: Query only through aggregated views keyed by `org_id` and opt-in flags; never direct access to household tables
- Provides Express middleware wrapper `withAuth(handler, { db: true })` that:
  - Authenticates user
  - Validates request
  - If `db: true`: Opens transaction, sets locals, calls handler with `{ tx, user }`
  - All DB access must go through `tx` (not global pool) inside handlers
**And** RLS policies are implemented with each data model (Epic 2, 3, 4, 5)
**And** RLS policies are tested (test helpers for setting SET LOCAL context, integration tests for unauthorized access blocking)
**And** RLS policies work correctly with transaction-per-request pattern

**Multi-Tenant Data Isolation Contract:**
- **Database-enforced isolation:** PostgreSQL RLS policies in migrations (Knex.js)
- **Transaction-per-request pattern:** Single transaction wraps entire request's DB work
- **SET LOCAL context variables:**
  - Always set: `app.user_id`
  - Set when applicable: `app.household_id` (when user is in Builder household context)
  - Do NOT set globally: `app.org_id` (only set for explicitly org-scoped endpoints like org admin)
- **RLS access rules:**
  - User can read/write personal data where `user_id = current_setting('app.user_id')::int`
  - User can read/write household data where `household_id IN (SELECT household_id FROM household_members WHERE user_id = current_setting('app.user_id')::int AND left_at IS NULL)`
  - Org admins: Query only through aggregated views, never direct access to household tables
- **Defense in depth:** RLS + API layer validation

**Non-Bypass Rule (Deployment Invariant):**
- **All production database access must occur through roles with RLS enabled**
- **Superuser and RLS-disabled roles are forbidden in application runtime**
- **Why this matters:** Many teams "temporarily" bypass RLS for reports, jobs, or fixes. This is how privacy models silently die.
- **Enforcement:** This is a deployment invariant, not just a convention. RLS bypass is not allowed in production, even for "temporary" fixes or reports.

**Technical Notes:**
- RLS implementation: PostgreSQL RLS policies in migrations (Knex.js)
- Transaction-per-request: Express middleware wrapper `withAuth(handler, { db: true })`
- SET LOCAL context: Set within transaction, not globally
- Testing: Test helpers for setting SET LOCAL context, integration tests for unauthorized access blocking
- Aligns with Security Model Canon (Section 6: Data Access & Isolation)
- Aligns with Architecture: Row-Level Security Implementation

**FRs covered:** FR-M55 (enforce multi-tenant data isolation - row-level security)

---

### Story 8.2: Implement Data Anonymization for Organization Admins

As a system,
I want to anonymize client data for organization admins,
So that organization admins never see individual transactions, balances, or goals.

**Acceptance Criteria:**

**Given** multi-tenant data isolation exists (Story 8.1) and organization accounts exist (Epic 5, Story 5.1)
**When** I implement data anonymization
**Then** there is a data anonymization system that:
- Ensures organization admins never see individual transactions, balances, or goals
- Provides aggregated views only (counts, averages, distributions, trends)
- Enforces anonymization at database level (aggregated views, not direct table access)
- Removes client identifiers from aggregated results (no individual client identification)
- Supports aggregation thresholds (minimum thresholds to prevent re-identification)
- Respects opt-in boundaries (only include outcomes data if clients opted in)
**And** data anonymization is enforced at database level (not just UI)
**And** data anonymization removes client identifiers (no individual client identification)
**And** data anonymization supports aggregation thresholds (prevents re-identification)
**And** data anonymization respects opt-in boundaries (Epic 8, Story 8.3)

**Data Anonymization Contract:**
- **Organization admins never see:**
  - Individual transactions
  - Individual balances or account details
  - Individual goals or scenarios
  - Household composition or household-level data
  - Client identification in aggregated results
- **Organization admins can see (aggregated only):**
  - Aggregated engagement metrics (counts, averages, percentages)
  - Aggregated outcomes data (only if clients opted in, Story 8.3)
  - Mode distribution (counts, not individual client modes)
  - Session frequency (averages, not individual client sessions)
- **Anonymization enforcement:**
  - Database-level aggregated views (not direct table access)
  - Client identifiers removed from aggregated results
  - Aggregation thresholds (minimum thresholds to prevent re-identification)
  - RLS policies enforce organization-level isolation

**Explicit Refusal Boundary (Non-Negotiable):**
- **Organization admins may never access individual-level data, even with client consent**
- **Why this matters:** Funders will ask for "case studies," "spot checks," or "verification." This line draws a bright, non-negotiable boundary.
- **Design stance:** Consent does not legitimize surveillance in your model. Name that now.
- **Canonical answer:** "No. We don't attribute cost to individuals. Billing is program-level by design." (Epic 6 pressure test response)

**Aggregation Re-Identification Prevention:**
- **Aggregated views must enforce minimum cohort sizes and suppress or bucket outliers to prevent re-identification**
- **This covers:** Rare categories, high-variance values, edge cases that math can expose
- **Implementation:** Minimum thresholds (e.g., minimum 5 clients per aggregation), outlier suppression, value bucketing for rare categories

**Technical Notes:**
- Data anonymization: Database-level aggregated views (PostgreSQL views or materialized views)
- Aggregation thresholds: Minimum thresholds to prevent re-identification (e.g., minimum 5 clients per aggregation)
- Client identifier removal: Remove client identifiers from aggregated results (no individual client identification)
- RLS enforcement: Organization-level RLS policies ensure org admins only see their org's aggregated data
- Aligns with Epic 5: Organization Management (data anonymization for org admins)
- Aligns with Security Model Canon (Section 6: Data Access & Isolation)

**FRs covered:** FR-M53 (anonymize client data for organization admins - never show individual transactions, balances, goals), FR-M61 (organization admins only see aggregated engagement data, never individual financial data)

---

### Story 8.3: Implement Opt-In Outcomes Sharing

As a system,
I want to support opt-in outcomes sharing,
So that users can explicitly consent to share aggregated outcomes data with their organization.

**Acceptance Criteria:**

**Given** data anonymization exists (Story 8.2) and organization accounts exist (Epic 5, Story 5.1)
**When** I implement opt-in outcomes sharing
**Then** there is an opt-in outcomes sharing system that:
- Allows users to opt in to share aggregated outcomes data with their organization
- Requires explicit consent (user must explicitly opt in, not opt-out)
- Stores opt-in consent in database (linked to user and organization)
- Respects opt-in boundaries (only include outcomes data if user opted in)
- Supports opt-in revocation (user can revoke consent at any time)
- Updates aggregated views based on opt-in status (only include opted-in users)
- Uses clear, non-coercive language (explains what data is shared, why, and how to revoke)
**And** opt-in outcomes sharing requires explicit consent (not opt-out)
**And** opt-in outcomes sharing supports revocation (user can revoke at any time)
**And** opt-in outcomes sharing uses clear, non-coercive language
**And** opt-in outcomes sharing respects privacy boundaries (only aggregated outcomes data, never individual transactions)

**Opt-In Outcomes Sharing Contract:**
- **Explicit consent required:** User must explicitly opt in to share aggregated outcomes data (not opt-out)
- **Opt-in scope:** Only aggregated outcomes data (averages, distributions, trends), never individual transactions, balances, or goals
- **Opt-in storage:** Store opt-in consent in database (linked to user and organization)
- **Opt-in revocation:** User can revoke consent at any time (immediate effect)
- **Opt-in boundaries:** Only include outcomes data if user opted in (respect opt-in status in aggregated views)
- **Clear language:** Explain what data is shared, why, and how to revoke (non-coercive, transparent)

**Critical Clarification: Opt-In Changes Eligibility, Not Resolution**
- **Opt-in enables inclusion in aggregated outcomes only; it does not unlock new data views or finer granularity**
- **Why this matters:** This prevents a future argument: "They opted in, so we can show more, right?" No. Opt-in changes eligibility, not resolution.
- **Design stance:** Opt-in only controls inclusion in aggregated views, not the granularity or type of data visible to organization admins

**Opt-In Outcomes Data Scope:**
- **What is shared (aggregated only):**
  - Aggregated outcomes metrics (averages, distributions, trends)
  - No individual client identification
  - No individual transactions, balances, or goals
- **What is NOT shared:**
  - Individual transactions
  - Individual balances or account details
  - Individual goals or scenarios
  - Household composition or household-level data
  - Client identification

**Technical Notes:**
- Opt-in storage: Database table for opt-in consent (user_id, organization_id, opted_in_at, revoked_at)
- Opt-in checking: Verify opt-in status before including data in aggregation (Story 8.2)
- Opt-in revocation: Update opt-in status in database (immediate effect on aggregated views)
- Language constraints: Copy must be clear, non-coercive, transparent
- Aligns with Epic 5: Organization Management (aggregated outcomes data view, Story 5.5)

**FRs covered:** FR-M54 (opt in to share aggregated outcomes data with organization)

---

### Story 8.4: Implement Encryption at Rest and in Transit

As a system,
I want to encrypt data at rest and in transit,
So that user data is protected from unauthorized access during storage and transmission.

**Acceptance Criteria:**

**Given** infrastructure foundation exists (Pre-Epic)
**When** I implement encryption
**Then** there is an encryption system that:
- Encrypts data in transit (TLS 1.3 minimum for all API endpoints)
- Encrypts data at rest (database encryption, file system encryption)
- Uses industry-standard encryption algorithms (AES-256 for data at rest, TLS 1.3 for data in transit)
- Configures encryption at infrastructure level (not application-level)
- Supports certificate management (SSL/TLS certificates for HTTPS)
- Supports key management (encryption keys stored securely, rotated regularly)
**And** encryption is configured at infrastructure level (not application-level)
**And** encryption uses industry-standard algorithms (AES-256, TLS 1.3)
**And** encryption supports key management (secure key storage, key rotation)

**Encryption Contract:**
- **Data in transit:**
  - TLS 1.3 minimum for all API endpoints
  - HTTPS for all web traffic
  - Certificate management (SSL/TLS certificates)
- **Data at rest:**
  - **Encryption at rest is provided via managed disk/database encryption with industry-standard ciphers and key rotation**
  - Database encryption (PostgreSQL encryption at rest, managed by database provider)
  - File system encryption (if applicable, managed by infrastructure provider)
  - **Why control-centric language:** You don't want future audits debating cipher choices. You want guarantees, not implementations. This avoids accidental crypto theater.
- **Key management:**
  - Encryption keys stored securely (key management service or secure storage)
  - Key rotation (regular key rotation schedule)
  - Key access controls (restricted access to encryption keys)

**Technical Notes:**
- Encryption configuration: Infrastructure-level (not application-level)
- TLS configuration: TLS 1.3 minimum for all API endpoints
- Database encryption: PostgreSQL encryption at rest (configured at database level)
- Key management: Use key management service or secure storage for encryption keys
- Certificate management: SSL/TLS certificates for HTTPS (Let's Encrypt or similar)
- Aligns with Security Model Canon (encryption requirements)
- Aligns with Architecture: Encryption at rest and in transit

**FRs covered:** FR-M60 (encrypt data at rest and in transit)

---

### Story 8.5: Implement Data Access Event Logging (Should-Have)

As a system,
I want to log all data access events,
So that we can audit who accessed what data, when, and why.

**Acceptance Criteria:**

**Given** multi-tenant data isolation exists (Story 8.1) and user authentication exists (Epic 2)
**When** I implement data access event logging
**Then** there is a data access logging system that:
- Logs all data access events (who accessed what, when, why)
- Uses surrogate actor IDs (never stable user IDs in logs)
- Logs request context (requestId, actorSurrogateId, householdId, operation, duration)
- Logs data access details (which data was accessed, access type, success/failure)
- Supports log redaction (PII denylist, immediate redaction on account deletion)
- Stores logs immutably (logs are immutable and retained after user deletion)
- Supports log anonymization (identifying fields anonymized at deletion time)
**And** data access logging uses surrogate actor IDs (never stable user IDs)
**And** data access logging supports log redaction (PII denylist)
**And** data access logging supports log anonymization (on account deletion)
**And** data access logging stores logs immutably (logs retained after user deletion)

**Data Access Event Logging Contract:**
- **Log content:**
  - Request context: requestId, actorSurrogateId, householdId, operation, duration
  - Data access details: which data was accessed, access type, success/failure
  - Actor identification: surrogate actor IDs (never stable user IDs)
- **PII denylist (never log):**
  - Email addresses
  - Access tokens, refresh tokens, passwords
  - Raw request bodies for sensitive endpoints (auth, payment)
  - Stable user IDs (use surrogate IDs instead)
- **Log redaction:**
  - Immediate redaction on account deletion (all direct identifiers removed synchronously)
  - PII denylist enforced at log time (never log PII)
- **Log anonymization:**
  - Identifying fields anonymized at deletion time
  - Logs are immutable and retained after user deletion
- **Surrogate ID generation:**
  - Store `actor_surrogate_id` in `users` table, generated on user creation (UUID or similar)
  - Provides: Stable ID for logs, fast lookup, easy anonymization (set to NULL on deletion)

**Critical Guardrail (Governance Rule):**
- **Audit logs are for security and compliance only and may not be used for user behavior analysis or product optimization**
- **Why this matters:** Otherwise, someone will try to mine them later. That would violate both trust and purpose limitation.
- **This is a governance rule, not a technical one:** Audit logs exist for security and compliance auditing, not for product analytics or user behavior analysis

**Technical Notes:**
- Data access logging: Server-side logging middleware (log all data access events)
- Surrogate ID storage: Store in `users` table, generated on user creation
- Log storage: Immutable log storage (database or log aggregation service)
- Log redaction: Immediate redaction on account deletion (indexed updates)
- Log anonymization: Identifying fields anonymized at deletion time
- Aligns with Security Model Canon (Section 7: Logging & Audit Safety)
- Aligns with Architecture: Operational Logs Retention

**FRs covered:** FR-S56 (log all data access events - who accessed what, when, why - should-have)

---

### Story 8.6: Implement Organization Admin Action Logging (Should-Have)

As a system,
I want to log all organization admin actions,
So that we can audit license issuance, resource assignment, and user management activities.

**Acceptance Criteria:**

**Given** organization accounts exist (Epic 5, Story 5.1) and data access logging exists (Story 8.5)
**When** I implement organization admin action logging
**Then** there is an organization admin action logging system that:
- Logs all organization admin actions:
  - License issuance (license assignment, license extension, license expiration)
  - Resource assignment (if applicable)
  - User management (admin user creation, admin user removal)
  - Billing actions (payment method updates, invoice generation)
  - End sponsorship actions (sponsorship ended, client transition)
- Uses surrogate actor IDs (never stable user IDs in logs)
- Logs action context (requestId, actorSurrogateId, organizationId, action, target, outcome)
- Logs action details (what action was taken, on which resource, with what outcome)
- Supports log redaction (PII denylist, immediate redaction on account deletion)
- Stores logs immutably (logs are immutable and retained after user deletion)
**And** organization admin action logging uses surrogate actor IDs (never stable user IDs)
**And** organization admin action logging supports log redaction (PII denylist)
**And** organization admin action logging stores logs immutably (logs retained after user deletion)

**Organization Admin Action Logging Contract:**
- **Logged actions:**
  - License issuance (license assignment, license extension, license expiration)
  - Resource assignment (if applicable)
  - User management (admin user creation, admin user removal)
  - Billing actions (payment method updates, invoice generation)
  - End sponsorship actions (sponsorship ended, client transition)
- **Log content:**
  - Action context: requestId, actorSurrogateId, organizationId, action, target, outcome
  - Action details: what action was taken, on which resource, with what outcome
  - Actor identification: surrogate actor IDs (never stable user IDs)
- **PII denylist (never log):**
  - Email addresses
  - Access tokens, refresh tokens, passwords
  - Raw request bodies for sensitive endpoints
  - Stable user IDs (use surrogate IDs instead)
- **Log redaction:**
  - Immediate redaction on account deletion (all direct identifiers removed synchronously)
  - PII denylist enforced at log time (never log PII)
- **Log storage:**
  - Logs are immutable and retained after user deletion
  - Identifying fields anonymized at deletion time

**Access Boundary (Clarification):**
- **Admin action logs are not visible to sponsors or external funders**
- **Why this matters:** This prevents "oversight" creep where funders request access to admin action logs for "verification" or "compliance"
- **Scope:** Admin action logs are for internal security and compliance auditing only, not for external oversight or verification

**Technical Notes:**
- Organization admin action logging: Server-side logging middleware (log all org admin actions)
- Surrogate ID storage: Store in `users` table, generated on user creation (reuse from Story 8.5)
- Log storage: Immutable log storage (database or log aggregation service)
- Log redaction: Immediate redaction on account deletion (indexed updates)
- Log anonymization: Identifying fields anonymized at deletion time
- Aligns with Security Model Canon (Section 7: Logging & Audit Safety)
- Aligns with Architecture: Operational Logs Retention

**FRs covered:** FR-S57 (log all organization admin actions - license issuance, resource assignment, user management - should-have)

Acceptance Criteria Addendum:
- RLS policies are defined and enforced for all new tables touched by this story.
