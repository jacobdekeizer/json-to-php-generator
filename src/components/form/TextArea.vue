<template>
    <div>
        <label class="block text-gray-700 text-sm font-bold mb-2" :for="this.id">
            {{ this.label }}
        </label>
        <textarea :id="this.id" v-model="value" class="resize-y border-solid border-2 border-gray-200 rounded w-full min-height"/>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';

    @Component
    export default class TextArea extends Vue {
        @Prop(String) private readonly id!: string;
        @Prop(String) private readonly defaultValue!: string;
        @Prop(String) private readonly label!: string;

        private value: string | null = null;

        public mounted(): void {
            if (this.defaultValue) {
                this.value = this.defaultValue;
            }
        }

        @Watch('value')
        private onValueChanged(newValue: string): void {
            this.onValueChange(newValue);
        }

        @Emit()
        private onValueChange(value: string): string {
            return value;
        }
    }
</script>

<style scoped>
    .min-height {
        min-height: 250px;
    }
</style>