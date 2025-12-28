import knex from '../config/knex';
import { NotFoundError, BadRequestError } from '../middleware/errorHandler';
import logger from '../utils/logger';
import { BudgetService } from './BudgetService';

export interface Debt {
  id: string;
  household_id: string;
  name: string;
  debt_type: string;
  current_balance: number;
  original_balance: number | null;
  interest_rate: number;
  minimum_payment: number;
  category_id: string | null;
  is_paid_off: boolean;
  paid_off_at: Date | null;
  notes: string | null;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface DebtPayment {
  id: string;
  debt_id: string;
  user_id: string | null;
  amount: number;
  payment_date: string;
  notes: string | null;
  created_at: Date;
}

export interface CreateDebtData {
  name: string;
  debt_type: string;
  current_balance: number;
  original_balance?: number;
  interest_rate: number;
  minimum_payment: number;
  category_id?: string;
  notes?: string;
}

export interface UpdateDebtData {
  name?: string;
  debt_type?: string;
  current_balance?: number;
  interest_rate?: number;
  minimum_payment?: number;
  category_id?: string | null;
  sort_order?: number;
  notes?: string;
}

export interface AddDebtPaymentData {
  amount: number;
  payment_date: string;
  notes?: string;
}

export interface PayoffStrategy {
  strategy: 'snowball' | 'avalanche';
  total_interest_paid: number;
  months_to_payoff: number;
  payoff_order: Array<{
    debt_id: string;
    debt_name: string;
    order: number;
    months_to_payoff: number;
    interest_paid: number;
  }>;
}

export interface StrategyComparison {
  monthly_payment_budget: number;
  snowball: PayoffStrategy;
  avalanche: PayoffStrategy;
  recommended: 'snowball' | 'avalanche';
  interest_savings: number; // How much avalanche saves
  time_savings_months: number; // How much faster avalanche is
}

export class DebtService {
  /**
   * Get all debts for a household
   */
  static async getAllDebts(householdId: string): Promise<Debt[]> {
    const debts = await knex('debts')
      .where({ household_id: householdId })
      .orderBy('sort_order', 'asc')
      .select('*');

    return debts.map((debt) => ({
      ...debt,
      current_balance: Number(debt.current_balance),
      original_balance: debt.original_balance ? Number(debt.original_balance) : null,
      interest_rate: Number(debt.interest_rate),
      minimum_payment: Number(debt.minimum_payment),
    }));
  }

  /**
   * Get active (not paid off) debts
   */
  static async getActiveDebts(householdId: string): Promise<Debt[]> {
    const debts = await knex('debts')
      .where({ household_id: householdId, is_paid_off: false })
      .orderBy('sort_order', 'asc')
      .select('*');

    return debts.map((debt) => ({
      ...debt,
      current_balance: Number(debt.current_balance),
      original_balance: debt.original_balance ? Number(debt.original_balance) : null,
      interest_rate: Number(debt.interest_rate),
      minimum_payment: Number(debt.minimum_payment),
    }));
  }

  /**
   * Get a single debt by ID
   */
  static async getDebtById(debtId: string, householdId: string): Promise<Debt> {
    const debt = await knex('debts')
      .where({ id: debtId, household_id: householdId })
      .first();

    if (!debt) {
      throw new NotFoundError('Debt not found');
    }

    return {
      ...debt,
      current_balance: Number(debt.current_balance),
      original_balance: debt.original_balance ? Number(debt.original_balance) : null,
      interest_rate: Number(debt.interest_rate),
      minimum_payment: Number(debt.minimum_payment),
    };
  }

  /**
   * Create a new debt
   */
  static async createDebt(householdId: string, data: CreateDebtData): Promise<Debt> {
    // Validation
    if (data.interest_rate < 0 || data.interest_rate > 100) {
      throw new BadRequestError('Interest rate must be between 0 and 100');
    }

    if (data.current_balance < 0) {
      throw new BadRequestError('Current balance cannot be negative');
    }

    if (data.minimum_payment < 0) {
      throw new BadRequestError('Minimum payment cannot be negative');
    }

    // Get next sort order
    const maxOrderResult = await knex('debts')
      .where({ household_id: householdId })
      .max('sort_order as max_order')
      .first();

    const nextOrder = (Number(maxOrderResult?.max_order) || 0) + 1;

    const [debt] = await knex('debts')
      .insert({
        household_id: householdId,
        name: data.name,
        debt_type: data.debt_type,
        current_balance: data.current_balance,
        original_balance: data.original_balance || null,
        interest_rate: data.interest_rate,
        minimum_payment: data.minimum_payment,
        category_id: data.category_id || null,
        notes: data.notes || null,
        sort_order: nextOrder,
      })
      .returning('*');

    logger.info(`Debt created: ${debt.id} for household ${householdId}`);

    return {
      ...debt,
      current_balance: Number(debt.current_balance),
      original_balance: debt.original_balance ? Number(debt.original_balance) : null,
      interest_rate: Number(debt.interest_rate),
      minimum_payment: Number(debt.minimum_payment),
    };
  }

