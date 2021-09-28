<template>
    <div class="divide-y divide-gray-100 dark:divide-gray-400">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class TabPanel extends Vue {

    }
</script>