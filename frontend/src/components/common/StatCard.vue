<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-600 mb-1">{{ title }}</p>
        <p :class="[valueClass, privacyClass]" class="text-2xl font-bold">{{ formattedValue }}</p>
        <p v-if="subtitle" class="text-xs text-gray-500 mt-1">{{ subtitle }}</p>
      </div>
      <span v-if="icon" class="text-4xl">{{ icon }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  title: string;
  value: number | string;
  icon?: string;
  subtitle?: string;
  type?: 'currency' | 'number' | 'text';
  colorClass?: string;
}>();

const valueClass = computed(() => {
  return props.colorClass || 'text-gray-900';
});

const privacyClass = computed(() => {
  return props.type === 'currency' ? 'privacy-value' : '';
});

const formattedValue = computed(() => {
  if (props.type === 'currency') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(props.value as number);
  }
  return props.value.toString();
});
</script>
