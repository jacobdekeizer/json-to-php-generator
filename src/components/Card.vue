<template>
    <div class="w-full px-4 mt-5">
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Card extends Vue {

    }
</script>