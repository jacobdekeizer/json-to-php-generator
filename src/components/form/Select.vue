<template>
    <div class="relative inline-block w-full">
        <select class="w-full px-3 py-2 border-2 border-gray-200 text-gray-700 rounded-md appearance-none bg-blue-gray focus:bg-white focus:outline-none focus:border-cyan-400 transition-colors "
                :id="id"
                :value="value"
                @input="onValueChanged($event.target.value)">
            <option v-for="option in this.options" :value="option.value" :key="option.value">
                {{ option.text }}
            </option>
        </select>
        <div class='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500'>
            <svg class='w-5 h-5 fill-current' viewBox='0 0 20 20'>
            <path
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0
                111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clipRule='evenodd' fillRule='evenodd' />
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
