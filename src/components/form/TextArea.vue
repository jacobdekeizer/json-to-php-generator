<template>
    <textarea :id="id"
              :value="value"
              :placeholder="placeholder"
              @input="onValueChanged($event.target.value)"
              class="resize-y rounded w-full min-height border-solid border-2 p-2
              border-gray-200 dark:bg-black dark:border-blue-gray-600 dark:text-white" />
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class TextArea extends Vue {
        @Prop({type: String, required: true}) private readonly id!: string;
        @Prop({type: String, required: true}) private readonly value!: string;
        @Prop({type: String, required: false}) private readonly placeholder!: string;

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