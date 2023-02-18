<template>
  <li class="flex-col">
    <a
      href="javascript:void(0)"
      class="flex items-center px-2 py-1 rounded-md h-full"
      :class="{
        'text-primary-800 dark:text-primary-800 bg-primary-200 dark:bg-primary-300': props.isActive,
        'dark:text-dark-800 bg-dark-200 dark:bg-dark-400': !props.isActive
      }"
    >
      <slot />
    </a>
  </li>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = withDefaults(defineProps<{ isActive?: boolean }>(), { isActive: false });
</script>