<template>
    <textarea :id="id"
              :value="value"
              @input="onValueChanged($event.target.value)"
              class="resize-y border-solid border-2 border-gray-200 rounded w-full min-height" />
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class TextArea extends Vue {
        @Prop({type: String, required: true}) private readonly id!: string;
        @Prop({type: String, required: true}) private readonly value!: string;

        private onValueChanged(value: string): void {
            this.$emit('input', value)
        }
    }
</script>

<style scoped>
    .min-height {
        min-height: 250px;
    }
</style>