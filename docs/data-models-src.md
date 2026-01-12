# Data Models - Backend (src)

## Core Entities
- `households`
- `users` (belongs to household)
- `household_invitations` (invited_by_user_id, household_id)
- `household_settings` (per-household settings, e.g., extra_money_threshold)

## Accounts & Transactions
- `accounts` (household_id, balances, account type, credit card fields)
- `transactions` (account_id, category_id, optional debt_id, split relationships)

## Categories & Budgeting
- `category_sections` (grouping for categories; type + sort)
- `categories` (belongs to section; optional parent_category_id)
- `budget_months` (household_id + month)
- `budget_allocations` (month allocations at category or section level)
- `income_sources` (planned income with frequency)
- `income_assignments` (envelope-style allocations for income)
- `assignment_transfers` (track reassignment of allocations)
- `account_balance_assignments` (link account balances to budget allocations)

## Goals
- `goals` (optional category link)
- `goal_contributions` (per-goal contributions)

## Debts
- `debts`
- `debt_payments`
- `debt_payment_plans`
- `debt_payment_schedule`

## Recurring Transactions
- `recurring_transactions`
- `recurring_transaction_instances`
- `user_preferences` (recurring-related preferences)

## Extra Money Plan
- `extra_money_entries`
- `extra_money_assignments`
- `extra_money_preferences`
- `extra_money_goal_allocations`

## Analytics
- `analytics_events`

## Notes
- Primary schema defined in `src/src/migrations/001_initial_schema.ts`; additional tables added in later numbered migrations.
- Foreign key relationships are enforced at the database level via Knex migrations.
