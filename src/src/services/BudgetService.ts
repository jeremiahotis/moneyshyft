import knex from '../config/knex';
import { NotFoundError, BadRequestError } from '../middleware/errorHandler';
import { CategoryService } from './CategoryService';
import { IncomeService } from './IncomeService';
import logger from '../utils/logger';

interface BudgetMonth {
  id: string;
  household_id: string;
  month: Date;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
}

interface BudgetAllocation {
  id: string;
  budget_month_id: string;
  category_id: string | null;
  section_id: string | null;
  allocated_amount: number;
  assigned_amount: number; // NEW - actual cash assigned
  rollup_mode: boolean;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
}

interface AllocationInput {
  category_id?: string;
  section_id?: string;
  allocated_amount: number;
  rollup_mode: boolean;
  notes?: string;
}

interface CategorySummary {
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

interface SectionSummary {
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

interface BudgetSummary {
  month: Date;
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

export class BudgetService {
  /**
   * Get or create budget month
   * Automatically copies allocations from previous month if creating new month
   */
  static async getOrCreateBudgetMonth(
    householdId: string,
    month: Date
  ): Promise<BudgetMonth> {
    // Normalize to first of month
    const normalizedMonth = new Date(month.getFullYear(), month.getMonth(), 1);

    let budgetMonth = await knex('budget_months')
      .where({
        household_id: householdId,
        month: normalizedMonth
      })
      .first();

    if (!budgetMonth) {
      // Budget month doesn't exist - create it and copy from previous month
      const previousMonth = new Date(normalizedMonth);
      previousMonth.setMonth(previousMonth.getMonth() - 1);

      // Check if previous month's budget exists
      const previousBudget = await knex('budget_months')
        .where({
          household_id: householdId,
          month: previousMonth
        })
        .first();

      // Create new budget month
      [budgetMonth] = await knex('budget_months')
        .insert({
          household_id: householdId,
          month: normalizedMonth
        })
        .returning('*');

      // If previous month exists, copy its allocations
      if (previousBudget) {
        const previousAllocations = await knex('budget_allocations')
          .where({ budget_month_id: previousBudget.id });

        if (previousAllocations.length > 0) {
          // Copy allocations to new month
          const newAllocations = previousAllocations.map(alloc => ({
            budget_month_id: budgetMonth.id,
            category_id: alloc.category_id,
            section_id: alloc.section_id,
            allocated_amount: alloc.allocated_amount,
            rollup_mode: alloc.rollup_mode,
            notes: alloc.notes
          }));

          await knex('budget_allocations').insert(newAllocations);

          logger.info(`Budget month ${normalizedMonth.toISOString()} created for household ${householdId} with ${newAllocations.length} allocations copied from previous month`);
        } else {
          logger.info(`Budget month ${normalizedMonth.toISOString()} created for household ${householdId} (previous month had no allocations)`);
        }
      } else {
        logger.info(`Budget month ${normalizedMonth.toISOString()} created for household ${householdId} (no previous month found)`);
      }
    }

    return budgetMonth;
  }

  /**
   * Update budget month notes
   */
  static async updateBudgetMonth(
    householdId: string,
    month: Date,
    notes: string
  ): Promise<BudgetMonth> {
    const budgetMonth = await this.getOrCreateBudgetMonth(householdId, month);

    const [updated] = await knex('budget_months')
      .where({ id: budgetMonth.id })
      .update({
        notes,
        updated_at: knex.fn.now()
      })
      .returning('*');

    return updated;
  }

