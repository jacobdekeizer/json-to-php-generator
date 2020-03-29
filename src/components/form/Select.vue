<template>
    <div>
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" :for="this.id">
            {{ this.label }}
        </label>
        <div class="relative">
            <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    v-model="value"
                    :id="this.id">
                <option v-for="option in this.options" :value="option.value" :key="option.value">
                    {{ option.text }}
                </option>
            </select>
            <div class="absolute flex inset-y-0 items-center px-3 right-0 text-gray-700 bg-gray-300 rounded-r pointer-events-none">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
    import SelectOption from "@/classes/dto/SelectOption";

    @Component
    export default class Select extends Vue {
        @Prop(String)
        public id!: string;

        @Prop(String)
        public label!: string;

        @Prop(String)
        public defaultValue!: string;

        @Prop(Array)
        public options!: SelectOption[];

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
