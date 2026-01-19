# Data Models - Frontend (frontend)

Source: `apps/app/src/types/index.ts`

## Core Types
- User, SignupData, LoginData
- Account, CreateAccountData, CreditCardStatus
- Transaction, CreateTransactionData, TransactionCreateResult
- Category, CategorySection

## Budgeting & Assignments
- BudgetSummary, BudgetAllocation
- SectionSummary, CategorySummary
- IncomeSource, CreateIncomeSourceData, UpdateIncomeSourceData
- IncomeAssignment, CreateAssignmentData, AutoAssignmentResult

## Goals
- Goal, CreateGoalData, UpdateGoalData
- GoalContribution, AddContributionData

## Debts
- Debt, CreateDebtData, UpdateDebtData
- DebtPayment, AddDebtPaymentData
- PayoffStrategy, PayoffStrategyDebt, StrategyComparison

## Recurring Transactions
- RecurringTransaction, RecurringTransactionInstance
- CreateRecurringData, UpdateRecurringData, UpdateInstanceData, SkipInstanceData
- UserPreferences

## Split Transactions
- SplitData, SplitResult, CreateSplitData, UpdateSplitData, UnsplitData

## Extra Money Plan
- ExtraMoneyEntry, ExtraMoneyAssignment, ExtraMoneyWithAssignments
- CreateExtraMoneyData, AssignExtraMoneyData
- ExtraMoneyPreferences, SavePreferencesData, ExtraMoneyRecommendation

## Wizard
- WizardAnswers (setup flow and extra money plan)
