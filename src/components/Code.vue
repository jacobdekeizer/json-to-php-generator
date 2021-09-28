<template>
    <VueCodeHighlight language="php" class="text-sm">{{ this.code }}</VueCodeHighlight>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    // noinspection TypeScriptCheckImport
    import { component as VueCodeHighlight } from 'vue-code-highlight';

    import 'prism-es6/components/prism-markup-templating';
    import 'prism-es6/components/prism-php';

    @Component({
        components: {
            VueCodeHighlight
        }
    })
    export default class Code extends Vue {
        @Prop(String) private readonly code!: string;
    }
</script>
