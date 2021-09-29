<template>
    <ul class="flex space-x-1 md:space-x-3">
        <slot></slot>
    </ul>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class TabNav extends Vue {

    }
</script>