<template>
  <div class="relative">
    <pre>
      <code
        ref="codeBlockWrapper"
        :class="languageClass"
        v-text="props.code.replace(/^[\r\n\s]*|[\r\n\s]*$/g, '')"
      />
    </pre>
    <IconButton
      class="absolute top-2 right-2"
      @click="copy"
    >
      <CheckIcon
        v-if="copied"
        class="text-green-600"
      />
      <ClipboardIcon
        v-else
        class="text-white"
      />
      <template
        v-if="copied"
        #text
      >
        <span class="text-white">
          Copied!
        </span>
      </template>
    </IconButton>
  </div>
</template>

<script lang="ts" setup>
import Prism from 'prismjs';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';
import { computed, onMounted, onUpdated, Ref, ref } from 'vue';
import IconButton from '@/components/buttons/IconButton.vue';
import ClipboardIcon from '@/components/icons/ClipboardIcon.vue';
import CheckIcon from '@/components/icons/CheckIcon.vue';

const props = defineProps<{ language: string; code: string }>();

const codeBlockWrapper = ref() as Ref<HTMLDivElement>;

const languageClass = computed(() => {
  return `language-${props.language}`;
});

const highlight = (): void => Prism.highlightElement(codeBlockWrapper.value);

onMounted((): void => highlight());
onUpdated((): void => highlight());

const copied = ref(false);

const copy = () => {
  copied.value = true;

  navigator.clipboard.writeText(props.code);

  setTimeout(() => copied.value = false, 2000);
}
</script>
