<template>
    <div class="w-full pb-8">
        <div class="text-gray-500 items-center leading-none rounded font-bold inline-flex float-right">
            <span class="font-semibold mr-2 text-left flex-auto">
                Made by Jacob de Keizer
            </span>
            <span class="flex rounded-full">
                <a href="https://github.com/jacobdekeizer/json-to-php-generator" target="_blank">
                    <GithubIcon class="h-8 w-8" />
                </a>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import GithubIcon from '@/components/icons/GithubIcon.vue';

    @Component({
        components: {GithubIcon}
    })
    export default class Footer extends Vue {
    }
</script>
