import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api, { getApiErrorMessage } from '@/services/api';
import type { IncomeSource, CreateIncomeSourceData, UpdateIncomeSourceData } from '@/types';

export const useIncomeStore = defineStore('income', () => {
  // State
  const sources = ref<IncomeSource[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Computed
  const totalMonthlyIncome = computed(() => {
    return sources.value
      .filter(s => s.is_active)
      .reduce((sum, s) => sum + Number(s.monthly_amount), 0);
  });

  const activeSources = computed(() => {
    return sources.value.filter(s => s.is_active);
  });

  // Actions
  async function fetchIncomeSources(): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await api.get('/income');
      sources.value = response.data.data.sources;
    } catch (err: unknown) {
      error.value = getApiErrorMessage(err, 'Failed to fetch income sources');
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function createIncomeSource(data: CreateIncomeSourceData): Promise<IncomeSource> {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await api.post('/income', data);
      const newSource = response.data.data;
      sources.value.push(newSource);
      return newSource;
    } catch (err: unknown) {
      error.value = getApiErrorMessage(err, 'Failed to create income source');
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function updateIncomeSource(id: string, data: UpdateIncomeSourceData): Promise<IncomeSource> {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await api.patch(`/income/${id}`, data);
      const updated = response.data.data;

      const index = sources.value.findIndex(s => s.id === id);
      if (index !== -1) {
        sources.value[index] = updated;
      }

      return updated;
    } catch (err: unknown) {
      error.value = getApiErrorMessage(err, 'Failed to update income source');
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteIncomeSource(id: string): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      await api.delete(`/income/${id}`);
      sources.value = sources.value.filter(s => s.id !== id);
    } catch (err: unknown) {
      error.value = getApiErrorMessage(err, 'Failed to delete income source');
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
    sources,
    isLoading,
    error,
    // Computed
    totalMonthlyIncome,
    activeSources,
    // Actions
    fetchIncomeSources,
    createIncomeSource,
    updateIncomeSource,
    deleteIncomeSource,
    clearError,
  };
});