  /**
   * Set a single budget allocation (category or section level)
   */
  static async setAllocation(
    householdId: string,
    month: Date,
    data: AllocationInput
  ): Promise<BudgetAllocation> {
    const budgetMonth = await this.getOrCreateBudgetMonth(householdId, month);

    // Verify category or section belongs to household
    if (data.category_id) {
      await CategoryService.getCategoryById(data.category_id, householdId);
    }

    let section;
    if (data.section_id) {
      section = await CategoryService.getSectionById(data.section_id, householdId);
    }

    // Validate rollup mode based on section type
    if (data.category_id) {
      // Category-level allocation - get section from category
      const category = await CategoryService.getCategoryById(data.category_id, householdId);
      section = await CategoryService.getSectionById(category.section_id, householdId);
    }

    if (section) {
      // Fixed and Debt sections MUST use category-level allocation
      if (section.type === 'fixed' || section.type === 'debt') {
        if (data.rollup_mode === true) {
          throw new BadRequestError(
            `${section.type === 'fixed' ? 'Fixed' : 'Debt'} sections must allocate to individual categories`
          );
        }
        if (!data.category_id) {
          throw new BadRequestError(
            `Must specify a category for ${section.type} section allocation`
          );
        }
      }

      // Flexible sections SHOULD use section-level allocation (rollup mode)
      if (section.type === 'flexible') {
        if (data.rollup_mode === false && data.category_id) {
          throw new BadRequestError(
            'Flexible sections should use section-level allocation (rollup mode). Allocate to the section, not individual categories.'
          );
        }
        if (data.rollup_mode === true && !data.section_id) {
          throw new BadRequestError(
            'Flexible sections require section_id when using rollup mode'
          );
        }
      }
    }

    // Check if allocation already exists
    const existingAllocation = await knex('budget_allocations')
      .where({
        budget_month_id: budgetMonth.id,
        ...(data.category_id ? { category_id: data.category_id } : {}),
        ...(data.section_id ? { section_id: data.section_id } : {})
      })
      .first();

    if (existingAllocation) {
      // Update existing allocation
      const [updated] = await knex('budget_allocations')
        .where({ id: existingAllocation.id })
        .update({
          allocated_amount: data.allocated_amount,
          notes: data.notes || null,
          updated_at: knex.fn.now()
        })
        .returning('*');

      return updated;
    } else {
      // Create new allocation
      const [allocation] = await knex('budget_allocations')
        .insert({
          budget_month_id: budgetMonth.id,
          category_id: data.category_id || null,
          section_id: data.section_id || null,
          allocated_amount: data.allocated_amount,
          rollup_mode: data.rollup_mode,
          notes: data.notes || null
        })
        .returning('*');

      return allocation;
    }
  }

  /**
   * Bulk set allocations (useful for setting entire budget at once)
   */
  static async bulkSetAllocations(
    householdId: string,
    month: Date,
    allocations: AllocationInput[]
  ): Promise<BudgetAllocation[]> {
    const results = await Promise.all(
      allocations.map(allocation =>
        this.setAllocation(householdId, month, allocation)
      )
    );

    return results;
  }

  /**
   * Get budget summary with spending for a month
   */
  static async getBudgetSummary(
    householdId: string,
    month: Date
  ): Promise<BudgetSummary> {
    const budgetMonth = await this.getOrCreateBudgetMonth(householdId, month);

    // Get all allocations for this month
    const allocations = await knex('budget_allocations')
      .where({ budget_month_id: budgetMonth.id });

    // Get all sections and categories
    const sections = await CategoryService.getAllSections(householdId);
    const categories = await knex('categories')
      .where({ household_id: householdId });

    // Calculate spending for the month
    // Use UTC methods to avoid timezone issues
    const monthStart = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth(), 1));
    const monthEnd = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 0, 23, 59, 59, 999));

    // Get Income section IDs to exclude from spending calculation
    const incomeSections = await knex('category_sections')
      .where({ household_id: householdId, name: 'Income' })
      .select('id');

    const incomeSectionIds = incomeSections.map(s => s.id);

    // Get all transactions for this month grouped by category
    // Exclude Income categories from spending calculation
    const spendingByCategory = await knex('transactions')
      .where({ household_id: householdId })
      .whereBetween('transaction_date', [monthStart, monthEnd])
      .whereNotNull('category_id')
      .whereNotIn('category_id', function() {
        this.select('id')
          .from('categories')
          .whereIn('section_id', incomeSectionIds);
      })
      .select('category_id')
      .sum('amount as total_spent')
      .groupBy('category_id');