  /**
   * Update a debt
   */
  static async updateDebt(debtId: string, householdId: string, data: UpdateDebtData): Promise<Debt> {
    // Validation
    if (data.interest_rate !== undefined && (data.interest_rate < 0 || data.interest_rate > 100)) {
      throw new BadRequestError('Interest rate must be between 0 and 100');
    }

    if (data.current_balance !== undefined && data.current_balance < 0) {
      throw new BadRequestError('Current balance cannot be negative');
    }

    if (data.minimum_payment !== undefined && data.minimum_payment < 0) {
      throw new BadRequestError('Minimum payment cannot be negative');
    }

    const [updated] = await knex('debts')
      .where({ id: debtId, household_id: householdId })
      .update({
        ...data,
        updated_at: knex.fn.now(),
      })
      .returning('*');

    if (!updated) {
      throw new NotFoundError('Debt not found');
    }

    logger.info(`Debt updated: ${debtId}`);

    return {
      ...updated,
      current_balance: Number(updated.current_balance),
      original_balance: updated.original_balance ? Number(updated.original_balance) : null,
      interest_rate: Number(updated.interest_rate),
      minimum_payment: Number(updated.minimum_payment),
    };
  }

  /**
   * Delete a debt
   */
  static async deleteDebt(debtId: string, householdId: string): Promise<void> {
    const deleted = await knex('debts')
      .where({ id: debtId, household_id: householdId })
      .delete();

    if (deleted === 0) {
      throw new NotFoundError('Debt not found');
    }

    logger.info(`Debt deleted: ${debtId}`);
  }

  /**
   * Add a payment to a debt
   */
  static async addPayment(debtId: string, householdId: string, userId: string | null, data: AddDebtPaymentData): Promise<Debt> {
    // Validate debt exists and belongs to household
    const debt = await this.getDebtById(debtId, householdId);

    if (data.amount <= 0) {
      throw new BadRequestError('Payment amount must be positive');
    }

    // Record the payment
    await knex('debt_payments').insert({
      debt_id: debtId,
      user_id: userId,
      amount: data.amount,
      payment_date: data.payment_date,
      notes: data.notes || null,
    });

    // Update debt balance
    const newBalance = Math.max(0, debt.current_balance - data.amount);
    const isPaidOff = newBalance === 0;

    const updateData: any = {
      current_balance: newBalance,
      is_paid_off: isPaidOff,
      updated_at: knex.fn.now(),
    };

    if (isPaidOff && !debt.is_paid_off) {
      updateData.paid_off_at = knex.fn.now();
    }

    const [updated] = await knex('debts')
      .where({ id: debtId })
      .update(updateData)
      .returning('*');

    logger.info(`Payment of ${data.amount} added to debt ${debtId}, new balance: ${newBalance}`);

    return {
      ...updated,
      current_balance: Number(updated.current_balance),
      original_balance: updated.original_balance ? Number(updated.original_balance) : null,
      interest_rate: Number(updated.interest_rate),
      minimum_payment: Number(updated.minimum_payment),
    };
  }

  /**
   * Get payment history for a debt
   */
  static async getPayments(debtId: string, householdId: string): Promise<DebtPayment[]> {
    // Verify debt belongs to household
    await this.getDebtById(debtId, householdId);

    const payments = await knex('debt_payments')
      .where({ debt_id: debtId })
      .orderBy('payment_date', 'desc')
      .select('*');

    return payments.map((payment) => ({
      ...payment,
      amount: Number(payment.amount),
    }));
  }

