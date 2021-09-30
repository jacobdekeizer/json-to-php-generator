<template>
    <label class="block text-dark-700 dark:text-dark-300 text-sm font-bold">
        <slot></slot>
    </label>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Label extends Vue {

    }
</script>