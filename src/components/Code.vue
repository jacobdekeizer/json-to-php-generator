<template>
  <pre>
    <code
ref="codeBlockWrapper"
:class="languageClass"
>{{ props.code.replace(/^[\r\n\s]*|[\r\n\s]*$/g, '') }}</code>
  </pre>
</template>

<script lang="ts" setup>
import Prism from 'prismjs';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';
import { computed, onMounted, onUpdated, Ref, ref } from 'vue';

const props = defineProps<{ language: string; code: string }>();

const codeBlockWrapper = ref() as Ref<HTMLDivElement>;

const languageClass = computed(() => {
  return `language-${props.language}`;
});

const highlight = (): void => Prism.highlightElement(codeBlockWrapper.value);

onMounted((): void => highlight());
onUpdated((): void => highlight());
</script>
