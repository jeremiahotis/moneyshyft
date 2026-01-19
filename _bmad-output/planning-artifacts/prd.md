---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
inputDocuments: [
  "_bmad-output/planning-artifacts/research/domain-trauma-informed-budgeting-vulnerable-populations-research-2026-01-09.md",
  "docs/index.md",
  "docs/project-overview.md",
  "docs/architecture-frontend.md",
  "docs/architecture-src.md",
  "docs/integration-architecture.md",
  "docs/data-models-src.md"
]
workflowType: 'prd'
lastStep: 11
briefCount: 0
researchCount: 1
brainstormingCount: 0
projectDocsCount: 6
completed: "2026-01-09"
---

# Product Requirements Document - moneyshyft

**Author:** Jeremiah
**Date:** 2026-01-09

---

## Executive Summary

**The Problem:** 5.9 million unbanked and 14.1% underbanked U.S. households have no financial tools designed for their circumstances. Existing budgeting apps require bank connections they don't have, overwhelm with complexity, and use shame-based messaging that retraumatizes vulnerable users. The $25.80 billion personal finance app market has zero solutions addressing trauma-informed budgeting for vulnerable populations.

**Why Now:** Financial wellness software is growing at 15-24% CAGR, yet the most vulnerable remain excluded. The digital divide, trust gaps, and financial trauma create barriers that traditional fintech ignores. MoneyShyft is positioned as the first-mover in trauma-informed financial technology.

**The Solution:** MoneyShyft is a complete reimagining of financial wellness tools, built from the ground up with trauma-informed design and progressive disclosure. A mobile-first budgeting application that meets users where they are—whether in immediate financial crisis or building long-term stability—through a three-mode architecture that grows with users as they build financial capability.

**What Makes This Different:**

1. **Crisis Mode (Free, No Account Required):** The only budgeting tool accessible to unbanked users—no signup, no bank connection, no barriers. Designed for immediate crisis management when users need help most.

2. **Progressive Growth Architecture:** Crisis → Foundation → Builder modes that respect diverse readiness levels. Users advance at their own pace, building skills and confidence without overwhelming complexity.

3. **Trauma-Informed by Design:** Built on SAMHSA principles (Safety, Trustworthiness, Choice, Collaboration, Empowerment, Cultural Sensitivity), ensuring the app never retraumatizes users with shame-based messaging or judgmental language.

4. **Multi-Tenant Social Impact Model:** Organizations (nonprofits, CDFIs, social services) purchase household licenses for their clients, creating a B2B2C distribution channel. Thoughtful license lifecycle (org → discounted → standard) supports stability rather than extracting money. Once issued, licenses cannot be revoked—building trust with vulnerable populations.

5. **Unbanked-First Design:** Manual-entry, no-account-connection model serves populations excluded by traditional apps. WCAG 2.1 Level AA accessibility from day one, designed for users who may only have mobile devices and limited connectivity.

**Market Opportunity:**
- $25.80 billion personal finance app market (2024) → $167.54 billion by 2034
- Zero direct competition in trauma-informed budgeting space
- First-mover advantage with documented market gap
- Strategic distribution channel through nonprofit partnerships

**Project Classification:**

**Technical Type:** Web App (Mobile-First SPA)  
**Domain:** Fintech (High Complexity)  
**Project Context:** Fresh Start - Complete architectural rebuild  
**Complexity:** High

**Key Technical Requirements:**
- Multi-tenant architecture: Organizations → Households → Users hierarchy
- Three-mode progressive disclosure system (Crisis/Foundation/Builder)
- License lifecycle management (org → discounted → standard transitions)
- Mobile-first responsive design (Vue 3 + Express stack)
- Free Crisis Mode with no account requirement
- WCAG 2.1 Level AA accessibility compliance
- Manual-entry budgeting (no bank account connections)
- Trauma-informed design patterns throughout

---

## PRD Addendum — Ecosystem Constraints (ECO-* Binding)

### Status

Binding governance constraints.  
These rules apply across the MoneyShyft / NeighborRoute ecosystem and supersede application-specific implementation choices unless an explicit exception is documented below.

---

### Ecosystem Constraints (ECO-*)

#### ECO-1: Tenant Identity Resolution

Tenant identity MUST be derived exclusively from:
- the inbound Host header, and
- authenticated JWT claims (tenant_id, aud, kid).

Applications MUST NOT implement independent tenant registries or parallel tenant resolution services.

Clarification:  
Tenant lookup MAY resolve against the primary application database (e.g., organization / household tables) but MUST NOT introduce a separate tenant authority.

---

#### ECO-2: Application Boundary & Routing

Each application MUST be served on a single logical origin.
- Web UI and API MUST be same-origin per application.
- Cross-application routing MUST NOT rely on path-based multiplexing.

