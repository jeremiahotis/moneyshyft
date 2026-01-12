# API Contracts - Backend (src)

Base URL: `/api/v1`

## Response Conventions
- Many endpoints respond with `{ success: true, data: ... }`.
- Errors usually respond with `{ error: "message" }` and 4xx/5xx status codes.

---

## Auth

### POST `/auth/signup`
**Request Body**
```
{
  email: string (email),
  password: string (min 8),
  firstName: string,
  lastName: string,
  householdName?: string,
  invitationCode?: string (6 chars, uppercase)
}
```
**Response 201**
```
{
  message: string,
  user: object,
  invitationCode?: string
}
```

### POST `/auth/login`
**Request Body**
```
{
  email: string (email),
  password: string,
  rememberMe?: boolean
}
```
**Response 200**
```
{
  message: string,
  user: object
}
```

### POST `/auth/logout`
**Response 200**
```
{ message: string }
```

### POST `/auth/refresh`
**Response 200**
```
{ message: string }
```

### GET `/auth/me` (auth)
**Response 200**
```
{ user: object }
```

---

## Accounts (auth)

### GET `/accounts`
**Response 200**
```
{ success: true, data: Account[] }
```

### GET `/accounts/:id`
**Response 200**
```
{ success: true, data: Account }
```

### POST `/accounts`
**Request Body**
```
{
  name: string,
  type: 'checking' | 'savings' | 'credit' | 'cash' | 'investment',
  starting_balance?: number,
  is_active?: boolean
}
```
**Response 201**
```
{ success: true, data: Account }
```

### PATCH `/accounts/:id`
**Request Body**
```
{
  name?: string,
  is_active?: boolean
}
```
**Response 200**
```
{ success: true, data: Account }
```

### DELETE `/accounts/:id`
**Response 200**
```
{ success: true, message: string }
```

### GET `/accounts/:id/credit-card-status`
**Response 200**
```
{ success: true, data: CreditCardStatus }
```

---

## Transactions (auth)

### GET `/transactions`
**Query Params**
```
account_id?, category_id?, start_date?, end_date?, limit?, offset?
```
**Response 200**
```
{ success: true, data: Transaction[], count: number }
```

### GET `/transactions/:id`
**Response 200**
```
{ success: true, data: Transaction }
```

### POST `/transactions`
**Request Body**
```
{
  account_id: uuid,
  category_id?: uuid | null,
  payee: string,
  amount: number,
  transaction_date: ISO date,
  notes?: string | null,
  is_cleared?: boolean,
  is_reconciled?: boolean
}
```
**Response 201**
```
{ success: true, data: Transaction }
```

### PATCH `/transactions/:id`
**Request Body**
```
{
  category_id?: uuid | null,
  payee?: string,
  amount?: number,
  transaction_date?: ISO date,
  notes?: string | null,
  is_cleared?: boolean,
  is_reconciled?: boolean
}
```
**Response 200**
```
{ success: true, data: Transaction }
```

### DELETE `/transactions/:id`
**Response 200**
```
{ success: true, message: string }
```

### PATCH `/transactions/:id/clear`
**Response 200**
```
{ success: true, data: Transaction }
```

### PATCH `/transactions/:id/reconcile`
**Response 200**
```
{ success: true, data: Transaction }
```

---

## Transaction Splits (auth, mounted under `/transactions`)

### POST `/transactions/:id/split`
**Request Body**
```
{
  splits: [
    { category_id: uuid, amount: number (non-zero), notes?: string | null }
  ] (min 2)
}
```
**Response 201**
```
{ success: true, data: { parent: Transaction, splits: Transaction[] } }
```

### GET `/transactions/:id/splits`
**Response 200**
```
{ success: true, data: { parent: Transaction, splits: Transaction[] } }
```

### PATCH `/transactions/:id/splits`
**Request Body**
```
{
  splits: [
    { category_id: uuid, amount: number (non-zero), notes?: string | null }
  ] (min 2)
}
```
**Response 200**
```
{ success: true, data: { parent: Transaction, splits: Transaction[] } }
```

### DELETE `/transactions/:id/split`
**Request Body**
```
{ category_id?: uuid | null }
```
**Response 200**
```
{ success: true, data: Transaction }
```

---

## Categories & Sections (auth)

### GET `/categories/sections`
**Response 200**
```
{ success: true, data: CategorySection[] }
```

### POST `/categories/sections`
**Request Body**
```
{ name: string, type: 'fixed' | 'flexible' | 'debt', sort_order?: number }
```
**Response 201**
```
{ success: true, data: CategorySection }
```

