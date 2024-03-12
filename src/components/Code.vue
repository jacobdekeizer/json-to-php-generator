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
      <template v-if="copied">
        <span class="flex flex-row items-center text-white pl-2 pr-2">
          <CheckIcon class="text-green-600 h-6 w-6 mr-2" />
          Copied!
        </span>
      </template>
      <ClipboardIcon
        v-else
        class="text-white"
      />
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
