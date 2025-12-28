<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    @click.self="close"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-bold">Assign Income</h2>
            <p class="text-sm opacity-90 mt-1">
              Available to assign: {{ formatCurrency(assignmentsStore.toBeAssigned) }}
            </p>
          </div>
          <button
            @click="close"
            class="text-white hover:bg-white/20 rounded-full p-2 transition"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-8">
          <p class="text-gray-600">Loading income transactions...</p>
        </div>

        <!-- No Income -->
        <div v-else-if="incomeTransactions.length === 0" class="text-center py-8">
          <p class="text-gray-600">No income transactions found for this month.</p>
          <p class="text-sm text-gray-500 mt-2">
            Add income transactions first, then assign the money to categories.
          </p>
        </div>

        <!-- Income Transactions List -->
        <div v-else class="space-y-4">
          <div
            v-for="transaction in incomeTransactions"
            :key="transaction.id"
            class="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition"
          >
            <!-- Transaction Header -->
            <div class="flex justify-between items-start mb-3">
              <div>
                <h3 class="font-semibold text-gray-900">{{ transaction.payee }}</h3>
                <p class="text-sm text-gray-600">
                  {{ formatDate(transaction.transaction_date) }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-xl font-bold text-green-600">
                  {{ formatCurrency(transaction.amount) }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ formatCurrency(getAssigned(transaction.id)) }} assigned
                </p>
              </div>
            </div>

            <!-- Available to Assign -->
            <div class="mb-3 p-2 bg-gray-50 rounded">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Available:</span>
                <span class="font-semibold" :class="getAvailable(transaction.id) > 0 ? 'text-green-600' : 'text-gray-600'">
                  {{ formatCurrency(getAvailable(transaction.id)) }}
                </span>
              </div>
            </div>

            <!-- Assignment Form (if available) -->
            <div v-if="getAvailable(transaction.id) > 0" class="space-y-3">
              <div class="grid grid-cols-2 gap-3">
                <!-- Category/Section Selector -->
                <div>
                  <label class="block text-xs text-gray-600 mb-1">Assign To</label>
                  <select
                    v-model="assignmentForms[transaction.id].targetId"
                    @change="handleTargetChange(transaction.id)"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select category...</option>
                    <optgroup
                      v-for="section in categoriesStore.sections"
                      :key="section.id"
                      :label="section.name"
                    >
                      <option
                        v-for="category in getCategoriesForSection(section.id)"
                        :key="category.id"
                        :value="`category:${category.id}`"
                      >
                        {{ category.name }}
                      </option>
                    </optgroup>
                  </select>
                </div>

                <!-- Amount -->
                <div>
                  <label class="block text-xs text-gray-600 mb-1">Amount</label>
                  <div class="relative">
                    <span class="absolute left-3 top-2 text-gray-500 text-sm">$</span>
                    <input
                      v-model.number="assignmentForms[transaction.id].amount"
                      type="number"
                      step="0.01"
                      min="0"
                      :max="getAvailable(transaction.id)"
                      class="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-2">
                <button
                  @click="assignManual(transaction.id)"
                  :disabled="!canAssign(transaction.id)"
                  class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition text-sm"
                >
                  Assign
                </button>
                <button
                  @click="autoAssignTransaction(transaction.id)"
                  class="px-4 py-2 border border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition text-sm"
                >
                  Auto-Assign
                </button>
              </div>
            </div>

            <!-- Already Fully Assigned -->
            <div v-else class="text-center py-2">
              <p class="text-sm text-green-600 font-medium">✓ Fully Assigned</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="border-t border-gray-200 px-6 py-4 bg-gray-50">
        <button
          @click="close"
          class="w-full px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
        >
          Done
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useAssignmentsStore } from '@/stores/assignments';
import { useCategoriesStore } from '@/stores/categories';
import { useBudgetsStore } from '@/stores/budgets';
import api from '@/services/api';
import type { Transaction, IncomeAssignment } from '@/types';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  assigned: [];
}>();

const assignmentsStore = useAssignmentsStore();
const categoriesStore = useCategoriesStore();
const budgetsStore = useBudgetsStore();

const isLoading = ref(false);
const incomeTransactions = ref<Transaction[]>([]);
const transactionAssignments = ref<Map<string, IncomeAssignment[]>>(new Map());

// Assignment form for each transaction
const assignmentForms = ref<Record<string, { targetId: string; amount: number }>>({});

const close = () => {
  emit('update:modelValue', false);
};

// Load income transactions when modal opens
watch(() => props.modelValue, async (newValue) => {
  if (newValue) {
    await loadData();
  }
});

async function loadData() {
  isLoading.value = true;
  try {
    // Load income transactions for current month
    const response = await api.get(`/transactions?month=${budgetsStore.currentMonth}`);
    const allTransactions = response.data.data;

    // Filter for income (positive amounts)
    incomeTransactions.value = allTransactions.filter((t: Transaction) => t.amount > 0);

    // Load assignments for each transaction
    for (const transaction of incomeTransactions.value) {
      const assignments = await assignmentsStore.getTransactionAssignments(transaction.id);
      transactionAssignments.value.set(transaction.id, assignments);

      // Initialize form
      assignmentForms.value[transaction.id] = {
        targetId: '',
        amount: getAvailable(transaction.id)
      };
    }
  } catch (error) {
    console.error('Failed to load income transactions:', error);
  } finally {
    isLoading.value = false;
  }
}

function getAssigned(transactionId: string): number {
  const assignments = transactionAssignments.value.get(transactionId) || [];
  return assignments.reduce((sum, a) => sum + a.amount, 0);
}

function getAvailable(transactionId: string): number {
  const transaction = incomeTransactions.value.find(t => t.id === transactionId);
  if (!transaction) return 0;
  return transaction.amount - getAssigned(transactionId);
}

function getCategoriesForSection(sectionId: string) {
  return categoriesStore.categories.filter(c => c.section_id === sectionId);
}

function handleTargetChange(transactionId: string) {
  // Auto-fill amount with available when target changes
  assignmentForms.value[transactionId].amount = getAvailable(transactionId);
}

function canAssign(transactionId: string): boolean {
  const form = assignmentForms.value[transactionId];
  return !!(form.targetId && form.amount > 0 && form.amount <= getAvailable(transactionId));
}

async function assignManual(transactionId: string) {
  const form = assignmentForms.value[transactionId];

  if (!canAssign(transactionId)) {
    alert('Please select a category and enter a valid amount');
    return;
  }

  try {
    // Parse target (format: "category:uuid" or "section:uuid")
    const [type, id] = form.targetId.split(':');

    await assignmentsStore.createAssignment({
      income_transaction_id: transactionId,
      ...(type === 'category' ? { category_id: id } : { section_id: id }),
      amount: form.amount
    });

    // Reload data
    await loadData();
    emit('assigned');

    // Reset form
    assignmentForms.value[transactionId] = {
      targetId: '',
      amount: getAvailable(transactionId)
    };
  } catch (error: any) {
    alert(error.response?.data?.error || 'Failed to assign. Please try again.');
  }
}

async function autoAssignTransaction(transactionId: string) {
  if (!confirm('Auto-assign will allocate this income to underfunded categories. Continue?')) {
    return;
  }

  try {
    await assignmentsStore.autoAssign(transactionId);
    await loadData();
    emit('assigned');
  } catch (error: any) {
    alert(error.response?.data?.error || 'Failed to auto-assign. Please try again.');
  }
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Load categories on mount
onMounted(async () => {
  if (!categoriesStore.sections.length) {
    await categoriesStore.fetchCategories();
  }
});
</script>
