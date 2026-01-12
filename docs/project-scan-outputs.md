# Project Scan Template Outputs

## project_structure
- repository_type: monorepo
- parts_count: 2
- parts:
  - frontend (web)
  - src (backend)

## project_parts_metadata
- part_id: frontend
  root_path: /Users/jeremiahotis/moneyshyft/frontend
  project_type_id: web
  display_name: Web
- part_id: src
  root_path: /Users/jeremiahotis/moneyshyft/src
  project_type_id: backend
  display_name: Backend

Note: frontend/ and src/ are separate but tightly coupled; include integration touchpoints (API contracts, shared env vars).

Persona reactions:
- Developer Dana: “Separate parts makes onboarding clearer; I know where to start.”
- Product Priya: “I need cross-linking between UI features and API endpoints.”
- QA Quinn: “Split docs help but only if shared test/dev commands are obvious.”

Rationale: Classifying as monorepo with two parts allows separate architecture, component, and development docs while preserving integration context for API contracts and shared environment configuration.

## existing_documentation_inventory
- SETUP.md (setup)
- PRODUCTION_DEPLOYMENT_GUIDE.md (deployment)
- DEPLOYMENT_CHECKLIST.md (deployment checklist)
- RELEASE_NOTES.md (release notes)
- RELEASE_TEXT_v0.3.0.md (release notes)
- RELEASE_TEXT_v0.3.1.md (release notes)
- RELEASE_TEXT_v0.3.2.md (release notes)
- RELEASE_TEXT_v0.3.3.md (release notes)
- RELEASE_TEXT_v0.3.4.md (release notes)
- RELEASE_TEXT_v0.3.5.md (release notes)
- RELEASE_TEXT_v0.3.6.md (release notes)
- ROADMAP.md (roadmap)
- BACKLOG.md (backlog)
- AGENTS.md (agent instructions)
- CLAUDE.md (assistant notes)

## user_provided_context
- none

## api_contracts_frontend
- Base URL: /api/v1 (frontend/src/services/api.ts)
- Primary usage: frontend stores and views call REST endpoints for auth, budgets, accounts, transactions, categories, goals, debts, assignments, recurring, extra money, settings.
- Detailed list: docs/api-contracts-frontend.md

## api_contracts_src
- Base URL: /api/v1 (mounted in src/src/app.ts)
- Route groups: auth, accounts, transactions, splits, categories, goals, budgets, income, debts, assignments, households, recurring-transactions, extra-money, settings.
- Detailed list: docs/api-contracts-src.md

## data_models_frontend
- Source: frontend/src/types/index.ts
- Detailed list: docs/data-models-frontend.md

## data_models_src
- Source: src/src/migrations/*.ts
- Detailed list: docs/data-models-src.md

## state_management_patterns_frontend
- Pinia stores in frontend/src/stores (defineStore composables)\n  - accounts, assignments, auth, budgets, categories, celebration, debts, extraMoney, goals, income, recurring, transactions, undo, wizard\n- API client in frontend/src/services/api.ts (axios instance + refresh handling)\n- Router in frontend/src/router/index.ts (route-level navigation)

## ui_component_inventory_frontend
- Views: frontend/src/views (Auth, Budget, Accounts, Dashboard, Transactions, Goals, Debts, Settings, Extra Money)\n- Components by domain:\n  - budget: AddCategoryModal, AssignmentModal, BudgetSection, BudgetMonthSelector, TransferModal, etc.\n  - accounts: AccountCard, AccountBalanceAssignmentModal, CreditCardStatusCard\n  - transactions: RecurringTransactionModal, SplitTransactionModal, TransactionSplitIndicator\n  - goals: CreateGoalModal, ContributionModal, GoalDetailModal\n  - debts: CreateDebtModal, EditDebtModal, DebtDetailModal\n  - extraMoney: ExtraMoneyModal\n  - settings: ExtraMoneyPlanSettings\n  - wizard: Wizard* steps (welcome, income, accounts, housing, debt, utilities, extra money, review)\n  - layout/common: AppHeader, AppLayout, AppMobileNav, StatCard, InfoTooltip, CelebrationToast, UndoToast

## comprehensive_analysis_frontend
- Config: frontend/vite.config.ts, frontend/tailwind.config.js, frontend/postcss.config.js, frontend/tsconfig.json\n- Entry points: frontend/src/main.ts, frontend/src/App.vue, frontend/index.html\n- Shared code: frontend/src/services/api.ts, frontend/src/utils/dateUtils.ts, frontend/src/types/index.ts\n- Auth patterns: cookie-based auth via axios with refresh; auth store handles login/signup/logout\n- Localization: no i18n directories detected\n- CI/CD: no frontend-specific CI config found\n- Assets: frontend/src/assets/main.css, frontend/public/sw.js

## comprehensive_analysis_src
- Config: src/.env.example, src/knexfile.js, src/src/config/database.ts, src/src/config/knex.ts\n- Entry points: src/src/server.ts, src/src/app.ts\n- Auth patterns: JWT + cookies, middleware/auth.ts, validators in src/src/validators\n- Shared code: src/src/services/*, src/src/utils/logger.ts, src/src/utils/jwt.ts\n- Database: PostgreSQL via knex + migrations in src/src/migrations\n- Deployment configs: src/Dockerfile*, docker-compose.yml, nginx/nginx.conf\n- Localization: none detected\n- CI/CD: no CI config files found

## technology_stack
- part_id: frontend
  Category: Frontend Framework
  Technology: Vue 3
  Version: ^3.5.13
  Justification: frontend/package.json
- part_id: frontend
  Category: Build Tool
  Technology: Vite
  Version: ^5.0.11
  Justification: frontend/package.json
- part_id: frontend
  Category: State Management
  Technology: Pinia
  Version: ^2.3.0
  Justification: frontend/package.json
- part_id: frontend
  Category: Routing
  Technology: Vue Router
  Version: ^4.5.0
  Justification: frontend/package.json
- part_id: frontend
  Category: CSS Framework
  Technology: Tailwind CSS
  Version: ^3.4.1
  Justification: frontend/package.json
- part_id: frontend
  Category: Language
  Technology: TypeScript
  Version: ^5.6.0
  Justification: frontend/package.json

- part_id: src
  Category: Backend Framework
  Technology: Express
  Version: ^4.18.2
  Justification: src/package.json
- part_id: src
  Category: Runtime
  Technology: Node.js
  Version: >=20.0.0
  Justification: src/package.json engines
- part_id: src
  Category: Database
  Technology: PostgreSQL
  Version: ^8.11.3 (pg client)
  Justification: src/package.json
- part_id: src
  Category: Query Builder
  Technology: Knex
  Version: ^3.0.1
  Justification: src/package.json
- part_id: src
  Category: Auth
  Technology: JWT
  Version: ^9.0.2
  Justification: src/package.json
- part_id: src
  Category: Validation
  Technology: Joi
  Version: ^17.11.0
  Justification: src/package.json

## architecture_patterns
- part_id: frontend
  architecture_pattern: component-based SPA (Vue + Vite)
- part_id: src
  architecture_pattern: service/API-centric Express app with middleware pipeline
