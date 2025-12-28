<template>
  <AppLayout>
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Transactions</h1>
        <button
          @click="showAddModal = true"
          class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium"
        >
          + Add Transaction
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="transactionsStore.isLoading && transactions.length === 0" class="text-center py-12">
        <p class="text-gray-500">Loading transactions...</p>
      </div>

      <!-- Transactions List -->
      <div v-else-if="transactions.length > 0" class="bg-white rounded-lg shadow">
        <div
          v-for="transaction in transactions"
          :key="transaction.id"
          class="p-4 border-b last:border-b-0 hover:bg-gray-50"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <h3 class="font-medium text-gray-900">{{ transaction.payee }}</h3>
                <span
                  v-if="transaction.is_cleared"
                  class="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded"
                >
                  Cleared
                </span>
              </div>
              <p class="text-sm text-gray-500 mt-1">
                {{ formatDate(transaction.transaction_date) }}
              </p>
              <p v-if="transaction.notes" class="text-sm text-gray-600 mt-1">
                {{ transaction.notes }}
              </p>
            </div>
            <div class="text-right">
              <p
                :class="transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'"
                class="font-semibold"
              >
                {{ formatCurrency(transaction.amount) }}
              </p>
              <div class="flex gap-2 justify-end mt-1">
                <button
                  @click="editTransaction(transaction)"
                  class="text-xs text-gray-600 hover:text-gray-900"
                >
                  Edit
                </button>
                <button
                  v-if="!transaction.is_cleared"
                  @click="clearTransaction(transaction.id)"
                  class="text-xs text-primary-600 hover:text-primary-700"
                >
                  Mark Cleared
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <p class="text-gray-500 mb-4">No transactions yet. Add your first transaction!</p>
        <button
          @click="showAddModal = true"
          class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium"
        >
          + Add Transaction
        </button>
      </div>

      <!-- Add Transaction Modal -->
      <div
        v-if="showAddModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="closeModal"
      >
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
          <h2 class="text-xl font-semibold mb-4">
            {{ editingTransaction ? 'Edit Transaction' : 'Add Transaction' }}
          </h2>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Account</label>
              <select
                v-model="formData.account_id"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select an account</option>
                <option v-for="account in accounts" :key="account.id" :value="account.id">
                  {{ account.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Payee</label>
              <input
                v-model="formData.payee"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., Whole Foods"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <div class="flex gap-2 mb-4">
                <button
                  type="button"
                  @click="transactionType = 'expense'"
                  :class="transactionType === 'expense' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'"
                  class="flex-1 py-2 px-4 rounded-lg font-medium hover:opacity-90 transition"
                >
                  Expense
                </button>
                <button
                  type="button"
                  @click="transactionType = 'income'"
                  :class="transactionType === 'income' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'"
                  class="flex-1 py-2 px-4 rounded-lg font-medium hover:opacity-90 transition"
                >
                  Income
                </button>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                v-model.number="formAmount"
                type="number"
                step="0.01"
                min="0"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                v-model="formData.transaction_date"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                v-model="formData.category_id"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option :value="null">Uncategorized</option>
                <optgroup v-for="section in sections" :key="section.id" :label="section.name">
                  <option
                    v-for="category in section.categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </optgroup>
              </select>

              <!-- Add Category Button -->
              <button
                v-if="!showAddCategory"
                type="button"
                @click="showAddCategory = true"
                class="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                + New Category
              </button>

              <!-- Inline Category Creation Form -->
              <div v-if="showAddCategory" class="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <h4 class="text-sm font-medium text-gray-900 mb-3">Create New Category</h4>
                <div class="space-y-2">
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Section</label>
                    <select
                      v-model="newCategoryData.section_id"
                      required
                      class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select a section</option>
                      <option v-for="section in sections" :key="section.id" :value="section.id">
                        {{ section.name }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Category Name</label>
                    <input
                      v-model="newCategoryData.name"
                      type="text"
                      required
                      class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Groceries"
                    />
                  </div>
                  <div class="flex gap-2 pt-1">
                    <button
                      type="button"
                      @click="cancelAddCategory"
                      class="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      @click="handleCreateCategory"
                      :disabled="!newCategoryData.section_id || !newCategoryData.name"
                      class="flex-1 px-3 py-1.5 text-sm bg-primary-600 hover:bg-primary-700 text-white rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="activeGoals.length > 0">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Link to Goal (optional)
              </label>
              <select
                v-model="selectedGoalId"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option :value="null">No goal</option>
                <option
                  v-for="goal in activeGoals"
                  :key="goal.id"
                  :value="goal.id"
                >
                  {{ goal.name }} ({{ formatCurrency(goal.current_amount) }} / {{ formatCurrency(goal.target_amount) }})
                </option>
              </select>
              <p class="text-xs text-gray-500 mt-1">
                This transaction will count as a contribution to the selected goal
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
              <textarea
                v-model="formData.notes"
                rows="2"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Add any notes..."
              ></textarea>
            </div>
            <div class="flex gap-2 pt-4">
              <button
                type="button"
                @click="closeModal"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="transactionsStore.isLoading"
                class="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium disabled:opacity-50"
              >
                {{ editingTransaction ? 'Update' : 'Create' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTransactionsStore } from '@/stores/transactions';
import { useAccountsStore } from '@/stores/accounts';
import { useCategoriesStore } from '@/stores/categories';
import { useGoalsStore } from '@/stores/goals';
import AppLayout from '@/components/layout/AppLayout.vue';
import type { CreateTransactionData, Transaction } from '@/types';

const route = useRoute();
const transactionsStore = useTransactionsStore();
const accountsStore = useAccountsStore();
const categoriesStore = useCategoriesStore();
const goalsStore = useGoalsStore();

const showAddModal = ref(false);
const editingTransaction = ref<Transaction | null>(null);
const transactionType = ref<'expense' | 'income'>('expense');
const formAmount = ref(0);

// Category creation state
const showAddCategory = ref(false);
const newCategoryData = ref({
  section_id: '',
  name: '',
});

// Goal selection state
const selectedGoalId = ref<string | null>(null);

const formData = ref<CreateTransactionData>({
  account_id: '',
  payee: '',
  amount: 0,
  transaction_date: new Date().toISOString().split('T')[0],
  category_id: null,
  notes: '',
});

const transactions = computed(() => transactionsStore.transactions);
const accounts = computed(() => accountsStore.accounts);
const sections = computed(() => categoriesStore.sections);
const activeGoals = computed(() => goalsStore.goals.filter(g => !g.is_completed));

onMounted(async () => {
  await Promise.all([
    transactionsStore.fetchTransactions(route.query.account_id ? { account_id: route.query.account_id as string } : {}),
    accountsStore.fetchAccounts(),
    categoriesStore.fetchCategories(),
    goalsStore.fetchGoals(),
  ]);

  if (route.query.account_id) {
    formData.value.account_id = route.query.account_id as string;
  }
});

function closeModal() {
  showAddModal.value = false;
  editingTransaction.value = null;
  transactionType.value = 'expense';
  formAmount.value = 0;
  selectedGoalId.value = null;
  formData.value = {
    account_id: route.query.account_id ? (route.query.account_id as string) : '',
    payee: '',
    amount: 0,
    transaction_date: new Date().toISOString().split('T')[0],
    category_id: null,
    notes: '',
  };

  // Reset category creation form
  cancelAddCategory();
}

async function handleSubmit() {
  try {
    // Apply sign based on transaction type
    const amount = transactionType.value === 'expense' ? -Math.abs(formAmount.value) : Math.abs(formAmount.value);

    let transaction;
    if (editingTransaction.value) {
      // Update existing transaction
      transaction = await transactionsStore.updateTransaction(editingTransaction.value.id, {
        ...formData.value,
        amount,
      });
    } else {
      // Create new transaction
      transaction = await transactionsStore.createTransaction({
        ...formData.value,
        amount,
      });
    }

    // If a goal is selected, create a contribution
    if (selectedGoalId.value && transaction) {
      await goalsStore.addContribution(selectedGoalId.value, {
        amount: Math.abs(formAmount.value), // Use positive amount for contributions
        transaction_id: transaction.id,
        notes: formData.value.notes || `Contribution from transaction: ${formData.value.payee}`,
      });
    }

    closeModal();
  } catch (error) {
    console.error('Failed to save transaction:', error);
  }
}

async function clearTransaction(id: string) {
  try {
    await transactionsStore.clearTransaction(id);
  } catch (error) {
    console.error('Failed to clear transaction:', error);
  }
}

function editTransaction(transaction: Transaction) {
  editingTransaction.value = transaction;
  showAddModal.value = true;

  // Pre-populate form with transaction data
  formData.value = {
    account_id: transaction.account_id,
    payee: transaction.payee,
    amount: Math.abs(transaction.amount),
    transaction_date: transaction.transaction_date,
    category_id: transaction.category_id,
    notes: transaction.notes || '',
  };

  // Set transaction type based on amount sign
  transactionType.value = transaction.amount < 0 ? 'expense' : 'income';
  formAmount.value = Math.abs(transaction.amount);
}

async function handleCreateCategory() {
  try {
    if (!newCategoryData.value.section_id || !newCategoryData.value.name) {
      return;
    }

    const newCategory = await categoriesStore.createCategory({
      section_id: newCategoryData.value.section_id,
      name: newCategoryData.value.name,
    });

    // Automatically select the newly created category
    formData.value.category_id = newCategory.id;

    // Reset and hide the form
    cancelAddCategory();
  } catch (error) {
    console.error('Failed to create category:', error);
  }
}

function cancelAddCategory() {
  showAddCategory.value = false;
  newCategoryData.value = {
    section_id: '',
    name: '',
  };
}

function formatCurrency(amount: number): string {
  const absAmount = Math.abs(amount);
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(absAmount);
  return amount < 0 ? `-${formatted}` : formatted;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
</script>
