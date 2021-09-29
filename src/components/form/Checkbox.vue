<template>
    <label class="block text-gray-500 dark:text-gray-400 font-bold">
        <input class="mr-2 last:mb-0 leading-tight"
               type="checkbox"
               :checked="value"
               @change="onValueChanged($event.target.checked)"
        />
        <span class="text-sm">{{ this.label }}</span>
    </label>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class Checkbox extends Vue {
        @Prop({type: String, required: true}) private readonly label!: string;
        @Prop({type: Boolean, required: true}) private readonly value!: boolean;

        private onValueChanged(value: boolean): void {
            this.$emit('input', value);
        }
    }
</script>
