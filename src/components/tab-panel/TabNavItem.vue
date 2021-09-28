<template>
    <li>
        <a href="javascript:void(0)"
           class="block px-2 py-1 rounded-md bg-blue-gray-200 dark:bg-gray-400"
           :class="{ 'bg-light-blue-200 text-light-blue-800 dark:bg-light-blue-300': isActive, }"
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