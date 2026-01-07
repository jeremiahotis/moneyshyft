<template>
  <div class="bg-white rounded-lg shadow-lg p-8">
    <div class="mb-6">
      <div class="flex items-center gap-2 mb-2">
        <h2 class="text-3xl font-bold text-gray-900">
          Let's estimate your utilities 💡
        </h2>
        <InfoTooltip text="Add core bills so they are covered in your budget." />
      </div>
      <p class="text-gray-600">
        These are bills that keep your home running. Don't worry about being exact - estimates are fine!
      </p>
    </div>

    <!-- Utilities -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Utilities (electric, gas, water, trash)
      </label>
      <div class="relative">
        <span class="absolute left-3 top-3 text-gray-500">$</span>
        <input
          v-model.number="utilitiesEstimate"
          type="number"
          step="0.01"
          placeholder="0.00"
          class="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <p class="text-xs text-gray-500 mt-2">
        💡 Tip: Check your last few bills and take an average
      </p>
      <p v-if="utilitiesEstimate >= 50 && utilitiesEstimate < 150" class="text-xs text-green-600 mt-1">
        ✓ Typical range for utilities
      </p>
      <p v-else-if="utilitiesEstimate >= 150 && utilitiesEstimate < 300" class="text-xs text-green-600 mt-1">
        ✓ Common for larger homes or extreme weather
      </p>
    </div>

    <!-- Internet & Phone -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Internet & Phone
      </label>
      <div class="relative">
        <span class="absolute left-3 top-3 text-gray-500">$</span>
        <input
          v-model.number="internetPhoneEstimate"
          type="number"
          step="0.01"
          placeholder="0.00"
          class="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <p class="text-xs text-gray-500 mt-2">
        💡 Tip: Include internet, mobile phone, and any streaming services you consider essential
      </p>
      <p v-if="internetPhoneEstimate >= 50 && internetPhoneEstimate < 150" class="text-xs text-green-600 mt-1">
        ✓ Typical range for internet and phone
      </p>
    </div>

    <!-- Total display -->
    <div v-if="totalUtilities > 0" class="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
      <div class="flex justify-between items-center">
        <span class="text-gray-700 font-medium">Total monthly utilities:</span>
        <span class="text-2xl font-bold text-primary-600">
          {{ formatCurrency(totalUtilities) }}
        </span>
      </div>
    </div>

    <!-- Helper text -->
    <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <p class="text-sm text-blue-900">
        💡 <strong>Utilities included in rent?</strong> Just put $0 for those! If you're not sure about amounts, make your best guess - you can always adjust later.
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
  next: [data: { utilities_estimate?: number; internet_phone_estimate?: number }];
  back: [];
}>();

const wizardStore = useWizardStore();

const utilitiesEstimate = ref(0);
const internetPhoneEstimate = ref(0);

onMounted(() => {
  // Pre-populate from stored answers if they exist
  if (wizardStore.answers.utilities_estimate) {
    utilitiesEstimate.value = wizardStore.answers.utilities_estimate;
  }
  if (wizardStore.answers.internet_phone_estimate) {
    internetPhoneEstimate.value = wizardStore.answers.internet_phone_estimate;
  }
});

const totalUtilities = computed(() => {
  return (utilitiesEstimate.value || 0) + (internetPhoneEstimate.value || 0);
});

function handleNext() {
  emit('next', {
    utilities_estimate: utilitiesEstimate.value || undefined,
    internet_phone_estimate: internetPhoneEstimate.value || undefined,
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
