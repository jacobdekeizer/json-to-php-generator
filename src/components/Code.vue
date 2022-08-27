<template>
  <div ref="codeBlockWrapper">
    <pre :class="languageClass">
      <code>{{ props.code.replace(/^[\r\n\s]*|[\r\n\s]*$/g, '') }}</code>
    </pre>
  </div>
</template>

<script lang="ts" setup>
// noinspection TypeScriptCheckImport
import Prism from 'prism-es6';
import 'prism-es6/components/prism-markup-templating';
import 'prism-es6/components/prism-php';
import { computed, onMounted, onUpdated, Ref, ref } from 'vue';

const props = defineProps<{ language: string; code: string }>();

const codeBlockWrapper = ref() as Ref<HTMLDivElement>;

const languageClass = computed(() => {
  return `language-${props.language}`;
});

const highlight = (): void => Prism.highlightAll(codeBlockWrapper);

onMounted((): void => highlight());

onUpdated((): void => {
  highlight();
})
</script>
