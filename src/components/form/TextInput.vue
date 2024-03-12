<template>
  <input
    :id="props.id"
    v-model="model"
    type="text"
    :placeholder="props.placeholder"
    class="rounded w-full border-solid border-2 p-2 transition-colors outline-none border-dark-200
      focus:border-primary-400 dark:bg-black dark:border-dark-600 dark:focus:border-primary-400 dark:text-white"
  >
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{ id: string, placeholder?: string }>();
const model = defineModel<string>({ required: true });
</script>
