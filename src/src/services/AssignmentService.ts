import knex from '../config/knex';
import { NotFoundError, BadRequestError } from '../middleware/errorHandler';
import logger from '../utils/logger';
import { BudgetService } from './BudgetService';

export interface IncomeAssignment {
  id: string;
  household_id: string;
  income_transaction_id: string;
  month: string;
  category_id: string | null;
  section_id: string | null;
  amount: number;
  notes: string | null;
  created_at: Date;
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

export class AssignmentService {
  /**
   * Get all assignments for a household in a given month
   */
  static async getAssignments(
    householdId: string,
    month: string
  ): Promise<IncomeAssignment[]> {
    const assignments = await knex('income_assignments')
      .where({ household_id: householdId, month })
      .orderBy('created_at', 'asc')
      .select('*');

    return assignments.map((a) => ({
      ...a,
      amount: Number(a.amount),
    }));
  }

  /**
   * Create a manual assignment of income to a category/section
   */
  static async createAssignment(
    householdId: string,
    userId: string,
    data: CreateAssignmentData
  ): Promise<IncomeAssignment> {
    // Validate transaction belongs to household and is income
    const transaction = await knex('transactions')
      .where({ id: data.income_transaction_id, household_id: householdId })
      .first();

    if (!transaction) {
      throw new NotFoundError('Income transaction not found');
    }

    if (Number(transaction.amount) <= 0) {
      throw new BadRequestError('Transaction must be income (positive amount)');
    }

    // Extract month from transaction date
    const transactionDate = new Date(transaction.transaction_date);
    const month = transactionDate.toISOString().slice(0, 7);

    // Validate category/section belongs to household
    if (data.category_id) {
      const category = await knex('categories')
        .join('category_sections', 'categories.section_id', 'category_sections.id')
        .where({ 'categories.id': data.category_id, 'category_sections.household_id': householdId })
        .first();

      if (!category) {
        throw new NotFoundError('Category not found');
      }
    } else if (data.section_id) {
      const section = await knex('category_sections')
        .where({ id: data.section_id, household_id: householdId })
        .first();

      if (!section) {
        throw new NotFoundError('Section not found');
      }
    } else {
      throw new BadRequestError('Either category_id or section_id must be provided');
    }

    // Check: Don't assign more than transaction amount
    const existingAssignments = await this.getAssignmentsForTransaction(data.income_transaction_id);
    const totalAssigned = existingAssignments.reduce((sum, a) => sum + a.amount, 0);

    if (totalAssigned + data.amount > Number(transaction.amount)) {
      throw new BadRequestError(
        `Cannot assign $${data.amount}. Transaction amount: $${transaction.amount}, ` +
        `already assigned: $${totalAssigned}, available: $${Number(transaction.amount) - totalAssigned}`
      );
    }

    // Create assignment
    const [assignment] = await knex('income_assignments')
      .insert({
        household_id: householdId,
        income_transaction_id: data.income_transaction_id,
        month,
        category_id: data.category_id || null,
        section_id: data.section_id || null,
        amount: data.amount,
        notes: data.notes || null,
        created_by_user_id: userId,
      })
      .returning('*');

    // Update assigned_amount in budget_allocations
    await this.updateAssignedAmount(householdId, month, data.category_id, data.section_id);

    logger.info(`Income assignment created: ${assignment.id} - $${data.amount} assigned`);

    return {
      ...assignment,
      amount: Number(assignment.amount),
    };
  }

  /**
   * Get all assignments for a specific income transaction
   */
  static async getAssignmentsForTransaction(
    transactionId: string
  ): Promise<IncomeAssignment[]> {
    const assignments = await knex('income_assignments')
      .where({ income_transaction_id: transactionId })
      .select('*');

    return assignments.map((a) => ({
      ...a,
      amount: Number(a.amount),
    }));
  }

