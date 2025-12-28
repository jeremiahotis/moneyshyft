<template>
  <div class="bg-white rounded-lg shadow-lg p-8">
    <div class="mb-6">
      <h2 class="text-3xl font-bold text-gray-900 mb-2">
        Let's start with your income 💰
      </h2>
      <p class="text-gray-600">
        Tell us about the money you bring in each month. This helps us understand how much you have to work with.
      </p>
    </div>

    <div class="space-y-4 mb-6">
      <div
        v-for="(source, index) in sources"
        :key="index"
        class="flex gap-3 items-start"
      >
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Income source name
          </label>
          <input
            v-model="source.name"
            type="text"
            placeholder="e.g., Primary Job, Side Gig"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <p class="text-xs text-gray-500 mt-1">💡 Tip: Give it a name you'll recognize</p>
        </div>

        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Monthly amount
          </label>
          <div class="relative">
            <span class="absolute left-3 top-2 text-gray-500">$</span>
            <input
              v-model.number="source.amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <p v-if="source.amount > 0 && source.amount < 500" class="text-xs text-gray-500 mt-1">
            💡 Seems low - is this per paycheck or per month?
          </p>
          <p v-else-if="source.amount >= 500 && source.amount < 2000" class="text-xs text-green-600 mt-1">
            ✓ Typical range for part-time work
          </p>
          <p v-else-if="source.amount >= 2000 && source.amount < 10000" class="text-xs text-green-600 mt-1">
            ✓ Typical range for full-time work
          </p>
        </div>

        <button
          v-if="sources.length > 1"
          @click="removeSource(index)"
          class="mt-7 p-2 text-red-600 hover:bg-red-50 rounded"
        >
          🗑️
        </button>
      </div>
    </div>

    <!-- Add another source button -->
    <button
      @click="addSource"
      class="mb-6 w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 transition font-medium"
    >
      + Add another income source
    </button>

    <!-- Total display -->
    <div v-if="totalIncome > 0" class="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
      <div class="flex justify-between items-center">
        <span class="text-gray-700 font-medium">Total monthly income:</span>
        <span class="text-2xl font-bold text-primary-600">
          {{ formatCurrency(totalIncome) }}
        </span>
      </div>
    </div>

    <!-- Helper text -->
    <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <p class="text-sm text-blue-900">
        💡 <strong>Don't know the exact amount?</strong> Check your last 2-3 months of bank statements or pay stubs to get an average. It's okay to estimate!
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
        :disabled="!isValid"
        class="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
        I'll add this later
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useWizardStore } from '@/stores/wizard';

const emit = defineEmits<{
  next: [data: { sources: Array<{ name: string; amount: number }> }];
  back: [];
}>();

const wizardStore = useWizardStore();

const sources = ref([
  { name: '', amount: 0 }
]);

onMounted(() => {
  // Pre-populate from stored answers if they exist
  if (wizardStore.answers.income_sources && wizardStore.answers.income_sources.length > 0) {
    sources.value = wizardStore.answers.income_sources.map(s => ({ ...s }));
  }
});

const totalIncome = computed(() => {
  return sources.value.reduce((sum, s) => sum + (s.amount || 0), 0);
});

const isValid = computed(() => {
  return sources.value.some(s => s.name.trim() && s.amount > 0);
});

function addSource() {
  sources.value.push({ name: '', amount: 0 });
}

function removeSource(index: number) {
  sources.value.splice(index, 1);
}

function handleNext() {
  const validSources = sources.value.filter(s => s.name.trim() && s.amount > 0);
  emit('next', { sources: validSources });
}

function handleSkip() {
  emit('next', { sources: [] });
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
</script>
