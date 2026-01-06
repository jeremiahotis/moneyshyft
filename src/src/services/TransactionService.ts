import knex from '../config/knex';
import { NotFoundError, BadRequestError } from '../middleware/errorHandler';
import { AccountService } from './AccountService';
import { ExtraMoneyService, type ExtraMoneyEntry } from './ExtraMoneyService';
import logger from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

interface Transaction {
  id: string;
  household_id: string;
  account_id: string;
  category_id: string | null;
  debt_id: string | null;  // NEW: Optional debt link
  payee: string;
  amount: number;
  transaction_date: Date;
  notes: string | null;
  is_cleared: boolean;
  is_reconciled: boolean;
  created_by_user_id: string | null;
  parent_transaction_id: string | null;
  is_split_child: boolean;
  created_at: Date;
  updated_at: Date;
}

interface TransactionCreateResult extends Transaction {
  extra_money_detected: boolean;
  extra_money_entry?: ExtraMoneyEntry | null;
}

interface CreateTransactionData {
  account_id: string;
  category_id?: string | null;
  debt_id?: string | null;  // NEW: Optional debt link
  payee: string;
  amount: number;
  transaction_date: Date;
  notes?: string | null;
  is_cleared?: boolean;
  is_reconciled?: boolean;
}

interface UpdateTransactionData {
  category_id?: string | null;
  payee?: string;
  amount?: number;
  transaction_date?: Date;
  notes?: string | null;
  is_cleared?: boolean;
  is_reconciled?: boolean;
}

export class TransactionService {
  /**
   * Get all transactions for a household with optional filters
   */
  static async getAllTransactions(
    householdId: string,
    filters?: {
      account_id?: string;
      category_id?: string;
      start_date?: Date;
      end_date?: Date;
      limit?: number;
      offset?: number;
      include_split_children?: boolean; // Optional flag to include split children
    }
  ): Promise<Transaction[]> {
    let query = knex('transactions')
      .where({ household_id: householdId })
      .orderBy('transaction_date', 'desc');

    // By default, exclude split children from the list (only show parent transactions)
    // This prevents double-counting and keeps the UI cleaner
    if (!filters?.include_split_children) {
      query = query.where({ is_split_child: false });
    }

    // Apply filters
    if (filters?.account_id) {
      query = query.where({ account_id: filters.account_id });
    }

    if (filters?.category_id) {
      query = query.where({ category_id: filters.category_id });
    }

    if (filters?.start_date) {
      query = query.where('transaction_date', '>=', filters.start_date);
    }

    if (filters?.end_date) {
      query = query.where('transaction_date', '<=', filters.end_date);
    }

    // Pagination
    const limit = filters?.limit || 50;
    const offset = filters?.offset || 0;
    query = query.limit(limit).offset(offset);

    const transactions = await query;
    return transactions;
  }

  /**
   * Get a single transaction by ID
   */
  static async getTransactionById(transactionId: string, householdId: string): Promise<Transaction> {
    const transaction = await knex('transactions')
      .where({ id: transactionId, household_id: householdId })
      .first();

    if (!transaction) {
      throw new NotFoundError('Transaction not found');
    }

    return transaction;
  }

