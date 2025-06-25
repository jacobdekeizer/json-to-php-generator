<template>
  <div class="mt-2 pt-2 bt-2" :class="{ hidden: !props.isActive }">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = withDefaults(defineProps<{ isActive?: boolean }>(), {
  isActive: false,
});
</script>
