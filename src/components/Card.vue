<template>
    <div class="w-full shadow-md rounded p-4 md:p-6 lg:p-8 mb-4 bg-white dark:bg-gray-800 relative">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Card extends Vue {

    }
</script>