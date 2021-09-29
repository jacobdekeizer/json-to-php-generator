<template>
    <div class="space-y-1">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class FormGroup extends Vue {

    }
</script>