  /**
   * Update assigned_amount in budget_allocations based on assignments
   */
  private static async updateAssignedAmount(
    householdId: string,
    month: string,
    categoryId?: string,
    sectionId?: string
  ): Promise<void> {
    // Calculate total assigned to this category/section
    const query = knex('income_assignments')
      .where({ household_id: householdId, month })
      .sum('amount as total');

    if (categoryId) {
      query.where({ category_id: categoryId });
    } else {
      query.where({ section_id: sectionId });
    }

    const result = await query.first();
    const totalAssigned = Number(result?.total || 0);

    // Get or create budget allocation
    // Convert month string (YYYY-MM) to Date object
    const monthDate = new Date(`${month}-01`);
    const budgetMonth = await BudgetService.getOrCreateBudgetMonth(householdId, monthDate);

    // Find existing allocation
    const existingAllocation = await knex('budget_allocations')
      .where({
        budget_month_id: budgetMonth.id,
        ...(categoryId ? { category_id: categoryId } : { section_id: sectionId }),
      })
      .first();

    if (existingAllocation) {
      // Update assigned_amount
      await knex('budget_allocations')
        .where({ id: existingAllocation.id })
        .update({ assigned_amount: totalAssigned, updated_at: knex.fn.now() });
    } else {
      // Create allocation with assigned_amount (allocated_amount = 0 initially)
      await knex('budget_allocations')
        .insert({
          budget_month_id: budgetMonth.id,
          category_id: categoryId || null,
          section_id: sectionId || null,
          allocated_amount: 0, // No budget set yet
          assigned_amount: totalAssigned,
          rollup_mode: !!sectionId,
        });
    }
  }

  /**
   * Auto-assign income to underfunded categories
   * Prioritizes categories with budgets that have low assigned amounts
   */
  static async autoAssignIncome(
    householdId: string,
    incomeTransactionId: string,
    userId: string
  ): Promise<AutoAssignmentResult> {
    // Get income transaction
    const transaction = await knex('transactions')
      .where({ id: incomeTransactionId, household_id: householdId })
      .first();

    if (!transaction) {
      throw new NotFoundError('Income transaction not found');
    }

    const transactionDate = new Date(transaction.transaction_date);
    const month = transactionDate.toISOString().slice(0, 7);
    let remaining = Number(transaction.amount);

    // Check how much already assigned
    const existingAssignments = await this.getAssignmentsForTransaction(incomeTransactionId);
    const alreadyAssigned = existingAssignments.reduce((sum, a) => sum + a.amount, 0);
    remaining -= alreadyAssigned;

    if (remaining <= 0) {
      return {
        assignments: [],
        total_assigned: 0,
        remaining: 0,
      };
    }

    // Get budget allocations that need funding (allocated > assigned)
    // Convert month string (YYYY-MM) to Date object
    const monthDate = new Date(`${month}-01`);
    const budgetMonth = await BudgetService.getOrCreateBudgetMonth(householdId, monthDate);

    const allocations = await knex('budget_allocations')
      .where({ budget_month_id: budgetMonth.id })
      .whereRaw('allocated_amount > assigned_amount')
      .orderBy([
        { column: 'allocated_amount', order: 'desc' }, // Prioritize larger budgets
        { column: 'assigned_amount', order: 'asc' },   // Then least funded
      ])
      .select('*');

    const assignments: IncomeAssignment[] = [];
    let totalAssigned = 0;

    // Assign to each allocation until money runs out
    for (const allocation of allocations) {
      if (remaining <= 0) break;

      const needed = Number(allocation.allocated_amount) - Number(allocation.assigned_amount);
      const assignAmount = Math.min(needed, remaining);

      // Create assignment
      const assignment = await this.createAssignment(householdId, userId, {
        income_transaction_id: incomeTransactionId,
        category_id: allocation.category_id,
        section_id: allocation.section_id,
        amount: assignAmount,
        notes: 'Auto-assigned',
      });

      assignments.push(assignment);
      totalAssigned += assignAmount;
      remaining -= assignAmount;
    }

    return {
      assignments,
      total_assigned: totalAssigned,
      remaining,
    };
  }

  /**
   * Delete an assignment (unassign money)
   */
  static async deleteAssignment(
    assignmentId: string,
    householdId: string
  ): Promise<void> {
    const assignment = await knex('income_assignments')
      .where({ id: assignmentId, household_id: householdId })
      .first();

    if (!assignment) {
      throw new NotFoundError('Assignment not found');
    }

    await knex('income_assignments')
      .where({ id: assignmentId })
      .delete();

    // Update assigned_amount
    await this.updateAssignedAmount(
      householdId,
      assignment.month,
      assignment.category_id,
      assignment.section_id
    );

    logger.info(`Assignment deleted: ${assignmentId}`);
  }