### PATCH `/categories/sections/:id`
**Request Body**
```
{ name?: string, type?: 'fixed' | 'flexible' | 'debt', sort_order?: number }
```
**Response 200**
```
{ success: true, data: CategorySection }
```

### DELETE `/categories/sections/:id`
**Response 200**
```
{ success: true, message: string }
```

### GET `/categories`
**Response 200**
```
{ success: true, data: Category[] }
```

### GET `/categories/:id`
**Response 200**
```
{ success: true, data: Category }
```

### POST `/categories`
**Request Body**
```
{
  section_id: uuid,
  name: string,
  parent_category_id?: uuid | null,
  color?: string | null,
  icon?: string | null,
  sort_order?: number
}
```
**Response 201**
```
{ success: true, data: Category }
```

### PATCH `/categories/:id`
**Request Body**
```
{
  name?: string,
  parent_category_id?: uuid | null,
  color?: string | null,
  icon?: string | null,
  sort_order?: number
}
```
**Response 200**
```
{ success: true, data: Category }
```

### DELETE `/categories/:id`
**Response 200**
```
{ success: true, message: string }
```

---

## Goals (auth)

### GET `/goals`
**Response 200**
```
{ success: true, data: Goal[] }
```

### GET `/goals/:id`
**Response 200**
```
{ success: true, data: Goal }
```

### POST `/goals`
**Request Body**
```
{
  name: string,
  description?: string | null,
  target_amount: number,
  current_amount?: number,
  target_date?: ISO date | null,
  category_id?: uuid | null
}
```
**Response 201**
```
{ success: true, data: Goal }
```

### PATCH `/goals/:id`
**Request Body**
```
{
  name?: string,
  description?: string | null,
  target_amount?: number,
  current_amount?: number,
  target_date?: ISO date | null,
  category_id?: uuid | null,
  is_completed?: boolean
}
```
**Response 200**
```
{ success: true, data: Goal }
```

### DELETE `/goals/:id`
**Response 200**
```
{ success: true, message: string }
```

### POST `/goals/:id/contributions`
**Request Body**
```
{
  amount: number,
  contribution_date?: ISO date,
  notes?: string | null,
  transaction_id?: uuid | null
}
```
**Response 201**
```
{ success: true, data: GoalContribution }
```

### GET `/goals/:id/contributions`
**Response 200**
```
{ success: true, data: GoalContribution[] }
```

---

## Budgets (auth + household)

### GET `/budgets/:month/summary`
**Response 200**
```
{ success: true, data: BudgetSummary }
```

### PUT `/budgets/:month/notes`
**Request Body**
```
{ notes?: string | null }
```
**Response 200**
```
{ success: true, data: BudgetMonth }
```

### GET `/budgets/:month/allocations`
**Response 200**
```
{ success: true, data: BudgetAllocation[] }
```

### POST `/budgets/:month/allocations`
**Request Body**
```
{
  category_id?: uuid,
  section_id?: uuid,
  allocated_amount: number,
  rollup_mode?: boolean,
  notes?: string | null
}
```
**Response 201**
```
{ success: true, data: BudgetAllocation }
```

### POST `/budgets/:month/allocations/bulk`
**Request Body**
```
{ allocations: Array<{ category_id?: uuid, section_id?: uuid, allocated_amount: number, rollup_mode?: boolean, notes?: string | null }> }
```
**Response 201**
```
{ success: true, data: BudgetAllocation[], message: string }
```

### DELETE `/budgets/allocations/:id`
**Response 200**
```
{ success: true, message: string }
```

### POST `/budgets/assign-account-balance`
**Request Body**
```
{ category_id: uuid, account_id?: uuid | null, amount: number }
```
**Response 201**
```
{ success: true, data: AccountBalanceAssignment, message: string }
```

---

## Income (auth)

### GET `/income`
**Response 200**
```
{ success: true, data: IncomeSource[] }
```

### POST `/income`
**Request Body**
```
{
  name: string,
  monthly_amount: number,
  frequency?: 'hourly' | 'weekly' | 'biweekly' | 'semimonthly' | 'monthly' | 'annually',
  expected_day_of_month?: number | null,
  hours_per_week?: number | null,
  last_payment_date?: ISO date | null,
  is_active?: boolean,
  notes?: string | null
}
```
**Response 201**
```
{ success: true, data: IncomeSource }
```

### PATCH `/income/:id`
**Request Body**
```
{
  name?: string,
  monthly_amount?: number,
  frequency?: 'hourly' | 'weekly' | 'biweekly' | 'semimonthly' | 'monthly' | 'annually' | null,
  expected_day_of_month?: number | null,
  hours_per_week?: number | null,
  last_payment_date?: ISO date | null,
  is_active?: boolean,
  sort_order?: number,
  notes?: string | null
}
```
**Response 200**
```
{ success: true, data: IncomeSource }
```

