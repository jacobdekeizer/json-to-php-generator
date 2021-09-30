<template>
  <div @click="next" class="cursor-pointer">
    <HalfFilledCircleIcon class="w-full h-full" v-if="color === 'system'" />
    <SunIcon class="w-full h-full" v-if="color === 'light'" />
    <MoonIcon class="w-full h-full" v-if="color === 'dark'" />
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {ThemeColor} from '@/enums/ThemeColor';
import MoonIcon from '@/components/icons/MoonIcon.vue';
import SunIcon from '@/components/icons/SunIcon.vue';
import HalfFilledCircleIcon from '@/components/icons/HalfFilledCircleIcon.vue';

export const themeColorModeKey = 'theme-color-mode';

@Component({
  components: { HalfFilledCircleIcon, SunIcon, MoonIcon }
})
export default class ThemeColorSwitch extends Vue {
  private color = (localStorage.getItem(themeColorModeKey) as ThemeColor | null) || ThemeColor.SYSTEM;
  private prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  private index = this.options.findIndex(o => o === this.color) || 0;

  @Watch('color', { immediate: true })
  private onModeChanged(color: ThemeColor): void {
    localStorage.setItem(themeColorModeKey, color);

    switch (color) {
      case ThemeColor.SYSTEM:
        if (this.prefersDark) {
          this.enableDarkMode();
        } else {
          this.enableLightMode();
        }
        break;
      case ThemeColor.DARK:
        this.enableDarkMode();
        break;
      case ThemeColor.LIGHT:
        this.enableLightMode();
        break;
    }
  }

  private get options(): ThemeColor[] {
    const options = [ThemeColor.SYSTEM];

    if (this.prefersDark) {
      options.push(ThemeColor.LIGHT);
      options.push(ThemeColor.DARK);
    } else {
      options.push(ThemeColor.DARK);
      options.push(ThemeColor.LIGHT);
    }

    return options;
  }

  private next(): void {
    this.index++;

    if (this.index >= this.options.length) {
      this.index = 0;
    }

    this.color = this.options[this.index];
  }

  private enableDarkMode(): void {
    document.documentElement.classList.add('dark');
  }

  private enableLightMode(): void {
    document.documentElement.classList.remove('dark');
  }
}
</script>