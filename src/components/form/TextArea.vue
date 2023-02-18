<template>
  <textarea
    :id="props.id"
    :value="props.modelValue"
    :placeholder="props.placeholder"
    class="resize-y rounded w-full min-height border-solid border-2 p-2 transition-colors outline-none
              border-dark-200 focus:border-primary-400 dark:bg-black dark:border-dark-600 dark:focus:border-primary-400 dark:text-white"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ id: string, modelValue: string, placeholder: string }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();
</script>

<style scoped>
    .min-height {
        min-height: 250px;
    }
</style>