  /**
   * Calculate payoff strategy comparison (snowball vs avalanche)
   */
  static async calculatePayoffStrategies(
    householdId: string,
    monthlyPaymentBudget: number
  ): Promise<StrategyComparison> {
    const activeDebts = await this.getActiveDebts(householdId);

    if (activeDebts.length === 0) {
      throw new BadRequestError('No active debts to calculate payoff strategy');
    }

    // Calculate total minimum payments
    const totalMinimumPayments = activeDebts.reduce((sum, debt) => sum + debt.minimum_payment, 0);

    if (monthlyPaymentBudget < totalMinimumPayments) {
      throw new BadRequestError(
        `Monthly payment budget ($${monthlyPaymentBudget}) is less than total minimum payments ($${totalMinimumPayments})`
      );
    }

    const extraPayment = monthlyPaymentBudget - totalMinimumPayments;

    // Calculate snowball strategy (pay smallest balance first)
    const snowball = this.calculateSnowball(activeDebts, extraPayment);

    // Calculate avalanche strategy (pay highest interest first)
    const avalanche = this.calculateAvalanche(activeDebts, extraPayment);

    // Determine recommendation
    const interestSavings = snowball.total_interest_paid - avalanche.total_interest_paid;
    const timeSavingsMonths = snowball.months_to_payoff - avalanche.months_to_payoff;

    // Recommend avalanche if it saves >$100 OR >10% interest OR is faster
    const shouldRecommendAvalanche =
      interestSavings > 100 ||
      (interestSavings / snowball.total_interest_paid) > 0.10 ||
      timeSavingsMonths > 0;

    return {
      monthly_payment_budget: monthlyPaymentBudget,
      snowball,
      avalanche,
      recommended: shouldRecommendAvalanche ? 'avalanche' : 'snowball',
      interest_savings: interestSavings,
      time_savings_months: timeSavingsMonths,
    };
  }

  /**
   * Calculate snowball payoff strategy (smallest balance first)
   */
  private static calculateSnowball(debts: Debt[], extraPayment: number): PayoffStrategy {
    // Sort by current balance ascending
    const sortedDebts = [...debts].sort((a, b) => a.current_balance - b.current_balance);

    return this.simulatePayoff(sortedDebts, extraPayment, 'snowball');
  }

  /**
   * Calculate avalanche payoff strategy (highest interest rate first)
   */
  private static calculateAvalanche(debts: Debt[], extraPayment: number): PayoffStrategy {
    // Sort by interest rate descending
    const sortedDebts = [...debts].sort((a, b) => b.interest_rate - a.interest_rate);

    return this.simulatePayoff(sortedDebts, extraPayment, 'avalanche');
  }

  /**
   * Simulate debt payoff given a payment order
   */
  private static simulatePayoff(
    orderedDebts: Debt[],
    extraPayment: number,
    strategy: 'snowball' | 'avalanche'
  ): PayoffStrategy {
    // Clone debts for simulation
    const debts = orderedDebts.map((d) => ({
      ...d,
      balance: d.current_balance,
      monthlyRate: d.interest_rate / 100 / 12,
    }));

    let totalInterestPaid = 0;
    let currentMonth = 0;
    let availableExtraPayment = extraPayment;

    const payoffOrder: PayoffStrategy['payoff_order'] = [];
    let payoffOrderIndex = 0;

    // Simulate month by month until all debts are paid
    while (debts.some((d) => d.balance > 0) && currentMonth < 600) {
      // Safety limit: 50 years
      currentMonth++;

      for (const debt of debts) {
        if (debt.balance <= 0) continue;

        // Calculate interest for this month
        const interestCharge = debt.balance * debt.monthlyRate;
        totalInterestPaid += interestCharge;

        // Apply minimum payment
        let payment = Math.min(debt.minimum_payment, debt.balance + interestCharge);

        // If this is the target debt (first unpaid in order), apply extra payment
        const isTargetDebt = debts.findIndex((d) => d.balance > 0) === debts.indexOf(debt);
        if (isTargetDebt && availableExtraPayment > 0) {
          const additionalPayment = Math.min(availableExtraPayment, debt.balance + interestCharge - payment);
          payment += additionalPayment;
        }

        // Apply payment (interest + principal reduction)
        debt.balance = debt.balance + interestCharge - payment;

        // Record when debt is paid off
        if (debt.balance <= 0) {
          debt.balance = 0;

          // Find if already in payoff order
          const existingEntry = payoffOrder.find((p) => p.debt_id === debt.id);
          if (!existingEntry) {
            payoffOrder.push({
              debt_id: debt.id,
              debt_name: debt.name,
              order: ++payoffOrderIndex,
              months_to_payoff: currentMonth,
              interest_paid: 0, // Will be filled later
            });

            // Free up the minimum payment for the next debt
            availableExtraPayment += debt.minimum_payment;
          }
        }
      }
    }

    return {
      strategy,
      total_interest_paid: Math.round(totalInterestPaid * 100) / 100,
      months_to_payoff: currentMonth,
      payoff_order: payoffOrder,
    };
  }

