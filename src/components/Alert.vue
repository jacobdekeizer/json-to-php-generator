<template>
    <div>
        <div v-if="this.message" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p>{{ this.message }}</p>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class Card extends Vue {
        @Prop(String)
        private message!: string;
    }
</script>