<template>
    <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 dark:bg-red-300" role="alert">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Alert extends Vue {

    }
</script>