  /**
   * Get total debt for household
   */
  static async getTotalDebt(householdId: string): Promise<number> {
    const result = await knex('debts')
      .where({ household_id: householdId, is_paid_off: false })
      .sum('current_balance as total')
      .first();

    return Number(result?.total || 0);
  }

  /**
   * Get total monthly minimum payments
   */
  static async getTotalMinimumPayments(householdId: string): Promise<number> {
    const result = await knex('debts')
      .where({ household_id: householdId, is_paid_off: false })
      .sum('minimum_payment as total')
      .first();

    return Number(result?.total || 0);
  }

  /**
   * Commit a debt payoff plan
   * This creates a payment plan and schedule that updates the budget
   */
  static async commitPaymentPlan(
    householdId: string,
    userId: string,
    data: {
      method: 'snowball' | 'avalanche';
      total_monthly_payment: number;
      debts: Array<{
        debt_id: string;
        payment_amount: number;
        order: number;
        minimum_payment: number;
      }>;
    }
  ): Promise<void> {
    await knex.transaction(async (trx) => {
      // 1. Deactivate any existing active plans
      await trx('debt_payment_plans')
        .where({ household_id: householdId, is_active: true })
        .update({ is_active: false });

      // 2. Create new payment plan
      const [plan] = await trx('debt_payment_plans')
        .insert({
          household_id: householdId,
          method: data.method,
          total_monthly_payment: data.total_monthly_payment,
          is_active: true,
          created_by_user_id: userId,
        })
        .returning('*');

      // 3. Create payment schedule for each debt
      const scheduleEntries = data.debts.map((debt) => ({
        plan_id: plan.id,
        debt_id: debt.debt_id,
        payment_amount: debt.payment_amount,
        payment_order: debt.order,
        is_extra_payment: debt.payment_amount > debt.minimum_payment,
      }));

      await trx('debt_payment_schedule').insert(scheduleEntries);

      // 4. Update budget allocation for debt section
      // Get or create the current month's budget
      const currentMonth = new Date();
      const budgetMonth = await BudgetService.getOrCreateBudgetMonth(householdId, currentMonth);

      // Find debt section(s) for this household
      const debtSections = await trx('category_sections')
        .where({ household_id: householdId, type: 'debt' });

      if (debtSections.length > 0) {
        // Use the first debt section (most households will only have one)
        const debtSection = debtSections[0];

        // Check if allocation exists for this section
        const existingAllocation = await trx('budget_allocations')
          .where({
            budget_month_id: budgetMonth.id,
            section_id: debtSection.id,
          })
          .first();

        if (existingAllocation) {
          // Update existing allocation
          await trx('budget_allocations')
            .where({ id: existingAllocation.id })
            .update({
              allocated_amount: data.total_monthly_payment,
              rollup_mode: true,
              notes: `${data.method.charAt(0).toUpperCase() + data.method.slice(1)} payment plan`,
            });
        } else {
          // Create new allocation
          await trx('budget_allocations').insert({
            budget_month_id: budgetMonth.id,
            section_id: debtSection.id,
            allocated_amount: data.total_monthly_payment,
            rollup_mode: true,
            notes: `${data.method.charAt(0).toUpperCase() + data.method.slice(1)} payment plan`,
          });
        }
      }

      logger.info(`Debt payment plan committed: ${plan.id} with ${data.method} strategy`);
    });
  }

  /**
   * Get active payment plan for household
   */
  static async getActivePaymentPlan(householdId: string): Promise<{
    plan: any;
    schedule: any[];
  } | null> {
    const plan = await knex('debt_payment_plans')
      .where({ household_id: householdId, is_active: true })
      .first();

    if (!plan) {
      return null;
    }

    const schedule = await knex('debt_payment_schedule as dps')
      .join('debts as d', 'dps.debt_id', 'd.id')
      .where({ 'dps.plan_id': plan.id })
      .orderBy('dps.payment_order', 'asc')
      .select(
        'dps.*',
        'd.name as debt_name',
        'd.current_balance',
        'd.interest_rate',
        'd.minimum_payment'
      );

    return {
      plan: {
        ...plan,
        total_monthly_payment: Number(plan.total_monthly_payment),
      },
      schedule: schedule.map((s) => ({
        ...s,
        payment_amount: Number(s.payment_amount),
        current_balance: Number(s.current_balance),
        interest_rate: Number(s.interest_rate),
        minimum_payment: Number(s.minimum_payment),
      })),
    };
  }
}
