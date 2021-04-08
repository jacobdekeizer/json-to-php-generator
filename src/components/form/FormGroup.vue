<template>
    <label class="form-group">
        <slot></slot>
    </label>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class FormGroup extends Vue {

    }
</script>