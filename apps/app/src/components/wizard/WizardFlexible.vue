<template>
  <div class="bg-white rounded-lg shadow-lg p-8">
    <div class="mb-6">
      <div class="flex items-center gap-2 mb-2">
        <h2 class="text-3xl font-bold text-gray-900">
          Everyday spending 🛒
        </h2>
        <InfoTooltip text="Flexible categories cover day-to-day spending." />
      </div>
      <p class="text-gray-600">
        Let's estimate what you typically spend on flexible categories each month.
      </p>
    </div>

    <!-- Groceries -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Groceries & household items
      </label>
      <div class="relative">
        <span class="absolute left-3 top-3 text-gray-500">$</span>
        <input
          v-model.number="groceriesEstimate"
          type="number"
          step="0.01"
          placeholder="0.00"
          class="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <p class="text-xs text-gray-500 mt-2">
        💡 Tip: Think about weekly shopping trips - multiply by 4 for the month
      </p>
      <p v-if="groceriesEstimate >= 200 && groceriesEstimate < 400" class="text-xs text-green-600 mt-1">
        ✓ Common range for 1-2 people
      </p>
      <p v-else-if="groceriesEstimate >= 400 && groceriesEstimate < 800" class="text-xs text-green-600 mt-1">
        ✓ Common range for families
      </p>
    </div>

    <!-- Dining Out -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Dining out & takeout
      </label>
      <div class="relative">
        <span class="absolute left-3 top-3 text-gray-500">$</span>
        <input
          v-model.number="diningOutEstimate"
          type="number"
          step="0.01"
          placeholder="0.00"
          class="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <p class="text-xs text-gray-500 mt-2">
        💡 Tip: Include coffee shops, restaurants, and food delivery
      </p>
      <p v-if="diningOutEstimate >= 100 && diningOutEstimate < 300" class="text-xs text-green-600 mt-1">
        ✓ Moderate dining out budget
      </p>
    </div>

    <!-- Entertainment -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Entertainment & hobbies
      </label>
      <div class="relative">
        <span class="absolute left-3 top-3 text-gray-500">$</span>
        <input
          v-model.number="entertainmentEstimate"
          type="number"
          step="0.01"
          placeholder="0.00"
          class="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <p class="text-xs text-gray-500 mt-2">
        💡 Tip: Movies, concerts, hobbies, subscriptions, shopping for fun
      </p>
    </div>

    <!-- Gas & Transportation -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Gas & transportation
      </label>
      <div class="relative">
        <span class="absolute left-3 top-3 text-gray-500">$</span>
        <input
          v-model.number="gasTransportationEstimate"
          type="number"
          step="0.01"
          placeholder="0.00"
          class="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <p class="text-xs text-gray-500 mt-2">
        💡 Tip: Fuel, transit passes, rideshare, parking
      </p>
    </div>

    <!-- Shopping -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Shopping
      </label>
      <div class="relative">
        <span class="absolute left-3 top-3 text-gray-500">$</span>
        <input
          v-model.number="shoppingEstimate"
          type="number"
          step="0.01"
          placeholder="0.00"
          class="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <p class="text-xs text-gray-500 mt-2">
        💡 Tip: Clothing, household items, misc purchases
      </p>
    </div>

    <!-- Personal Care -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Personal care
      </label>
      <div class="relative">
        <span class="absolute left-3 top-3 text-gray-500">$</span>
        <input
          v-model.number="personalCareEstimate"
          type="number"
          step="0.01"
          placeholder="0.00"
          class="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <p class="text-xs text-gray-500 mt-2">
        💡 Tip: Haircuts, toiletries, self-care subscriptions
      </p>
    </div>

    <!-- Total display -->
    <div v-if="totalFlexible > 0" class="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
      <div class="flex justify-between items-center">
        <span class="text-gray-700 font-medium">Total flexible spending:</span>
        <span class="text-2xl font-bold text-primary-600">
          {{ formatCurrency(totalFlexible) }}
        </span>
      </div>
    </div>

    <!-- Helper text -->
    <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <p class="text-sm text-blue-900">
        💡 <strong>Not sure?</strong> Look at your last month's bank or credit card statements to see what you actually spent. These are estimates - you'll track real spending as you go!
      </p>
    </div>

    <!-- Navigation buttons -->
    <div class="flex gap-3 justify-between">
      <button
        @click="$emit('back')"
        class="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium"
      >
        ← Back
      </button>

      <button
        @click="handleNext"
        class="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition font-medium"
      >
        Continue →
      </button>
    </div>

    <!-- Skip option -->
    <div class="mt-4 text-center">
      <button
        @click="handleSkip"
        class="text-sm text-gray-500 hover:text-gray-700 underline"
      >
        Not now
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import { ref, computed, onMounted } from 'vue';
import { useWizardStore } from '@/stores/wizard';

const emit = defineEmits<{
  next: [data: {
    groceries_estimate?: number;
    dining_out_estimate?: number;
    entertainment_estimate?: number;
    gas_transportation_estimate?: number;
    shopping_estimate?: number;
    personal_care_estimate?: number;
  }];
  back: [];
}>();

const wizardStore = useWizardStore();

const groceriesEstimate = ref(0);
const diningOutEstimate = ref(0);
const entertainmentEstimate = ref(0);
const gasTransportationEstimate = ref(0);
const shoppingEstimate = ref(0);
const personalCareEstimate = ref(0);

onMounted(() => {
  // Pre-populate from stored answers if they exist
  if (wizardStore.answers.groceries_estimate) {
    groceriesEstimate.value = wizardStore.answers.groceries_estimate;
  }
  if (wizardStore.answers.dining_out_estimate) {
    diningOutEstimate.value = wizardStore.answers.dining_out_estimate;
  }
  if (wizardStore.answers.entertainment_estimate) {
    entertainmentEstimate.value = wizardStore.answers.entertainment_estimate;
  }
  if (wizardStore.answers.gas_transportation_estimate) {
    gasTransportationEstimate.value = wizardStore.answers.gas_transportation_estimate;
  }
  if (wizardStore.answers.shopping_estimate) {
    shoppingEstimate.value = wizardStore.answers.shopping_estimate;
  }
  if (wizardStore.answers.personal_care_estimate) {
    personalCareEstimate.value = wizardStore.answers.personal_care_estimate;
  }
});

const totalFlexible = computed(() => {
  return (groceriesEstimate.value || 0) +
         (diningOutEstimate.value || 0) +
         (entertainmentEstimate.value || 0) +
         (gasTransportationEstimate.value || 0) +
         (shoppingEstimate.value || 0) +
         (personalCareEstimate.value || 0);
});

function handleNext() {
  emit('next', {
    groceries_estimate: groceriesEstimate.value || undefined,
    dining_out_estimate: diningOutEstimate.value || undefined,
    entertainment_estimate: entertainmentEstimate.value || undefined,
    gas_transportation_estimate: gasTransportationEstimate.value || undefined,
    shopping_estimate: shoppingEstimate.value || undefined,
    personal_care_estimate: personalCareEstimate.value || undefined,
  });
}

function handleSkip() {
  emit('next', {});
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
</script>
