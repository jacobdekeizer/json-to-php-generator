<template>
    <label class="block text-dark-500 dark:text-dark-400 font-bold">
        <input class="mr-2 last:mb-0 leading-tight"
               type="checkbox"
               :checked="props.modelValue"
               @change="emit('update:modelValue', $event.target.checked)"
        />
        <span class="text-sm">{{ props.label }}</span>
    </label>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ label: string, modelValue: boolean}>();
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();
</script>
