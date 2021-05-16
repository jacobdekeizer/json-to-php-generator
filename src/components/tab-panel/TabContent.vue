<template>
    <div class="mt-2 pt-2 bt-2" :class="{ 'hidden' : !isActive }">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class TabContent extends Vue {
        @Prop({ type: Boolean, default: false }) private readonly isActive!: boolean;
    }
</script>