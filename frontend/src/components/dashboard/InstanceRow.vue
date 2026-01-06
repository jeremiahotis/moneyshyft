<template>
  <div class="flex items-start justify-between p-3 bg-gray-50 rounded border border-gray-200">
    <div class="flex-1">
      <div class="flex items-center gap-2">
        <h4 class="font-medium text-gray-900">{{ instance.payee }}</h4>
        <span
          :class="badgeClasses"
          class="px-2 py-0.5 text-xs font-medium rounded"
        >
          {{ formatDate(instance.due_date) }}
        </span>
      </div>
      <p class="text-sm text-gray-600 mt-1">
        {{ formatCurrency(instance.amount) }}
        <span v-if="instance.category_name" class="text-gray-500">• {{ instance.category_name }}</span>
        <span v-if="instance.notes" class="text-gray-400">• {{ instance.notes }}</span>
      </p>
    </div>

    <!-- Actions -->
    <div class="flex gap-1 ml-3">
      <button
        @click="$emit('approve')"
        class="px-2 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded"
        title="Approve"
      >
        ✓
      </button>
      <button
        @click="$emit('skip')"
        class="px-2 py-1 text-xs bg-gray-600 hover:bg-gray-700 text-white rounded"
        title="Skip"
      >
        ⏭️
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RecurringTransactionInstance } from '../../types';

const props = defineProps<{
  instance: RecurringTransactionInstance;
  badgeColor: 'red' | 'yellow' | 'blue' | 'gray';
}>();

defineEmits(['approve', 'skip']);

const badgeClasses = computed(() => {
  const colorMap = {
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    blue: 'bg-blue-100 text-blue-800',
    gray: 'bg-gray-100 text-gray-800'
  };
  return colorMap[props.badgeColor];
});

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dueDate = new Date(date);
  dueDate.setHours(0, 0, 0, 0);

  if (dueDate.getTime() === today.getTime()) {
    return 'Today';
  } else if (dueDate.getTime() === tomorrow.getTime()) {
    return 'Tomorrow';
  } else if (dueDate < today) {
    const daysAgo = Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  } else {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
}

function formatCurrency(amount: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
  return formatter.format(amount);
}
</script>
