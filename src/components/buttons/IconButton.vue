<template>
  <button
    class="flex items-center justify-center min-w-9 h-9 border border-gray-200 rounded-lg hover:text-primary-700 hover:bg-primary-400 focus:z-10 focus:ring-2 focus:ring-primary-300 dark:focus:ring-primary-500 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-primary-700"
  >
    <span class="h-6 min-w-6 flex flex-row items-center" :class="{ 'pl-2 pr-2': !!slots['text'] }">
      <Spinner v-if="props.loading" />
      <span class="h-6 min-w-6" :class="{ 'mr-2': !!slots['text'] }">
        <slot v-if="!props.loading" />
      </span>
      <span class="text-dark-700 dark:text-dark-300 font-bold">
        <slot name="text" />
      </span>
    </span>
  </button>
</template>
<script setup lang="ts">
import Spinner from '@/components/loaders/Spinner.vue';
import { useSlots } from 'vue';

const props = defineProps<{ loading?: boolean; text?: string }>();

const slots = useSlots();
</script>
