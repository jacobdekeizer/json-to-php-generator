<template>
    <div class="relative">
        <select class="block appearance-none w-full bg-blue-gray border-2 border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                :id="id"
                :value="value"
                @input="onValueChanged($event.target.value)">
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
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import SelectOption from '@/dto/SelectOption';

    @Component
    export default class Select extends Vue {
        @Prop({type: String, required: true}) private readonly id!: string;
        @Prop({type: String, required: true}) private readonly value!: string;
        @Prop({type: Array, required: true}) private readonly options!: SelectOption[];

        private onValueChanged(value: string): void {
            this.$emit('input', value);
        }
    }
</script>
