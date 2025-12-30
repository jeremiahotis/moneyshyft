<template>
  <div class="bg-white rounded-lg shadow-lg p-8">
    <div class="text-center mb-8">
      <div class="text-5xl mb-3">✨</div>
      <h2 class="text-3xl font-bold text-gray-900 mb-2">
        Let's review what we've got!
      </h2>
      <p class="text-gray-600">
        Here's a summary of your budget. We're about to create everything for you.
      </p>
    </div>

    <!-- Income Summary -->
    <div v-if="answers.income_sources && answers.income_sources.length > 0" class="mb-6 p-4 border border-gray-200 rounded-lg">
      <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
        <span class="mr-2">💰</span>
        Monthly Income
      </h3>
      <div class="space-y-2">
        <div
          v-for="(source, index) in answers.income_sources"
          :key="index"
          class="flex justify-between text-sm"
        >
          <span class="text-gray-700">{{ source.name }}</span>
          <span class="font-medium">{{ formatCurrency(source.amount) }}</span>
        </div>
        <div class="pt-2 border-t border-gray-200 flex justify-between font-semibold">
          <span>Total Income:</span>
          <span class="text-primary-600">{{ formatCurrency(totalIncome) }}</span>
        </div>
      </div>
    </div>

    <!-- Expenses Summary -->
    <div class="mb-6 p-4 border border-gray-200 rounded-lg">
      <h3 class="font-semibold text-gray-900 mb-3">Monthly Expenses</h3>
      <div class="space-y-2 text-sm">
        <div v-if="answers.housing_amount" class="flex justify-between">
          <span class="text-gray-700">
            <span class="mr-2">🏠</span>
            {{ answers.housing_type === 'rent' ? 'Rent' : 'Mortgage' }}
          </span>
          <span class="font-medium">{{ formatCurrency(answers.housing_amount) }}</span>
        </div>
        <div v-if="answers.car_payments && answers.car_payments.length > 0" class="flex justify-between">
          <span class="text-gray-700"><span class="mr-2">🚗</span>Car Payment</span>
          <span class="font-medium">{{ formatCurrency(answers.car_payments.reduce((sum, p) => sum + p.amount, 0)) }}</span>
        </div>
        <div v-if="answers.car_insurance_amount" class="flex justify-between">
          <span class="text-gray-700"><span class="mr-2">🛡️</span>Car Insurance</span>
          <span class="font-medium">{{ formatCurrency(answers.car_insurance_amount) }}</span>
        </div>
        <div v-if="answers.utilities_estimate" class="flex justify-between">
          <span class="text-gray-700"><span class="mr-2">💡</span>Utilities</span>
          <span class="font-medium">{{ formatCurrency(answers.utilities_estimate) }}</span>
        </div>
        <div v-if="answers.internet_phone_estimate" class="flex justify-between">
          <span class="text-gray-700"><span class="mr-2">📱</span>Internet & Phone</span>
          <span class="font-medium">{{ formatCurrency(answers.internet_phone_estimate) }}</span>
        </div>
        <div v-if="totalDebtPayments > 0" class="flex justify-between">
          <span class="text-gray-700"><span class="mr-2">💳</span>Debt Payments</span>
          <span class="font-medium">{{ formatCurrency(totalDebtPayments) }}</span>
        </div>
        <div v-if="totalFlexibleSpending > 0" class="flex justify-between">
          <span class="text-gray-700"><span class="mr-2">🛒</span>Flexible Spending</span>
          <span class="font-medium">{{ formatCurrency(totalFlexibleSpending) }}</span>
        </div>

        <div v-if="totalExpenses > 0" class="pt-2 border-t border-gray-200 flex justify-between font-semibold">
          <span>Total Expenses:</span>
          <span>{{ formatCurrency(totalExpenses) }}</span>
        </div>
      </div>
    </div>

    <!-- Budget Summary -->
    <div class="mb-6 p-4 bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200 rounded-lg">
      <div class="flex justify-between items-center text-lg font-bold">
        <span class="text-gray-900">Left to allocate:</span>
        <span :class="remainingAmount >= 0 ? 'text-green-600' : 'text-red-600'">
          {{ formatCurrency(Math.abs(remainingAmount)) }}
        </span>
      </div>
      <p v-if="remainingAmount > 0" class="text-sm text-green-700 mt-2">
        💚 Great! You have money left over for savings or other goals.
      </p>
      <p v-else-if="remainingAmount < 0" class="text-sm text-red-700 mt-2">
        ⚠️ Your expenses are higher than your income. You may want to review and adjust some amounts.
      </p>
      <p v-else class="text-sm text-gray-700 mt-2">
        ✓ Your budget is perfectly balanced!
      </p>
    </div>

    <!-- Helper text -->
    <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <p class="text-sm text-blue-900">
        💡 <strong>Remember:</strong> This is just a starting point! You can adjust any of these amounts later as you track your actual spending.
      </p>
    </div>

    <!-- Navigation buttons -->
    <div class="flex gap-3 justify-between">
      <button
        @click="$emit('back')"
        class="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium"
      >
        ← Back to edit
      </button>

      <button
        @click="$emit('next')"
        class="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition font-medium"
      >
        Create My Budget! →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { WizardAnswers } from '@/types';

const props = defineProps<{
  answers: Partial<WizardAnswers>;
}>();

defineEmits<{
  next: [];
  back: [];
}>();

const totalIncome = computed(() => {
  return props.answers.income_sources?.reduce((sum, s) => sum + s.amount, 0) || 0;
});

const totalDebtPayments = computed(() => {
  const ccPayments = props.answers.credit_card_debts?.reduce((sum: number, p: any) => sum + p.minimum_payment, 0) || 0;
  const otherPayments = props.answers.other_debts?.reduce((sum: number, p: any) => sum + p.minimum_payment, 0) || 0;
  return ccPayments + otherPayments;
});

const totalFlexibleSpending = computed(() => {
  return (props.answers.groceries_estimate || 0) +
         (props.answers.dining_out_estimate || 0) +
         (props.answers.entertainment_estimate || 0);
});

const totalExpenses = computed(() => {
  const carPayments = props.answers.car_payments?.reduce((sum, p) => sum + p.amount, 0) || 0;
  return (props.answers.housing_amount || 0) +
         carPayments +
         (props.answers.car_insurance_amount || 0) +
         (props.answers.utilities_estimate || 0) +
         (props.answers.internet_phone_estimate || 0) +
         totalDebtPayments.value +
         totalFlexibleSpending.value;
});

const remainingAmount = computed(() => {
  return totalIncome.value - totalExpenses.value;
});

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
</script>
