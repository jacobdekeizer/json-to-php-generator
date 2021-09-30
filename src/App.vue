<template>
  <div id="app" class="min-h-screen bg-dark-100 dark:bg-black p-4">
    <div class="container max-w-screen-xl mx-auto">
      <router-view/>
      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Footer from '@/components/Footer.vue';

    @Component({
        components: {
          Footer
        }
    })
    export default class App extends Vue {

    }
</script>
