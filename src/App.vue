<template>
  <div
    id="app"
    class="min-h-screen bg-dark-100 dark:bg-black p-4"
  >
    <div class="container max-w-screen-xl mx-auto">
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Footer from '@/components/Footer.vue';
</script>
