<template>
  <div class="w-full pb-8 flex flex-row-reverse">
    <div class="text-dark-500 dark:text-dark-400 inline-flex">
      <div class="flex items-center mr-2">
        <span class="font-semibold">Made by Jacob de Keizer</span>
      </div>
      <div class="flex rounded-full">
        <a href="https://github.com/jacobdekeizer/json-to-php-generator" target="_blank">
          <GithubIcon class="h-8 w-8" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import GithubIcon from '@/components/icons/GithubIcon.vue';
</script>