Explicit Exception (MoneyShyft — Crisis Mode):  
MoneyShyft MAY serve Crisis Mode as static content under /crisis/* on the same origin to preserve:
- offline capability,
- safety guarantees,
- and same-origin security assumptions.

This exception is limited to Crisis Mode only.

---

#### ECO-3: Authentication Model (Ecosystem Default)

The ecosystem default authentication model is:
- one-time code exchange,
- token-based authentication,
- no cookie-based auth,
- no tokens in URLs.

JWTs MUST include:
- kid
- tenant_id
- audience (aud)

---

#### ECO-3A: Authentication Migration Exception (MoneyShyft)

MoneyShyft is granted a temporary exception to ECO-3.
- MoneyShyft MAY use cookie-based authentication (HttpOnly cookies + CSRF defense).
- This exception exists to preserve delivery velocity and stability during initial development.

Migration Requirement:  
MoneyShyft MUST migrate to the ecosystem authentication model in a future major version.
- The migration MUST be planned explicitly.
- The migration MUST NOT be silent or incremental without versioning.
- New ecosystem applications MUST NOT rely on this exception.

---

#### ECO-4: Refusal Semantics

Business-logic refusals MUST return:  
200 OK  
{ success: false, reason: "<machine-readable-code>" }

Errors (4xx, 5xx) are reserved exclusively for:
- authentication failures,
- authorization failures,
- validation errors,
- system faults.

Applications MUST NOT encode business refusal as transport-level failure.

---

#### ECO-5: Content Security Policy (CSP)

CSP MUST be injected at the ingress / edge layer.
- Applications MUST NOT set or modify CSP headers.
- CSP violations MUST be treated as infrastructure issues, not application errors.

---

### Precedence Rule

In case of conflict:
1. Product Constitution
2. Ecosystem Constraints (ECO-*)
3. PRD
4. Architecture
5. Implementation

Exceptions MUST be explicitly documented and time-bounded.

---

### Implementation Notes (Non-Normative)

- MoneyShyft architecture, epics, and CI rules must reference ECO-* constraints explicitly.
- Any future deviation requires Product Lead approval and documentation in this section.

---

### Why This Exists

These constraints exist to ensure that every product in the ecosystem:
- preserves user agency and dignity,
- prevents architectural drift,
- avoids surveillance creep,
- and remains interoperable without coercion.

They are governance rules, not technical preferences.

---

## Success Criteria

### User Success

**Core Principle:** Measure outcomes, not outputs. The ultimate success metric: "Did this make someone's life materially better without causing harm?"

#### Leading vs. Lagging Indicators

**Leading Indicators (Predict Success):**
- User takes action within 15 minutes (Crisis)
- User logs 3 transactions in first week (Foundation)
- User runs scenario simulation (Builder)
- User creates private note/category (trust signal)

**Lagging Indicators (Confirm Success):**
- Crisis resolved (self-reported)
- Pattern identified after 4 weeks (Foundation)
- Goal achieved after 90 days (Builder)
- User "graduates" (exports data, says "don't need app anymore")

**Why This Matters:** Leading indicators let you course-correct early. Lagging indicators validate the approach worked.

#### Crisis Mode Success

**Primary Outcome (Must Happen):**
- User takes at least one concrete action within 15 minutes of opening the app
  - Examples: Called a phone number, filled out a form, made a decision about which bill to skip, accessed an emergency resource
  - **Why this metric:** If a user opens the app, stares at it, and closes without doing anything, the app failed. Success is ACTION, not comprehension or comfort.

**Secondary Outcomes (Quality Indicators):**
- User returns to Crisis Mode within 72 hours to take a second action (shows trust and first action didn't fully solve it)
- User self-reports the crisis was resolved or de-escalated (post-action survey: "Did this help?")
- User does NOT create an account (if crisis solved and user left, that's success—they don't need ongoing tracking)

**Trauma-Informed Validation:**
- User completes action WITHOUT being asked for extensive personal info upfront (measure: max 3 input fields before first action)
- User does NOT abandon mid-flow (high abandonment = overwhelming/shaming UX)
- Post-action survey: "Did you feel judged?" (target: <10% yes)

#### Foundation Mode Success

**Primary Outcome:**
- User logs at least one transaction per week for 4 consecutive weeks
  - Shows habit formation, not just initial enthusiasm
  - Low bar (once per week) respects user's capacity

**Secondary Outcomes:**
- User identifies one pattern in their spending (app detects via focus filter usage or reflection responses)
- User experiences zero shame spirals (measured by: not deleting all data and starting over, not abandoning app for >30 days after using regularly)
- User self-defines a "small win" and achieves it (measured via reflection check-ins: "Did you do what you wanted to do?")

**Mode Progression Indicators (Optional, Not Required):**
- User asks for more features ("I want to set a goal" or "Can I track multiple accounts?")
- User has 8+ consecutive weeks of consistent logging (shows readiness for complexity)
- User manually switches to Builder Mode (self-selected, not app-suggested)

**Trauma-Informed Validation:**
- User returns after disappearing for 2+ weeks (shows no-shame re-entry is working)
- User uses "take a break" feature intentionally (shows agency, not abandonment)
- Post-reflection survey: "Do you feel like you're failing?" (target: <15% yes)

**Note:** Staying in Foundation Mode indefinitely might be success if user is building awareness and avoiding crises. Linear progression is not required.

#### Builder Mode Success

**Primary Outcome:**
- User runs at least one scenario simulation and makes a decision based on it
  - Example: "Should I pay off debt or save for emergency fund?" → runs both scenarios → chooses one
  - This is the value-add of Builder Mode—strategic decision-making

**Secondary Outcomes:**
- User sets a goal and tracks progress for 90+ days (shows long-term engagement)
- User optimizes spending in at least one category (finds inefficiency, makes change, sees impact)
- User uses forecasting to avoid a future crisis (proactive, not reactive)

**Mode "Graduation" (Optional, Not Required):**
- User exports data and migrates to YNAB/Monarch (dignified exit = success)
- User says "I don't need this app anymore" (financial independence achieved)

**Trauma-Informed Validation:**
- User makes a "bad" financial decision (by conventional wisdom) and the app doesn't shame them (measured by: no guilt-trip messaging, user doesn't abandon app after making choice)
- User experiments freely with scenarios without fear of commitment (measured by: scenario creation → deletion rate)

#### Cross-Mode: The "Worth It" Moment

**Mode-Specific Success Moments:**

- **Crisis:** "I didn't get evicted / my power didn't get shut off / I fed my kids tonight"
  - Measurable: User self-reports crisis averted (post-action survey)

- **Foundation:** "I understand my money now / I know where it goes / I'm not as anxious"
  - Measurable: User can answer "Where did your money go last week?" without guessing

- **Builder:** "I made a plan and I'm sticking to it / I'm hitting my goals / I feel in control"
  - Measurable: User achieves self-defined goal or completes 90-day forecast period

#### Trauma-Informed Validation: Red Flags vs. Green Flags

**Red Flags (Indicate Retraumatization):**
- High abandonment after initial use: % of users who log in once and never come back (target: <20%)
- Data deletion spirals: # of times user clears transaction history (should be RARE)
- Rapid mode-switching: Mode switches per week (target: <1 switch per month)
- Negative feedback keywords: Sentiment analysis on feedback forms (keywords: "overwhelmed," "ashamed," "failing," "judged," "too hard")

**Green Flags (Indicate Safety & Support):**
- Return after absence: % of "lapsed" users who return within 60 days (target: >30%)
- Voluntary vulnerability: # of private categories/notes created (shows user TRUSTS the app)
- Positive feedback keywords: "safe," "helpful," "no pressure," "understood," "empowering"
- Referrals from vulnerable populations: Inbound partnerships with crisis organizations (third-party validation)

#### Micro-Interaction Metrics

**Micro-Behaviors That Signal Safety:**
- User hovers over "delete" button >3 seconds without clicking (hesitation = fear?)
- User clicks "take a break" intentionally (agency = good)
- User returns after 2+ week absence (no-shame re-entry = working)
- User creates private note after 1 week (trust building)

**Micro-Behaviors That Signal Harm:**
- User deletes all data within 24 hours of creating account (shame spiral)
- User switches modes >3 times in one week (chaotic, overwhelmed)
- User abandons mid-flow >50% of sessions (overwhelming UX)

**Why This Matters:** Micro-interactions reveal emotional state. Track these as early warning signals.

#### First Measurable Win

- **Crisis:** User takes one action within 15 minutes (immediate win)
- **Foundation:** User logs 3 transactions in first week (habit starts)
- **Builder:** User completes dashboard setup and sees full financial picture (clarity achieved)

#### After 30 Days of Use

- **Crisis:** User shouldn't still be in Crisis Mode after 30 days—either crisis resolved (success) OR user needs Foundation/Builder Mode (progression). If still in Crisis Mode after 30 days, that's a sign the app isn't working OR the user needs human intervention beyond app capability.
- **Foundation:** User has logged transactions for 4 weeks and identified one pattern ("I spend $200/month on groceries" or "I overspend on weekends")
- **Builder:** User has set at least one goal and made progress toward it (emergency fund has $100 in it, debt payoff timeline is 2 months shorter, savings rate increased by 5%)

#### Trust-Building Moments

1. **The app doesn't ask for everything upfront**
   - Crisis: No account required
   - Foundation: Minimal onboarding
   - Builder: Can start simple, add complexity later

2. **The app doesn't punish failure**
   - User goes off-track → app says "welcome back" not "you failed"
   - User makes "bad" decision → app shows math, doesn't moralize

3. **The app lets them leave**
   - "Take a break" is easy to find
   - Export/migration is offered, not hidden
   - No dark patterns to keep them trapped

### Business Success

#### Unit Economics

**Cost to Acquire (CAC):**
- Individual Builder user: $0-5 (organic growth, word-of-mouth)
- Organization customer: $500-1,500 (sales cycle, onboarding, support)

**Lifetime Value (LTV):**
- Individual Builder user: $80/year × 2 years average = $160 LTV
- Organization customer: $250/month × 24 months average = $6,000 LTV

**LTV:CAC Ratio:**
- Individual: 32:1 (excellent, but low volume)
- Organization: 4:1 to 12:1 (healthy, higher volume)

**Payback Period:**
- Individual: <1 month (immediate)
- Organization: 2-4 months (acceptable for B2B)

**Why This Matters:** Unit economics determine sustainability. If CAC > LTV, you're losing money on every customer.

#### Revenue Model: Hybrid (Freemium + B2B2C)

**Rationale:** This model aligns with values—help vulnerable users for free, charge stable users who can afford it, and organizations subsidize individual free users through bulk licensing.

**Pricing Structure:**
- **Individual Users:**
  - Crisis Mode: Free, always
  - Foundation Mode: Free, always
  - Builder Mode: $8/month or $80/year (power users can afford it, they're financially stable)

- **Organization Licenses:**
  - $5/user/month for all modes (minimum 50 users = $250/month)
  - Enterprise orgs (500+ users): Custom pricing
  - Orgs get: White-label option, admin dashboard, bulk user management, custom resources

**Why This Model:**
- Casey/Riley stay free (trauma-informed, no financial barrier)
- Blake pays (can afford it, gets advanced tools)
- Organizations pay (bulk licensing, they have budgets/grants for client tools)
- Revenue is predictable (monthly recurring from Builder users + annual contracts from orgs)

#### B2B2C Success Metrics

**At 3 Months (Pilot Phase):**
- Target: 3-5 pilot organizations (DV shelters, financial counseling nonprofits)
- Success criteria:
  - At least 2 orgs with >10 active users
  - License utilization: >30% (if org buys 50 licenses, 15+ clients actively using)
  - Qualitative feedback: Orgs say "our clients are using this and it's helping"
- Revenue: $750-1,250/month (mostly pilot pricing, possibly discounted)

**At 6 Months (Validation Phase):**
- Target: 10-15 organizations
- Success criteria:
  - At least 5 orgs renewing after 3-month pilot
  - License utilization: >50%
  - At least 1 org case study published
  - Net Promoter Score from org staff: >40
- Revenue: $3,000-5,000/month

**At 12 Months (Growth Phase):**
- Target: 25-40 organizations
- Success criteria:
  - 80%+ pilot org retention (orgs that started are still paying)
  - License utilization: >60%
  - At least 3 referrals from existing orgs (word-of-mouth growth)
  - Revenue per org increasing (orgs buying more licenses as they see value)
- Revenue: $10,000-15,000/month from orgs alone

**Key Org Partnership Metrics:**
- Activation rate: % of purchased licenses with at least 1 login in 30 days
- Engagement rate: % of activated users taking action (Crisis) or logging transactions (Foundation)
- Org satisfaction: Quarterly surveys with org staff (NPS, testimonials)
- Renewal rate: % of orgs renewing annual contracts

#### Growth Metrics

**User Growth (Individual):**
- Crisis actions: # of concrete actions taken per month (target: 100/month by month 6, 500/month by month 12)
- Foundation users: # of users logging consistently for 4+ weeks (target: 50 by month 6, 200 by month 12)
- Builder conversions: % of Foundation users upgrading to Builder (target: 5-10%)

**User Growth (Via Organizations):**
- Org-referred users: # of users coming through org partnerships (target: 70% of all users by month 12)
- Cross-org network effects: Users from Org A recommending to users at Org B

**Market Position:**
- Industry recognition:
  - Speaking slot at financial therapy conference by month 9
  - Case study published in social work journal by month 12
  - Award nomination (Trauma-Informed Innovation, Social Impact Tech) by month 12
- Media coverage:
  - Local news feature (Fort Wayne Journal Gazette) by month 6
  - National nonprofit publication (Chronicle of Philanthropy, Stanford Social Innovation Review) by month 12
- Thought leadership:
  - Blog posts on trauma-informed design shared by orgs (target: 1,000+ reads per post)
  - Guest posts on financial therapy/social work sites

#### Business Milestones

**3 Months (Proof of Concept): "Working" means:**
- ✓ Crisis Mode used by 50+ people, with 80%+ taking at least one action
- ✓ Foundation Mode used by 20+ people for 4+ consecutive weeks
- ✓ 3-5 pilot orgs actively using with their clients
- ✓ Zero critical bugs or security incidents
- ✓ Qualitative feedback: "This is helping" from users AND org staff
- Revenue: $1,000-2,000/month (mostly from org pilots, maybe a few Builder users)

**Red Flags (Indicate "Not Working"):**
- High abandonment in Crisis Mode (>50% leave without taking action)
- Org staff say "clients aren't using it"
- Users report feeling judged or overwhelmed
- Technical issues preventing action completion

**12 Months (Product-Market Fit): "Successful" means:**
- ✓ 500+ Crisis Mode actions taken (cumulative)
- ✓ 150+ Foundation Mode users actively tracking
- ✓ 25+ organizations with paid licenses
- ✓ 80%+ org retention rate (orgs renewing contracts)
- ✓ At least 3 unsolicited testimonials from users
- ✓ Published case study showing measurable impact (crises averted, financial stability gained)
- ✓ Break-even or close to it (revenue covers basic operating costs)
- Revenue: $12,000-20,000/month ($144K-240K annual run rate)

**What Signals It's Time to Scale:**

**Demand Signals:**
- Waitlist of 50+ organizations wanting to pilot (more demand than you can serve)
- Users requesting features you haven't built (Builder Mode, integrations, etc.)
- Organic growth (users/orgs finding you without outbound sales)
- Retention cohorts holding steady (80%+ of month 3 orgs still there at month 9)

**Operational Signals:**
- You're turning down partnerships because you can't onboard them fast enough
- Support requests are manageable (not drowning, systems are working)
- Technical infrastructure is stable (uptime >99%, no major incidents)

**Financial Signals:**
- Revenue >$15K/month with clear path to $30K/month in next 6 months
- Unit economics work: Cost to acquire org customer <12 months of revenue from that org
- Cash flow positive or have funding runway for 12+ months

**Don't scale until you have at least 2 of 3 (demand + operational + financial).**

#### Social Impact Measurement

**Crisis Outcomes:**
- # of immediate crises addressed (users taking action on eviction, utilities, food insecurity)
- Crisis resolution rate: % of users who self-report crisis was averted or de-escalated (post-action survey)
- Referrals to lifeline services: # of users connected to 211, DV resources, legal aid
- Time to action: Average time from opening app to taking first action (target: <10 minutes)

**Foundation Outcomes:**
- Financial awareness gained: % of users who can answer "Where does your money go?" after 4 weeks (baseline vs. follow-up survey)
  - **Critical:** Measure baseline at onboarding, not retroactively
  - Onboarding: "Can you tell me where your money went last week?" (baseline: likely "no" or guessing)
  - 4-week check-in: "Can you tell me where your money went last week?" (follow-up: should be "yes" with specifics)
  - Target: 80%+ can answer accurately after 4 weeks
- Anxiety reduction: Self-reported financial anxiety (1-10 scale) before vs. after 8 weeks of use
  - **Critical:** Measure baseline at onboarding, not retroactively
  - Onboarding: "Rate your financial anxiety (1-10)" (baseline)
  - 4-week check-in: "Rate your financial anxiety now (1-10)" (follow-up)
  - 8-week check-in: "Rate your financial anxiety now (1-10)" (final)
  - Target: 2-point reduction average
- Crisis prevention: # of users who avoid crisis by building awareness (track via surveys: "Did using this app help you avoid a financial emergency?")

**Builder Outcomes:**
- Goals achieved: # of users reaching self-defined financial goals
- Debt reduction: Total $ of debt paid off by users (self-reported)
- Savings increase: Total $ saved by users (self-reported)
- Financial independence: # of users who "graduate" (export to YNAB/Monarch or say they don't need the app anymore)

**Org-Level Impact:**
- Client outcomes: Orgs report improved financial outcomes for clients using the tool vs. not using
- Staff efficiency: Orgs report reduced time spent on basic financial education (app does that work)
- Program effectiveness: Orgs can tie MoneyShyft use to grant outcomes (clients achieving stability milestones)

**Systems-Level Impact (Long-Term):**
- Partnerships with federal programs: Integration with benefits enrollment, tax credit navigation
- Policy influence: App data used to advocate for policy changes (e.g., "X% of our users face eviction due to Y - here's the data")
- Industry standard: Other apps adopt trauma-informed design principles because MoneyShyft proved it works

**How to Collect Impact Data:**
- In-app surveys (lightweight): Post-Crisis action ("Did this help?"), Foundation 4-week check-in, Builder goal milestones
- Org partner reporting: Quarterly reports from orgs with # of clients using, qualitative feedback, outcome data
- Longitudinal tracking (optional, for research): Partner with academic researchers to study cohorts over 12+ months, publish findings in social work / financial therapy journals

### Technical Success

#### Performance Requirements

**Crisis Mode: Action Completion Within 15 Minutes**

Technical requirements to support this:
- Page load time: <2 seconds on 3G connection (Lighthouse score >70 on mobile, test on throttled connection)
- Form simplicity: Max 3 input fields before first action (Crisis intake question = 1 field, any follow-up = 2 fields max, no progressive disclosure requiring multiple screens)
- External resource links: Direct deep links, not multi-click navigation (e.g., "Call 211" should be tel:211 link, not "visit 211.org and search")
- Decision tree speed: All logic client-side (no API calls mid-flow—tree structure loaded on page load, user selections update UI instantly, only hit backend when user takes final action)

**How to validate:**
- User testing with actual timer (can test user complete a crisis flow in <15 min?)
- Analytics: Time from page load to action completion (target: average <10 min, 90th percentile <15 min)

**Mobile-First: "Works on Low-End Devices"**

Technical specs:
- Target devices: Android 8+ (released 2017), iPhone 7+ (released 2016), 2GB RAM minimum, 3G connection (not assuming 4G/5G)
- App bundle size: <5MB total (initial download—use lazy loading for Builder Mode features, compress images aggressively, minimal JavaScript libraries)
- Performance budget:
  - Time to Interactive (TTI): <5 seconds on low-end device with 3G
  - First Contentful Paint (FCP): <2 seconds
  - Cumulative Layout Shift (CLS): <0.1 (no jarring UI shifts)
- Battery/CPU: No heavy animations or background processes, efficient state management (Pinia optimized), debounced API calls

**How to validate:**
- Test on actual low-end Android device (buy a $100 phone for testing)
- Chrome DevTools: Mobile simulation + CPU throttling (4x slowdown) + 3G network
- Lighthouse CI in build pipeline (fail build if performance score <70)

**Offline Capability:**

- **Crisis Mode:**
  - Minimal offline: Decision tree and scripts work offline (static content cached via service worker)
  - Requires online: Resource locator (needs live 211 data), form submission
  - Graceful degradation: If offline, show cached scripts/decision tree, notify user "You'll need connection to access live resources"

- **Foundation Mode:**
  - Full offline: Transaction logging (saved to IndexedDB, syncs when online), viewing past transactions and patterns
  - Requires online: Account sync, if using linked accounts

- **Builder Mode:**
  - Full offline: Scenario planning (all calculations client-side), viewing dashboard (if data already loaded)
  - Requires online: Account sync, exporting data, couples mode real-time updates

**Technical implementation:**
- Service Worker: Cache static assets (HTML, CSS, JS)
- IndexedDB: Store transaction data locally
- Sync API: Background sync when connection restored
- Offline indicator: Clear UI showing "Working offline - changes will sync when connected"

**How to validate:**
- Chrome DevTools: Offline mode testing
- Service Worker registration check (production only, not dev)
- Test: Add transaction offline → close app → reconnect → verify sync worked

#### Measurement Challenges

**Direct Metrics (Easy to Measure):**
- Page load time: <2 seconds (Lighthouse)
- Action completion rate: <5% failure (error tracking)
- Uptime: 99.5% (monitoring service)

**Proxy Metrics (Indirect, Require Interpretation):**
- "User experiments freely" → Scenario creation/deletion rate (high deletion = fear of commitment?)
- "User feels safe" → Private notes created (voluntary vulnerability = trust)
- "No shame spirals" → Data deletion frequency (rare = good, frequent = bad)

**Why This Matters:** Some trauma-informed outcomes are hard to measure directly. Use proxy metrics with clear interpretation guidelines.

#### Accessibility

**WCAG 2.1 Level AA Compliance - Technical Validation:**

- Color contrast: 4.5:1 for normal text, 3:1 for large text (use Lighthouse accessibility audit, WebAIM contrast checker, validate in light AND dark mode)
- Keyboard navigation: All interactive elements accessible via Tab/Shift+Tab (manual testing—unplug mouse, navigate entire app with keyboard, validate focus indicators visible, logical tab order, no keyboard traps)
- ARIA labels: All buttons, links, form inputs have descriptive labels (use axe DevTools, Lighthouse, validate screen reader can identify every interactive element)
- Semantic HTML: Use proper heading hierarchy (h1→h2→h3), landmark regions (use HTML validator, axe DevTools, validate page structure makes sense without CSS)
- Error handling: Form errors announced to screen readers (manual testing with screen reader, validate required fields, invalid inputs trigger aria-live announcements)

**How to validate:**
- Automated: Run axe DevTools on every page (integrate into CI/CD)
- Manual: Tab through every flow with keyboard only
- Screen reader: Test with VoiceOver (Mac/iOS) or NVDA (Windows)
- Lighthouse: Accessibility score >90 (catch low-hanging fruit)
- Who tests: You can do basic validation, but for formal compliance, hire accessibility consultant to audit before launch

**Screen Reader Compatibility - Test Criteria:**

- User can complete Crisis flow using only screen reader (no visual cues needed)
- Foundation Mode is navigable (can log transaction, view patterns, choose "one thing")
- Builder Mode is usable (can set goals, run scenarios, view forecasts—provide text alternative to graphs)

**Specific technical requirements:**
- Charts/graphs: Provide data table alternative (d3 charts with accessible table)
- Dynamic content: Use aria-live regions for updates (e.g., scenario calculations)
- Form validation: Error messages read aloud when user focuses invalid field
- Skip links: "Skip to main content" link at top of every page

**How to test:**
- VoiceOver (Mac): Cmd+F5 to enable, navigate with VO+arrow keys
- NVDA (Windows): Free screen reader, test on Windows VM
- Mobile: iOS VoiceOver, Android TalkBack
- User testing: Hire blind/low-vision testers from accessibility testing services

**Low-Data Usage - Technical Targets:**

- Initial app load: <2MB data transfer
- Typical session: <500KB (user logs a few transactions, views dashboard)
- Heavy session: <2MB (user in Builder Mode running scenarios)

**How to achieve:**
- Image optimization: Use WebP format, compress to <50KB per image, lazy load below fold
- API efficiency: Only fetch data user needs (don't load entire transaction history upfront)
- Caching: Aggressive caching of static assets (CSS, JS, fonts)
- Minimize external dependencies: Don't load Google Fonts or analytics unless necessary

**How to validate:**
- Chrome DevTools Network tab: Track total data transfer per page
- Lighthouse: Check "Efficiently encode images" and "Minimize main-thread work"
- Test on actual mobile data connection (not WiFi)

#### Security & Privacy

**No Account Required for Crisis Mode - Technical Data Privacy:**

**Recommended Approach: Anonymous Session Data (Option B)**
- Generate random session ID (UUID), store Crisis flow data temporarily
- No PII collected (no email, no name, no phone)
- Data auto-deletes after 7 days
- Pros: Can measure "user took action," track outcomes anonymously
- Cons: User can't retrieve data if they want to (but Crisis mode is one-time use anyway)

**Technical implementation:**
- Session stored in browser localStorage (not backend database initially)
- If user later creates account, offer to "claim" session data
- Backend stores only: session_id, crisis_type, action_taken, timestamp (no PII)
- Use this for analytics: "50 users addressed eviction crisis this month"

**Privacy compliance:**
- Clear disclosure: "We track anonymous usage to improve the tool. No personal info is collected."
- No cookies (except session management)
- No third-party trackers (Google Analytics, Facebook Pixel, etc.)

**Multi-Tenant Data Isolation - Technical Requirements:**

**Database schema:**
```
organizations:
  - id (org_id)
  - name
  - license_count

users:
  - id (user_id)
  - org_id (foreign key, nullable for individual users)
  - email
  - encrypted_data

budgets:
  - id (budget_id)
  - user_id (owner)
  - org_id (which org this budget belongs to, if any)

transactions:
  - id
  - budget_id (foreign key)
  - user_id (who created it)
```

**Access control (Row-Level Security in PostgreSQL):**
- User can only see their own budgets and transactions
- Org admin can see aggregated data for their org's users (not individual user data)

**API layer enforcement:**
- Every query checks: "Does this user have permission to access this budget/transaction?"
- Middleware validates org_id in JWT token matches requested resource
- Org admins can NEVER see individual user data (only aggregated/anonymized stats)

**How to validate:**
- Penetration testing: Try to access Org B data while logged in as Org A admin
- Automated tests: Assert queries with user_id=X can't return data for user_id=Y
- Code review: Every database query must include org_id/user_id filter

**Compliance: GLBA, CCPA, GDPR - Technical Validation:**

**GLBA (Gramm-Leach-Bliley Act) - Financial Privacy:**
- Privacy policy clearly states: "We don't sell your data. We don't share with third parties except [list]."
- Opt-in for any data sharing (marketing, analytics)
- Encryption at rest (PostgreSQL TDE or application-level encryption)
- Encryption in transit (HTTPS everywhere, no HTTP)

**CCPA (California Consumer Privacy Act):**
- "Delete my account" feature actually deletes data (not just soft-delete)
- Data export feature (user can download all their data as JSON/CSV)
- Opt-out link in footer: "Do Not Sell My Personal Information" (even if you don't sell, having link shows compliance)

**GDPR (General Data Protection Regulation - EU):**
- Same as CCPA (export, delete features)
- Consent management: User explicitly opts in to data collection (not pre-checked boxes)
- Data retention policy: Crisis mode sessions auto-delete after 7 days, inactive accounts deleted after 2 years of no login

**How to validate:**
- Legal review: Have lawyer review privacy policy and data handling
- Technical audit: Penetration tester verifies encryption, access controls
- User testing: Can user actually export and delete their data via UI?

#### Reliability

**Uptime Requirements for Crisis Tool:**

- Target: 99.5% uptime (43.8 hours of downtime per year allowed)
- Why not 99.9%? You're a solo dev/small team, not AWS. 99.9% requires on-call rotation, complex failover. 99.5% is achievable with good hosting (Digital Ocean, Heroku, etc.)

**How to achieve:**
- Hosting: Use managed services (DigitalOcean App Platform, Heroku, Render)
- Database: Managed PostgreSQL with automated backups
- Monitoring: UptimeRobot (free tier) pings app every 5 min, alerts you if down
- Incident response: If app goes down, you get alert and can restore within 1-2 hours

**Acceptable Downtime Windows:**

**Planned Maintenance:**
- Window: 2AM-4AM ET on weekends
- Frequency: Monthly or as needed
- Communication: Announce 48 hours in advance via in-app notification
- Duration: <2 hours

**Unplanned Outages:**
- Target restore time: <2 hours
- Communication: Status page updated within 15 minutes, email to org admins
- Post-mortem: Required for outages >1 hour

**What's NOT acceptable:**
- Downtime during business hours (9AM-5PM ET weekdays) without warning
- Data loss (backups must be restorable)
- Extended outage (>4 hours) without communication to users/orgs

**Why This Matters:** Crisis Mode users need reliability. Clear downtime policies build trust.

**Acceptable Failure Rate for Action Completion:**

- Target: <5% failure rate for Crisis Mode actions

**What counts as "failure":**
- User can't load page (server error)
- Form submission fails (backend error)
- External link is broken (resource moved/deleted)
- Decision tree doesn't load (JavaScript error)

**How to measure:**
- Error tracking: Sentry or Rollbar captures frontend/backend errors
- Analytics: Track "action attempted" vs. "action completed" (gap = failure rate)
- User feedback: "Did this work?" survey after action

**What to do if failure rate >5%:**
- Investigate most common error (Sentry dashboard)
- Fix highest-impact bug first (affecting most users)
- Deploy hotfix within 24 hours
- Post-mortem: What caused this, how to prevent?

**Acceptable vs. unacceptable failures:**
- ✓ Acceptable: External resource (211 site) is down (not your fault, but provide workaround)
- ✗ Unacceptable: Your form submission endpoint is down (YOUR infrastructure failed)

---

## Product Scope

### MVP - Minimum Viable Product

**Core Principle:** What must work for this to be useful? Crisis Mode + Foundation Mode Basics + Org Structure

#### Must-Have for Launch

**Crisis Mode (Fully Functional):**
- ✓ 72-hour intake question
- ✓ Action generator (3-5 top actions based on crisis type)
- ✓ Pre-filled scripts/forms
- ✓ Resource locator (211 integration or hardcoded local resources)
- ✓ Decision tree for "which bill to skip"
- ✓ No account required (anonymous sessions)

**Foundation Mode (Basics):**
- ✓ Simple transaction logging (manual entry only, no bank linking)
- ✓ Balance check-in (one account)
- ✓ Reality mirror dashboard ("what happened since last time")
- ✓ "Pick one thing" selector
- ✓ Focus filter (track only selected thing)
- ✓ Gentle pattern detection
- ✓ Weekly reflection ("How does that feel?")
- ✓ "Take a break" / "Start fresh" options
- ✓ No-shame re-entry (welcome back messaging)

**Multi-Tenant Org Structure:**
- ✓ Organizations can create accounts
- ✓ Org admins can invite users (email invitations)
- ✓ Users tied to specific org (data isolation)
- ✓ Org admins see anonymized/aggregated stats (not individual user data)
- ✓ Billing management (org pays for licenses)

**Core Infrastructure:**
- ✓ User authentication (email/password for Foundation/Builder, no auth for Crisis)
- ✓ PostgreSQL database with multi-tenant isolation
- ✓ Basic admin panel (for you to manage orgs/users)
- ✓ Error tracking (Sentry)
- ✓ Uptime monitoring (UptimeRobot)
- ✓ Privacy policy, Terms of Service

#### What CAN Wait Until After Launch

- ❌ Builder Mode (entire mode, not needed for MVP)
- ❌ Bank account linking (manual entry is enough for Foundation Mode)
- ❌ Couples mode (complex, validate demand first)
- ❌ Mobile apps (iOS/Android native - mobile web is fine for MVP)
- ❌ Advanced pattern detection/AI insights
- ❌ Gamification (badges, progress bars beyond simple "small wins")
- ❌ Export to YNAB/Monarch (basic CSV export is fine)
- ❌ Advanced org features (white-labeling, custom resources, SSO)

**Why this is the right MVP scope:**
- Crisis Mode proves the core value prop: We help people in immediate need
- Foundation Mode proves retention: People come back and build habits
- Org structure proves business model: Orgs will pay for this
- Everything else is nice-to-have until you validate these three work

### Growth Features (Post-MVP)

#### Priority 1 (Months 3-6)

**Builder Mode (Core Features):**
- Multi-account dashboard
- Goal setting with progress tracking
- Basic forecasting (30-day cash flow projection)
- Spending analyzer (category deep dives)
- Export to CSV/JSON

**Bank Account Linking (Foundation + Builder):**
- Plaid integration (or Teller for lower fees)
- Automatic transaction import
- Balance sync
- Connection health monitoring

**Enhanced Org Features:**
- Custom resource library (orgs can add their own local resources to Crisis Mode)
- Org-branded experience (logo, colors)
- Admin dashboard improvements (better analytics)

#### Priority 2 (Months 6-12)

**Builder Mode (Advanced):**
- Debt payoff strategist (avalanche vs. snowball)
- Scenario planning ("what if I lose my job?")
- Budget templates
- Recurring transaction management

**Mobile Apps (Native):**
- iOS app (Swift/SwiftUI)
- Android app (Kotlin)
- Push notifications (gentle, not spammy)

**Enhanced Privacy/Safety Features:**
- Hidden categories (private spending)
- Quick privacy toggle
- Safety disconnect (couples mode exit)

#### Priority 3 (Year 2+)

**Couples Mode:**
- Shared budgets with role-based access
- Real-time sync
- Dignified disconnect process

**Community Features (Maybe):**
- Peer accountability partners (opt-in matching)
- Success story sharing (anonymous)
- Group challenges (savings sprints)

**What makes this competitive:**
- Crisis Mode: No other app does this (unique)
- Trauma-informed design: YNAB/Monarch are for stable people, you're for everyone
- Org partnerships: B2B2C model means you reach vulnerable populations others miss
- Freemium pricing: YNAB is $14.99/month, you're free for Crisis/Foundation

### Vision (Future Dream Version)

**The Dream (2-3 Years Out):**

**AI-Powered Insights (Ethical AI):**
- Pattern recognition: "You always overspend after payday - want to talk about that?"
- Crisis prediction: "Based on your patterns, you might face cash shortage in 2 weeks - here's a plan"
- Personalized coaching: "You said you wanted to save for a car - here's how to get there faster"
- Critical: AI must be explainable, non-judgmental, opt-in

**Integration Ecosystem:**
- Government benefits: Pre-fill SNAP, Medicaid, EITC applications
- Bill negotiation: Auto-generate hardship letters for utilities, medical bills
- Financial services: Connect to CDFIs, credit unions offering fair products
- Tax filing: Partner with GetYourRefund, FreeTaxUSA for easy filing

**Research & Advocacy:**
- Publish data on financial instability (anonymized, aggregated)
- Partner with academics studying poverty, trauma
- Use platform data to advocate for policy: "X% of our users would benefit from Y policy change"

**Scale & Sustainability:**
- 100,000+ users across all modes
- 500+ org partnerships (nonprofits, social services, financial counselors)
- Self-sustaining revenue (org licenses + Builder subscriptions cover costs + small team salaries)
- Open-source core (make trauma-informed design principles available to others)

**Movement Building:**
- Conferences on trauma-informed fintech
- Toolkit for other developers to build ethical financial tools
- MoneyShyft becomes standard in social work programs (taught as case study)

**What this requires:**
- Funding (grants, impact investors, or strong revenue growth)
- Team (can't be solo dev forever - need engineers, researchers, partnerships lead)
- Trust from vulnerable communities (earned over years, not bought)

---

## User Journeys

### Journey 1: Casey - Crisis Mode (Organization Referral Path)

**Casey's Story:**
Casey is a single parent in Fort Wayne, working two part-time jobs that don't quite cover rent. When an eviction notice arrives with a court date in 5 days, panic sets in. Casey has been here before—last time, a predatory payday loan made things worse. This time, Casey calls 211, hoping for real help.

**Act 0: Pre-Journey (Counselor Preparation)**

Before referring Casey, the counselor receives email/notification: "You're about to refer Casey to MoneyShyft. Here's what to expect: [troubleshooting guide]"

**Counselor Value Proposition (New):**
- Clear benefits: "This saves you 10 minutes per client" (time savings)
- Easy integration: Works with existing counselor workflows (no disruption)
- Optional, not required: Counselor can still help manually (no pressure)
- Minimal training: "Takes 5 minutes to learn" (low barrier)
- Success stories: "Counselors using this tool report [benefits - e.g., faster client help, better outcomes]"

Counselor has backup plan: "If the tool doesn't work, here's how to help Casey manually: [manual process]"

**Counselor Adoption Support (New):**
- Counselor can add resources manually (not dependent on ResourcesHyft)
- Counselor can see client progress in real-time (dashboard)
- Counselor can intervene if client gets stuck (support tools)
- Counselor can provide feedback on resources (improves system)

**Act 1: Discovery & Entry (Counselor-Referred)**

Casey is on the phone with a 211 counselor, already on hold for 20 minutes. The counselor says: "I'm texting you a link to a tool that will help us figure out your best options. Can you click it now?"

**Act 1.5: Entry Options (Multi-Path Support)**

**Path A (Smartphone - Standard):**
Casey receives a text: "Hi Casey, this is [Counselor Name] from 211. Here's the tool I mentioned: [shortlink] - It'll ask you one question about what's happening. Takes about 10 min."

Casey clicks the link, which includes referral tracking (`moneyshyft.app/c?ref=211&counselor=jane&fallback=simple`). No login required.

**Emergency Mode Check (New):**
Before intake question, MoneyShyft asks: "Is this an emergency happening RIGHT NOW?" [Yes] [No]

**If Casey selects "Yes":**
- Skip to immediate help: [Call 911] [Crisis hotline] [Emergency resources]
- Quick exit: "Need to leave? [Get phone numbers] [Save for later]"
- Emergency resources shown immediately (no intake question needed)

**If Casey selects "No":**
- Proceeds to intake question

**Willingness Acknowledgment (New):**
Before intake, MoneyShyft shows:
- "This might feel uncomfortable. That's okay."
- "You don't have to use this. [Skip to resources]"
- "Asking for help is brave, not weak."
- "You're in control. You decide what to share."

Casey can choose: [Continue] [Skip to resources] [I'm not ready]

**Path B (No Smartphone):**
Counselor asks: "Do you have a smartphone, or are you on a computer?"
- If no smartphone: "I'll email you the link, or you can go to moneyshyft.app/crisis and enter code: [counselor code]"
- QR code option: Counselor can generate QR code for Casey to scan (if Casey has access to device with camera)
- Verbal path: "If you can't use the tool, I can walk you through your options right now on the phone"

**Path C (Shared Device - Privacy Mode):**
If Casey is using someone else's device: "Using someone else's device? [Privacy mode] (clears history on close)"
- Privacy mode: No data saved to device, all data cleared when browser closes
- Counselor can still track progress via dashboard (with Casey's permission)

**Path D (Language Selection):**
Language selector appears at entry: [English] [Español] [Other languages as available]
- Full translation of Crisis Mode in selected language
- ResourcesHyft filters for resources in selected language
- Counselor dashboard can toggle language to match Casey's preference

**Technical Resilience:**
- If page doesn't load in 5 seconds, auto-redirect to simple text version
- Counselor receives confirmation: "Casey clicked the link. If they don't complete it in 10 minutes, I'll follow up."
- Link includes fallback parameter for graceful degradation
- Works on flip phones (SMS-based entry with code)
- Works on library computers (no JavaScript required for basic flow)

**Act 2: Crisis Intake (The 72-Hour Question)**

Casey lands on the intake page and sees:

**Literacy Support Options (New):**
Casey can choose: [Text mode] [Visual mode] [Audio mode] [Simple words]

**Text Mode (Standard):**
> "You're not alone. We're here to help. Let's figure out your next steps together. What happens in the next 72 hours if nothing changes?"
> 
> For example: "I'll be evicted," "My utilities will shut off," "I won't be able to feed my family."
> 
> Take your time. You can type or speak. If you get interrupted, you can come back.
> 
> We won't save this unless you want us to. You're in control.

**Visual Mode (New):**
- Icons and images instead of text
- Visual timeline: "What bad thing will happen soon?" with picture examples
- Visual calendar: "72 hours = 3 days = by [specific date shown on calendar]"

**Audio Mode (New):**
- "Listen to this page" button (text-to-speech)
- Voice instructions: "Tell me what's happening. I'm listening."
- Audio confirmation: "I heard: [Casey's answer]. Is that right?"

**Simple Words Mode (New):**
- Simplified language: "What bad thing will happen soon?"
- Time explanation: "72 hours = 3 days = by [specific date]"
- Examples in simple words: "I'll lose my home" instead of "I'll be evicted"

**Video Guide (Optional):**
- "Not sure how this works? [Watch video guide]" (visual demonstration)

A large text box appears with a voice-to-text icon. Casey types (or speaks): "I got an eviction notice. Court date is in 5 days. I owe $1,200 in back rent and I don't have it."

**Act 2.5: Multi-Crisis Detection (New)**

After Casey submits first answer, MoneyShyft asks: "Is there anything else happening in the next 72 hours?" [Yes, there's more] [No, that's it]

**If Casey selects "Yes, there's more":**
- Multi-crisis mode activates
- Casey can add additional crises: "My utilities are about to shut off" and "I need food for my kids"
- Prioritization support: "You're dealing with multiple things. Let's prioritize: [eviction, utilities, food]"
- Decision tree: "If you can only address one thing first, which would prevent the most harm?"
- Combined resources: Show resources that address multiple crises (e.g., "This program helps with rent AND utilities")

**If Casey selects "No, that's it":**
- Proceeds to single-crisis action generation

**Act 2.6: Repeat User Recognition (New)**

If MoneyShyft detects Casey has used Crisis Mode before (via browser fingerprint or account):
- "Welcome back. Last time you were here, you [previous crisis]. How are you doing now?"
- No shame messaging: "Crises happen. You're here, and that's what matters. Let's figure this out."
- Different resources: "Since you tried [previous resource], here are some different options: [new resources from ResourcesHyft]"
- Pattern support (optional): "If you want, we can help you track patterns so this doesn't keep happening. [Learn more] or [Just help with this crisis]"

**Error Recovery & Technical Resilience (Enhanced with Human Backup):**
- Auto-save intake answer to localStorage every 3 seconds (so Casey doesn't lose work if page crashes)
- If Continue button doesn't appear after 10 seconds, show: "Button not showing? [Click here to continue] [Get help from support] [Call counselor]"
- If voice-to-text fails, show: "Voice input not working? [Type instead] [Get help]"
- If page crashes, show recovery: "We saved your answer. [Continue where you left off] [Get help]"
- Core functionality works without JavaScript (form submission via standard HTML as fallback)
- **Clear error messages (New):** "We're having a technical issue. [What happened] [What to do] [Get human help]"
- **Human backup prominent (New):** "Technology not working? [Talk to a person] [Call support: phone number]"
- **Escalation path (New):** "Still stuck? [Escalate to human] [Get phone number]"

**In-Tool Support Access (New):**
- Every page has: "Need help? [Chat with support] [Call support] [Get help from counselor]"
- Support can see exactly where Casey is in the flow (with Casey's permission)
- Support can take over and guide Casey through options
- Support can add resources manually if needed
- Support can report issues directly from dashboard

**Accessibility Features:**
- Full screen reader support from day one (WCAG 2.1 Level AA)
- Alternative trust indicators: "Trust Score: High (5 out of 5)" in addition to stars (for screen readers)
- Simplified language option: "Want simpler words? [Switch to simple mode]"
- Multiple input methods: Voice, text, or counselor-assisted entry

**Safety Features:**
- Quick exit: "X" button in top-right corner clears everything immediately (for unsafe situations)
- Privacy mode: No saved history if using shared device or privacy mode enabled
- Safe resources: Filter for confidential/safe-to-access resources (if Casey indicates unsafe situation)
- Counselor code: "If you can't talk freely, say 'I need help with my budget' and counselor will know" (pre-arranged safety signal)

The [Continue] button appears. The text is NOT saved to server yet—privacy first. Natural language processing categorizes this as "eviction."

**Act 3: Action Generation**

**Resource Integration Note:** MoneyShyft integrates with ResourcesHyft, a separate resource database solution that uses crowdsourcing and multiple validation methodologies to maintain accurate, up-to-date resource information. ResourcesHyft provides filtered resources to MoneyShyft based on the user's crisis type and location. Each resource includes a "trust score" (based on validation status, user feedback, and verification methods) to help users make informed decisions.

**ResourcesHyft Independence (New):**
- Hardcoded fallback resources (MVP works without ResourcesHyft API)
- Manual resource curation (counselor can add resources manually via dashboard)
- Trust score transparency: "How we calculate trust: [methodology link]"
- Independent validation: Resources verified by human reviewers, not just ResourcesHyft scores
- If ResourcesHyft API is down: Show cached resources with manual verification badge

Casey clicks [Continue] and sees a loading state: "Checking available resources for you..." (validating resources via ResourcesHyft API, with fallback to hardcoded resources)

**Location Confirmation (Enhanced):**
MoneyShyft detects location via IP and shows: "You're in [detected location - e.g., Fort Wayne, IN]. Is that correct?" [Yes] [No, I'm in...] [I don't have a fixed location]

**If Casey selects "No":**
- Location input: "Where are you located?" [City, State]
- ResourcesHyft filters resources for correct location
- State-specific resources: Different tenant rights, programs, laws

**If Casey selects "I don't have a fixed location":**
- Shows general resources (not location-specific)
- "You're not in one place. Here are resources that work anywhere: [national/phone-based resources]"
- No location required for these resources

**If Rural/Remote Location:**
- "You're in a rural area. Here are resources that work remotely: [phone-based, online applications]"
- Travel considerations: "Some resources require in-person visits. Here's how far you'd need to travel: [distance]"
- Remote-friendly resources prioritized

**Location Explanation (New):**
- "We use your location to show local resources. [Why?] [Privacy info]"
- Casey can see why location is needed and how it's used

**Trust Building (New):**
If MoneyShyft detects low trust signals (user hesitates, abandons, returns multiple times):
- Trust signals: "This tool is recommended by [211, local nonprofits]. [See who trusts us]"
- Verification: "Want to verify this is real? Call 211 and ask about MoneyShyft. They'll confirm."
- Transparency: "We don't ask for money. We don't sell your info. [Read our privacy policy]"
- Offline option: "Don't want to use the tool? Your counselor can help you manually. [Talk to counselor]"

**Recommendation Mode (New - Not Just Options):**
For immediate crisis, MoneyShyft shows: "Based on your situation, we recommend starting with [Option 1]. Here's why: [reason]"

Casey can choose: [Follow recommendation] [See all options] [Get help choosing]

**If Casey selects "See all options":**
Casey then sees actionable options (filtered and ranked by ResourcesHyft based on Casey's location, crisis type, and trust scores):

1. **Apply for Emergency Rental Assistance** (RECOMMENDED for immediate eviction)
   - Trust Score: ⭐⭐⭐⭐⭐ (5/5) - Verified by [human reviewer name] on [date]
   - Resource verification badge: "Verified by [human reviewer] on [date]" (independent of ResourcesHyft)
   - **Form status (New):** "Form status: [Working] [Reported issues] [Under maintenance]" (updated in real-time)
   - **Trust score with context (New):** "This is the most reliable option for your situation" (not just 5 stars)
   - This program has helped 150+ Fort Wayne families this year. Most applications are approved within 3-5 days.
   - **Honest availability:** "This program is currently [accepting applications/waitlist/full]. Status updated: [date]"
   - **Direct contact upfront (New):** "Apply online: [Start Application] OR Call to apply: [phone number] OR Apply in person: [address]" (phone number shown upfront, not just after failure)
   - **Form complexity warning:** "This form requires: [list of required documents - ID, proof of income, etc.]. Do you have these?" [Yes, I have them] [No, I don't have them all]
   - **Document checklist:** "Before you start, gather: [ID, proof of income, eviction notice, etc.]"
   - Application takes 15 minutes. [Start Application] (opens pre-filled form in new tab)
   - *Note: Most people hear back in 3-5 days, but sometimes it takes longer. Here's what to do while you wait.*
   - *If you've applied before and didn't hear back, that's frustrating. This program is different because [specific reason - e.g., new funding, streamlined process].*
   - *Last verified: [today's date] via ResourcesHyft*
   - **Form assistance:** "Stuck on a question? [Get help] or [Skip for now]"
   - **Alternative application:** "Can't complete online? [Call to apply: phone number] or [Apply in person: address]"
   - **Progress saving:** "Save your progress and come back later" (if form allows)
   - **Rejection support:** "Got rejected? Here's what to do: [alternative resources]"
   - **Broken resource reporting (New):** "This form isn't working? [Report issue] [Get phone number] [Try alternative]"
   - **Form verification (New):** "Form verified working: [date]" (not just resource verified)

2. **Know Your Tenant Rights** 
   - Trust Score: ⭐⭐⭐⭐⭐ (5/5) - Official state resource, regularly updated
   - In Indiana, you have at least 10 days to respond. [Read Your Rights] (opens PDF with Fort Wayne-specific tenant info)
   - *Last verified: [date] via ResourcesHyft*

3. **Talk to a Lawyer (Free)** 
   - Trust Score: ⭐⭐⭐⭐ (4/5) - Verified nonprofit, user feedback positive
   - Indiana Legal Services can help. [Call Now: 1-800-xxx-xxxx] or [Text for Callback]
   - *Last verified: [date] via ResourcesHyft*

**Resource Validation & Fallbacks (Enhanced):**
- Before showing actions, validate: "Checking if programs are accepting applications..." (ResourcesHyft API check, with fallback to manual verification)
- If Program A is full or not accepting: "This program is currently full, but here are 2 alternatives: [Program B, Program C]" (ResourcesHyft provides alternatives, or counselor can add manually)
- If application link is broken: "This link isn't working right now. Here's the direct phone number: [number]" (ResourcesHyft provides backup contact info, or counselor can update)
- Show resource freshness: "Last verified: [date]" (from ResourcesHyft validation timestamp OR manual verification date)
- If ResourcesHyft API is down: Show cached resources with warning: "Resource info may be outdated. [Refresh] or [Contact counselor]"
- **Resource feedback loop:** "Did this resource help?" [Yes] [No] (improves ResourcesHyft and manual resource curation)
- **Alternative paths:** "If none of these work, here are other options: [backup resources]" (counselor can add backup resources manually)
- **Resource quality assurance:** "We verify every resource before listing. [How we verify]"
- **Broken resource reporting (New):** "This form isn't working? [Report issue] [Get phone number] [Try alternative]" (reports go to support team and ResourcesHyft)
- **Form status tracking (New):** "Form status: [Working] [Reported issues] [Under maintenance]" (updated in real-time based on user reports)
- **Direct contact upfront (New):** Phone numbers and addresses shown upfront, not just after form failure

The counselor is still on the phone: "Let's do #1 together." Casey clicks [Start Application]. The form opens in a NEW TAB (so Casey can return to MoneyShyft if needed). MoneyShyft tracks: "User selected Action 1 (rental assistance)."

**Act 4: Action Completion & Next Steps**

Casey finishes the application (or at least starts it) and returns to the MoneyShyft tab. Casey sees:

> "You applied. That's a huge step. We know waiting is hard. You're still in crisis, and that's real.
> 
> Here's what happens next:
> - **Timeline clarification (Enhanced):** Most people hear back in 3-5 days, but sometimes it takes longer. Every program is different.
> - You should receive a confirmation email within 24-48 hours, but not all programs send them. Here's how to check: [steps]
> - Within 3-5 days: Someone will contact you about your application (timeline varies by program)
> 
> **Application Status Checking (New):**
> - "Check your application status" [Check online] [Call program: phone number] [Get help checking]
> - Direct program contact info: "Call [program name] at [phone number] to check status"
> - Status checking guide: "How to check your application: [step-by-step guide]"
> 
> We'll check in with you tomorrow to see if you got the confirmation email. For now, here's what you can do:
> - Respond to your eviction notice (see option #2 above)
> - Talk to a lawyer if you haven't already
> 
> This is hard. You're doing the right thing. Here are people you can talk to if you need support: [crisis hotlines]"

**Support Integration & Error Recovery:**
- If action completion fails: "Having trouble? Your counselor can help: [Call back] or [Text for help]"
- Counselor dashboard shows: "Casey started application but didn't complete. Follow up?" (real-time status)
- Error reporting: "Something not working? [Report issue] (helps us fix it for others)"
- If form submission fails: "Something went wrong. Here's a direct link: [program application URL]" (fallback from ResourcesHyft)

Options: [Done - Close This] [I Need More Help]

If Casey clicks [Done]: The page closes. Casey can close the browser and never come back. **This is success**—Casey took action. MoneyShyft schedules a Day 1 check-in (if Casey created account or provided contact info). Counselor receives notification: "Casey completed action: Applied for rental assistance."

If Casey clicks [I Need More Help]: Loops back to intake question or offers [Talk to Counselor Again] [See Other Resources]

MoneyShyft tracks: "User completed action" (success metric). Optional lightweight survey: "Did this help?" [Yes] [No] [Not sure yet]. Data stored anonymously (session ID, no PII) for 7 days then auto-deleted.

**Act 5: Optional Account Creation (Delayed with Clarity)**

**Important:** Account creation is NOT shown immediately after action completion. This respects Casey's immediate need to process and wait.

**If Casey returns 2+ days later:**
Casey sees (if they return to MoneyShyft):

> "Want to track your application status? 
> 
> **Account Creation Clarity (New):**
> - **With an account:** Track your application, get reminders, save resources
> - **Without an account:** You can still check your application by calling the program directly at [phone number]
> 
> Create a free account to:
> - Get updates on your application (optional - you can also call the program)
> - Save resources for later
> - Track what happens next (optional)
> 
> **You don't need an account.** [Skip] [Learn more] [Create account]"

**Clear messaging:**
- "Create an account to track your application (optional). You can also check directly with the program."
- "What account does: [benefits]. Without an account: [you can still do X]"
- "No pressure: You don't need an account. [Skip] [Learn more] [Create account]"
- "Status without account: Want to check your application? [Call program] [Check online] [Create account to track]"

Options: [Create Account] [No Thanks] [Learn More]

If Casey clicks [Create Account]: Quick signup (email + password, no other info required). Casey's Crisis session data is "claimed" and attached to the account. Casey can now access Foundation Mode if they want.

If Casey clicks [No Thanks]: Session data stays anonymous. Casey can continue without account. **Still success**—crisis was addressed. Casey can still check application status by calling the program directly.

If Casey clicks [Learn More]: Explains what account does vs. doesn't do, emphasizes it's optional.

**If Casey never returns:** No account creation prompt is shown. Session data auto-deletes after 7 days. **This is success**—Casey got help and moved on.

**Failure Recovery System:**

**If Casey Abandons:**
- Counselor gets alert: "Casey didn't complete. Suggested follow-up: [message]"
- If Casey had typed answer (saved in localStorage), show recovery on return: "We saved your answer. [Continue where you left off]"
- Counselor can see status in dashboard: "Casey started but didn't complete. Last seen: [time]"

**If Technical Error Detected:**
- Auto-report to support team via error tracking (Sentry)
- Show Casey alternative path immediately: "We're having trouble connecting. Here's what you can do instead: [direct options from ResourcesHyft]"
- Don't leave Casey stuck—every error state has a recovery path

**If Resource Fails:**
- ResourcesHyft provides alternative resources immediately
- Show: "This resource isn't available right now. Here are 2 alternatives: [from ResourcesHyft]"
- If ResourcesHyft API is down: Show cached resources with warning and counselor contact

**Edge Cases:**

**Edge Case 1: Casey Abandons Mid-Flow**
- Casey lands on intake question, types answer, but closes browser before clicking [Continue]
- Why: Got interrupted, felt overwhelmed, didn't trust the tool, technical error
- What MoneyShyft does: 
  - Auto-saved answer in localStorage (recovery available)
  - Counselor gets alert: "Casey didn't complete. Suggested follow-up: [message]"
  - If Casey returns: "We saved your answer. [Continue where you left off]"
  - If counselor is on phone: Counselor can ask: "What happened? Let's try again." (counselor has troubleshooting guide)
- How to measure: Abandonment rate (% of users who land on intake but don't submit). Target: <30%

**Edge Case 2: Casey's Crisis Isn't Addressable Online**
- Casey's answer: "My partner is threatening to hurt me if I leave"
- This is a safety crisis, not just financial
- What MoneyShyft does: Detects keywords ("hurt," "abuse," "threatening," "scared," "unsafe") and immediately shows safety resources:
  - "Your safety is the most important thing. If you're in immediate danger, please call 911."
  - National Domestic Violence Hotline: 1-800-799-7233
  - Text "START" to 88788
- Options: [I'm safe right now, show me financial options] [I need to talk to someone about safety first]

**Act 6: Follow-up Support (Enhanced with Respect)**

MoneyShyft provides ongoing check-ins to support Casey through the waiting period:

**Follow-up Respect (New):**
- Opt-out easy: "Don't want reminders? [Turn off]" (Casey can disable at any time)
- Respectful timing: "We'll check in once, not spam you" (one check-in per milestone, not daily)
- Optional engagement: "Want updates?" [Yes] [No, I'm good] (Casey chooses)
- No pressure: "No response needed. Just checking in." (Casey doesn't have to respond)
- Exit gracefully: "Got help? Great! [I'm all set] [Still need help]" (Casey can exit anytime)

**Day 1 Check-in (if Casey created account or provided contact info AND opted in):**
> "It's been 24 hours since you applied. Did you get the confirmation email?"
> 
> [Yes, I got it] [No, I didn't get it] [I'm not sure] [Don't check in again]
> 
> **Anxiety Reduction (Enhanced):**
> If "No": "That's okay. Not getting a confirmation email doesn't mean your application didn't go through. Sometimes programs don't send confirmations right away. Here's how to check: [call program at phone number] [check online] [get help]"
> If "Yes": "Great! Here's what to expect next: [timeline - with note that timelines vary]"
> If "I'm not sure": "That's okay. Here's how to check: [steps]. You can also call the program directly at [phone number]."
> If "Don't check in again": Opt-out confirmed, no more check-ins
> 
> **Timeline Clarification (New):**
> "Most people hear back in 3-5 days, but sometimes it takes longer. Every program is different. [Why timelines vary]"
> "Waiting is hard. Here's what you can do: [specific actions]"
> 
> **Cascading Crisis Detection:**
> "How are things going? Any new challenges?" [Yes, something else came up] [No, just waiting] [I'm all set, thanks]
> 
> If "Yes": "You mentioned [new crisis]. This might affect your [previous application]. Here's what to do: [steps]"
> - Multi-crisis support: Resources that address both original and new crisis
> - Hope maintenance: "You're dealing with a lot. Here's what's working: [progress made]"
> If "I'm all set": "That's great! [Exit] [Still want updates]"

**Day 3 Check-in (only if Casey didn't opt out):**
> "It's been 3 days. Still waiting? That's normal. Here's what you can do in the meantime: [specific actions]"
> 
> [I got help] [Still waiting] [I need more help] [Something else came up] [Don't check in again]
> 
> If "Something else came up": Cascading crisis support activates
> If "I got help": "That's great! [I'm all set] [Still want updates]"

**Day 5 Check-in (only if Casey didn't opt out):**
> "It's been 5 days. Here's how to follow up with the program: [contact info, follow-up steps]"
> 
> [I got help] [I'll follow up] [I need different help] [I'm facing a new crisis] [Don't check in again]
> 
> If "I'm facing a new crisis": Loop back to Act 2 (Crisis Intake) with recognition: "You're dealing with another challenge. Let's figure this out."
> If "I got help": "That's great! [I'm all set] [Still want updates]"

**Outcome Tracking (New - Enhanced Success Metrics):**
- Not just "did you take action?" but "did this actually help?"
- Follow-up validation: "3 days later: Did you get help?" [Yes, I got help] [No, I didn't get help] [I'm not sure yet]
- Real success: Crisis resolved, not just action taken
- Measure impact, not activity: "Did this make your situation better?" [Yes] [No] [A little]

**Edge Case 3: Casey Returns After 2 Weeks**
- Casey used Crisis Mode, took action, left. Two weeks later, Casey is back (new crisis OR wants to see what happened with first crisis)
- If Casey created an account: "Welcome back, Casey. Last time you were here, you applied for emergency rental assistance. Did that help?" [Yes, crisis is resolved] [No, I'm still struggling] [Not sure yet]
- If "Yes, crisis is resolved": "That's great. We're glad you're okay. Want to start tracking your money so you can avoid the next crisis?" [Try Foundation Mode] [No thanks, I'm good]
- If Casey didn't create an account: Starts fresh (no memory of previous session)

**Discovery Paths (Beyond MVP):**

**Path 2: Web Search (Secondary Channel)**
- Casey Googles: "what to do if I can't pay rent Indiana"
- Finds article: "Emergency Rent Assistance Resources - Fort Wayne"
- At bottom: "Not sure where to start? Try this free crisis tool." [Link to MoneyShyft]
- Technical implications: SEO for crisis keywords, content marketing, local search optimization

**Path 3: Social Services Integrated Workflow (Future)**
- Casey applies for emergency rental assistance through local nonprofit's intake form
- After submitting: "While we review your application (2-3 business days), here's a tool to help you figure out your immediate next steps."
- Embedded MoneyShyft Crisis Mode opens in iframe within nonprofit's site
- Technical implications: Embeddable widget, white-label/co-branding options, API integration with case management systems

**Journey Requirements Revealed:**
- Crisis Mode intake system (72-hour question with voice-to-text, examples, and reassurance)
- Natural language processing for crisis categorization
- **Multi-path entry system:**
  - Smartphone (text link)
  - No smartphone (email link, QR code, verbal code entry)
  - Shared device (privacy mode)
  - Language selection (English, Spanish, other languages)
- **Multi-crisis support:**
  - Detection of multiple simultaneous crises
  - Prioritization tools (which crisis to address first)
  - Combined resources (address multiple crises at once)
- **Repeat user recognition:**
  - Welcome back messaging (no shame)
  - Different resources (if previous resources didn't work)
  - Pattern support (optional tracking to prevent cycles)
- **Location-aware resources:**
  - Location detection and confirmation
  - Rural/remote resource filtering
  - Travel distance considerations
  - State-specific resources (laws, programs)
- **ResourcesHyft API integration** (resource database with crowdsourcing validation)
- **ResourcesHyft independence:**
  - Hardcoded fallback resources (MVP works without ResourcesHyft)
  - Manual resource curation (counselor can add resources)
  - Trust score transparency (how scores are calculated)
  - Independent validation (human reviewers, not just API scores)
- **Trust score display** for each resource (from ResourcesHyft validation OR manual verification)
- **Resource filtering** (by location, crisis type, trust score, language)
- **Resource quality assurance:**
  - Resource verification badges (verified by human reviewer)
  - Honest availability status (accepting/waitlist/full)
  - Rejection support (what to do if rejected)
  - Resource feedback loop (did this help? improves system)
  - Alternative paths (backup resources if primary fails)
- **Trust building features:**
  - Verification options (call 211 to confirm)
  - Transparency messaging (no money, no data selling)
  - Offline option (counselor manual help)
- Action generator (3-5 contextual actions based on crisis type, filtered by ResourcesHyft)
- Trust signals and realistic expectations in action descriptions
- Pre-filled form integration (external applications)
- Resource validation and freshness tracking (via ResourcesHyft)
- Resource fallback system (alternatives when primary resource fails)
- Referral tracking system (utm_source, counselor tracking)
- Anonymous session management (7-day auto-delete)
- Delayed account creation flow (not immediate, respects user's crisis state)
- Safety crisis detection and routing
- Return user recognition and follow-up
- Follow-up support system (Day 1, Day 3, Day 5 check-ins)
- **Follow-up respect:**
  - Easy opt-out (don't want reminders? turn off)
  - Respectful timing (one check-in per milestone, not spam)
  - Optional engagement (Casey chooses if they want updates)
  - No pressure (no response needed)
  - Graceful exit (got help? great! I'm all set)
- **Cascading crisis detection** (new crises during follow-up)
- **Hope maintenance** (acknowledge progress, maintain motivation)
- **Enhanced success metrics:**
  - Outcome tracking (did this actually help? not just action taken)
  - Follow-up validation (3 days later: did you get help?)
  - Real success (crisis resolved, not just action taken)
  - Measure impact, not activity
- **Support pain point resolution:**
  - Broken resource reporting (report issues from within tool)
  - Form status tracking (real-time status updates)
  - Direct contact upfront (phone numbers shown before form failure)
  - Application status checking (check status without account)
  - Follow-up anxiety reduction (timeline clarification, no false promises)
  - Error recovery with human backup (clear escalation path)
  - Account creation clarity (what it does vs. doesn't do)
  - Recommendation mode (not just options - clear guidance)
  - Support integration (human help available throughout)
- Emotional support resources (crisis hotlines, support contacts)
- **Accessibility features:**
  - Full screen reader support (WCAG 2.1 Level AA)
  - Alternative trust indicators (text-based, not just visual)
  - Simplified language option
  - Multiple input methods (voice, text, counselor-assisted)
  - Works on old phones (Android 6+, iPhone 6+)
  - Handles interruptions gracefully
  - Voice-to-text with background noise tolerance
  - **Literacy support:**
    - Visual mode (icons and images instead of text)
    - Audio mode (text-to-speech, voice instructions)
    - Simple words mode (simplified language)
    - Video guides (visual demonstrations)
    - Time explanations (72 hours = 3 days = specific date)
- **Safety features:**
  - Quick exit button (clears everything immediately)
  - Privacy mode (no saved history on shared devices)
  - Safe resource filtering (confidential resources for unsafe situations)
  - Counselor safety codes (pre-arranged signals)
- **Emergency mode:**
  - Immediate crisis detection (is this happening RIGHT NOW?)
  - Skip to immediate help (911, crisis hotline, emergency resources)
  - Quick exit (need to leave? get phone numbers)
- **Willingness acknowledgment:**
  - Acknowledge resistance (this might feel uncomfortable)
  - Optional engagement (you don't have to use this)
  - Normalize help-seeking (asking for help is brave)
  - Respect boundaries (you're in control)
- **Form completion support:**
  - Document checklist (gather required documents before starting)
  - Form complexity warning (what documents are needed?)
  - Form assistance (stuck on a question? get help)
  - Alternative application (can't complete online? call or in-person)
  - Progress saving (save and come back later)
- **Technical resilience:**
  - Progressive enhancement (works without JavaScript)
  - Auto-save to localStorage (prevents data loss)
  - Error recovery paths (every failure has alternative)
  - Graceful degradation (simple text version if page doesn't load)
  - Real-time error detection (Sentry integration)
  - Works on flip phones (SMS-based entry)
  - Works on library computers (no JavaScript required for basic flow)
- **Counselor support tools:**
  - Counselor dashboard (see user progress, receive alerts)
  - Troubleshooting guide (manual backup process)
  - Pre-journey preparation (email/notification before referral)
  - Real-time status updates (user progress tracking)
  - Language toggle (match user's language preference)
  - Multi-path support (text, email, QR code, verbal)
  - **Counselor value proposition:**
    - Time savings (saves 10 minutes per client)
    - Easy integration (works with existing workflows)
    - Optional use (can still help manually)
    - Minimal training (5 minutes to learn)
    - Success stories (benefits from other counselors)
  - **Counselor resource management:**
    - Manual resource addition (not dependent on ResourcesHyft)
    - Resource feedback (improves system)
    - Client intervention tools (help if client gets stuck)
- **Support integration throughout journey:**
  - In-tool support access (every page: chat, call, counselor help)
  - Support can see user progress (with permission)
  - Support can intervene if user gets stuck
  - Support can add resources manually
  - Support can report issues directly from dashboard
  - Support escalation path (when technology fails)
- **Recommendation mode:**
  - Clear "best option" recommendation for immediate crisis
  - Decision support ("Not sure which to pick? [Get recommendation]")
  - Trust score with context ("This is the most reliable option for your situation")
  - Priority guidance ("Do this first: [recommended action]")
- **Application status checking:**
  - Status checking without account requirement
  - Direct program contact info (call to check status)
  - Status checking guide (step-by-step instructions)
  - Timeline clarification (why timelines vary)

### Journey 2: Riley - Foundation Mode (Building Awareness)

**Riley's Story:**
Riley is a 28-year-old who has been living paycheck to paycheck for years. They've never had a budget, never tracked spending, and money feels like a constant source of anxiety. Riley isn't in immediate crisis like Casey, but they're tired of the stress and want to understand where their money goes.

**Act 1: Discovery & Entry (Multiple Paths)**

**Primary Discovery Path: Organization Referral (MVP Default)**
Riley attends a workforce development program, financial counseling session, or community center. Staff says: "Before we dive into your finances, try this tool for a week. Just log what you spend. Come back next week and we'll talk about what you noticed." Riley gets handout with QR code → lands in Foundation Mode.

**Alternative Discovery Path A: Graduated from Crisis Mode**
Riley used Crisis Mode 3 months ago (avoided eviction). MoneyShyft sent ONE follow-up email (only if Riley created account): "Hi Riley, 3 months ago you used our crisis tool. We're glad you're here. If you want to avoid the next crisis, we have a free tool to help you track your money. No pressure." Riley clicks link → lands in Foundation Mode.

**Alternative Discovery Path B: Social Media / Content Marketing**
Riley sees Reddit post in r/povertyfinance: "I've been using this free budgeting app that doesn't make me feel like shit. Just tracks patterns. No judgment." Comments: "What's it called?" → "MoneyShyft Foundation Mode". Riley googles it, finds site.

**Entry Experience (Anonymous First, Account Later)**
Riley visits moneyshyft.app and sees: "Foundation Mode - Free. No signup needed. Build awareness of your money without the pressure."

Riley clicks "Try Foundation Mode" and lands directly on transaction logging (no account choice upfront):

> "Foundation Mode - Free. No signup needed.
> Let's start simple. Just log one thing you spent money on recently.
> [Start Logging]"

**No decision fatigue** - Riley can try it with ZERO commitment. Data saved in browser localStorage.

**Act 2: First Transaction Log**

Riley lands on a simple screen:

> "Let's start simple. Just log one thing you spent money on recently.
> 
> What did you spend money on? [Text input]
> How much? [Number input]
> When? [Date picker - defaults to today]
> 
> That's it. No categories, no judgment. Just one thing."

Riley types: "Groceries" - $85 - Yesterday

MoneyShyft shows: "Got it. You spent $85 on groceries yesterday. That's one thing logged."

**No pressure messaging:** "You don't need to log everything. Just log when you remember. There's no right or wrong way."

**Act 3: Optional Small Win Capture (During Onboarding)**

After logging the first transaction, MoneyShyft asks (optional):

> "What made you want to try this?
> 
> - I want to understand where my money goes
> - I want to spend less on something
> - I want to save money
> - I'm just curious
> - Something else
> 
> [Select one or skip]"

**If Riley selects "I want to spend less on something":**
- "What do you want to spend less on? [Text input or skip]"
- Riley types: "Eating out"
- MoneyShyft: "Got it. We'll keep track of that as you log. No pressure."

**If Riley skips:**
- No problem, continue to logging

**Act 4: Progressive Pattern Revelation (Immediate Value)**

**After 3 transactions:**
- "You've logged groceries 3 times. Average: $75 per trip."

**After 5 transactions (or after 1 week, whichever comes first):**
- "You've logged groceries 3 times and gas 2 times. Total so far: $370."

**After 10 transactions:**
- "You've logged 10 things. Here's what you're tracking most: Groceries (5 times, $375 total)."

**Why this is better:**
- Riley sees value IMMEDIATELY (not after waiting 4 weeks)
- Builds confidence ("I'm learning about my money")
- Each pattern revelation is a small win

**Act 5: The "One Thing" Selector (After 5-10 Transactions)**

After 5th transaction (or after 1 week, whichever comes first), MoneyShyft offers focus:

> "You've logged 5 things. Here's what you've logged so far:
> 
> Groceries: 3 times
> Gas: 1 time
> Coffee: 1 time
> 
> Want to focus on one thing for a while? This helps you see patterns more clearly.
> [Focus on groceries] [Focus on something else] [No, just let me log freely]"

**Why this is better:**
- Riley has data to inform the choice (groceries appeared 3 times, so it's a logical focus)
- Not asking Riley to predict what they should track - showing them what they're ALREADY tracking
- Respects Riley's patterns, not imposing categories

**If Riley selects "Focus on groceries":**
- Focus Filter Activated: Dashboard shows "Focusing on: Groceries"
- Riley can log other things, but the focus is on groceries
- Pattern detection will highlight grocery spending patterns

**Act 6: Account Creation Offer (After 3-5 Transactions)**

After Riley has logged 3-5 transactions, MoneyShyft offers account creation:

> "Want to save your progress?
> 
> Right now, your data only lives in this browser. If you clear your browser or switch devices, you'll lose it.
> 
> Create a free account to:
> - Save your data across devices
> - Get gentle reminders (optional)
> - Access it from anywhere
> 
> [Create Account] [Keep using without account]"

**Why this is better:**
- Lower barrier (Riley can try it with ZERO commitment)
- Proves value first (Riley has already logged transactions and seen it work)
- Account creation becomes obvious benefit (not a scary ask upfront)

**If Riley creates account:**
- Quick signup: Email + password (no other info required)
- Data migrated from localStorage to account
- "Your data is now saved. You can access it from any device."

**If Riley declines:**
- "No problem. You can create an account anytime. [Continue logging]"

**Act 7: Building the Habit (Week 1-4)**

Riley logs transactions sporadically—sometimes daily, sometimes every few days. MoneyShyft never shames Riley for gaps.

**Week 1:**
- Riley logs 3 transactions (groceries, gas, coffee)
- MoneyShyft shows: "You've logged 3 things. That's a start."

**Week 2:**
- Riley forgets to log for 4 days, then logs 2 transactions
- MoneyShyft shows: "Welcome back. You logged 2 things. No pressure—just pick up where you left off."

**Week 3:**
- Riley logs 5 transactions this week (more consistent)
- MoneyShyft shows: "You're building a habit. You logged 5 things this week."

**Week 4:**
- Riley logs at least one transaction per week (success criteria met)
- MoneyShyft shows: "You've been logging for 4 weeks. Here's what you might notice: [gentle pattern detection]"

**Act 8: The Reality Mirror (4-Week Check-in)**

After 4 weeks of logging (at least one transaction per week), MoneyShyft shows the "Reality Mirror":

> "You've been tracking for 4 weeks. Here's what you've logged:
> 
> **Groceries:** 8 times, average $75 = about $600/month
> **Gas:** 4 times, average $45 = about $180/month
> **Coffee/Eating Out:** 6 times, average $12 = about $72/month
> 
> This is just what you've logged—not everything. But it's a start.
> 
> How does this feel? [This feels right] [I'm spending more than this] [I'm not sure]"

**If Riley selects "This feels right":**
- "Good. You're building awareness. Want to keep tracking? [Yes] [Take a break]"

**If Riley selects "I'm spending more than this":**
- "That's okay. You're only logging some things. Want to log more, or is this enough for now? [Log more] [This is enough]"

**If Riley selects "I'm not sure":**
- "That's okay. Awareness takes time. Keep logging when you remember. [Continue] [Take a break]"

**Act 9: Weekly Reflection (Only If Logging Consistently)**

**Trigger:** Offer weekly reflection ONLY if:
- Riley has logged at least 3 transactions/week for 2 consecutive weeks
- AND Riley has been using the app for 4+ weeks

**If Riley meets criteria:**
> "Want to check in weekly? We'll ask you one simple question about how you're feeling about money.
> 
> [Yes, check in weekly] [No, just let me log]"

**If Riley selects "Yes":**
- Weekly reflection: "How are you feeling about money this week?" [Better] [Same] [Worse] [Not sure]
- No judgment, just acknowledgment
- "You said you're feeling [better]. That's great. Want to keep tracking? [Yes] [Take a break]"

**If Riley doesn't meet criteria (not logging consistently by week 4):**
- Don't offer reflection (would feel like pressure)
- Instead, gentle nudge: "You've logged a few things. Want to keep going? [Yes] [Take a break]"

**Act 10: Pattern Recognition (After 4+ Weeks)**

After consistent logging (4+ weeks), MoneyShyft gently points out patterns:

> "You've been tracking for a while. Here's something you might notice:
> 
> You tend to spend more on groceries on weekends (average $95) vs. weekdays (average $65).
> 
> Does that feel true? [Yes] [No] [I'm not sure]
> 
> If yes: "That's a pattern. Not good or bad—just something to be aware of."
> If no: "That's okay. Patterns aren't always obvious. Keep tracking."
> If not sure: "That's fine. Awareness takes time."

**Act 11: Small Win Check-in (After 4+ Weeks)**

**If Riley defined a goal initially (Act 3):**
> "When you started, you said you wanted to spend less on eating out. How's that going?
> 
> [I'm spending less] [About the same] [I'm spending more] [Not sure]"

**If Riley didn't define a goal initially:**
> "What's one small thing you want to do with your money? It can be anything.
> 
> Examples:
> - Spend less on coffee
> - Save $50 this month
> - Understand where my money goes
> - Feel less anxious about money
> 
> What's your small win? [Text input]"

Riley types: "Spend less on eating out"

MoneyShyft: "Got it. Your small win: Spend less on eating out. We'll check in on this later. No pressure—just something to be aware of."

**Act 12: Mode Progression (Behavior-Based, Not Time-Based)**

**Builder Mode Unlock Criteria (Any of These):**

**Trigger 1: Explicit Feature Request**
- Riley asks: "How do I set a savings goal?"
- MoneyShyft: "That's a Builder Mode feature. Want to try it? [Yes] [Learn More] [Not now]"

**Trigger 2: Goal Achievement + Consistency**
- Riley said "spend less on eating out" → after 4 weeks, Riley HAS reduced spending
- MoneyShyft: "You're doing great. Want more tools to keep this going? [Try Builder Mode] [Stay here]"

**Trigger 3: High Engagement + Multiple Categories**
- Riley is logging 10+ transactions/week across 5+ categories
- MoneyShyft: "You're tracking a lot. Want tools to manage it better? [Try Builder Mode] [Stay here]"

**Trigger 4: Long-Term User (12+ Weeks)**
- Riley has been using Foundation for 12+ weeks with no progression signals
- ONE gentle offer: "You've been here a while. Want to see what else we have? [Try Builder] [Stay here]"
- If Riley says "Stay here," NEVER ask again (respect the choice)

**Why behavior-based is better:**
- Respects Riley's pace (not forcing a timeline)
- Offers Builder Mode when Riley is READY, not when YOU think they should be
- Allows for Riley to stay in Foundation forever (and that's success)

**If Riley selects "Try Builder Mode":**
- Transition to Builder Mode (see Blake's journey)

**If Riley selects "Stay in Foundation":**
- "That's perfect. Foundation Mode is working for you. Keep going. [Continue]"

**Edge Cases:**

**Edge Case 1: Riley Disappears for 2+ Weeks**
- Riley stops logging for 2+ weeks
- When Riley returns: "Welcome back. You haven't logged in a while. That's okay. Want to pick up where you left off? [Yes] [Start fresh] [I'm not ready]"
- No shame, no judgment—just welcome back

**Edge Case 2: Riley Deletes All Data (With Reason Capture)**
- Riley clicks "Delete All Data" button
- MoneyShyft shows:

> "Are you sure you want to delete everything?
> This will erase all your transactions and patterns.
> 
> Before you go, can you tell us why? (This helps us improve)
> 
> - This wasn't working for me
> - I felt overwhelmed
> - I want to start fresh
> - I'm just not ready
> - Other: [text input]
> 
> [Cancel] [Delete Everything]"

**If Riley selects "I felt overwhelmed":**
- "We're sorry. You can take a break and come back anytime. Or we can help you simplify. [Take a break] [Help me simplify] [Delete anyway]"

**If "Help me simplify":**
- "Want to just track ONE thing instead? We can hide everything else. [Yes, simplify] [No, delete]"

**Why this matters:**
- You learn WHY people quit (improves product)
- You might save a user who's about to churn (offer help before they leave)
- Respects Riley's choice (can still delete if they want)

**Edge Case 3: Riley Stays in Foundation Forever**
- Riley never progresses to Builder Mode
- **This is success** - Riley is building awareness and avoiding crises
- No pressure to progress

**Additional Features (MVP vs. Future):**

**MVP Features:**
- Anonymous mode: Browser localStorage, option to create account later
- Transaction logging: Manual entry, no categories required initially
- Pattern detection: Simple averages, frequency counts (no AI needed for MVP)
- Focus filter: Show/hide transactions based on selected category
- Weekly reflection: Optional check-ins (can be disabled)
- Reality mirror: Dashboard showing totals, averages, patterns
- Small win tracking: User-defined goal, check-in later
- No-shame re-entry: Welcome back messaging for returning users
- Data deletion: Confirmation + reason capture
- Export: CSV download of all transactions

**Future Features (Post-MVP):**
- Reminder system: Optional weekly email reminder (one email/week, no more)
- Sharing/Accountability: Anonymous link showing patterns (no dollar amounts), or invite accountability partner (friend can see you're logging, not what you're spending)

**Journey Requirements Revealed:**
- Multiple discovery paths (org referral default, Crisis Mode graduation, social media)
- Anonymous-first onboarding (no account required, offer account after 3-5 transactions)
- Progressive pattern revelation (micro-patterns immediately after 3-5 transactions, not just after 4 weeks)
- "One thing" selector (wait until 5-10 transactions, so Riley has data to choose from)
- Small win capture (ask during onboarding optional AND check in after 4 weeks)
- Weekly reflection (only if logging consistently - 3+ transactions/week for 2+ weeks)
- Pattern recognition (gentle, non-judgmental, progressive from micro to macro)
- Reality mirror dashboard (gentle pattern detection after 4 weeks)
- Mode progression (behavior-based triggers, not time-based)
- Data deletion (ask why before confirming, offer help if overwhelmed)
- Export feature (CSV download of all transactions)
- No-shame re-entry (welcome back messaging)

**Riley's Journey - Refined Success Criteria**

**4-Week Success:**
- ✓ Logged at least 1 transaction per week for 4 consecutive weeks
- ✓ Can answer "Where does your money go?" with at least one pattern ("I spend about $X on groceries")
- ✓ Feels less anxious about money (self-reported in reflection, if offered)

**12-Week Success:**
- ✓ Logging 3+ transactions per week consistently
- ✓ Identified at least 2 patterns (groceries, gas, etc.)
- ✓ Achieved at least 1 self-defined small win ("I spent less on eating out")
- ✓ Either: (a) Progressed to Builder Mode OR (b) Explicitly chose to stay in Foundation

**Long-Term Success (6+ months):**
- ✓ Riley avoided a financial crisis because of awareness gained
- ✓ Riley feels "in control" of money (self-reported)
- ✓ Riley is still using the app OR graduated/left with dignity

### Journey 3: Blake - Builder Mode (Goal Achievement)

**Blake's Story:**
Blake is 35, has a stable job, and has been using Foundation Mode. They've built awareness of their spending patterns and want to take the next step: actually achieving financial goals. Blake wants to save for a down payment on a house and pay off credit card debt. They're ready for more advanced tools but don't want to be overwhelmed.

**Act 1: Behavior-Based Transition from Foundation**

**Builder Mode Unlock Criteria (Any of These - Not Time-Based):**

**Trigger 1: Explicit Feature Request**
- Blake asks: "How do I set a savings goal?"
- MoneyShyft: "That's a Builder Mode feature. Want to try it? [Yes] [Learn More] [Not now]"

**Trigger 2: Consistent Tracking + Goal Achievement**
- Blake is logging 10+ transactions/week for 4+ consecutive weeks
- Blake has achieved their self-defined small win (e.g., "spend less on eating out")
- MoneyShyft: "You're doing great. Want more tools to keep this going? [Try Builder Mode] [Stay here]"

**Trigger 3: High Engagement + Multiple Categories**
- Blake is tracking multiple categories (5+) consistently
- Blake wants more control over their financial picture
- MoneyShyft: "You're tracking a lot. Want tools to manage it better? [Try Builder Mode] [Stay here]"

**Trigger 4: Financial Stability**
- No crisis transactions in last 30 days
- Positive cash flow (income > expenses) for 2+ months
- Building savings (even small amounts)
- MoneyShyft: "Your finances are stabilizing. Want to set bigger goals? [Try Builder Mode] [Stay here]"

**If Blake meets ANY criteria, MoneyShyft shows:**

> "You've built strong financial habits in Foundation Mode.
> 
> Want to go deeper?
> 
> Builder Mode helps you:
> - Set specific goals (like saving for a house)
> - See what-if scenarios (should I pay debt first or save?)
> - Track progress toward multiple goals
> - Forecast your financial future
> 
> Builder Mode is $8/month after a 14-day free trial.
> Foundation Mode stays free forever. You can switch back anytime.
> 
> [Try Builder Mode Free] [Stay in Foundation] [Learn More]"

**Key changes:**
- Lead with value (what Blake gets), not price
- Emphasize free trial (lower barrier)
- Reassure Blake can go back to Foundation (not a one-way door)
- "Learn More" button explains pricing model (transparent)

**Act 2: Progressive Onboarding (Show Value First)**

**Step 1: Import Foundation Data**

Blake clicks "Try Builder Mode Free" and enters Builder Mode:

> "Great! Let's bring your Foundation Mode data into Builder.
> 
> We found:
> - 87 transactions logged
> - Average income: ~$4,500/month
> - Average expenses: ~$3,200/month
> 
> Want to import this data? [Yes, import] [No, start fresh]"

**If Blake imports:**
- Dashboard pre-populated with Foundation data
- Blake sees value IMMEDIATELY (full financial picture without manual entry)
- Accounts, income, and expense patterns already set up

**If Blake starts fresh:**
- Quick setup (accounts, income) but acknowledge Blake might regret this
- "You can always import Foundation data later if you change your mind."

**Step 2: Set Your First Goal (Not Three Steps)**

After importing data (or starting fresh), MoneyShyft asks:

> "What's the ONE thing you want to achieve first?
> 
> [Save for something] [Pay off debt] [Build emergency fund] [See my options]"

Blake picks ONE goal. Only asks for details needed for THAT goal.

**Example: Blake picks "Pay off debt"**

> "Let's set up your debt payoff:
> 
> How much do you owe? [$5,000]
> What's the interest rate? [Optional - helps us optimize] [18%] [Skip]
> 
> [Continue]"

**Then immediately show value:**

> "Here's your plan:
> 
> Your debt: $5,000 at 18% APR
> Available to pay: ~$1,300/month (based on your Foundation data)
> 
> If you pay $417/month:
> - Debt paid off in 12 months
> - Total interest: $450
> 
> If you pay $800/month:
> - Debt paid off in 6.5 months
> - Total interest: $230
> 
> Want to try different scenarios? [Yes] [No, use $417/month plan]"

**Why this is better:**
- Blake sees value in <2 minutes (not after filling out 3 forms)
- Data from Foundation pre-populates (less manual entry)
- ONE goal at a time (not overwhelmed with multiple goals upfront)
- Scenarios offered immediately (the power of Builder Mode shown instantly)

**Step 3: Optional Bank Linking**

During onboarding, after importing Foundation data:

> "Want to link your bank accounts for automatic updates?
> 
> With bank linking:
> - Transactions import automatically
> - Balances update daily
> - Less manual work
> 
> Without bank linking:
> - You log transactions manually (like Foundation Mode)
> - More privacy (we don't see your bank data)
> 
> [Link accounts] [Keep logging manually] [Decide later]"

**Why offer both:**
- Some users trust Plaid/bank linking (convenience)
- Some users don't (privacy concerns, security fears)
- Blake chooses based on comfort level

**Act 3: Progressive Disclosure Dashboard**

Blake sees their Builder Mode dashboard (top level):

> "Your Financial Snapshot
> 
> Net Worth: -$1,300 (accounts minus debt)
> Monthly Cash Flow: +$1,300 (income minus expenses)
> 
> Active Goals:
> 1. Pay off credit card: $5,000 → $3,749 (25% complete) [View]
> 2. Save for house: $20,000 → $1,668 (8% complete) [View]
> 
> Quick Actions:
> - [Log transaction]
> - [Run scenario]
> - [View forecast]"

**Blake clicks [View] on Goal 1:**

> "Goal: Pay Off Credit Card
> 
> Progress:
> - Started: $5,000
> - Current: $3,749
> - Remaining: $3,749 (75%)
> 
> Your Plan:
> - Pay $417/month
> - Payoff date: [12 months from start]
> 
> Progress This Month:
> - Paid: $417 ✓
> - On track
> 
> [Adjust plan] [See scenarios] [View details]"

**Why this is better:**
- Top-level dashboard is scannable (quick snapshot)
- Blake can drill down into goals for details
- Not overwhelming with all data at once

**Act 4: Custom Scenario Builder (Not Just Pre-Built)**

**Option A: Pre-built Scenarios (Quick)**

> "Want to see common scenarios?
> 
> - Pay off debt first, then save
> - Save and pay debt simultaneously
> - Optimize spending, then reassess
> 
> [Show scenarios]"

**Option B: Custom Scenario Builder (Advanced)**

> "Build your own scenario:
> 
> What changes?
> - [Income increases by $_____]
> - [Expenses decrease by $_____]
> - [Goal timeline changes to _____]
> - [Add one-time windfall: $_____]
> 
> [Calculate Impact]"

**Blake enters: "What if I get a $500 raise?"**

MoneyShyft shows:

> "If your income increases by $500/month:
> 
> Current plan:
> - Debt paid off in 12 months
> - $20,000 saved in 36 months
> 
> With $500 raise:
> - Debt paid off in 7 months (5 months faster!)
> - $20,000 saved in 22 months (14 months faster!)
> 
> Want to save this scenario? [Yes] [No, keep exploring]"

**Why this is better:**
- Blake has control (not just seeing your scenarios)
- Blake can experiment freely (no commitment)
- Blake can answer their own "what if" questions

**Act 5: Immediate Optimization (If Data Exists)**

At onboarding (if Foundation data imported), or after Blake has been tracking:

> "We noticed you spend about $200/month on eating out. Want to see how reducing this affects your goals?
> 
> [Yes, show me] [No, not now]"

**If Blake clicks "Yes":**

> "If you reduced eating out from $200 to $100/month:
> 
> Extra available: $100/month = $1,200/year
> 
> Impact on your goals:
> - Pay off debt 2 months faster
> - OR save for house 6 months faster
> - OR split the difference
> 
> Want to try this? [Yes, adjust my plan] [No, keep current plan]"

**Why this is better:**
- Immediate value (Blake sees optimization potential right away)
- Blake chooses whether to optimize (not forced)
- Shows concrete impact on goals (not abstract "you'd save $1,200")

**Act 6: Forecasting with Ranges (Not Single Numbers)**

Blake wants to see future projections:

> "Want to see what your finances will look like in 6 months? 12 months?
> 
> **6-Month Forecast (if you continue current plan):**
> 
> Credit Card Debt:
> - Best case: $2,000 remaining (if you pay extra when able)
> - Expected: $2,498 remaining (on track)
> - Worst case: $3,000 remaining (if you miss a payment or two)
> 
> House Fund:
> - Best case: $4,000 saved
> - Expected: $3,336 saved
> - Worst case: $2,500 saved
> 
> What could change this:
> - Income fluctuation (gig work, overtime, bonuses)
> - Unexpected expenses (car repair, medical bills)
> - Lifestyle changes (eating out more/less)
> 
> [See detailed breakdown] [Adjust assumptions]"

**Why this is better:**
- Realistic (acknowledges Blake's life isn't perfectly predictable)
- Prepares Blake for variability (not shocked when actuals differ from forecast)
- Still actionable (Blake can adjust assumptions)

**Act 7: Windfall Plan (Pre-Commitment Strategy)**

**Setup (During Goal Setting or Later):**

> "Want to set a plan for windfalls? (Bonuses, tax refunds, gifts, side income)
> 
> This helps you make intentional decisions before the money arrives.
> 
> [Yes, set a plan] [Maybe later] [What's this?]"

**If Yes:**

> "How do you want to split your windfalls?
> 
> Based on your goals, here's a starting point:
> 
> [Slider interface]
> Give It Away: ▓▓░░░░░░░░ 10% ($120 of your $1,200 windfall)
> Future You (savings): ▓▓▓▓▓▓░░░░ 60% ($720)
> Past You (debt): ▓▓░░░░░░░░ 20% ($240)
> Present You (fun): ▓░░░░░░░░░ 10% ($120)
> 
> Drag the sliders to adjust. Total must equal 100%.
> 
> [Use this plan] [Start from scratch]"

**Windfall Arrives:**

Blake logs: "$1,200 - Tax refund"

MoneyShyft detects unusual income:

> "Looks like you got extra money! Is this a windfall?
> 
> [Yes, it's a windfall] [No, regular income]"

**If Yes:**

> "You got a $1,200 windfall! Here's your plan:
> 
> Give It Away (10%): $120 → [Your preferred charity]
> Future You (60%): $720 → House down payment
> Past You (20%): $240 → Credit card payment
> Present You (10%): $120 → Enjoy it (no tracking needed)
> 
> [Apply this plan] [Adjust amounts] [Ignore plan this time]"

**If Blake clicks [Apply this plan]:**

MoneyShyft automatically:
- Logs $120 as charitable giving
- Adds $720 to house savings goal (progress updated)
- Adds $240 to credit card payment (debt reduced)
- Gives Blake $120 fun money (optional tracking)

Blake sees:

> "Done! Your windfall is allocated.
> 
> Updated progress:
> - House fund: $2,568 → $3,468 (you just jumped ahead 1.6 months!)
> - Credit card: $3,749 → $3,449 (0.7 months ahead of schedule!)
> 
> And you kept $120 for yourself. Enjoy it. 🎉"

**Why this is brilliant:**
- Aligns with Freire: Blake sets the rules for themselves (not you imposing)
- Behavioral economics: Pre-commitment beats willpower
- Maintains autonomy: Blake can override ALWAYS (never locked in)
- Shows impact: "You're 1.3 months ahead" makes the choice tangible
- Permission to enjoy: "Present You" category legitimizes fun spending
- Reduces guilt: Blake PLANNED to spend $120 on fun - it's not impulsive

**Act 8: Goal Tracking with Setback Handling**

Blake sets up automatic tracking:

> "We'll track your progress automatically. Every time you log a transaction, we'll update your goals.
> 
> **Your Plan:**
> - Pay $417/month to credit card
> - Save $556/month for house
> - Track spending to stay on budget
> 
> [Start Tracking] [Adjust Plan]"

**Scenario A: Blake Falls Behind**

After 6 months, Blake has only paid $1,800 (should be $2,502):

> "You're a bit behind on your debt payoff plan.
> 
> Original plan: Pay $417/month → paid off in 12 months
> Actual progress: Paid ~$300/month on average
> 
> What happened? (Optional - Blake can share or skip)
> [Unexpected expenses] [Income changed] [Life got busy] [Other] [Skip]
> 
> Want to adjust your plan?
> - Option 1: Extend timeline (pay off in 18 months instead of 12)
> - Option 2: Increase payments (pay $550/month to catch up)
> - Option 3: Pause this goal and focus on something else
> 
> [Adjust plan] [Keep trying current plan] [I need help]"

**Why this matters:**
- Blake won't feel like a failure (setbacks are normal)
- Blake has options (not stuck with original plan)
- No judgment (just math and choices)

**Scenario B: Blake Achieves Goal Early**

After 10 months, Blake pays off debt ($5,000 paid):

> "🎉 You paid off your credit card debt 2 months early!
> 
> What you achieved:
> - Paid off $5,000
> - Saved $90 in interest (by paying early)
> - Built momentum toward your goals
> 
> What's next?
> 
> You have $417/month freed up (no more debt payment).
> 
> Want to:
> - Add it to house savings ($973/month total → house in 21 months)
> - Build emergency fund ($417/month → $5,000 in 12 months)
> - Set a new goal
> - Take a break and enjoy your win
> 
> [Choose next step]"

**Why this is better:**
- Celebrates achievement (Blake earned this)
- Shows concrete benefit (freed up cash flow)
- Offers logical next steps (but Blake chooses)

**Act 9: Debt Strategy Comparison (Avalanche vs. Snowball)**

If Blake has multiple debts:

> "You have multiple debts. Want to see different payoff strategies?
> 
> **Avalanche Method (Mathematically Optimal):**
> - Pay highest interest rate first
> - Saves the most money in interest
> - Example: Pay 18% credit card before 5% student loan
> 
> **Snowball Method (Psychological Wins):**
> - Pay smallest balance first
> - Builds momentum with quick wins
> - Example: Pay $500 medical bill before $5,000 credit card
> 
> [Compare both] [Use Avalanche] [Use Snowball] [I'll decide later]"

**If Blake clicks [Compare both]:**

MoneyShyft shows side-by-side:
- Total interest paid (Avalanche: $450, Snowball: $520)
- Time to pay off all debts (Avalanche: 18 months, Snowball: 20 months)
- Psychological milestones (Snowball: 3 quick wins, Avalanche: 1 big win)

Blake chooses based on their preference.

**Act 10: Adding Second Goal (Optional, Later)**

After Blake is using Builder for debt payoff, THEN offer:

> "You're on track with your debt payoff. Want to add another goal?
> 
> [Yes, add goal] [No, I'm good]"

**Don't force Blake to set up everything at once. Let Blake build complexity gradually.**

**Act 11: "What's Next?" (Not "Graduation")**

After Blake achieves both major goals (debt paid, house bought):

> "You've achieved your major goals. Congrats!
> 
> What's next for you?
> 
> **Option 1: Set new financial goals** (retirement, kids' college, etc.)
> - Stay in Builder Mode, keep optimizing
> 
> **Option 2: Maintain current habits, no new goals**
> - Switch back to Foundation Mode (free)
> - Just track spending, no active goals
> 
> **Option 3: You're financially independent and don't need this anymore**
> - Export your data and move on
> - We'll celebrate your success and say goodbye
> 
> [New goals] [Maintain mode] [Export & leave]"

**Why this is better:**
- Respects Blake's choice (no assumption Blake is done)
- Offers downgrade to Foundation (save money if Blake doesn't need Builder features)
- Dignified exit still available (but not assumed)

**Edge Cases:**

**Edge Case 1: Blake Makes a "Bad" Financial Decision**
- Blake decides to stop saving for house and buy a car instead
- MoneyShyft: "You changed your goal. That's your choice. Here's how this affects your plan: [updated forecast]"
- No judgment, no shame—just shows the math

**Edge Case 2: Blake's Income Changes**
- Blake loses job or gets pay cut
- MoneyShyft: "Your income changed. Let's adjust your plan. [Update Income] [See New Scenarios]"
- Helps Blake adjust goals based on new reality

**Edge Case 3: Blake Experiments with Scenarios**
- Blake creates and deletes multiple scenarios
- MoneyShyft: No judgment, no commitment required
- Blake can experiment freely without fear

**Edge Case 4: Irregular Income**
- Blake is self-employed or has variable income
- MoneyShyft: "Your income varies. Want to set a range? (e.g., $3,000-6,000/month)"
- Forecasting adjusts to show ranges based on income variability

**Edge Case 5: Couples Mode Transition**
- Blake wants to invite partner to share budget
- MoneyShyft: "Want to invite your partner to share this budget?" [Yes] [Not yet]
- This triggers the couples mode onboarding (future feature)

**Journey Requirements Revealed:**
- Behavior-based transition triggers (not time-based)
- Foundation data import (migrate transaction history, income/expense patterns)
- Progressive onboarding (show value first, collect data as needed)
- Progressive disclosure dashboard (scannable top-level, drill-down details)
- Custom scenario builder (not just pre-built scenarios)
- Immediate optimization (if Foundation data exists)
- Forecasting with ranges (best case, expected, worst case)
- Windfall plan (pre-commitment strategy with override option)
- Goal tracking with setback handling (adjust plan if behind, celebrate if ahead)
- Debt strategy comparison (avalanche vs. snowball)
- Bank linking (optional, user choice)
- Downgrade path (Builder → Foundation if Blake doesn't need advanced features)
- "What's next?" flow (not "graduation" - respects Blake's choice)
- Export functionality (CSV, JSON for migration to other tools)
- Subscription management (14-day trial, $8/month billing, cancellation)

**Blake's Journey - Refined Success Criteria**

**30-Day Success (Trial Period):**
- ✓ Set at least 1 goal
- ✓ Run at least 1 scenario
- ✓ Track progress for 30 days
- ✓ Convert to paid subscription (if trial successful)

**90-Day Success:**
- ✓ Achieving goal milestones (25%+ progress on at least 1 goal)
- ✓ Using optimization features (reduced spending in at least 1 category)
- ✓ Forecasting regularly (checking 6-month projection at least monthly)

**12-Month Success:**
- ✓ Achieved at least 1 major goal (debt paid off OR savings target hit)
- ✓ Built sustainable financial habits (consistent tracking, regular optimization)
- ✓ Either: (a) Set new goals and continuing OR (b) Downgraded to Foundation (no longer needs Builder) OR (c) Exported data and left with dignity

### Journey 4: Maria - Org Admin (Nonprofit License Management)

**Maria's Story:**
Maria is the Program Director at a community nonprofit that provides financial counseling and workforce development services. Her organization serves 200+ clients per year who struggle with financial stability. Maria needs a tool to help her clients build financial awareness and avoid crises, but she also needs to track usage for grant reporting and ensure her clients are actually benefiting from the program.

**Act 1: Discovery & Evaluation (MVP: Warm Referrals Only)**

**MVP Discovery Path: Warm Referrals (Your Only Real Option)**
You (the founder) personally reach out to Maria: "I'm building a budgeting tool for vulnerable populations. Want to pilot it with your clients? It's free for 6 months while we validate it together."

**Why this works for MVP:**
- Low/no sales cost (you're doing it yourself)
- Trust is pre-built (Maria knows you or was referred by someone she trusts)
- Feedback loop is direct (you can iterate based on her input)
- Hands-on onboarding (you personally set up her account, train her staff)

**Post-MVP Discovery Paths (Future):**
- Content marketing (blog posts, guest posts, speaking at conferences)
- SEO for "budgeting tools for nonprofits"
- Paid outreach (sales team, ads) - only after product-market fit

**Initial Evaluation:**

Maria receives personal outreach from you (or referral from trusted colleague):

> "Hi Maria,
> 
> I'm building MoneyShyft - a trauma-informed budgeting tool designed specifically for vulnerable populations. I'd love to pilot it with your organization.
> 
> **What You Get:**
> - Household licenses for your clients (Foundation Mode and Builder Mode)
> - Client usage tracking (anonymized, aggregated)
> - Simple compliance reporting for grants
> - Resource integration (ResourcesHyft)
> 
> **Pilot Offer (First 3-5 Orgs):**
> - FREE for 6 months (we're validating product-market fit together)
> - After 6 months: $50/month base (up to 15 active clients) + $3/month per additional active client
> - Builder Mode: Included in org sponsorship (no extra charge when clients progress)
> 
> **How It Works:**
> - You assign licenses to clients via email invitation
> - Clients get Foundation Mode (free) and Builder Mode (free while org-sponsored)
> - When org sponsorship ends, clients get 6 months at 50% discount, then standard pricing
> - No benefit cliff - clients never lose access abruptly
> 
> Want to schedule a 30-minute call to see how it works? [Schedule Call] [Learn More]"

Maria schedules a call with you.

**Act 2: Pilot Onboarding Call**

**Onboarding Call (You personally):**
You show Maria:
- Crisis Mode (free, no account required) - for immediate crisis support
- Foundation Mode (free) - for building awareness
- Builder Mode (normally $8/month, but included in org sponsorship) - for goal achievement
- Org admin dashboard (client management, simple reporting)
- Resource integration (ResourcesHyft trust scores)

**Maria's Questions:**
- "How do I assign licenses to clients?"
- "Can I see if clients are actually using it?"
- "What data do I get for grant reporting?"
- "How does the license lifecycle work?"
- "What if a client progresses to Builder Mode - do I pay more?"

**Your Answers:**
- License assignment: Email invitation (MVP - simplest method)
- Usage tracking: Aggregated, anonymized (not individual transaction data)
- Grant reporting: Simple engagement report (usage metrics, mode distribution)
- License lifecycle: Org-sponsored (Foundation + Builder) → 6-month discount ($4/month Builder) → standard ($8/month Builder)
- Builder Mode: Same $3/month rate whether client uses Foundation or Builder (no upcharge for progression - you're celebrating their success!)

**Key Pricing Explanation:**
> "Here's how pricing works:
> 
> **Pilot (First 6 Months):**
> - FREE (we're validating together)
> 
> **After Pilot:**
> - $50/month base (covers up to 15 active clients)
> - $3/month per additional active client
> - Same rate whether client uses Foundation or Builder Mode
> 
> **Example:**
> - You have 30 active clients
> - 20 in Foundation, 10 in Builder
> - You pay: $50 base + (15 overage × $3) = $95/month total
> - You DON'T pay extra for the 10 Builder clients - same $3/month rate
> 
> **Why this model:**
> - No benefit cliff: Clients can progress without penalty
> - You're investing in their journey to stability
> - When org sponsorship ends, clients are stable enough to afford $4-8/month themselves"

**Maria Agrees to Pilot:**
- Free for 6 months
- You personally set up her org admin account
- You train her staff on how to assign licenses

**Act 3: Org Admin Account Setup (Hands-On for MVP)**

**You personally set up Maria's account during onboarding call:**

> "Let's set up your organization account.
> 
> **Step 1: Organization Details**
> - Organization name: [Text input]
> - Primary contact: [Email] [Phone]
> - Tax ID (EIN): [Text input] (for invoicing after pilot)
> 
> **Step 2: License Configuration**
> - Pilot: FREE for 6 months
> - How many clients do you want to start with? [10] [20] [30] [Other]
> - License duration: [6 months] [12 months] [18 months] [Indefinite - until I end it]
> 
> **What clients get:**
> - Foundation Mode: Always free
> - Builder Mode: Free while org-sponsored (no extra charge when they progress)
> 
> **What happens when license ends:**
> - Client gets 6 months at 50% discount ($4/month for Builder)
> - Then client pays standard rate ($8/month for Builder) or uses free Foundation
> - No benefit cliff - gradual transition
> 
> **Step 3: Admin Users**
> - Who should have admin access? [Add admin users]
> - Each admin can assign licenses and view reports
> 
> [Complete Setup]"

**For MVP:** You personally walk Maria through this. Post-MVP: Self-serve onboarding with video tutorials.

**Act 4: License Assignment (MVP: Email Only)**

**For MVP: Email Invitation Only (Simplest Method)**

Maria goes to org admin dashboard:

> "Assign Licenses
> 
> **Assign to Client:**
> - Client name: [Text input]
> - Client email: [Email input]
> - License duration: [6 months] [12 months] [18 months] [Indefinite - until I end it]
> 
> **What client gets:**
> - Foundation Mode: Always free
> - Builder Mode: Free while org-sponsored (no extra charge when they progress)
> 
> **What happens when license ends:**
> - Client gets 6 months at 50% discount ($4/month for Builder)
> - Then client pays standard rate ($8/month for Builder) or uses free Foundation
> - No benefit cliff - gradual transition
> 
> [Send Invitation]"

**MoneyShyft sends email to client:**

> "Hi [Client Name],
> 
> [Organization Name] has assigned you a MoneyShyft license.
> 
> You now have access to:
> - Foundation Mode (free, build awareness)
> - Builder Mode (free while sponsored, goal achievement)
> 
> This license is sponsored by [Organization Name] for the next [duration].
> When sponsorship ends, you can continue at a discounted rate, then standard pricing.
> 
> [Get Started] [Learn More]"

**Post-MVP: Add code-based and CSV bulk import for larger orgs.**

**Act 5: Client Management Dashboard**

Maria views her org admin dashboard:

> "Organization Dashboard
> 
> **License Overview:**
> - Total licenses available: Unlimited (pilot)
> - Assigned: 32
> - Active (last 30 days): 28 (87.5% of assigned)
> - Expiring in 30 days: 5
> 
> **Client Activity (Last 30 Days):**
> - Active clients: 28
> - Average sessions per client: 12
> - Clients in Crisis Mode: 3
> - Clients in Foundation Mode: 20
> - Clients in Builder Mode: 5 (18% progression rate!)
> 
> **Recent Activity:**
> - [Client Name] activated license (2 days ago)
> - [Client Name] progressed to Builder Mode (5 days ago) 🎉
> - [Client Name] license expiring soon (12 days remaining)
> 
> **Billing Preview (After Pilot):**
> - Current active clients: 28
> - Estimated monthly cost: $50 base + (13 overage × $3) = $89/month
> - Same rate whether clients use Foundation or Builder
> 
> [View All Clients] [Assign Licenses] [Generate Report]"

**Act 6: Client Usage Tracking (Anonymized - Privacy Boundaries)**

Maria clicks "View All Clients":

> "Client List
> 
> [Search] [Filter by: Mode] [Filter by: Status]
> 
> | Client Name | Email | Mode | Status | Last Active | License Expires |
> |-------------|-------|------|--------|-------------|----------------|
> | Jane Doe | jane@... | Foundation | Active | 2 days ago | 5 months |
> | John Smith | john@... | Builder | Active | 1 week ago | 4 months |
> | ... | ... | ... | ... | ... | ... |
> 
> **Privacy Note:**
> You can see which mode clients are using and when they last logged in, but you cannot see their financial data (transactions, goals, balances). This protects client privacy while allowing you to track engagement.
> 
> [Export Client List] [Bulk Actions]"

**What Maria CAN See (Client Engagement Data):**
- Individual Client Level:
  - Name, email (that she provided)
  - License status (active, inactive, expired)
  - Last login date
  - Mode (Crisis, Foundation, Builder)
  - Session count (# of times logged in)
  - License expiration date
- Aggregate Level (All Clients):
  - Average sessions per client
  - Mode distribution (X% in Crisis, Y% in Foundation, Z% in Builder)
  - Engagement rate (% of assigned licenses that are active)
  - Mode progression rate (% who upgraded Foundation → Builder)

**What Maria CANNOT See (Client Financial Data):**
- Individual Client Level:
  - Transactions (what they spent money on)
  - Account balances
  - Income
  - Debt amounts
  - Specific goals
  - Spending patterns
  - Budget details
- Even Aggregate Level:
  - Average account balance across all clients (too sensitive)
  - Total debt across all clients (could re-identify individuals)
  - Specific spending categories (could infer client behaviors)

**Exception: Outcomes Report (Opt-In Only)**
If clients explicitly opt in to share aggregated outcomes:
- Maria can see (aggregate only, never individual):
  - % of clients who identified spending patterns
  - % of clients who set goals
  - % of clients who achieved goals
  - Average goal progress
  - % of clients who avoided a crisis (self-reported)

**Act 7: Compliance Reporting (MVP: Simple Engagement Report Only)**

**For MVP: One Simple Report (Answers 80% of Grant Questions)**

Maria needs to report to her grant funder. She clicks "Generate Report":

> "Client Engagement Report
> 
> **Date Range:**
> - From: [Date picker]
> - To: [Date picker]
> 
> **Report Format:**
> - [PDF] [CSV]
> 
> [Generate Report]"

**Report Example:**

> "MoneyShyft Client Engagement Report
> Organization: [Name]
> Period: January 1 - June 30, 2026
> 
> **License Summary:**
> - Licenses assigned: 45
> - Licenses activated: 42 (93% activation rate)
> - Active clients (last 30 days): 38 (84% of assigned)
> 
> **Mode Distribution:**
> - Crisis Mode: 5 clients (12%)
> - Foundation Mode: 28 clients (67%)
> - Builder Mode: 9 clients (21%)
> 
> **Engagement Metrics:**
> - Average sessions per client: 15
> - Clients logging 3+ times/week: 25 (60%)
> - Mode progression (Foundation → Builder): 8 clients (19%)
> 
> **Client Retention:**
> - Clients still active after 3 months: 35 (83%)
> - Clients still active after 6 months: 28 (67%)
> 
> [Download PDF] [Export CSV]"

**Post-MVP: Add outcomes report (requires client opt-in) and custom report builder if orgs need specific metrics.**

**Act 8: License Lifecycle Management (No Benefit Cliff)**

**Core Principle: No Benefit Cliff**
- Org sponsors BOTH Foundation AND Builder at same $3/month rate (no upcharge for progression)
- When org sponsorship ends, client gets 6-month discount bridge ($4/month Builder)
- Then client pays standard rate ($8/month Builder) or uses free Foundation
- Client never loses access abruptly - gradual transition

**License States & Transitions:**

**State 1: Org-Sponsored (Client Pays $0)**
- What Client Gets:
  - Foundation Mode: Free (always free anyway)
  - Builder Mode: Free (covered by org sponsorship)
  - Access to all features across both modes
- What Org Pays:
  - $50/month base (covers up to 15 active clients)
  - $3/month per additional active client (whether Foundation or Builder)
  - No upcharge when client progresses to Builder - same $3/month rate
- Duration: As long as org continues sponsoring (6 months, 12 months, 18 months, or indefinite at org's discretion)

**State 2: Transition Period (Client Pays 50% Discount)**
- Trigger: Org sponsorship ends (license expires, org doesn't renew, or org closes client's case)
- What Client Gets:
  - Foundation Mode: Still free (always free)
  - Builder Mode: $4/month (50% discount from standard $8/month)
- Duration: 6 months from end of org sponsorship
- Client notification:
  > "Your [Org Name] sponsorship has ended, but you're not alone.
  > 
  > What this means:
  > - Foundation Mode: Still free (always will be)
  > - Builder Mode: $4/month for the next 6 months (50% off)
  > 
  > After 6 months, Builder Mode will be $8/month.
  > You've made progress. We're here to support you as you keep going.
  > 
  > [Continue with Builder at $4/month] [Switch to Foundation (free)] [I have questions]"

**State 3: Standard Pricing (Client Pays Full Price)**
- Trigger: 6-month transition period ends
- What Client Gets:
  - Foundation Mode: Still free (always free)
  - Builder Mode: $8/month (standard price)
- Duration: Ongoing (month-to-month)
- Client notification:
  > "Your 6-month discount period is ending.
  > 
  > Starting [date], Builder Mode will be $8/month.
  > You've come a long way. Here's what you've achieved:
  > [Show client's progress: goals met, debt paid, savings built]
  > 
  > Your options:
  > - Continue with Builder Mode at $8/month
  > - Switch to Foundation Mode (free) and keep the habits you've built
  > - Take a break - you can always come back
  > 
  > [Continue at $8/month] [Switch to Foundation] [I need help deciding]"

**License Duration Options:**

**Option 1: Fixed-Term (Standard)**
- 6 months, 12 months, or 18 months
- Auto-expires at end of term
- Org gets renewal notification 30 days before expiration
- Good for: Time-limited programs (workforce dev, financial counseling cohorts)

**Option 2: Indefinite (Flexible)**
- License continues until org explicitly ends it
- Org can revoke sponsorship anytime for any client
- Org pays monthly based on active clients
- Good for: Ongoing case management, long-term support programs

**Scenario A: License Expiring Soon (Renewal Decision Support)**

Maria sees notification 30 days before expiration:

> "5 licenses expiring in 30 days
> 
> Here's what we've seen with these clients:
> 
> - 85% activated their licenses
> - 68% are still active (logged in last 30 days)
> - 2 clients progressed from Foundation to Builder
> - Clients have accessed 47 resources through MoneyShyft
> 
> Want to renew? [Yes, renew] [No, let licenses transition] [Need more info]"

**If Maria renews:**
- Licenses extended for chosen duration (6/12/18 months or indefinite)
- Charged to org account based on active clients

**If Maria lets licenses transition:**
- Licenses move to 6-month discount period ($4/month Builder)
- Clients receive transition notification email
- Client's data is preserved (not deleted)

**Scenario B: Client Leaves Program**

Maria needs to end sponsorship (rare, but possible):

> "End Sponsorship
> 
> Client: [Client Name]
> Reason: [Client left program] [Other: _____]
> 
> **What happens:**
> - Client loses org-sponsored access immediately
> - Client enters 6-month discount period ($4/month Builder)
> - Client's data is preserved (not deleted)
> - Client can continue using MoneyShyft (just pays for it themselves)
> 
> [Confirm] [Cancel]"

**Important:** Licenses are non-revocable in the sense that clients can always continue using MoneyShyft (they just pay for it themselves). Org can stop sponsoring, but client keeps access.

**Act 9: Billing & Subscription Management**

Maria views billing (after pilot period):

> "Billing & Subscription
> 
> **Current Plan:**
> - Base: $50/month (covers up to 15 active clients)
> - Overage: $3/month per additional active client
> - Same rate whether clients use Foundation or Builder Mode
> 
> **Usage This Month:**
> - Active clients: 28
> - Base covers: 15 clients
> - Overage: 13 clients × $3 = $39
> - **Total: $89/month**
> 
> **Next Billing Date:**
> - [Date]
> - You'll be charged based on active clients (clients who logged in at least once in last 30 days)
> 
> **Payment Method:**
> - Credit card ending in ****1234
> - [Update Payment Method]
> 
> **Billing History:**
> - [View Invoices] [Download Receipts]
> 
> **Pricing Explanation:**
> - You pay the same $3/month whether client uses Foundation or Builder
> - No upcharge when clients progress - you're investing in their journey to stability
> - When org sponsorship ends, clients get 6-month discount, then standard pricing"

**Post-MVP Features (Not in MVP):**
- Resource customization (filter ResourcesHyft resources)
- Multi-admin management (add/remove admins, permission levels)

**Edge Cases:**

**Edge Case 1: Client Never Activates License**
- License assigned but client never uses it
- Maria sees: "12 licenses assigned but not activated"
- MoneyShyft: "Want to send reminder emails? [Yes] [No]"
- If client still doesn't activate after 30 days, license expires (org not charged for unused licenses - only charged for active clients)

**Edge Case 2: Client Activation Support**
- Maria assigns 50 licenses. Only 30 clients activate.
- MoneyShyft offers: "Want tips for getting clients to use the tool? [View Tips] [Send Reminder Emails]"
- Simple reminder email feature: "Send activation reminder to clients who haven't logged in"

**Edge Case 3: Renewal Decision Support**
- After 6 months, Maria needs to decide: Renew or let licenses expire?
- MoneyShyft proactively shows value 30 days before renewal:
  > "Your licenses expire in 30 days. Here's what we've seen:
  > 
  > - 85% of your clients activated their licenses
  > - 68% are still active (logged in last 30 days)
  > - 12 clients progressed from Foundation to Builder
  > - Clients have accessed 247 resources through MoneyShyft
  > 
  > Want to renew? [Yes, renew] [No, let licenses expire] [Need more info]"
- Makes renewal easy - showing Maria the value, not making her dig for it

**Edge Case 4: Grant Reporting Requirements**
- Maria needs specific metrics for grant report
- MoneyShyft: "Need help with grant reporting? [Contact Support] [View Report Templates]"
- For MVP: You personally help Maria customize report if needed
- Post-MVP: Self-serve custom report builder

**Journey Requirements Revealed:**

**MVP Features (Build First):**
- Org admin account setup (organization details, basic configuration)
- License assignment via email (one method only)
- Client list view (name, email, status, last active, mode)
- Simple engagement dashboard (# assigned, # active, mode distribution)
- One compliance report (Client Engagement Report - PDF export)
- Billing management (view usage, update payment method)
- License lifecycle (fixed-term or indefinite, renewal notifications)
- Renewal decision support (proactive value summary 30 days before expiration)

**Post-MVP Features (Build Later):**
- Code-based assignment (for clients without email)
- CSV bulk import (for large orgs with 100+ clients)
- Outcomes reporting (requires client opt-in)
- Multi-admin management (add/remove admins, permission levels)
- Resource customization (filter ResourcesHyft resources)
- Custom report builder (if orgs need specific metrics)
- Abuse prevention (if it becomes a problem)

**Key Pricing Model:**
- MVP Pilot: FREE for 6 months
- After Pilot: $50/month base (up to 15 active clients) + $3/month per additional active client
- Same rate whether client uses Foundation or Builder (no upcharge for progression)
- Builder Mode: Included in org sponsorship (client pays $0 while sponsored)
- Transition: 6-month discount ($4/month Builder) → standard ($8/month Builder)
- No benefit cliff - gradual transition

**Maria's Journey - Refined Success Criteria**

**30-Day Success (Pilot):**
- ✓ Assigned at least 20 licenses to clients
- ✓ At least 70% of assigned licenses activated by clients
- ✓ Generated at least one engagement report
- ✓ No technical issues
- ✓ Positive feedback from Maria and her staff

**90-Day Success (Pilot):**
- ✓ At least 60% of clients still active (logging regularly)
- ✓ At least 15% of clients progressed from Foundation to Builder Mode
- ✓ Generated grant-compliant reports
- ✓ Maria sees value and wants to continue after pilot

**6-Month Success (Pilot End):**
- ✓ Maria renews subscription (shows product-market fit)
- ✓ Client retention rate above 50% after 6 months
- ✓ Positive outcomes data (if clients opted in)
- ✓ Maria recommends MoneyShyft to other organizations
- ✓ You have case study material from pilot experience

---

## Domain-Specific Requirements

### Fintech Compliance & Regulatory Overview

MoneyShyft operates in the Fintech domain with high complexity, but benefits from a manual-entry, no-account-connection model that significantly reduces regulatory burden compared to payment processors or account aggregators. However, as a multi-tenant SaaS platform serving vulnerable populations, specific compliance and security requirements are critical.

### Key Domain Concerns

**1. Regional Compliance (Already Covered in Research)**
- GLBA (Gramm-Leach-Bliley Act): Financial privacy and safeguards
- CCPA (California Consumer Privacy Act): California user rights
- GDPR (General Data Protection Regulation): EU user rights
- State privacy laws: Virginia, Colorado, Connecticut, Utah

**2. Security Standards (Enhanced)**
- Encryption at rest and in transit (already covered)
- SOC 2 Type II consideration (for organization customers)
- Security framework alignment (NIST Cybersecurity Framework, ISO 27001)
- Regular security assessments (annual penetration testing)
- Incident response plan (documented, tested, 72-hour breach notification)

**3. Audit Requirements (New - Critical for Multi-Tenant)**
- Org admin audit trails: Who accessed what data, when licenses were issued, when resources were assigned
- User data access logs: When user data is accessed (even anonymized), who accessed it, why
- System event logging: Login attempts, failed actions, security events
- Compliance reporting: Org admins need audit reports for grant compliance
- Data retention for audit logs: How long to keep logs (compliance vs. privacy balance)

**4. Fraud Prevention (New - Even Without Payments)**
- Org license abuse prevention: Prevent one org from buying licenses and reselling them
- Bot/spam protection: Crisis Mode is free and no-account—prevent automated abuse
- User verification: For org-assigned licenses, ensure real users (not fake accounts)
- Rate limiting: Prevent automated abuse of Crisis Mode
- Abuse detection: Monitor for suspicious patterns (mass account creation, resource abuse)

**5. Data Protection (Implementation Details)**
- Data residency: GDPR requires EU data to stay in EU (or adequate safeguards) - where is data hosted?
- Right to deletion: Actually delete data, not just soft-delete (CCPA, GDPR requirement)
- Data portability: Export all user data in machine-readable format (JSON, CSV)
- Data breach notification: 72-hour GDPR requirement, state law requirements vary
- Privacy by design: Build privacy into product from day one

### Compliance Matrix

| Requirement | Applies? | Priority | Implementation |
|------------|----------|----------|----------------|
| GLBA | Yes | High | Privacy policy, security safeguards |
| CCPA | Yes (if CA users) | High | Data deletion, opt-out mechanisms |
| GDPR | Yes (if EU users) | High | Consent, data portability, breach notification |
| SOC 2 Type II | Consider | Medium | For org customers (sales blocker if missing) |
| PCI DSS | No | N/A | No payment processing |
| KYC/AML | No | N/A | No money movement |
| WCAG 2.1 Level AA | Yes | High | Accessibility compliance |

### Security Architecture Requirements

**Multi-Tenant Data Isolation:**
- Row-level security (PostgreSQL policies)
- API layer enforcement (every query checks permissions)
- Org admin access controls (aggregated data only, not individual user data)
- Audit logging of all data access

**Encryption:**
- Data at rest: AES-256 encryption
- Data in transit: TLS 1.3 minimum
- Database encryption: PostgreSQL TDE or application-level encryption
- Key management: Secure key storage and rotation

**Access Controls:**
- Multi-factor authentication (MFA) for org admins
- Role-based access control (RBAC): org_admin, user, support
- Session management: Secure session tokens, timeout policies
- Password policies: Strong password requirements, password hashing (bcryptjs)

### Audit Requirements

**Required Audit Logs:**
- User authentication events (login, logout, failed attempts)
- Data access events (who accessed what data, when, why)
- Org admin actions (license issuance, resource assignment, user management)
- System events (errors, security events, configuration changes)
- Data modification events (create, update, delete operations)

**Audit Log Retention:**
- Compliance requirement: 7 years (financial data)
- Privacy consideration: Balance compliance with user privacy
- Log format: Machine-readable (JSON) for compliance reporting
- Access controls: Audit logs themselves must be protected

**Compliance Reporting:**
- Org admins need audit reports for grant compliance
- Export capabilities: Generate compliance reports on demand
- Data anonymization: Reports must not expose individual user data

### Fraud Prevention

**Org License Abuse Prevention:**
- License validation: Verify org is legitimate (nonprofit verification)
- License usage monitoring: Track actual usage vs. purchased licenses
- Abuse detection: Alert if org is reselling licenses or creating fake users
- Contract enforcement: Terms of service prohibit license resale

**Bot/Spam Protection:**
- Rate limiting: Limit Crisis Mode actions per IP/device
- CAPTCHA (optional): For suspicious activity patterns
- Device fingerprinting: Track devices to detect bot patterns
- Abuse monitoring: Monitor for automated abuse patterns

**User Verification:**
- Org-assigned licenses: Verify users are real (email verification, org validation)
- Crisis Mode: No verification required (barrier-free access)
- Foundation/Builder Mode: Email verification for account creation

### Data Protection Implementation

**Data Residency:**
- GDPR requirement: EU user data must stay in EU (or adequate safeguards)
- Hosting location: Where is data stored? (US, EU, both?)
- Data transfer: If transferring EU data to US, need adequate safeguards (Standard Contractual Clauses)
- Multi-region consideration: May need EU data center for GDPR compliance

**Right to Deletion:**
- Actually delete: Not just soft-delete (CCPA, GDPR requirement)
- Cascade deletion: Delete related data (transactions, budgets, goals)
- Audit log retention: Deletion events must be logged (compliance requirement)
- Backup deletion: Delete from backups (within retention period)

**Data Portability:**
- Export format: JSON, CSV (machine-readable)
- Complete data: All user data, not just visible data
- Export API: Programmatic export for users
- Data format: Standardized format for easy migration

**Data Breach Notification:**
- 72-hour GDPR requirement: Notify authorities within 72 hours
- User notification: Notify affected users (timeline varies by jurisdiction)
- Incident response plan: Documented, tested, includes notification procedures
- Breach assessment: Determine scope, impact, affected users

### Industry Standards & Best Practices

**Security Frameworks:**
- NIST Cybersecurity Framework: Identify, Protect, Detect, Respond, Recover
- ISO 27001: Information security management system
- OWASP Top 10: Web application security risks
- CWE Top 25: Common software weaknesses

**Privacy Frameworks:**
- Privacy by Design: Build privacy into product from day one
- Data minimization: Collect only what's needed
- Purpose limitation: Use data only for stated purposes
- Storage limitation: Don't keep data longer than needed

**Accessibility Standards:**
- WCAG 2.1 Level AA: Required for ADA compliance
- Section 508: If federal contracts (voluntary alignment)
- VPAT documentation: Voluntary Product Accessibility Template

### Required Expertise & Validation

**Required Knowledge:**
- Fintech regulations (GLBA, CCPA, GDPR)
- Security standards (SOC 2, NIST, ISO 27001)
- Multi-tenant architecture (data isolation, access controls)
- Privacy law implementation (right to deletion, data portability)
- Accessibility standards (WCAG 2.1 Level AA)

**Validation Requirements:**
- Security assessment: Annual penetration testing
- Accessibility audit: WCAG 2.1 Level AA validation
- Compliance review: Legal review of privacy policy, terms of service
- SOC 2 audit: If pursuing SOC 2 Type II (for org customers)

### Implementation Considerations

**MVP Priorities:**
- GLBA compliance (privacy policy, security safeguards)
- CCPA compliance (if CA users - data deletion, opt-out)
- GDPR compliance (if EU users - consent, data portability)
- WCAG 2.1 Level AA (accessibility from day one)
- Basic audit logging (user actions, data access)

**Post-MVP (Growth Phase):**
- SOC 2 Type II certification (for org customers)
- Advanced fraud prevention (bot detection, abuse monitoring)
- Compliance reporting (org admin audit reports)
- Data residency options (EU data center for GDPR)

**Technical Architecture Implications:**
- Audit logging system (centralized logging, retention policies)
- Data isolation enforcement (row-level security, API middleware)
- Encryption implementation (at rest, in transit, key management)
- Access control system (RBAC, MFA, session management)
- Data deletion implementation (cascade deletion, backup cleanup)
- Data export system (JSON/CSV export, API endpoints)

---

## Web App Specific Requirements

### Project-Type Overview

MoneyShyft is a **Mobile-First Web Application** serving vulnerable populations with unique technical constraints:
- **Target Users:** Vulnerable populations (older devices, limited connectivity, low digital literacy)
- **Architecture:** Hybrid MPA/SPA (Server-Side Rendered public pages, Client-Side SPA for authenticated pages)
- **Primary Constraint:** Crisis Mode MUST work on slow connections, old devices, and without JavaScript

### Technical Architecture Considerations

#### Architecture Decision: Hybrid MPA/SPA (Nuxt 3)

**Why Not Pure SPA:**
- SPAs are heavy (initial bundle size, memory intensive, requires good connectivity)
- Vulnerable populations have: older devices (limited RAM), spotty connectivity (3G, public WiFi), lower digital literacy
- If JavaScript fails to load, pure SPA is broken (unacceptable for Crisis Mode)

**Hybrid Architecture:**

**Public/Unauthenticated Pages = MPA (Server-Rendered):**
- Landing page
- Crisis Mode intake question
- Resource lists
- Org admin signup

**Why MPA for These:**
- Fast first render (HTML comes from server, no JS required)
- Works on slow connections (progressive enhancement - works without JS)
- SEO-friendly (Crisis Mode resources should be discoverable)
- Lower barrier (someone in crisis on slow 3G can still use Crisis Mode)

**Authenticated Pages = SPA (Client-Rendered):**
- Foundation Mode dashboard
- Builder Mode (scenarios, forecasting)
- Org admin dashboard

**Why SPA for These:**
- Rich interactions (drag sliders, real-time calculations, scenario planning)
- Better UX once loaded (no page refreshes, smooth transitions)
- Worth the wait (users are committed, have logged in)

**Implementation: Pre-Rendered Static HTML + Vue 3 SPA (MVP Simplification)**

**Crisis Mode = Pre-Rendered Static HTML (11ty, Astro, or Nuxt SSG)**
- Pre-rendered at build time (no server needed, just static files)
- Fastest possible load (HTML served from CDN)
- Works without any JavaScript (pure HTML/CSS)
- SEO-friendly (fully static, crawlers love it)
- Simplest deployment (just static files)
- **Why this for MVP:** Reduces complexity, ensures Crisis Mode works on worst-case scenarios

**Authenticated Pages = Vue 3 SPA**
- Foundation Mode dashboard
- Builder Mode (scenarios, forecasting)
- Org admin dashboard
- Rich interactions (drag sliders, real-time calculations, scenario planning)
- Better UX once loaded (no page refreshes, smooth transitions)

**Post-MVP: Consider Nuxt 3 for Unified Codebase**
- If team becomes comfortable with SSR/SSG
- Can migrate Crisis Mode to Nuxt SSG (still pre-rendered, but unified codebase)
- Trade-off: More complex than pure SPA, but single codebase benefits

**MVP Trade-off:**
- Two codebases (static site + Vue SPA) = slightly more maintenance
- But simpler than Nuxt SSR for MVP
- Crisis Mode reliability is worth the trade-off

### Browser Support Matrix

**Target: Extended Support (Last 3-4 Years)**

**Minimum Browser Versions:**
- Chrome 90+ (released 2021)
- Firefox 88+ (released 2021)
- Safari 14+ (released 2020)
- Edge 90+ (released 2021)
- Android 8+ (released 2017) - covers ~95% of Android users
- iOS 14+ (released 2020) - covers ~98% of iOS users

**Why This Range:**
- Balances coverage with performance
- Android 8 (2017) is still common in budget phones
- Allows use of most modern JS features (with transpilation)
- ~2-3% of users might see degraded experience (acceptable trade-off)

**Implementation:**
```javascript
// .browserslistrc
> 0.5%
last 3 versions
Firefox ESR
not dead
not IE 11
```

**Transpilation:**
- Vite handles transpilation automatically
- Modern JS features (async/await, optional chaining, nullish coalescing) transpiled for older browsers
- Polyfills added automatically where needed

### Progressive Enhancement Strategy

**Core Principle:** Every feature must work without JavaScript, then enhance with JS.

**Progressive Enhancement Layers:**

**Layer 1: Core HTML (Works Without JS)**
- Crisis Mode intake form works as plain HTML form
- Submits to server, gets response
- If JS fails to load, user can still take action
- Example: `<form method="POST" action="/crisis/submit">` - works on ANY browser

**Layer 2: Enhanced with CSS**
- Better layout, visual hierarchy
- Responsive design (mobile-first)
- Works on very old browsers
- Example: Tailwind CSS utility classes for responsive grid

**Layer 3: Enhanced with JS**
- Form validation before submit
- Dynamic filtering/searching
- Client-side calculations and real-time updates
- Modern browsers get better UX
- Example: Client-side validation, voice recognition API

**Layer 4: Advanced Features**
- Real-time updates (WebSockets - post-MVP)
- Offline mode (Service Workers)
- Advanced animations
- Only on capable devices

**Progressive Enhancement Checklist:**
For EVERY feature, ask:
1. Does it work without JS? (If yes, build that first)
2. Does it enhance with JS? (Add JS layer on top)
3. Does it gracefully degrade? (If JS fails, does core functionality still work?)

**Critical for Crisis Mode:**
- ✅ Must work without JS (someone in crisis can't troubleshoot broken JS)
- ✅ Must work on slow connections (timeout after 5 seconds, show cached content)
- ✅ Must work offline (Service Worker caches Crisis resources)

### SEO Strategy

**Pages That NEED SEO:**

**1. Landing Page (moneyshyft.app)**
- Keywords: "free budgeting app," "financial crisis help," "budgeting for low income"
- Goal: Attract individual users, nonprofit partners
- Must rank well

**2. Crisis Mode Entry (moneyshyft.app/crisis)**
- Keywords: "emergency rent assistance," "eviction help," "utility shutoff help"
- Goal: People Googling in crisis find you
- Critical for discovery

**3. Resource Pages (Post-MVP)**
- Example: `moneyshyft.app/resources/eviction-help-fort-wayne`
- Local SEO for Fort Wayne resources
- Goal: Rank for "eviction help Fort Wayne" alongside ResourceShyft
- Nice to have, not MVP

**Pages That DON'T Need SEO:**
- Foundation Mode (authenticated) - `<meta name="robots" content="noindex, nofollow">`
- Builder Mode (authenticated) - `<meta name="robots" content="noindex, nofollow">`
- Org admin dashboard (authenticated) - `<meta name="robots" content="noindex, nofollow">`
- User settings (authenticated) - `<meta name="robots" content="noindex, nofollow">`

**SEO Implementation (Nuxt 3):**
```javascript
// pages/crisis.vue
export default {
  head() {
    return {
      title: 'Financial Crisis Help - MoneyShyft',
      meta: [
        { name: 'description', content: 'Free tool to help you navigate financial crises. No account required. Get help with eviction, utilities, food insecurity in 10 minutes.' },
        { property: 'og:title', content: 'Financial Crisis Help - MoneyShyft' },
        { property: 'og:description', content: 'Free crisis support tool. No signup required.' }
      ]
    }
  }
}
```

**Social Sharing (Post-MVP):**
- Open Graph tags for when users share success stories
- Twitter Card for org admins sharing case studies
- Not critical for MVP, but easy to add

### Real-Time Features

**MVP Strategy: Polling (Not WebSockets)**

**Features That Might Need Real-Time:**
1. **Couples Mode (Shared Budget)** - Not in MVP, defer
2. **Org Admin Dashboard (Client Activity)** - Poll every 30 seconds (acceptable delay)
3. **Crisis Mode Action Status** - Email notification or manual status check (no real-time needed)

**Why Polling for MVP:**
- Dead simple, works everywhere, easy to debug
- Real-time is complex (debugging, scaling, edge cases)
- Polling works for 90% of use cases
- Validate demand before building WebSockets

**Implementation:**
```javascript
// Org admin dashboard
setInterval(async () => {
  const data = await fetch('/api/org/dashboard');
  updateDashboard(data);
}, 30000); // 30 seconds
```

**Post-MVP (If Couples Mode Is Critical):**
- Add Socket.io for couples budget real-time sync
- Use only for couples mode (don't over-engineer)
- Only if validated demand exists

### Accessibility Requirements

**Standard: WCAG 2.1 Level AA (Required)**

**WCAG 2.1 Level AA Requirements:**

**Perceivable:**
- ✅ Text alternatives for images (alt text)
- ✅ Color contrast: 4.5:1 for normal text, 3:1 for large text
- ✅ No information conveyed by color alone (use icons + color)
- ✅ Content reflows at 400% zoom

**Operable:**
- ✅ Keyboard accessible (all functions available via keyboard)
- ✅ No keyboard traps (can Tab out of every element)
- ✅ Focus indicators visible
- ✅ Skip links ("Skip to main content")

**Understandable:**
- ✅ Clear language (Flesch-Kincaid Grade 8 or lower)
- ✅ Consistent navigation
- ✅ Error messages clear and actionable

**Robust:**
- ✅ Valid HTML (passes W3C validator)
- ✅ ARIA labels where needed (but semantic HTML preferred)
- ✅ Works with assistive tech (screen readers)

**Validation Tools & Process:**

**Automated Testing (Catches ~30% of Issues):**
1. **axe DevTools** (browser extension)
   - Runs in Chrome/Firefox
   - Flags contrast, missing alt text, ARIA issues
   - Use during development

2. **Lighthouse Accessibility Audit**
   - Built into Chrome DevTools
   - Scores 0-100 (aim for 90+)
   - Run on every PR

3. **WAVE (WebAIM)** (browser extension)
   - Visual feedback on accessibility issues
   - Shows errors inline
   - Use for spot-checking

**Manual Testing (Catches ~70% of Issues):**
4. **Keyboard Navigation Testing**
   - Unplug mouse
   - Navigate entire app with Tab, Shift+Tab, Enter, Space
   - Can you complete every task?
   - Do this weekly

5. **Screen Reader Testing**
   - Mac: VoiceOver (Cmd+F5)
   - Windows: NVDA (free) or JAWS (paid)
   - Mobile: iOS VoiceOver, Android TalkBack
   - Navigate Crisis Mode, log transaction, set goal
   - Do this before each major release

6. **Zoom Testing**
   - Zoom to 400% (Cmd/Ctrl + plus key)
   - Does content reflow or get cut off?
   - **Critical:** Test on actual mobile devices, not just desktop browsers
   - Mobile layouts can break at 400% zoom (simplified mobile layout may be needed)

7. **Color Blindness Simulation**
   - Use Color Oracle (free tool)
   - View app as someone with deuteranopia, protanopia, tritanopia
   - Can you still distinguish important elements?

**Accessibility Testing Schedule:**
- **During Development:** Run axe DevTools on every component, test keyboard navigation as you build
- **Before Each PR:** Run Lighthouse accessibility audit (must score 90+), fix any axe DevTools errors
- **Before Each Release:** Screen reader test (at least Crisis Mode + Foundation Mode), keyboard navigation full-app test, zoom to 400% test, color blindness simulation
- **Before Launch:** Hire accessibility consultant for full audit ($1,000-3,000), test with real users who use assistive tech, remediate critical issues before public launch

**Voice Input Support (Bonus Accessibility):**
Crisis Mode has voice-to-text input for:
- Low literacy users
- Users with motor impairments (can't type easily)
- Mobile users (faster than typing on phone)

**Implementation:**
```javascript
// Crisis Mode textarea with voice input
if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    textarea.value = transcript;
  };
  
  voiceButton.addEventListener('click', () => {
    recognition.start();
  });
}
```

**Accessibility Considerations:**
- Provide visual feedback when listening (pulsing mic icon)
- Allow editing after voice input (user can fix mistakes)
- Fallback to typing if speech recognition fails
- ARIA labels: "Start voice input" button has aria-label

### Offline-First Considerations

**Scenarios Where Offline Matters:**

**1. Crisis Mode on Unreliable Connection**
- User in crisis, spotty public WiFi
- Starts filling out form, connection drops
- Without offline: Form resets, user loses progress (DISASTER)
- With offline: Form saves to localStorage, submits when connection restores

**2. Foundation Mode Transaction Logging**
- User wants to log grocery purchase in parking lot
- No cell signal
- Without offline: Can't log transaction until home (might forget)
- With offline: Log saves locally, syncs later

**3. Builder Mode Scenario Planning**
- User on bus/subway with no signal
- Wants to play with budget scenarios
- Without offline: Can't use app
- With offline: All calculations happen client-side, works fine

**Offline Implementation Strategy (MVP: Partial Offline):**

**What MUST Work Offline:**
1. Crisis Mode decision tree (pre-rendered static HTML, works without connection)
2. Foundation Mode transaction logging (saves to IndexedDB, syncs later with retry logic)
3. Builder Mode calculations (all math happens client-side)

**What CAN'T Work Offline:**
4. Crisis Mode resource locator (needs live ResourceShyft data)
5. Account sync (needs server)
6. Org admin dashboard (needs live data)

**Offline Sync Retry Logic:**
- Exponential backoff for failed sync attempts
- Queue transactions in IndexedDB with `synced: false` flag
- Retry when connection restored (window.addEventListener('online'))
- Max retry count to prevent infinite loops
- User notification if sync fails after multiple attempts

**Implementation:**

**Service Worker (Cache-First Strategy for Crisis Mode):**
```javascript
// Service Worker - Cache-first for Crisis Mode, Network-first for authenticated pages
self.addEventListener('fetch', (event) => {
  // Crisis Mode pages: Cache-first (serve immediately, update in background)
  if (event.request.url.includes('/crisis')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        // Serve cached version immediately (even if stale)
        const fetchPromise = fetch(event.request).then((response) => {
          // Update cache in background
          caches.open('moneyshyft-v1').then((cache) => {
            cache.put(event.request, response.clone());
          });
          return response;
        });
        // Return cached version immediately, or fetch if no cache
        return cached || fetchPromise;
      })
    );
  }
  // Authenticated pages: Network-first (try network, fallback to cache)
  else {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request);
      })
    );
  }
});

// Install: Pre-cache Crisis Mode pages
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('moneyshyft-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/crisis',
        '/crisis/decision-tree',
        '/css/main.css'
      ]);
    })
  );
});
```

**Timeout Strategy for Crisis Mode:**
- If page doesn't load in 3 seconds, show cached content immediately
- Background fetch continues, updates page when complete
- Ensures something loads fast, even on terrible connections

**IndexedDB for Offline Transaction Logging:**
```javascript
// IndexedDB for offline transaction logging
import { openDB } from 'idb';

const db = await openDB('moneyshyft-db', 1, {
  upgrade(db) {
    db.createObjectStore('transactions', { keyPath: 'id', autoIncrement: true });
  }
});

// Save transaction offline
await db.add('transactions', {
  amount: 85,
  category: 'groceries',
  date: new Date(),
  synced: false
});

// Sync when online
window.addEventListener('online', async () => {
  const unsynced = await db.getAllFromIndex('transactions', 'synced', false);
  for (const tx of unsynced) {
    await fetch('/api/transactions', { method: 'POST', body: JSON.stringify(tx) });
    tx.synced = true;
    await db.put('transactions', tx);
  }
});
```

### Responsive Design Requirements

**Mobile-First Approach:**
- Design for mobile screens first (320px width minimum)
- Progressive enhancement for larger screens (tablet, desktop)
- Touch-friendly targets (minimum 44x44px)
- Thumb-friendly navigation (bottom navigation on mobile)

**Breakpoints:**
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

**Key Considerations:**
- Crisis Mode must be fully functional on smallest mobile screens
- Foundation Mode transaction logging optimized for mobile (quick entry)
- Builder Mode scenarios work on tablet/desktop (more screen real estate)

### Performance Targets

**Critical Metrics:**
- **First Contentful Paint (FCP):** < 1.8s (Crisis Mode public page)
- **Largest Contentful Paint (LCP):** < 2.5s
- **Time to Interactive (TTI):** < 3.8s (authenticated pages)
- **Cumulative Layout Shift (CLS):** < 0.1

**Why These Matter:**
- Vulnerable populations often have slow connections (3G, public WiFi)
- Older devices have limited processing power
- Crisis Mode must load FAST (user is in crisis, can't wait)

**Optimization Strategies:**
- Code splitting (route-based for Vue SPA)
- Lazy loading images and components
- Service Worker caching for static assets (cache-first for Crisis Mode)
- Minimize JavaScript bundle size
- Compress images (WebP format where supported)
- Pre-render Crisis Mode as static HTML (fastest possible load)
- Inline critical CSS for Crisis Mode
- Validate performance targets on real 3G connections (not just throttled dev tools)

### Implementation Considerations

**Tech Stack:**

**Frontend:**
- **Nuxt 3** (Vue 3 with SSR/SSG)
- **Tailwind CSS** (utility-first, mobile-first)
- **TypeScript** (type safety, better DX)

**Backend:**
- **Node.js + Express** (or Fastify)
- **PostgreSQL** (relational data, multi-tenant isolation)
- **Pinia** (Vue state management)

**Infrastructure:**
- **DigitalOcean App Platform or Vercel** (easy deploy, scales automatically)
- **Plausible Analytics** (privacy-first, GDPR-compliant)

**Key Architecture Decisions:**
1. ✅ **Pre-rendered static HTML for Crisis Mode (MVP)** - simplest, fastest, most reliable for worst-case scenarios
2. ✅ **Vue 3 SPA for authenticated pages** - rich interactions, better UX once loaded
3. ✅ **Extended browser support (3-4 years)** - because vulnerable populations use older devices
4. ✅ **Progressive enhancement** - because JS failure can't break Crisis Mode
5. ✅ **Polling for real-time (MVP)** - because Socket.io is overkill until couples mode is validated
6. ✅ **WCAG 2.1 Level AA** - because accessibility isn't optional
7. ✅ **Partial offline support with retry logic** - because users have unreliable connections
8. ✅ **Service Worker cache-first for Crisis Mode** - timeout after 3 seconds, show cached content
9. ✅ **Graceful degradation for unsupported browsers** - don't block, show simplified version

**Browser Support Graceful Degradation:**
- For the ~5% of users on older browsers (pre-Android 8):
- Show simplified version that works (basic HTML/CSS)
- Don't show "browser not supported" message (blocks access)
- Progressive enhancement: older browsers get basic functionality, modern browsers get enhanced UX

---

## Innovation & Novel Patterns

### Critical Question: Is MoneyShyft Actually Innovative, Or Just Thoughtful?

**The Honest Assessment:**

After rigorous analysis, MoneyShyft's innovation is NOT in features that can be easily copied. The innovation is in **business model, market positioning, and founder values** - elements that are significantly harder for competitors to replicate.

### What's Easy to Copy (Not Defensible)

**Feature-Level "Innovations" That Competitors Can Replicate:**

1. **Three-Mode Architecture**
   - YNAB could add "Crisis Mode" in 3 months
   - Mint could add progressive disclosure tiers
   - **Barrier to copying:** Low (standard UX patterns)

2. **Free Tier / No Account Required**
   - Mint is already free
   - Any app can remove login requirements
   - **Barrier to copying:** Low (technical change, not strategic)

3. **Progressive Disclosure**
   - Standard UX pattern used across industries
   - Video games, Duolingo, Notion all use this
   - **Barrier to copying:** Low (well-documented pattern)

4. **Trauma-Informed Design Principles**
   - Competitors can read trauma-informed design literature
   - Can hire consultants to audit their UX
   - **Barrier to copying:** Medium (requires cultural shift, but achievable)

### What's Hard to Copy (Defensible)

**The Three Truly Innovative Aspects:**

#### 1. No-Benefit-Cliff License Lifecycle Model (Business Model Innovation)

**The Innovation:**
Our org-sponsored → discounted → standard license lifecycle **ELIMINATES the benefit cliff** that traps people in poverty.

**Why This Matters:**
- Most freemium/discounted services create cliffs (free → $10/month overnight)
- Government programs create cliffs (SNAP benefits disappear at income threshold)
- We create a **GRADUAL transition** (org-sponsored → 50% discount → full price over 12+ months)

**Why Competitors Won't Copy:**
- Requires **subsidizing users during transition period** (short-term revenue loss)
- Public companies can't prioritize wellbeing over growth (shareholders won't allow it)
- Most companies optimize for revenue, not social impact

**Defensibility:** High - Requires values-driven business model that prioritizes impact over profit

**Validation Approach:**
- **Hypothesis:** Gradual transition improves user retention and outcomes compared to benefit cliff
- **Test:** Track user retention rates through transition periods (org-sponsored → discount → standard)
- **Success Metric:** 
  - 60%+ retention rate through transition (vs. typical 20-30% cliff churn)
  - Users achieve financial stability before paying full price
- **Failure Signal:** Users churn at same rate as benefit cliff model
- **Fallback:** If gradual transition doesn't improve outcomes, adjust discount period or pricing structure

#### 2. B2B2C Distribution Targeting Nonprofits (Market Positioning Innovation)

**The Innovation:**
We're targeting **nonprofits serving vulnerable populations** - a market most SaaS companies avoid because it's hard.

**Why This Matters:**
- Existing B2B2C models target: Employers (stable workforce), Schools (stable student base), Healthcare systems (stable patient base)
- Our B2B2C targets: **Nonprofits (mission-driven, budget-constrained), Vulnerable populations (unstable, crisis-prone), Grant-funded programs (outcome-focused)**

**Why Competitors Won't Copy:**
- **Nonprofits are HARD customers:** Slow sales cycles, low budgets, high support needs
- **Vulnerable populations are HARD users:** Low digital literacy, unstable access, trauma-informed needs
- **Grant funding is HARD revenue:** Cyclical, restricted, outcome-dependent
- Most SaaS companies AVOID this market because it's too hard

**Defensibility:** High - Requires deep understanding of nonprofit operations, grant compliance, and vulnerable populations

**Validation Approach:**
- **Hypothesis:** Nonprofits will pay for licenses and clients will use the tool
- **Test:** Pilot with 3-5 nonprofits, track license activation, client engagement, org renewal
- **Success Metrics:**
  - 70%+ license activation (clients actually use it)
  - 60%+ client engagement after 30 days (still using it)
  - 80%+ org renewal after 6 months (orgs see value and renew)
- **Failure Signals:**
  - <50% activation (orgs assign licenses, clients don't use)
  - High churn (clients abandon after first week)
  - Orgs don't renew (don't see value)
- **Fallback:** If B2B2C doesn't work, pivot to B2C (individual users pay) or pure nonprofit tool (grant-funded, no subscriptions)

#### 3. Trauma-Informed Design as Core Philosophy, Not Feature (Design Philosophy Innovation)

**The Innovation:**
Most apps ADD accessibility features (high contrast mode, screen reader support). We **BUILD the entire app around trauma-informed principles from the ground up.**

**Why This Matters:**
- "Trauma-informed" isn't a checkbox - it's our **design philosophy**
- Every decision (copy, UX, features) is filtered through "does this retraumatize users?"
- We explicitly design around crisis states (Crisis Mode exists BECAUSE we understand trauma)
- We remove shame from every interaction (no red/yellow/green, no "you're over budget")
- We provide exit ramps at every stage ("take a break" is a feature, not a bug)

**Why Competitors Won't Copy:**
- Requires **lived experience** with poverty, instability, and trauma (not just academic understanding)
- Requires **willingness to sacrifice revenue** for user wellbeing (can't use dark patterns)
- Requires **deep empathy** and cultural shift (not just hiring consultants)

**Defensibility:** Medium-High - Requires founder values and lived experience that can't be easily replicated

**Validation Approach:**
- **Hypothesis:** Trauma-informed design leads to better outcomes than traditional shame-based budgeting
- **Test:** Compare MoneyShyft users to YNAB/Mint users (if comparison data available), track retention, goal achievement, self-reported financial anxiety
- **Success Metrics:**
  - Higher 6-month retention than YNAB/Mint (less abandonment)
  - Lower self-reported financial anxiety (users feel better, not worse)
  - Positive qualitative feedback ("this doesn't make me feel like shit")
- **Failure Signals:**
  - Users abandon because "it's too soft" or "not serious enough"
  - Outcomes are same as traditional apps (trauma-informed design doesn't matter)
- **Fallback:** If trauma-informed design doesn't improve outcomes, you still have a good product - but differentiation is weaker

### The Most Innovative Thing About MoneyShyft (Honest Answer)

**It's not the features. It's not the modes. It's not even the trauma-informed design.**

**It's the founder.**

The innovation is:
- A founder with **lived experience** in the nonprofit space
- A founder who **understands poverty, instability, and trauma** (not academically, but personally through work)
- A founder **willing to sacrifice short-term revenue** for long-term impact
- A founder who says **"this is not about building my wealth, it's about supporting people on their journey"**

**That's the innovation competitors can't copy.**

YNAB can build Crisis Mode. Mint can remove account requirements. But they can't replicate **your values, your relationships with nonprofits, your understanding of vulnerable populations.**

The product is innovative because the **FOUNDER is mission-driven.**

**Defensibility:** Very High - Personal values and lived experience are unique and cannot be replicated

### Integrated Crisis-to-Stability Journey (Unique Positioning)

**The Innovation:**
We're the **ONLY tool** that serves people across the entire financial stability spectrum:
- In crisis (Crisis Mode)
- Building awareness (Foundation Mode)
- Achieving goals (Builder Mode)

**Why This Matters:**
- Other apps pick ONE segment (YNAB = stable people, GoodRx = crisis discounts)
- We serve **ALL segments** and help people **TRANSITION between them**

**Why Competitors Won't Copy:**
- Requires serving unprofitable segments (Crisis Mode is free, no account)
- Requires understanding entire user journey (not just one use case)
- Most companies optimize for profitable segments only

**Defensibility:** Medium - Requires commitment to serving unprofitable segments

**Validation Approach:**
- **Hypothesis:** Users benefit from mode-specific interfaces optimized for their current state
- **Test:** Build Crisis + Foundation Mode, track mode transition rates and crisis prevention
- **Success Metrics:**
  - 30%+ of Crisis users transition to Foundation within 90 days
  - 50%+ of Foundation users avoid crises over 6 months
- **Failure Signals:**
  - Users abandon after Crisis Mode (don't transition)
  - Users keep returning to Crisis Mode (Foundation isn't preventing crises)
- **Fallback:** If modes don't work, consolidate into ONE adaptive interface that changes based on user state

### What Makes Innovation DEFENSIBLE?

**The Real Question:** Can competitors copy you?

**Our Moat Isn't Features - It's:**
1. **Values** - Willingness to sacrifice revenue for impact
2. **Relationships** - Deep trust with nonprofits built over time
3. **Market Positioning** - Choosing a hard market others avoid
4. **Founder Experience** - Lived experience with vulnerable populations

**Competitive Advantages:**
- **Nonprofit partnerships:** Requires trust-building, understanding grant compliance, serving mission-driven customers
- **Trauma-informed culture:** Requires lived experience, deep empathy, willingness to sacrifice revenue
- **Benefit-cliff-free licensing:** Requires subsidizing users during transition period
- **Serving vulnerable populations well:** Requires understanding poverty, trauma, instability at deep level

### Innovation Summary

**What's Actually Innovative:**
1. ✅ **No-benefit-cliff license model** - Business model innovation that helps people instead of extracting maximum revenue
2. ✅ **B2B2C distribution targeting nonprofits** - Market positioning innovation (going where others won't)
3. ✅ **Founder values and lived experience** - The innovation is having someone who DEEPLY understands this market building for it

**What's Thoughtful But Not Defensible:**
- Three-mode architecture (can be copied)
- Progressive disclosure (standard UX pattern)
- Free Crisis Mode (can be copied)
- Trauma-informed design principles (can be learned)

**The Bottom Line:**
MoneyShyft is innovative because of **compassionate capitalism** - choosing impact over profit, serving hard markets, and building from values rather than features. The features are good. The architecture is solid. But the innovation is the **APPROACH** - and that's what makes it defensible.

---

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach: Experience-Led Problem-Solving MVP**

MoneyShyft explicitly rejects two common MVP traps:
- ❌ **Revenue MVP first** → misaligned with trauma-informed trust
- ❌ **Platform MVP first** → over-engineering before proof of value

**Why Experience-Led Problem-Solving:**
- Differentiation is the experience (non-judgment, dignity, exit without penalty)
- Investors/partners will forgive limited features, but not ethical incoherence
- Orgs buy outcomes + trust, not dashboards

**Reframed MVP Goal:**
"Demonstrate that a vulnerable person can move from panic → clarity → first action without harm, and that an org can safely offer that at scale."

If we hit that, everything else compounds.

**Guiding Principle for MVP Decisions:**
"If this feature doesn't reduce harm, increase clarity, or preserve dignity for someone in instability, it's not MVP."

### Scope & Complexity Assessment

**Project Classification: Medium-to-Complex (But Sequenced, Not Ambitious)**

This is not a typical "medium SaaS MVP." It is:
- A mode-based product with different ethical, UX, and technical constraints per mode
- A trust-sensitive system (crisis + trauma + dignity)
- A multi-tenant B2B2C platform with asymmetric power dynamics (orgs vs. clients)
- A compliance-aware fintech-adjacent tool, even without bank linking

**The Good News:**
- Modes allow hard scope boundaries
- Crisis Mode can be technically isolated (static, no auth, minimal data)
- Already decided not to over-optimize for progression or retention (removes dark-pattern complexity)

**Real Constraint:** Sequencing, not ambition.

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**
1. ✅ Casey - Crisis Mode (complete end-to-end)
2. ✅ Riley - Foundation Mode (awareness building)
3. ✅ Blake - Builder Mode (skeleton only)
4. ✅ Maria - Org Admin (trust enabler, not full product)

#### A. Crisis Mode (Casey) - Non-Negotiable MVP

**Must Ship in MVP:**
- 72-hour intake question (works without JS)
- Deterministic decision tree (no AI, pre-rendered static HTML)
- Actionable next step (resource, script, or form)
- No account required
- Works without JavaScript (progressive enhancement)
- Explicit "I'm done / I need more help" exit
- Pre-rendered static HTML (fastest possible load)

**Can Be Simplified for MVP:**
- ✅ Resource set can be manually curated (no live ResourcesHyft API required)
- Scripts/forms can be static templates
- Keyword safety detection can be basic string matching

**MVP Validation:** User completes one real action in under ~15 minutes without feeling trapped or judged.

#### B. Foundation Mode (Riley) - Bare Minimum, But Essential

**Must Ship in MVP:**
- Manual transaction logging (text input, amount, date)
- Anonymous start (localStorage, no account required)
- Account creation offer after 3-5 transactions
- Progressive pattern revelation (simple averages after 3-5 transactions)
- Pattern reflection after ~4 weeks ("Reality Mirror")
- Small win acknowledgment (optional during onboarding, check-in after 4 weeks)
- No moralizing language (trauma-informed copy throughout)

**Must NOT Ship Yet:**
- Bank linking
- Deep categorization logic
- Advanced analytics
- Weekly reflections (only if logging consistently)
- Mode progression prompts (behavior-based, not time-based)

**MVP Validation:** User can say "I finally see what's actually happening" without feeling shame.

#### C. Builder Mode (Blake) - Skeleton Only (Enhanced for Completeness)

**Absolute Minimum for MVP Credibility:**
- Single active goal (one goal at a time, not multiple)
- **Two scenario comparisons** (not just one - shows the power of "what if" thinking)
  - Example: "Pay off debt first, then save" vs. "Save and pay debt simultaneously"
- **Basic forecasting** ("If you continue at this rate, you'll hit your goal in X months")
- Progress indicator (visual progress bar, percentage complete)
- Foundation data import (if user was in Foundation Mode)

**Why Two Scenarios:**
- One scenario feels incomplete ("this isn't ready yet")
- Two scenarios demonstrate the core value prop: "what if" thinking
- Still skeleton (not full scenario builder), but feels complete enough to validate

**Explicitly Post-MVP:**
- ✅ Windfall planning (powerful, but not required to prove value prop)
- Multiple goals simultaneously
- Advanced forecasting with ranges (best case, expected, worst case)
- Custom scenario builder (user creates their own scenarios)
- Debt strategy comparison (avalanche vs. snowball)
- Bank linking (optional)
- Couples mode

**Why Skeleton Only:**
- If Builder Mode becomes heavy, it delays everything else and distorts priorities
- Don't need full Builder Mode to prove potential
- Need to show Builder Mode is natural extension—not a pivot

**MVP Validation:** User can set one goal, compare two scenarios, see basic forecasting, and track progress. That's enough to prove the concept while feeling complete.

#### D. Org Admin (Maria) - Trust Enabler, Not Full Product

**Must Ship in MVP:**
- License assignment (email invitation only)
- Client list view (name, email, mode, status, last active)
- Basic engagement visibility (activated / not activated)
- Billing clarity (view usage, update payment method)
- **Simple aggregated outcomes reporting (if clients opt-in)**
  - X% of clients who used Crisis Mode avoided a crisis
  - Y% of Foundation users identified spending patterns
  - Z% of clients progressed from Foundation to Builder
  - Aggregated, anonymized data only (never individual data)

**Why Outcomes Reporting in MVP:**
- Critical for org renewal (orgs need to justify spending to grant funders)
- Simple to build (just aggregating existing data)
- Opt-in flow is good UX (gives clients agency, trauma-informed)
- The complexity is in privacy boundaries, not the reporting itself

**Can Be Manual / Concierge for MVP:**
- ✅ Org onboarding (hands-on, you personally set up accounts)
- License provisioning (you help with initial setup)
- Reporting explanation (you help interpret engagement reports)

**Why Hands-On for MVP:**
- Learning how orgs actually use and talk about this
- Building trust through personal relationship
- Gathering feedback for self-serve onboarding (post-MVP)
- **Document every interaction** - that feedback becomes your self-serve onboarding spec

**MVP Validation:** Org can assign licenses, see client engagement, view outcomes data (if clients opt-in), and understand billing. That's enough to prove the model and justify renewal.

### MVP Deal-Breakers (Non-Negotiable)

**If any of these slip, the product stops being MoneyShyft:**

1. ✅ **Crisis Mode works end-to-end without accounts**
2. ✅ **No benefit cliff (Foundation never paywalled)**
3. ✅ **User can leave without penalty (dignified exit)**
4. ✅ **Org sponsorship does not create surveillance (privacy boundaries)**
5. ✅ **Language and UX consistently avoid shame (trauma-informed throughout)**
6. ✅ **One real outcome is achievable per mode (crisis → action, foundation → awareness, builder → progress)**

### Post-MVP Features

#### Phase 2 (Post-MVP - Growth Phase)

**Crisis Mode Enhancements:**
- Live ResourcesHyft API integration (replace manual curation)
- Advanced keyword safety detection
- Multi-language support
- Voice input enhancements

**Foundation Mode Enhancements:**
- Weekly reflections (if logging consistently)
- Code-based license assignment (for clients without email)
- CSV bulk import for orgs (100+ clients)
- Sharing/accountability features (optional)

**Builder Mode Enhancements:**
- Windfall plan (pre-commitment strategy)
- Multiple goals simultaneously
- Advanced forecasting with ranges (best case, expected, worst case)
- Debt strategy comparison (avalanche vs. snowball)
- Bank linking (optional, user choice)
- Couples mode (shared budgets)

**Org Admin Enhancements:**
- Self-serve onboarding (video tutorials, help docs)
- Advanced outcomes reporting (detailed breakdowns, custom date ranges)
- Multi-admin management (add/remove admins, permission levels)
- Resource customization (filter ResourcesHyft resources)
- Custom report builder (if orgs need specific metrics)

**Technical Enhancements:**
- Nuxt 3 unified codebase (migrate Crisis Mode from static HTML to Nuxt SSG)
- WebSocket real-time updates (for couples mode, if validated)
- Advanced offline support (full offline mode for all features)
- Performance optimizations (validate on real 3G connections)

#### Phase 3 (Expansion Phase)

**New User Types:**
- Couples/households (shared budgeting)
- Financial counselors (client management tools)
- Grant administrators (compliance reporting)

**Advanced Features:**
- AI-powered insights (if trauma-informed approach validated)
- Tax optimization (401k, HSA contributions)
- Irregular income handling (self-employed, variable income)
- Advanced resource filtering (AI-powered recommendations)

**Market Expansion:**
- Multi-region support (EU data center for GDPR)
- Additional languages
- Mobile apps (native iOS/Android)
- Integration marketplace (connect to other financial tools)

### Risk Mitigation Strategy

#### Technical Risks

**Risk:** Pre-rendered static HTML for Crisis Mode might not scale if decision tree becomes complex.

**Mitigation:**
- Keep decision tree deterministic and simple (no AI, basic logic)
- Pre-render all possible paths at build time
- If complexity grows, migrate to Nuxt SSG (still pre-rendered, but more flexible)

**Risk:** Multi-tenant data isolation might have security vulnerabilities.

**Mitigation:**
- ✅ **Row-level security (PostgreSQL policies) from day one** (don't defer for MVP)
- API layer enforcement (every query checks permissions)
- Security audit before public launch
- Regular penetration testing (annual)
- **Don't defer security because it's "just MVP"** - a data breach during pilot would be catastrophic for trust

#### Market Risks

**Risk:** Orgs won't pay for licenses if clients don't use the tool.

**Mitigation:**
- Hands-on onboarding for MVP (learn how orgs actually use it)
- Track activation rates and engagement (70%+ activation target)
- Provide orgs with "activation tips" (best practices)
- If activation is low, pivot to different distribution model

**Risk:** Users won't progress through modes (stay in Crisis Mode forever).

**Mitigation:**
- This is actually SUCCESS (avoiding crises is the goal)
- Don't force progression (respect user autonomy)
- **Instrument to track progression intent, not just outcomes**
  - Track: Do users understand they CAN progress? (awareness)
  - Track: Do users WANT to progress but don't know how? (friction)
  - Track: Do users explicitly choose NOT to progress? (autonomy)
- Add "Want to try Builder Mode?" button in Foundation Mode (even if placeholder) to measure demand
- Track mode progression attempts, not just completions
- If no one even tries, that's different from "they tried but stayed in Foundation"
- If users never progress, validate WHY before concluding "modes aren't needed"

#### Resource Risks

**Risk:** Solo developer might not have capacity for all MVP features.

**Mitigation:**
- Prioritize Crisis Mode first (highest impact, simplest tech)
- Foundation Mode second (proves awareness concept)
- Builder Mode skeleton last (just enough to show potential)
- Org Admin can be mostly manual/concierge for MVP
- If resources are limited, defer Builder Mode entirely (Crisis + Foundation is enough to prove concept)

**Risk:** Compliance requirements might be more complex than anticipated.

**Mitigation:**
- Start with GLBA, CCPA basics (privacy policy, security safeguards)
- WCAG 2.1 Level AA from day one (accessibility is non-negotiable)
- Defer SOC 2 Type II until post-MVP (if orgs require it)
- Hire compliance consultant before public launch ($1,000-3,000)

### MVP Success Criteria

**Users Say "This is Useful" When:**
- Crisis users complete one real action in under ~15 minutes
- Foundation users can say: "I finally see what's actually happening"
- No one feels trapped, judged, or punished for stopping

**Partners / Investors Say "This Has Potential" When:**
- Crisis Mode clearly solves a problem no one else touches
- Orgs can onboard without risk (privacy, licensing, optics)
- The three-mode architecture is visible, even if not fully built

**MVP Launch Readiness:**
- ✅ All four user journeys work end-to-end (even if simplified)
- ✅ All MVP deal-breakers implemented
- ✅ Accessibility validated (WCAG 2.1 Level AA)
- ✅ Performance targets met (Crisis Mode < 1.8s FCP)
- ✅ Security audit completed
- ✅ 3-5 pilot orgs onboarded and using the tool

---

## Functional Requirements

### FR Classification System

**FR-M (Must-Have MVP):** Cannot ship without - core product differentiator
**FR-S (Should-Have MVP):** Valuable for MVP, but deferrable if resources constrained
**FR-F (Future / Post-MVP):** Locked but inactive - explicitly deferred

**Critical Note:** This FR list is binding. Any feature not listed here will not exist in the final product unless explicitly added. FR-M requirements are non-negotiable for MVP launch.

### Crisis Intervention

- **FR-M1:** Users in crisis can access Crisis Mode without creating an account
- **FR-M2:** Users in crisis can answer the 72-hour question ("What happens in the next 72 hours if nothing changes?")
- **FR-M3:** System can process crisis responses through a deterministic decision tree
- **FR-M4:** System can categorize crisis type based on user response
- **FR-M5:** Users can receive actionable next steps (resource links, pre-filled forms, scripts)
- **FR-M6:** Users can access filtered resources based on crisis type and location
- **FR-S7:** System can display resource trust scores (from ResourcesHyft integration)
- **FR-M8:** Users can exit Crisis Mode at any time with explicit completion or assistance request options
- **FR-M9:** Crisis Mode can be completed on devices with limited scripting support (progressive enhancement)
- **FR-M10:** Crisis Mode can function with unreliable network connectivity (offline-capable)

### Financial Awareness (Foundation Mode)

- **FR-M11:** Users can log transactions manually (description, amount, date)
- **FR-M12:** Users can start using Foundation Mode without creating an account (anonymous mode)
- **FR-M13:** System can offer account creation after user logs multiple transactions
- **FR-M14:** Users can create an account to save progress across devices
- **FR-M15:** System can reveal spending patterns immediately after minimal transaction logging (simple aggregates)
- **FR-S16:** Users can focus on one spending category after logging sufficient transactions
- **FR-M17:** System can show aggregated spending patterns after extended logging period ("Reality Mirror")
- **FR-S18:** Users can define a small win during onboarding (optional)
- **FR-S19:** System can check in on small win progress after extended use
- **FR-F20:** Users can access weekly reflections (only if logging consistently)
- **FR-F21:** System can detect advanced patterns after extended use (e.g., spending variations by day of week)
- **FR-M22:** Users can export their transaction data (machine-readable format)
- **FR-M23:** Users can delete all their data with reason capture (confirmation and feedback collection)

### Goal Achievement (Builder Mode)

- **FR-M24:** Users can import Foundation Mode data when entering Builder Mode
- **FR-M25:** Users can set a single active goal (debt payoff, savings target, emergency fund)
- **FR-M26:** Users can compare two scenarios for their goal (e.g., different payment strategies)
- **FR-M27:** System can calculate basic forecasting for goal achievement timeline
- **FR-M28:** Users can track progress toward their goal (progress indication)
- **FR-M29:** Users can see how different actions affect goal timeline (scenario comparison)
- **FR-M30:** Users can adjust their goal plan (extend timeline, increase payments, pause goal)
- **FR-M31:** System can handle goal setbacks (user falls behind) with plan adjustment options
- **FR-M32:** System can acknowledge goal achievements (early completion, milestone reached)
- **FR-F33:** Users can add a second goal after achieving first goal (post-MVP)
- **FR-S34:** Users can downgrade from Builder Mode to Foundation Mode (if they no longer need advanced features)

### Organization Management

- **FR-M35:** Organization admins can create organization accounts
- **FR-M36:** Organization admins can assign licenses to clients via email invitation
- **FR-M37:** Organization admins can view client list (name, email, mode, status, last active)
- **FR-M38:** Organization admins can see client engagement metrics (activated/not activated, session frequency)
- **FR-M39:** Organization admins can view aggregated, anonymized outcomes data (if clients opt-in)
- **FR-F40:** Organization admins can generate automated engagement reports (PDF export)
- **FR-M41:** Organization admins can view billing information (usage, payment method, invoices)
- **FR-S42:** Organization admins can extend individual client licenses (duration options)
- **FR-S43:** System can notify organization admins before licenses expire (with renewal decision support)
- **FR-M44:** Organization admins can end sponsorship for individual clients (client enters transition period)
- **FR-M45:** System can track license lifecycle states (org-sponsored → discounted → standard pricing)

### User Account & Access

- **FR-M46:** Users can create accounts (email + password, minimal info required)
- **FR-M47:** Users can log in to their accounts
- **FR-M48:** Users can reset forgotten passwords
- **FR-M49:** Users can switch between modes based on behavior triggers (not time-based)
- **FR-M50:** Users can access their data from multiple devices (when logged in)
- **FR-M51:** System can migrate anonymous data to account (when user creates account after anonymous use)
- **FR-M52:** Users can delete their accounts (with data deletion and reason capture)

### Data Privacy & Security

- **FR-M53:** System can anonymize client data for organization admins (never show individual transactions, balances, goals)
- **FR-M54:** Users can opt in to share aggregated outcomes data with their organization
- **FR-M55:** System can enforce multi-tenant data isolation (row-level security)
- **FR-S56:** System can log all data access events (who accessed what, when, why)
- **FR-S57:** System can log all organization admin actions (license issuance, resource assignment, user management)
- **FR-M58:** System can export user data in machine-readable format (data portability)
- **FR-M59:** System can delete user data completely (not just soft-delete) for right to deletion compliance
- **FR-M60:** System can encrypt data at rest and in transit
- **FR-M61:** Organization admins can only see aggregated engagement data, never individual financial data

### Resource Management

- **FR-M62:** System can display resources filtered by crisis type and location
- **FR-S63:** System can display resource trust scores (from ResourcesHyft integration)
- **FR-M64:** System can show pre-filled forms and scripts for crisis actions
- **FR-M65:** System can provide direct contact information for programs (phone numbers, addresses)
- **FR-M66:** System can show application status checking guides (step-by-step instructions)
- **FR-M67:** System can provide timeline clarifications (why timelines vary for different programs)

### License & Billing Management

- **FR-M68:** System can track active clients (engagement-based definition)
- **FR-M69:** System can calculate billing based on active clients (base + overage pricing model)
- **FR-M70:** System can handle license transitions (org-sponsored → discount period → standard pricing)
- **FR-M71:** System can notify clients when license transitions occur (email notifications)
- **FR-M72:** System can support fixed-term licenses (duration options) and indefinite licenses
- **FR-S73:** System can handle license expiration and renewal workflows (automated)

### Mode Progression & Instrumentation

- **FR-M74:** Users can decline or defer mode progression offers without penalty, repeated prompts, or feature restriction
- **FR-S75:** System can track mode progression intent (not just outcomes)
- **FR-M76:** System can detect behavior-based triggers for Builder Mode (explicit feature request, consistent tracking, goal achievement, financial stability)
- **FR-M77:** System can offer Builder Mode when user meets behavior criteria (not time-based)
- **FR-F78:** System can track progression attempts (not just completions) for learning

### FR Summary by Tier

**Must-Have MVP (FR-M): 58 requirements**
- Core Crisis Mode functionality (FR-M1 through FR-M10)
- Foundation Mode awareness building (FR-M11 through FR-M23)
- Builder Mode skeleton (FR-M24 through FR-M32)
- Organization management basics (FR-M35 through FR-M45)
- User account and access (FR-M46 through FR-M52)
- Data privacy and security (FR-M53 through FR-M61)
- Resource management (FR-M62 through FR-M67)
- License and billing (FR-M68 through FR-M72)
- Mode progression (FR-M74, FR-M76, FR-M77)

**Should-Have MVP (FR-S): 8 requirements**
- Resource trust scores (FR-S7)
- Category focus (FR-S16)
- Small win tracking (FR-S18, FR-S19)
- Mode downgrade (FR-S34)
- License extension (FR-S42, FR-S43)
- Audit logging (FR-S56, FR-S57)
- Automated renewal (FR-S73)
- Progression intent tracking (FR-S75)

**Future / Post-MVP (FR-F): 3 requirements**
- Weekly reflections (FR-F20)
- Advanced pattern detection (FR-F21)
- Multiple goals (FR-F33)
- Progression attempt tracking (FR-F78)

**Total: 69 Functional Requirements** (58 MVP Must-Have, 8 MVP Should-Have, 3 Future)

---

## Non-Functional Requirements

### NFR Structure: Four Layers

**This NFR section is split into four layers to prevent requirement bloat:**

1. **Product Quality NFRs** (Binding for MVP) - True quality attributes that constrain design
2. **Architecture Constraints** (Binding, but not NFRs) - Technical decisions that guide implementation
3. **Operational & Governance Requirements** (Post-MVP) - Policies and procedures for scale
4. **Post-MVP Targets / Aspirations** (Future) - Quality goals for growth phase

**Only Product Quality NFRs are binding for MVP. Other layers inform planning but don't block launch.**

### Product Quality NFRs (MVP Binding)

**These are true quality attributes that constrain design decisions. ~25-30 requirements.**

#### Performance

- **NFR-P1:** Crisis Mode pages should typically load within 2 seconds on low-bandwidth mobile connections (target: <1.8s, tolerance for 3G variability)
- **NFR-P2:** Authenticated pages should typically become interactive within 4 seconds (target: <3.8s)
- **NFR-P3:** Transaction logging should complete quickly enough to feel immediate (<500ms typical)
- **NFR-P4:** Scenario calculations in Builder Mode should complete within 2 seconds
- **NFR-P5:** Performance must be validated on real 3G connections and older devices (Android 8+, iOS 14+)
  - **Validation Approach:** Use network throttling tools (Chrome DevTools, Lighthouse) for development testing
  - **Pre-Launch Validation:** Test on actual 3G devices before public launch (real-world validation required)

#### Security

- **NFR-S1:** All user data must be encrypted at rest
- **NFR-S2:** All data in transit must use TLS 1.3 minimum
- **NFR-S3:** Multi-tenant data isolation must be enforced at database level (row-level security)
- **NFR-S4:** API layer must enforce permissions on every query (never trust client-side checks alone)
- **NFR-S5:** Organization admins must only access aggregated, anonymized data (never individual financial data)
- **NFR-S6:** System must support right to deletion (actually delete data, not soft-delete)
- **NFR-S7:** System must support data portability (export all user data in machine-readable format)

#### Accessibility

- **NFR-A1:** System must meet WCAG 2.1 Level AA standards
- **NFR-A2:** All functionality must be accessible via keyboard (no mouse-only interactions)
- **NFR-A3:** System must be compatible with screen readers (VoiceOver, NVDA, JAWS)
- **NFR-A4:** Content must reflow at 400% zoom without horizontal scrolling
- **NFR-A5:** Color contrast must meet 4.5:1 for normal text, 3:1 for large text
- **NFR-A6:** Information must not be conveyed by color alone (use icons + color)
- **NFR-A7:** Error messages must be clear and actionable (not technical or blaming)

#### Privacy & Consent

- **NFR-PR1:** Users must be able to opt in to share aggregated outcomes data (explicit consent)
- **NFR-PR2:** System must support consent management (GDPR compliance if EU users)
- **NFR-PR3:** System must support opt-out mechanisms (CCPA compliance if CA users)
- **NFR-PR4:** Privacy policy must comply with GLBA requirements

#### Graceful Degradation

- **NFR-GD1:** Crisis Mode must work on devices with limited scripting support (progressive enhancement)
- **NFR-GD2:** System must gracefully degrade for unsupported browsers (show simplified version, don't block access)
- **NFR-GD3:** System must handle network failures gracefully (offline-capable where feasible)
- **NFR-GD4:** System must handle API failures gracefully (ResourcesHyft failures don't break Crisis Mode)

#### Mobile Viability

- **NFR-MV1:** All features must be fully functional on mobile devices (320px width minimum)
- **NFR-MV2:** Touch targets must be minimum 44x44px
- **NFR-MV3:** Navigation must be thumb-friendly on mobile (bottom navigation)

**Total Product Quality NFRs: 25 requirements (MVP Binding)**

### Architecture Constraints (Binding, But Not NFRs)

**These are technical decisions that guide implementation. They constrain HOW, not quality attributes.**

#### Crisis Mode Architecture

- **AC1:** Crisis Mode must be pre-rendered static HTML (not server-rendered, not SPA)
- **AC2:** Crisis Mode must be deployable independently from authenticated services (isolated deployment)
- **AC3:** Crisis Mode decision tree must run client-side (no server calls required)

#### Progressive Enhancement

- **AC4:** System must implement progressive enhancement (HTML → CSS → JS → Advanced features)
- **AC5:** Core functionality must work without JavaScript (Crisis Mode forms submit to server)
- **AC6:** Enhanced features activate when JavaScript is available (validation, dynamic filtering, client-side calculations)

#### Offline Support

- **AC7:** Crisis Mode must be cacheable for offline access (Service Worker)
- **AC8:** Transaction logging must persist locally when offline (IndexedDB)
- **AC9:** Offline data must sync when connection is restored (background sync)

#### Browser Support

- **AC10:** System must support browsers from last 3-4 years (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **AC11:** System must support Android 8+ and iOS 14+
- **AC12:** System must transpile modern JavaScript for older browsers (Vite handles this)

#### Scalability Architecture

- **AC13:** System must support horizontal scaling without architectural redesign (no single-server assumptions)

### Operational & Governance Requirements (Post-MVP)

**These are policies and procedures for scale. Not binding for MVP launch.**

#### Security Operations

- **OG1:** Annual penetration testing (post-MVP, when revenue justifies cost)
- **OG2:** SOC 2 Type II certification (for enterprise org customers, post-MVP)
- **OG3:** 7-year audit log retention (financial data compliance, post-MVP when regulated revenue)
- **OG4:** Multi-factor authentication (MFA) for organization admin accounts (post-MVP)

#### Compliance Operations

- **OG5:** VPAT documentation for enterprise customers (voluntary, post-MVP)
- **OG6:** Incident response plan with 72-hour breach notification capability (documented, tested, post-MVP)

#### Monitoring & Reliability

- **OG7:** 99.9% uptime SLA for Crisis Mode (enterprise-grade reliability, post-MVP)
- **OG8:** 99.5% uptime SLA for authenticated services (post-MVP)
- **OG9:** Monitoring and alerting infrastructure (post-MVP)

### Post-MVP Targets / Aspirations (Future)

**These are quality goals for growth phase. Inform planning but don't block MVP.**

#### Scalability Targets

- **PMT1:** System should support 10x user growth without architectural redesign (horizontal scaling)
- **PMT2:** System should handle 1,000 concurrent authenticated users (capacity planning target)
- **PMT3:** System should handle 10,000 concurrent Crisis Mode users (read-heavy, static content)
- **PMT4:** System architecture should support multi-region deployment (EU data center for GDPR)

#### Advanced Accessibility

- **PMT5:** Voice-to-text input in Crisis Mode (if browser supports it) - **Explicitly deferred to post-MVP**
  - This is a functional feature, not a quality attribute
  - Will be added as Functional Requirement in post-MVP phase
  - Not required for MVP launch
- **PMT6:** Advanced pattern detection after extended use (Foundation Mode analytics)

#### Integration Targets

- **PMT7:** ResourcesHyft API integration (automated, replaces manual curation)
- **PMT8:** Bank linking integration (Plaid, Yodlee) - optional, user choice
- **PMT9:** Export to other financial tools (YNAB, Monarch) - data portability

### Design Principles & Ethics Charter

**These are normative design principles that guide both FRs and NFRs. They are values, not testable requirements.**

**Critical Note:** These principles guide UX design decisions and are referenced by Functional Requirements, but are **not directly testable as NFRs**. They represent core values that inform all design and implementation decisions.

#### Trauma-Informed Design Principles

- **DP1:** All user-facing language must avoid shame, judgment, or moralizing
- **DP2:** Users must be able to exit at any time without penalty or repeated prompts
- **DP3:** Error messages must be supportive and actionable, not technical or blaming
- **DP4:** System must provide clear "what happens next" guidance at every step
- **DP5:** System must not overwhelm users with too many options at once (progressive disclosure)
- **DP6:** Complex features must be revealed gradually based on user readiness

**These principles are binding values that inform all design decisions, but validation happens through user research and qualitative feedback, not quantitative NFR testing.**

### NFR Summary

**Product Quality NFRs (MVP Binding): 25 requirements**
- Performance: 5 requirements (directional targets, not contractual)
- Security: 7 requirements (core protections)
- Accessibility: 7 requirements (WCAG 2.1 Level AA)
- Privacy & Consent: 4 requirements (legal obligations)
- Graceful Degradation: 4 requirements (resilience patterns)
- Mobile Viability: 3 requirements (mobile-first)

**Architecture Constraints: 13 requirements** (binding, but not quality attributes)

**Operational & Governance: 9 requirements** (post-MVP policies)

**Post-MVP Targets: 9 requirements** (future aspirations)

**Design Principles: 6 principles** (normative values, not testable NFRs)

---
