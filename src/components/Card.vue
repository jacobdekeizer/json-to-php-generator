<template>
    <div class="w-full shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Card extends Vue {

    }
</script>