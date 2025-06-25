<template>
  <div>
    <Card>
      <div class="flex space-x-1">
        <h1 class="flex-grow text-dark-700 dark:text-dark-300 font-bold text-3xl">JSON to PHP class converter</h1>
        <ThemeColorSwitch class="flex-none w-6 h-6 mt-2" />
      </div>

      <div class="text-dark-600 dark:text-dark-400 mt-0 mb-6">Generate PHP classes from JSON</div>

      <Label for="json-input"> Json input </Label>
      <TextArea id="json-input" v-model="jsonContent" class="mb-4" placeholder="Paste JSON content here..." />

      <h2 class="text-dark-700 dark:text-dark-300 font-bold text-2xl mb-2">Settings</h2>

      <Settings v-model="settings" />
    </Card>
    <Card v-if="generatedCodeClasses.length > 0">
      <div class="flex space-x-2 items-center">
        <h2 class="text-dark-700 dark:text-dark-300 font-bold text-2xl">Results</h2>

        <IconButton v-if="phpClass" :loading="exporting" @click="exportPhpClassToZip(phpClass, settings)">
          <CloudArrowDownIcon />
          <template #text> Download </template>
        </IconButton>
      </div>

      <Code
        v-for="generatedCode in generatedCodeClasses"
        :key="generatedCode"
        :code="generatedCode"
        language="php"
        class="mt-4"
      />
    </Card>
    <Card v-if="error">
      <Alert>
        {{ error }}
      </Alert>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import Alert from '@/components/Alert.vue';
import Card from '@/components/Card.vue';
import Label from '@/components/form/Label.vue';
import TextArea from '@/components/form/TextArea.vue';
import ThemeColorSwitch from '@/components/ThemeColorSwitch.vue';
import Settings from '@/components/Settings.vue';
import Code from '@/components/Code.vue';
import { useJsonConverter } from '@/hooks/use-json-converter';
import { useSettings } from '@/hooks/use-settings';
import CloudArrowDownIcon from '@/components/icons/CloudArrowDownIcon.vue';
import IconButton from '@/components/buttons/IconButton.vue';
import { usePhpCodePresenter } from '@/hooks/use-php-code-presenter';
import { usePhpClassExport } from '@/hooks/use-php-class-export';

const jsonContent = ref('');

const { settings } = useSettings();
const { error, phpClass } = useJsonConverter({ jsonContent, settings });
const { generatedCodeClasses } = usePhpCodePresenter({ phpClass, settings });
const { exporting, exportPhpClassToZip } = usePhpClassExport();
</script>