  /**
   * Create a new transaction and update account balance
   * If linked to a debt, also creates a debt_payment record
   * Automatically detects extra money for positive transactions
   */
  static async createTransaction(
    householdId: string,
    userId: string,
    data: CreateTransactionData
  ): Promise<TransactionCreateResult> {
    const { account_id, category_id, debt_id, payee, amount, transaction_date, notes, is_cleared = false, is_reconciled = false } = data;

    // Verify account belongs to household
    await AccountService.getAccountById(account_id, householdId);

    // If category provided, verify it belongs to household
    if (category_id) {
      const category = await knex('categories')
        .where({ id: category_id, household_id: householdId })
        .first();

      if (!category) {
        throw new BadRequestError('Category not found or does not belong to this household');
      }
    }

    // If debt provided, verify it belongs to household
    if (debt_id) {
      const debt = await knex('debts')
        .where({ id: debt_id, household_id: householdId })
        .first();

      if (!debt) {
        throw new BadRequestError('Debt not found or does not belong to this household');
      }
    }

    // Use a transaction to ensure atomicity when creating debt payments
    return await knex.transaction(async (trx) => {
      // Create transaction
      const [transaction] = await trx('transactions')
        .insert({
          household_id: householdId,
          account_id,
          category_id: category_id || null,
          debt_id: debt_id || null,  // NEW: Link to debt
          payee,
          amount,
          transaction_date,
          notes: notes || null,
          is_cleared,
          is_reconciled,
          created_by_user_id: userId,
          parent_transaction_id: null,
          is_split_child: false,
        })
        .returning('*');

      // If transaction is linked to a debt and uses the Debt Payments category, create debt_payment record
      if (debt_id && category_id) {
        const debtCategory = await trx('categories')
          .where({ id: category_id, name: 'Debt Payments' })
          .first();

        if (debtCategory) {
          // This is a debt payment transaction - create payment record
          const paymentAmount = Math.abs(amount);  // Ensure positive for payment record

          await trx('debt_payments').insert({
            id: uuidv4(),
            debt_id: debt_id,
            user_id: userId,
            amount: paymentAmount,
            payment_date: transaction_date,
            notes: notes || null,
            transaction_id: transaction.id,
          });

          // Update debt balance
          await trx('debts')
            .where({ id: debt_id })
            .decrement('current_balance', paymentAmount)
            .update({
              updated_at: trx.fn.now()
            });

          // Check if debt is now paid off
          const updatedDebt = await trx('debts')
            .where({ id: debt_id })
            .first();

          if (updatedDebt && updatedDebt.current_balance <= 0) {
            await trx('debts')
              .where({ id: debt_id })
              .update({
                is_paid_off: true,
                paid_off_at: trx.fn.now(),
                current_balance: 0  // Ensure balance doesn't go negative
              });
          }

          logger.info(`Debt payment transaction created: ${transaction.id}, debt_payment created for debt: ${debt_id}`);
        }
      }

      // Recalculate account balance
      await AccountService.recalculateBalance(account_id, householdId);

      // AUTO-DETECT EXTRA MONEY (if positive income transaction)
      let extraMoneyDetected = false;
      let extraMoneyEntry: ExtraMoneyEntry | null = null;

      if (amount > 0) {
        const { shouldFlag, reason } = await ExtraMoneyService.detectExtraMoney(
          householdId,
          transaction.id,
          trx
        );

        if (shouldFlag) {
          extraMoneyEntry = await ExtraMoneyService.createExtraMoneyEntry({
            household_id: householdId,
            transaction_id: transaction.id,
            source: payee || 'Unknown Source',
            amount: amount,
            received_date: transaction_date,
            notes: notes || null,
            auto_detected: true,
            detection_reason: reason,
            user_id: userId
          }, trx);

          extraMoneyDetected = true;
          logger.info(`Extra money detected for transaction: ${transaction.id}, entry: ${extraMoneyEntry.id}`);
        }
      }

      logger.info(`Transaction created: ${transaction.id} for account: ${account_id}`);

      // Return transaction with extra money flag
      return {
        ...transaction,
        extra_money_detected: extraMoneyDetected,
        extra_money_entry: extraMoneyEntry
      };
    });
  }

