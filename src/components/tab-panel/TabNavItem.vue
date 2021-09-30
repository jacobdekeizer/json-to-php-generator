<template>
    <li class="flex-col">
        <a href="javascript:void(0)"
           class="flex items-center px-2 py-1 rounded-md h-full"
           :class="{
              'text-primary-800 dark:text-primary-800 bg-primary-200 dark:bg-primary-300': isActive,
              'dark:text-dark-800 bg-dark-200 dark:bg-dark-400': !isActive
           }"
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