<template>
    <label class="block text-gray-700 text-sm font-bold mb-2">
        <slot></slot>
    </label>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Label extends Vue {

    }
</script>