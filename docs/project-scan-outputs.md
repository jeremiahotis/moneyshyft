# Project Scan Template Outputs

## project_structure
- repository_type: monorepo
- parts_count: 2
- parts:
  - frontend (web)
  - src (backend)

## project_parts_metadata
- part_id: frontend
  root_path: /Users/jeremiahotis/moneyshyft/apps/app
  project_type_id: web
  display_name: Web
- part_id: src
  root_path: /Users/jeremiahotis/moneyshyft/apps/api
  project_type_id: backend
  display_name: Backend

Note: apps/app/ and apps/api/ are separate but tightly coupled; include integration touchpoints (API contracts, shared env vars).

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
- Base URL: /api/v1 (apps/app/src/services/api.ts)
- Primary usage: frontend stores and views call REST endpoints for auth, budgets, accounts, transactions, categories, goals, debts, assignments, recurring, extra money, settings.
- Detailed list: docs/api-contracts-frontend.md

## api_contracts_src
- Base URL: /api/v1 (mounted in apps/api/src/app.ts)
- Route groups: auth, accounts, transactions, splits, categories, goals, budgets, income, debts, assignments, households, recurring-transactions, extra-money, settings.
- Detailed list: docs/api-contracts-src.md

## data_models_frontend
- Source: apps/app/src/types/index.ts
- Detailed list: docs/data-models-frontend.md

## data_models_src
- Source: apps/api/src/migrations/*.ts
- Detailed list: docs/data-models-src.md

## state_management_patterns_frontend
- Pinia stores in apps/app/src/stores (defineStore composables)\n  - accounts, assignments, auth, budgets, categories, celebration, debts, extraMoney, goals, income, recurring, transactions, undo, wizard\n- API client in apps/app/src/services/api.ts (axios instance + refresh handling)\n- Router in apps/app/src/router/index.ts (route-level navigation)

## ui_component_inventory_frontend
- Views: apps/app/src/views (Auth, Budget, Accounts, Dashboard, Transactions, Goals, Debts, Settings, Extra Money)\n- Components by domain:\n  - budget: AddCategoryModal, AssignmentModal, BudgetSection, BudgetMonthSelector, TransferModal, etc.\n  - accounts: AccountCard, AccountBalanceAssignmentModal, CreditCardStatusCard\n  - transactions: RecurringTransactionModal, SplitTransactionModal, TransactionSplitIndicator\n  - goals: CreateGoalModal, ContributionModal, GoalDetailModal\n  - debts: CreateDebtModal, EditDebtModal, DebtDetailModal\n  - extraMoney: ExtraMoneyModal\n  - settings: ExtraMoneyPlanSettings\n  - wizard: Wizard* steps (welcome, income, accounts, housing, debt, utilities, extra money, review)\n  - layout/common: AppHeader, AppLayout, AppMobileNav, StatCard, InfoTooltip, CelebrationToast, UndoToast

## comprehensive_analysis_frontend
- Config: apps/app/vite.config.ts, apps/app/tailwind.config.js, apps/app/postcss.config.js, apps/app/tsconfig.json\n- Entry points: apps/app/src/main.ts, apps/app/src/App.vue, apps/app/index.html\n- Shared code: apps/app/src/services/api.ts, apps/app/src/utils/dateUtils.ts, apps/app/src/types/index.ts\n- Auth patterns: cookie-based auth via axios with refresh; auth store handles login/signup/logout\n- Localization: no i18n directories detected\n- CI/CD: no frontend-specific CI config found\n- Assets: apps/app/src/assets/main.css, apps/app/public/sw.js

## comprehensive_analysis_src
- Config: apps/api/.env.example, apps/api/knexfile.js, apps/api/src/config/database.ts, apps/api/src/config/knex.ts\n- Entry points: apps/api/src/server.ts, apps/api/src/app.ts\n- Auth patterns: JWT + cookies, middleware/auth.ts, validators in apps/api/src/validators\n- Shared code: apps/api/src/services/*, apps/api/src/utils/logger.ts, apps/api/src/utils/jwt.ts\n- Database: PostgreSQL via knex + migrations in apps/api/src/migrations\n- Deployment configs: apps/api/Dockerfile*, docker-compose.yml, nginx/nginx.conf\n- Localization: none detected\n- CI/CD: no CI config files found

## technology_stack
- part_id: frontend
  Category: Frontend Framework
  Technology: Vue 3
  Version: ^3.5.13
  Justification: apps/app/package.json
- part_id: frontend
  Category: Build Tool
  Technology: Vite
  Version: ^5.0.11
  Justification: apps/app/package.json
- part_id: frontend
  Category: State Management
  Technology: Pinia
  Version: ^2.3.0
  Justification: apps/app/package.json
- part_id: frontend
  Category: Routing
  Technology: Vue Router
  Version: ^4.5.0
  Justification: apps/app/package.json
- part_id: frontend
  Category: CSS Framework
  Technology: Tailwind CSS
  Version: ^3.4.1
  Justification: apps/app/package.json
- part_id: frontend
  Category: Language
  Technology: TypeScript
  Version: ^5.6.0
  Justification: apps/app/package.json

- part_id: src
  Category: Backend Framework
  Technology: Express
  Version: ^4.18.2
  Justification: apps/api/package.json
- part_id: src
  Category: Runtime
  Technology: Node.js
  Version: >=20.0.0
  Justification: apps/api/package.json engines
- part_id: src
  Category: Database
  Technology: PostgreSQL
  Version: ^8.11.3 (pg client)
  Justification: apps/api/package.json
- part_id: src
  Category: Query Builder
  Technology: Knex
  Version: ^3.0.1
  Justification: apps/api/package.json
- part_id: src
  Category: Auth
  Technology: JWT
  Version: ^9.0.2
  Justification: apps/api/package.json
- part_id: src
  Category: Validation
  Technology: Joi
  Version: ^17.11.0
  Justification: apps/api/package.json

## architecture_patterns
- part_id: frontend
  architecture_pattern: component-based SPA (Vue + Vite)
- part_id: src
  architecture_pattern: service/API-centric Express app with middleware pipeline
