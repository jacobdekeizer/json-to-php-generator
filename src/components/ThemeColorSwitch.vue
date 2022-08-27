<template>
  <div @click="next" class="cursor-pointer">
    <HalfFilledCircleIcon class="w-full h-full" v-if="color === 'system'" />
    <SunIcon class="w-full h-full" v-if="color === 'light'" />
    <MoonIcon class="w-full h-full" v-if="color === 'dark'" />
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from 'vue';
import MoonIcon from '@/components/icons/MoonIcon.vue';
import SunIcon from '@/components/icons/SunIcon.vue';
import HalfFilledCircleIcon from '@/components/icons/HalfFilledCircleIcon.vue';
import {ThemeColor} from '@/enums/ThemeColor';

const themeColorModeKey = 'theme-color-mode';
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const color = ref<ThemeColor>((localStorage.getItem(themeColorModeKey) as ThemeColor | null) || ThemeColor.SYSTEM);

const options = computed(() => {
  const options = [ThemeColor.SYSTEM];

  if (prefersDark) {
    options.push(ThemeColor.LIGHT);
    options.push(ThemeColor.DARK);
  } else {
    options.push(ThemeColor.DARK);
    options.push(ThemeColor.LIGHT);
  }

  return options;
});

const index = ref(options.value.findIndex(o => o === color.value) || 0);

const enableDarkMode = (): void => {
  document.documentElement.classList.add('dark');
};

const enableLightMode = (): void => {
  document.documentElement.classList.remove('dark');
};

const next = (): void => {
  index.value++;

  if (index.value >= options.value.length) {
    index.value = 0;
  }

  color.value = options.value[index.value];
}

watch(color, () => {
  localStorage.setItem(themeColorModeKey, color.value);

  switch (color.value) {
    case ThemeColor.SYSTEM:
      if (prefersDark) {
        enableDarkMode();
      } else {
        enableLightMode();
      }
      break;
    case ThemeColor.DARK:
      enableDarkMode();
      break;
    case ThemeColor.LIGHT:
      enableLightMode();
      break;
  }
}, { immediate: true })
</script>