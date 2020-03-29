<template>
    <label class="md:w-2/3 block text-gray-500 font-bold">
        <input class="mr-2 leading-tight" type="checkbox" v-model="value">
        <span class="text-sm">{{ this.label }}</span>
    </label>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';

    @Component
    export default class Checkbox extends Vue {
        @Prop(String)
        public id!: string;

        @Prop(Boolean)
        public defaultValue!: boolean;

        @Prop(String)
        public label!: string;

        private value = false;

        public mounted(): void {
            if (this.defaultValue) {
                this.value = this.defaultValue;
            }
        }

        @Watch('value')
        private onValueChanged(newValue: boolean): void {
            this.onValueChange(newValue);
        }

        @Emit()
        private onValueChange(value: boolean): boolean {
            return value;
        }
    }
</script>