  /**
   * Calculate "To Be Assigned" amount for a month
   * = Total income received - Total assigned
   */
  static async getToBeAssigned(
    householdId: string,
    month: string
  ): Promise<number> {
    // Get all income transactions for the month
    const monthStart = `${month}-01`;
    const lastDay = new Date(
      parseInt(month.split('-')[0]),
      parseInt(month.split('-')[1]),
      0
    ).getDate();
    const monthEnd = `${month}-${String(lastDay).padStart(2, '0')}`;

    const incomeResult = await knex('transactions')
      .where({ household_id: householdId })
      .whereBetween('transaction_date', [monthStart, monthEnd])
      .where('amount', '>', 0) // Income only
      .sum('amount as total')
      .first();

    const totalIncome = Number(incomeResult?.total || 0);

    // Get all assignments for the month
    const assignedResult = await knex('income_assignments')
      .where({ household_id: householdId, month })
      .sum('amount as total')
      .first();

    const totalAssigned = Number(assignedResult?.total || 0);

    return totalIncome - totalAssigned;
  }

  /**
   * Transfer money between categories
   * This allows users to reallocate assigned money
   */
  static async transferMoney(
    householdId: string,
    userId: string,
    data: {
      from_category_id?: string;
      from_section_id?: string;
      to_category_id?: string;
      to_section_id?: string;
      amount: number;
      month: string;
      notes?: string;
    }
  ): Promise<void> {
    const { from_category_id, from_section_id, to_category_id, to_section_id, amount, month, notes } = data;

    // Validate amount
    if (amount <= 0) {
      throw new Error('Transfer amount must be greater than 0');
    }

    // Get budget month
    // Convert month string (YYYY-MM) to Date object
    const monthDate = new Date(`${month}-01`);
    const budgetMonth = await BudgetService.getOrCreateBudgetMonth(householdId, monthDate);

    // Find source allocation
    const sourceWhere: any = { budget_month_id: budgetMonth.id };
    if (from_category_id) {
      sourceWhere.category_id = from_category_id;
    } else if (from_section_id) {
      sourceWhere.section_id = from_section_id;
      sourceWhere.category_id = null; // Rollup mode
    } else {
      throw new Error('Source category or section required');
    }

    const sourceAllocation = await knex('budget_allocations')
      .where(sourceWhere)
      .first();

    if (!sourceAllocation) {
      throw new Error('Source allocation not found');
    }

    // Check if source has enough available money
    const sourceAvailable = Number(sourceAllocation.assigned_amount) - Number(sourceAllocation.spent_amount);
    if (sourceAvailable < amount) {
      throw new Error(`Insufficient available money in source. Available: ${sourceAvailable}, Requested: ${amount}`);
    }

    // Find or create destination allocation
    const destWhere: any = { budget_month_id: budgetMonth.id };
    if (to_category_id) {
      destWhere.category_id = to_category_id;
    } else if (to_section_id) {
      destWhere.section_id = to_section_id;
      destWhere.category_id = null; // Rollup mode
    } else {
      throw new Error('Destination category or section required');
    }

    let destAllocation = await knex('budget_allocations')
      .where(destWhere)
      .first();

    if (!destAllocation) {
      // Create allocation if doesn't exist
      const [newAllocation] = await knex('budget_allocations')
        .insert({
          budget_month_id: budgetMonth.id,
          category_id: to_category_id || null,
          section_id: to_section_id || null,
          allocated_amount: 0,
          assigned_amount: 0,
          spent_amount: 0,
        })
        .returning('*');
      destAllocation = newAllocation;
    }

    // Perform transfer in a transaction
    await knex.transaction(async (trx) => {
      // Decrease source assigned_amount
      await trx('budget_allocations')
        .where({ id: sourceAllocation.id })
        .update({
          assigned_amount: knex.raw('assigned_amount - ?', [amount]),
          updated_at: knex.fn.now(),
        });

      // Increase destination assigned_amount
      await trx('budget_allocations')
        .where({ id: destAllocation.id })
        .update({
          assigned_amount: knex.raw('assigned_amount + ?', [amount]),
          updated_at: knex.fn.now(),
        });

      // Log transfer for audit trail
      await trx('assignment_transfers').insert({
        household_id: householdId,
        from_category_id,
        from_section_id,
        to_category_id,
        to_section_id,
        amount,
        month,
        notes,
        created_by: userId,
      });
    });

    logger.info(`Money transferred: ${amount} from ${from_category_id || from_section_id} to ${to_category_id || to_section_id}`);
  }
}
