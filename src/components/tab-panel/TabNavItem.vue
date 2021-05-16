<template>
    <li>
        <a href="javascript:void(0)"
           :class="['block px-2 py-1 rounded-md bg-blue-gray-200', { 'bg-light-blue-200 text-light-blue-800': isActive, }]"
           @click="$emit('click', $event)">
            <slot></slot>
        </a>
    </li>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class TabNavItem extends Vue {
        @Prop({ type: Boolean, default: false }) private readonly isActive!: boolean;
    }
</script>