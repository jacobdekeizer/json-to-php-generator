<template>
  <div id="app">
    <div class="container mx-auto">
      <router-view/>
      <Footer/>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Footer from "@/components/Footer.vue";

    @Component({
        components: {
          Footer
        }
    })
    export default class App extends Vue {
    }
</script>

<style lang="scss">

</style>
