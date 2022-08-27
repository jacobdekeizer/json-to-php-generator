<template>
    <div class="relative inline-block w-full">
        <select class="w-full px-3 py-2 border-2 rounded-md appearance-none focus:border-primary-400 transition-colors outline-none
        border-dark-200 text-dark-700 dark:bg-black dark:border-dark-600 dark:focus:border-primary-400 dark:text-white"
                :id="props.id"
                :value="props.modelValue"
                @input="emit('update:modelValue', $event.target.value)">
            <option v-for="option in props.options" :value="option.value" :key="option.value">
                {{ option.text }}
            </option>
        </select>
        <div class='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500'>
            <svg class='w-5 h-5 fill-current' viewBox='0 0 20 20'>
            <path
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0
                111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clipRule='evenodd' fillRule='evenodd' />
            </svg>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import SelectOption from '@/dto/SelectOption';

const props = defineProps<{ id: string, modelValue: string, options: SelectOption[] }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();
</script>