    // Create a map of category spending
    const spendingMap = new Map(
      spendingByCategory.map(row => [
        row.category_id,
        Math.abs(Number(row.total_spent)) // Convert to positive for spending
      ])
    );

    // Build section summaries (exclude Income section from budget)
    const sectionSummaries: SectionSummary[] = sections
      .filter(section => section.name !== 'Income')
      .map(section => {
        const sectionCategories = categories.filter(cat => cat.section_id === section.id);

      // Check if there's a section-level allocation (rollup mode)
      const sectionAllocation = allocations.find(
        alloc => alloc.section_id === section.id && alloc.rollup_mode
      );

      let sectionAllocated = 0;
      let sectionSpent = 0;
      const categorySummaries: CategorySummary[] = [];

      let sectionAssigned = 0; // Track assigned amount for section

      if (sectionAllocation) {
        // Rollup mode: single allocation for entire section
        sectionAllocated = Number(sectionAllocation.allocated_amount);
        sectionAssigned = Number(sectionAllocation.assigned_amount || 0);

        // Calculate total spending for all categories in section
        sectionCategories.forEach(category => {
          const spent = spendingMap.get(category.id) || 0;
          sectionSpent += spent;

          categorySummaries.push({
            category_id: category.id,
            category_name: category.name,
            allocated: 0, // No individual allocation in rollup mode
            assigned: 0,  // No individual assignment in rollup mode
            spent,
            remaining: 0,
            available: 0,
            need: 0,
            activity: spent,
            allocation_notes: null
          });
        });
      } else {
        // Category-level allocations
        sectionCategories.forEach(category => {
          const categoryAllocation = allocations.find(
            alloc => alloc.category_id === category.id
          );

          const allocated = categoryAllocation
            ? Number(categoryAllocation.allocated_amount)
            : 0;
          const assigned = categoryAllocation
            ? Number(categoryAllocation.assigned_amount || 0)
            : 0;
          const spent = spendingMap.get(category.id) || 0;
          const remaining = allocated - spent;
          const available = assigned - spent;
          const need = allocated - assigned;

          sectionAllocated += allocated;
          sectionAssigned += assigned;
          sectionSpent += spent;

          categorySummaries.push({
            category_id: category.id,
            category_name: category.name,
            allocated,
            assigned,
            spent,
            remaining,
            available,
            need,
            activity: spent,
            allocation_notes: categoryAllocation?.notes || null
          });
        });
      }

      return {
        section_id: section.id,
        section_name: section.name,
        section_type: section.type,
        allocated: sectionAllocated,
        assigned: sectionAssigned,
        spent: sectionSpent,
        remaining: sectionAllocated - sectionSpent,
        available: sectionAssigned - sectionSpent,
        need: sectionAllocated - sectionAssigned,
        categories: categorySummaries,
        rollup_mode: !!sectionAllocation,
        allocation_notes: sectionAllocation?.notes || null
      };
    });

    // Calculate totals
    const totalAllocated = sectionSummaries.reduce((sum, sec) => sum + sec.allocated, 0);
    const totalAssigned = sectionSummaries.reduce((sum, sec) => sum + sec.assigned, 0);
    const totalSpent = sectionSummaries.reduce((sum, sec) => sum + sec.spent, 0);

    // Get total monthly PLANNED income from income sources
    const totalPlannedIncome = await IncomeService.getTotalMonthlyIncome(householdId);

    // Get total monthly ACTUAL income from transactions
    // (monthStart and monthEnd already declared above)
    const realIncomeResult = await knex('transactions')
      .where({ household_id: householdId })
      .whereBetween('transaction_date', [monthStart, monthEnd])
      .where('amount', '>', 0)
      .sum('amount as total')
      .first();

    const totalRealIncome = Number(realIncomeResult?.total || 0);

    // Calculate income variance and "To Be Assigned"
    const incomeVariance = totalRealIncome - totalPlannedIncome;
    const toBeAssigned = totalRealIncome - totalAssigned;

