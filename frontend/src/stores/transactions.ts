import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/services/api';
import type { Transaction, CreateTransactionData } from '@/types';

export const useTransactionsStore = defineStore('transactions', () => {
  // State
  const transactions = ref<Transaction[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Actions
  async function fetchTransactions(params?: {
    account_id?: string;
    category_id?: string;
    start_date?: string;
    end_date?: string;
  }): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await api.get('/transactions', { params });
      transactions.value = response.data.data;
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to fetch transactions';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function createTransaction(data: CreateTransactionData): Promise<Transaction> {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await api.post('/transactions', data);
      const newTransaction = response.data.data;
      transactions.value.unshift(newTransaction);
      return newTransaction;
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to create transaction';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function updateTransaction(id: string, data: Partial<CreateTransactionData>): Promise<Transaction> {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await api.patch(`/transactions/${id}`, data);
      const updatedTransaction = response.data.data;
      const index = transactions.value.findIndex((t) => t.id === id);
      if (index !== -1) {
        transactions.value[index] = updatedTransaction;
      }
      return updatedTransaction;
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to update transaction';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteTransaction(id: string): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      await api.delete(`/transactions/${id}`);
      transactions.value = transactions.value.filter((t) => t.id !== id);
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to delete transaction';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function clearTransaction(id: string): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await api.patch(`/transactions/${id}/clear`);
      const updatedTransaction = response.data.data;
      const index = transactions.value.findIndex((t) => t.id === id);
      if (index !== -1) {
        transactions.value[index] = updatedTransaction;
      }
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to clear transaction';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  function clearError(): void {
    error.value = null;
  }

  return {
    // State
    transactions,
    isLoading,
    error,
    // Actions
    fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    clearTransaction,
    clearError,
  };
});
