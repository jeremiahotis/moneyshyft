export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  householdId: string | null;
  role: string;
  createdAt: string;
}

export interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  householdName?: string;
  invitationCode?: string;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface Account {
  id: string;
  household_id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'cash' | 'investment';
  current_balance: number;
  starting_balance: number;
  is_active: boolean;
  previous_balance_at_start?: number;
  month_start_date?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateAccountData {
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'cash' | 'investment';
  starting_balance?: number;
  is_active?: boolean;
}

export interface CreditCardStatus {
  account_id: string;
  account_name: string;
  previous_balance: number;
  new_charges_this_month: number;
  total_owed: number;
  payments_this_month: number;
  new_charges_covered_by_budget: number;
  is_current: boolean;
  month_start_date: string;
  warning_message: string | null;
  success_message: string | null;
}

export interface Transaction {
  id: string;
  household_id: string;
  account_id: string;
  category_id: string | null;
  payee: string;
  amount: number;
  transaction_date: string;
  notes: string | null;
  is_cleared: boolean;
  is_reconciled: boolean;
  created_by_user_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTransactionData {
  account_id: string;
  category_id?: string | null;
  payee: string;
  amount: number;
  transaction_date: string;
  notes?: string;
  is_cleared?: boolean;
}

export interface Category {
  id: string;
  household_id: string;
  section_id: string;
  name: string;
  parent_category_id: string | null;
  color: string | null;
  icon: string | null;
  sort_order: number;
  is_system: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategorySection {
  id: string;
  household_id: string;
  name: string;
  type: 'fixed' | 'flexible' | 'debt';
  sort_order: number;
  is_system: boolean;
  created_at: string;
  updated_at: string;
  categories?: Category[];
}

export interface BudgetAllocation {
  id: string;
  budget_month_id: string;
  category_id: string | null;
  section_id: string | null;
  allocated_amount: number;
  rollup_mode: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface BudgetSummary {
  month: string;
  month_notes: string | null;

  // INCOME
  total_planned_income: number;   // From income_sources (the plan)
  total_real_income: number;      // From transactions (reality)
  income_variance: number;        // Actual vs planned

  // BUDGET
  total_allocated: number;        // Budgeted amount (the plan)
  total_assigned: number;         // Assigned amount (reality)
  to_be_assigned: number;         // Real income not yet assigned

  // SPENDING
  total_spent: number;
  total_remaining: number;        // Budget tracking (allocated - spent)
  total_available: number;        // Envelope tracking (assigned - spent)

  sections: SectionSummary[];
}

// Income tracking interfaces
export interface IncomeSource {
  id: string;
  household_id: string;
  name: string;
  monthly_amount: number;
  is_active: boolean;
  sort_order: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateIncomeSourceData {
  name: string;
  monthly_amount: number;
  is_active?: boolean;
  notes?: string;
}

export interface UpdateIncomeSourceData {
  name?: string;
  monthly_amount?: number;
  is_active?: boolean;
  sort_order?: number;
  notes?: string;
}

// Wizard state tracking
export interface WizardAnswers {
  // Income step
  income_sources: Array<{ name: string; amount: number }>;

  // Housing step
  housing_type: 'rent' | 'own' | 'other';
  housing_amount?: number;

  // Transportation step
  has_car_payment: boolean;
  car_payments?: Array<{ name: string; amount: number }>;
  has_car_insurance: boolean;
  car_insurance_payments?: Array<{ name: string; amount: number }>;
  car_insurance_amount?: number; // Legacy - for backward compatibility

  // Utilities step
  utilities_estimate?: number;
  internet_phone_estimate?: number;

  // Debt step
  has_credit_card_debt: boolean;
  credit_card_debts?: Array<{
    name: string;
    debt_type: string;
    current_balance: number;
    interest_rate: number;
    minimum_payment: number;
  }>;
  has_other_debt: boolean;
  other_debts?: Array<{
    name: string;
    debt_type: string;
    current_balance: number;
    interest_rate: number;
    minimum_payment: number;
  }>;

  // Flexible spending step
  groceries_estimate?: number;
  dining_out_estimate?: number;
  entertainment_estimate?: number;
}

export interface SectionSummary {
  section_id: string;
  section_name: string;
  section_type: string;
  allocated: number;      // Budgeted amount (the plan)
  assigned: number;       // Assigned amount (reality - actual cash)
  spent: number;          // Actual spending
  remaining: number;      // allocated - spent (budget tracking)
  available: number;      // assigned - spent (envelope tracking)
  need: number;           // allocated - assigned (how much more needed)
  categories: CategorySummary[];
  rollup_mode: boolean;
  allocation_notes: string | null;
}

export interface CategorySummary {
  category_id: string;
  category_name: string;
  allocated: number;      // Budgeted amount (the plan)
  assigned: number;       // Assigned amount (reality - actual cash)
  spent: number;          // Actual spending
  remaining: number;      // allocated - spent (budget tracking)
  available: number;      // assigned - spent (envelope tracking)
  need: number;           // allocated - assigned (how much more needed)
  activity: number;
  allocation_notes: string | null;
}

// Goals interfaces
export interface Goal {
  id: string;
  household_id: string;
  name: string;
  description: string | null;
  target_amount: number;
  current_amount: number;
  target_date: string | null;
  category_id: string | null;
  is_completed: boolean;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  progress_percentage?: number;
  monthly_contribution_needed?: number | null;
}

export interface CreateGoalData {
  name: string;
  description?: string | null;
  target_amount: number;
  current_amount?: number;
  target_date?: string | null;
  category_id?: string | null;
}

export interface UpdateGoalData {
  name?: string;
  description?: string | null;
  target_amount?: number;
  current_amount?: number;
  target_date?: string | null;
  category_id?: string | null;
  is_completed?: boolean;
}

export interface GoalContribution {
  id: string;
  goal_id: string;
  amount: number;
  contribution_date: string;
  notes: string | null;
  created_by_user_id: string;
  created_at: string;
}

export interface AddContributionData {
  amount: number;
  contribution_date?: string;
  notes?: string;
  transaction_id?: string;
}

// Debt Tracking Types
export interface Debt {
  id: string;
  household_id: string;
  name: string;
  debt_type: 'credit_card' | 'auto_loan' | 'student_loan' | 'personal_loan' | 'medical' | 'other';
  current_balance: number;
  original_balance: number | null;
  interest_rate: number;
  minimum_payment: number;
  category_id: string | null;
  is_paid_off: boolean;
  paid_off_at: string | null;
  notes: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface CreateDebtData {
  name: string;
  debt_type: 'credit_card' | 'auto_loan' | 'student_loan' | 'personal_loan' | 'medical' | 'other';
  current_balance: number;
  original_balance?: number;
  interest_rate: number;
  minimum_payment: number;
  category_id?: string;
  notes?: string;
}

export interface UpdateDebtData {
  name?: string;
  debt_type?: 'credit_card' | 'auto_loan' | 'student_loan' | 'personal_loan' | 'medical' | 'other';
  current_balance?: number;
  interest_rate?: number;
  minimum_payment?: number;
  category_id?: string | null;
  sort_order?: number;
  notes?: string;
}

export interface DebtPayment {
  id: string;
  debt_id: string;
  user_id: string | null;
  amount: number;
  payment_date: string;
  notes: string | null;
  created_at: string;
}

export interface AddDebtPaymentData {
  amount: number;
  payment_date: string;
  notes?: string;
}

export interface PayoffStrategyDebt {
  debt_id: string;
  debt_name: string;
  order: number;
  months_to_payoff: number;
  interest_paid: number;
}

export interface PayoffStrategy {
  strategy: 'snowball' | 'avalanche';
  total_interest_paid: number;
  months_to_payoff: number;
  payoff_order: PayoffStrategyDebt[];
}

export interface StrategyComparison {
  monthly_payment_budget: number;
  snowball: PayoffStrategy;
  avalanche: PayoffStrategy;
  recommended: 'snowball' | 'avalanche';
  interest_savings: number;
  time_savings_months: number;
}

// Income Assignment Interfaces (Envelope Budgeting)
export interface IncomeAssignment {
  id: string;
  household_id: string;
  income_transaction_id: string;
  month: string;
  category_id: string | null;
  section_id: string | null;
  amount: number;
  notes: string | null;
  created_at: string;
  created_by_user_id: string | null;
}

export interface CreateAssignmentData {
  income_transaction_id: string;
  category_id?: string;
  section_id?: string;
  amount: number;
  notes?: string;
}

export interface AutoAssignmentResult {
  assignments: IncomeAssignment[];
  total_assigned: number;
  remaining: number;
}