### DELETE `/income/:id`
**Response 200**
```
{ success: true, message: string }
```

---

## Debts (auth)

### GET `/debts`
**Response 200**
```
{ success: true, data: { debts: Debt[] } }
```

### GET `/debts/:id`
**Response 200**
```
{ success: true, data: Debt }
```

### POST `/debts`
**Request Body**
```
{
  name: string,
  debt_type: 'credit_card' | 'auto_loan' | 'student_loan' | 'personal_loan' | 'medical' | 'other',
  current_balance: number,
  original_balance?: number,
  interest_rate: number,
  minimum_payment: number,
  category_id?: uuid | null,
  notes?: string | null
}
```
**Response 201**
```
{ success: true, data: Debt }
```

### PATCH `/debts/:id`
**Request Body**
```
{
  name?: string,
  debt_type?: string,
  current_balance?: number,
  interest_rate?: number,
  minimum_payment?: number,
  category_id?: uuid | null,
  sort_order?: number,
  notes?: string | null
}
```
**Response 200**
```
{ success: true, data: Debt }
```

### DELETE `/debts/:id`
**Response 200**
```
{ success: true, message: string }
```

### POST `/debts/:id/payments`
**Request Body**
```
{ amount: number, payment_date: ISO date, notes?: string | null }
```
**Response 201**
```
{ success: true, data: DebtPayment }
```

### GET `/debts/:id/payments`
**Response 200**
```
{ success: true, data: DebtPayment[] }
```

### POST `/debts/calculate-payoff`
**Request Body**
```
{ monthly_payment_budget: number }
```
**Response 200**
```
{ success: true, data: StrategyComparison }
```

### POST `/debts/commit-plan`
**Request Body**
```
{ strategy: 'snowball' | 'avalanche', monthly_payment_budget: number }
```
**Response 200**
```
{ success: true, data: DebtPaymentPlan }
```

### GET `/debts/active-plan`
**Response 200**
```
{ success: true, data: DebtPaymentPlan | null }
```

---

## Assignments (auth)

### GET `/assignments/:month`
**Response 200**
```
{ success: true, data: IncomeAssignment[] }
```

### POST `/assignments`
**Request Body**
```
{
  income_transaction_id: uuid,
  category_id?: uuid,
  section_id?: uuid,
  amount: number,
  notes?: string | null
}
```
**Response 201**
```
{ success: true, data: IncomeAssignment }
```

### POST `/assignments/auto`
**Request Body**
```
{ income_transaction_id: uuid }
```
**Response 200**
```
{ success: true, data: AutoAssignmentResult }
```

### DELETE `/assignments/:id`
**Response 200**
```
{ success: true, message: string }
```

### GET `/assignments/transaction/:transactionId`
**Response 200**
```
{ success: true, data: IncomeAssignment[] }
```

### POST `/assignments/transfer`
**Request Body**
```
{ from_assignment_id: uuid, to_category_id?: uuid, to_section_id?: uuid, amount: number }
```
**Response 200**
```
{ success: true, data: AssignmentTransfer }
```

### POST `/assignments/assign-to-categories`
**Request Body**
```
{ month: 'YYYY-MM', assignments: Array<{ category_id?: uuid, section_id?: uuid, amount: number }> }
```
**Response 200**
```
{ success: true, data: IncomeAssignment[] }
```

### POST `/assignments/auto-assign-all`
**Request Body**
```
{ month: 'YYYY-MM' }
```
**Response 200**
```
{ success: true, data: IncomeAssignment[] }
```

---

## Households (auth + household)

### GET `/households/current`
**Response 200**
```
{
  success: true,
  id: uuid,
  name: string,
  invitation_code: string,
  member_count: number,
  setup_wizard_completed: boolean,
  setup_wizard_completed_at: timestamp | null,
  created_at: timestamp
}
```

### PATCH `/households/setup-wizard`
**Response 200**
```
{ success: true, message: string }
```

### POST `/households/reset`
**Request Body**
```
{ confirm: 'RESET', resetToken?: string }
```
**Response 200**
```
{ success: true, message: string, householdId: uuid }
```

### GET `/households/members`
**Response 200**
```
{ success: true, data: Array<{ id, email, firstName, lastName, fullName, role, joinedAt }> }
```

---

## Recurring Transactions (auth)

### POST `/recurring-transactions`
**Request Body**
```
{
  account_id: uuid,
  category_id?: uuid | null,
  payee: string,
  amount: number (non-zero),
  notes?: string | null,
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly',
  start_date: ISO date,
  end_date?: ISO date | null,
  auto_post?: boolean,
  skip_weekends?: boolean,
  advance_notice_days?: number
}
```
**Response 201**
```
{ success: true, data: RecurringTransaction }
```

