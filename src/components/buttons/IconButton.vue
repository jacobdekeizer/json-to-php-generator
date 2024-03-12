<template>
  <button
    class="flex items-center justify-center min-w-9 h-9 border border-gray-200 rounded-lg
    hover:text-primary-700 hover:bg-primary-400
    focus:z-10 focus:ring-2 focus:ring-primary-300 dark:focus:ring-primary-500 focus:outline-none
    dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-primary-700"
  >
    <div class="h-6 min-w-6">
      <Spinner v-if="props.loading" />
      <slot v-else />
    </div>
  </button>
</template>
<script setup lang="ts">
import Spinner from '@/components/loaders/Spinner.vue';

const props = defineProps<{ loading?: boolean}>()
</script>