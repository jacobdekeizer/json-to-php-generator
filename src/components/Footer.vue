<template>
    <div class="px-4 text-gray-500 font-bold">
        <div class="bg-gray-100 items-center leading-none rounded inline-flex float-right mb-2">
            <span class="font-semibold mr-2 text-left flex-auto">
                Made by Jacob de Keizer
            </span>
            <span class="flex rounded-full">
                <a href="https://github.com/jacobdekeizer/json-to-php-generator" target="_blank">
                    <GithubIcon />
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