  /**
   * Update a transaction and recalculate account balance
   */
  static async updateTransaction(
    transactionId: string,
    householdId: string,
    data: UpdateTransactionData
  ): Promise<Transaction> {
    // Check if transaction exists and belongs to household
    const existingTransaction = await this.getTransactionById(transactionId, householdId);

    // Check if transaction is split (has children)
    const splitChildren = await knex('transactions')
      .where({ parent_transaction_id: transactionId })
      .count('* as count')
      .first();

    const isSplit = splitChildren && parseInt(splitChildren.count as string) > 0;

    // Prevent amount updates on split transactions
    if (isSplit && data.amount !== undefined) {
      throw new BadRequestError(
        'Cannot change amount on a split transaction. Please unsplit the transaction first, then edit the amount.'
      );
    }

    // Prevent split children from being edited directly
    if (existingTransaction.is_split_child) {
      throw new BadRequestError(
        'Cannot edit a split child transaction directly. Please update the parent transaction splits instead.'
      );
    }

    // If category is being updated, verify it belongs to household
    if (data.category_id !== undefined && data.category_id !== null) {
      const category = await knex('categories')
        .where({ id: data.category_id, household_id: householdId })
        .first();

      if (!category) {
        throw new BadRequestError('Category not found or does not belong to this household');
      }
    }

    // Update transaction
    const [updatedTransaction] = await knex('transactions')
      .where({ id: transactionId, household_id: householdId })
      .update({
        ...data,
        updated_at: knex.fn.now()
      })
      .returning('*');

    // Recalculate account balance (amount or account may have changed)
    await AccountService.recalculateBalance(existingTransaction.account_id, householdId);

    logger.info(`Transaction updated: ${transactionId}`);

    return updatedTransaction;
  }

  /**
   * Delete a transaction and recalculate account balance
   */
  static async deleteTransaction(transactionId: string, householdId: string): Promise<void> {
    // Check if transaction exists and belongs to household
    const transaction = await this.getTransactionById(transactionId, householdId);

    // Delete transaction
    await knex('transactions')
      .where({ id: transactionId, household_id: householdId })
      .del();

    // Recalculate account balance
    await AccountService.recalculateBalance(transaction.account_id, householdId);

    logger.info(`Transaction deleted: ${transactionId}`);
  }

  /**
   * Mark transaction as cleared
   */
  static async clearTransaction(transactionId: string, householdId: string): Promise<Transaction> {
    return this.updateTransaction(transactionId, householdId, { is_cleared: true });
  }

  /**
   * Mark transaction as reconciled (implies cleared)
   */
  static async reconcileTransaction(transactionId: string, householdId: string): Promise<Transaction> {
    return this.updateTransaction(transactionId, householdId, {
      is_cleared: true,
      is_reconciled: true
    });
  }

  /**
   * Get transactions for a specific account
   */
  static async getAccountTransactions(
    accountId: string,
    householdId: string,
    limit = 50,
    offset = 0
  ): Promise<Transaction[]> {
    // Verify account belongs to household
    await AccountService.getAccountById(accountId, householdId);

    return this.getAllTransactions(householdId, {
      account_id: accountId,
      limit,
      offset
    });
  }

  /**
   * Get transactions for a specific category
   */
  static async getCategoryTransactions(
    categoryId: string,
    householdId: string,
    limit = 50,
    offset = 0
  ): Promise<Transaction[]> {
    return this.getAllTransactions(householdId, {
      category_id: categoryId,
      limit,
      offset
    });
  }

  /**
   * Get all income transactions for a household in a given month
   * Income transactions are identified by positive amount values
   */
  static async getIncomeTransactions(
    householdId: string,
    month: string
  ): Promise<Transaction[]> {
    const monthStart = `${month}-01`;
    const lastDay = new Date(
      parseInt(month.split('-')[0]),
      parseInt(month.split('-')[1]),
      0
    ).getDate();
    const monthEnd = `${month}-${String(lastDay).padStart(2, '0')}`;

    const transactions = await knex('transactions')
      .where({ household_id: householdId })
      .whereBetween('transaction_date', [monthStart, monthEnd])
      .where('amount', '>', 0) // Income only (positive amounts)
      .orderBy('transaction_date', 'desc')
      .select('*');

    return transactions.map((t) => ({
      ...t,
      amount: Number(t.amount),
    }));
  }
}