    // Calculate Goals summary (virtual section)
    const goalsContributionsResult = await knex('goal_contributions')
      .join('goals', 'goal_contributions.goal_id', 'goals.id')
      .where({ 'goals.household_id': householdId })
      .whereBetween('goal_contributions.created_at', [monthStart, monthEnd])
      .sum('goal_contributions.amount as total')
      .first();

    const totalGoalContributions = Number(goalsContributionsResult?.total || 0);

    // Get active goals and calculate monthly contributions needed
    const activeGoals = await knex('goals')
      .where({ household_id: householdId, is_completed: false })
      .select('*');

    // Calculate total planned monthly contributions
    const totalPlannedGoalContributions = activeGoals.reduce((sum, goal) => {
      // Calculate monthly contribution needed if target date is set
      if (goal.target_date) {
        const today = new Date();
        const targetDate = new Date(goal.target_date);
        const monthsRemaining = Math.max(
          (targetDate.getFullYear() - today.getFullYear()) * 12 +
          (targetDate.getMonth() - today.getMonth()),
          1 // At least 1 month
        );
        const remaining = Number(goal.target_amount) - Number(goal.current_amount);
        const monthlyNeeded = Math.ceil(remaining / monthsRemaining * 100) / 100;
        return sum + monthlyNeeded;
      }
      return sum;
    }, 0);

    // Add Goals as a virtual section
    const goalsSummary = {
      section_id: 'goals-virtual',
      section_name: 'Goals',
      section_type: 'goals',
      allocated: totalPlannedGoalContributions,  // Planned monthly contributions
      assigned: totalGoalContributions,          // Actual contributions made
      spent: totalGoalContributions,             // Same as assigned (money "spent" on goals)
      remaining: totalPlannedGoalContributions - totalGoalContributions,
      available: 0,                              // Goal money is immediately "spent"
      need: totalPlannedGoalContributions - totalGoalContributions,
      categories: [],                            // Don't show individual goals here
      rollup_mode: true,
      allocation_notes: null
    };

    // Add goals section if there are active goals or contributions
    const allSections = totalGoalContributions > 0 || activeGoals.length > 0
      ? [...sectionSummaries, goalsSummary]
      : sectionSummaries;

    const result = {
      month: budgetMonth.month,
      month_notes: budgetMonth.notes,

      // INCOME
      total_planned_income: totalPlannedIncome,
      total_real_income: totalRealIncome,
      income_variance: incomeVariance,

      // BUDGET
      total_allocated: totalAllocated,
      total_assigned: totalAssigned,
      to_be_assigned: toBeAssigned,

      // SPENDING
      total_spent: totalSpent,
      total_remaining: totalAllocated - totalSpent,
      total_available: totalAssigned - totalSpent,

      sections: allSections
    };

    logger.info(`Budget summary calculated: ${JSON.stringify({
      total_planned_income: result.total_planned_income,
      total_real_income: result.total_real_income,
      total_assigned: result.total_assigned,
      to_be_assigned: result.to_be_assigned
    })}`);

    return result;
  }

  /**
   * Delete an allocation
   */
  static async deleteAllocation(
    householdId: string,
    allocationId: string
  ): Promise<void> {
    const allocation = await knex('budget_allocations')
      .where({ id: allocationId })
      .first();

    if (!allocation) {
      throw new NotFoundError('Allocation not found');
    }

    // Verify the allocation belongs to this household
    const budgetMonth = await knex('budget_months')
      .where({ id: allocation.budget_month_id })
      .first();

    if (!budgetMonth || budgetMonth.household_id !== householdId) {
      throw new NotFoundError('Allocation not found');
    }

    await knex('budget_allocations')
      .where({ id: allocationId })
      .del();
  }

  /**
   * Get all allocations for a month
   */
  static async getAllocations(
    householdId: string,
    month: Date
  ): Promise<BudgetAllocation[]> {
    const budgetMonth = await this.getOrCreateBudgetMonth(householdId, month);

    const allocations = await knex('budget_allocations')
      .where({ budget_month_id: budgetMonth.id });

    return allocations;
  }
}