### GET `/recurring-transactions`
**Response 200**
```
{ success: true, data: RecurringTransaction[] }
```

### GET `/recurring-transactions/:id`
**Response 200**
```
{ success: true, data: RecurringTransaction }
```

### PATCH `/recurring-transactions/:id`
**Request Body**
```
{ account_id?, category_id?, payee?, amount?, notes?, frequency?, auto_post?, skip_weekends?, advance_notice_days? }
```
**Response 200**
```
{ success: true, data: RecurringTransaction }
```

### DELETE `/recurring-transactions/:id`
**Response 200**
```
{ success: true, message: string }
```

### POST `/recurring-transactions/:id/toggle-auto-post`
**Response 200**
```
{ success: true, data: RecurringTransaction }
```

### POST `/recurring-transactions/:id/generate-instances`
**Request Body**
```
{ days_ahead?: number }
```
**Response 200**
```
{ success: true, message: string }
```

### GET `/recurring-transactions/instances/pending`
**Query Params**
```
days?
```
**Response 200**
```
{ success: true, data: RecurringTransactionInstance[] }
```

### GET `/recurring-transactions/instances/all`
**Query Params**
```
status?
```
**Response 200**
```
{ success: true, data: RecurringTransactionInstance[] }
```

### POST `/recurring-transactions/instances/:id/approve`
**Response 200**
```
{ success: true, data: RecurringTransactionInstance }
```

### POST `/recurring-transactions/instances/:id/skip`
**Request Body**
```
{ reason?: string | null }
```
**Response 200**
```
{ success: true, data: RecurringTransactionInstance }
```

### POST `/recurring-transactions/instances/:id/post`
**Response 200**
```
{ success: true, data: RecurringTransactionInstance }
```

### PATCH `/recurring-transactions/instances/:id`
**Request Body**
```
{ amount?, category_id?, payee?, notes? }
```
**Response 200**
```
{ success: true, data: RecurringTransactionInstance }
```

---

## Extra Money (auth + household)

### GET `/extra-money`
**Query Params**
```
status? ('pending' | 'assigned' | 'ignored')
```
**Response 200**
```
{ success: true, data: ExtraMoneyEntry[] }
```

### GET `/extra-money/pending`
**Response 200**
```
{ success: true, data: ExtraMoneyEntry[] }
```

### POST `/extra-money`
**Request Body**
```
{ transaction_id?: uuid | null, source: string, amount: number, received_date: ISO date, notes?: string | null }
```
**Response 201**
```
{ success: true, data: ExtraMoneyEntry }
```

### POST `/extra-money/:id/assign`
**Request Body**
```
{
  savings_reserve?: number,
  assignments: Array<{ category_id?: uuid | null, section_id?: uuid | null, amount: number }>
}
```
**Response 200**
```
{ success: true, data: ExtraMoneyWithAssignments }
```

### POST `/extra-money/:id/assign-goals`
**Request Body**
```
{ allocations: Array<{ goal_id: uuid, amount: number }> }
```
**Response 200**
```
{ success: true, data: ExtraMoneyWithAssignments }
```

### POST `/extra-money/:id/ignore`
**Response 200**
```
{ success: true, data: ExtraMoneyEntry }
```

### DELETE `/extra-money/:id`
**Response 200**
```
{ success: true, message: string }
```

### POST `/extra-money/scan`
**Response 200**
```
{ success: true, data: { scanned: number, created: number } }
```

### GET `/extra-money/preferences`
**Response 200**
```
{ success: true, data: ExtraMoneyPreferences }
```

### POST `/extra-money/preferences`
**Request Body**
```
{
  category_percentages: Record<uuid, number>,
  section_percentages?: Record<uuid, number>,
  default_categories: { giving?, debt?, fun?, savings?, helping? },
  default_sections?: { debt?, fun? },
  reserve_percentage?: number
}
```
**Response 200**
```
{ success: true, data: ExtraMoneyPreferences }
```

### POST `/extra-money/recommendations`
**Request Body**
```
{ amount: number }
```
**Response 200**
```
{ success: true, data: ExtraMoneyRecommendation[] }
```

---

## Settings (auth + household)

### GET `/settings`
**Response 200**
```
{ data: HouseholdSettings }
```

### PATCH `/settings`
**Request Body**
```
{ extra_money_threshold: number }
```
**Response 200**
```
{ data: HouseholdSettings }
```

---

## Known Gaps
- Frontend calls `/users/preferences` (GET/PATCH) for recurring preferences, but no backend route exists under `src/src/routes/api/v1`.
