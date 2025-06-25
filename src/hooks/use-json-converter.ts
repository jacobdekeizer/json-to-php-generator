import { computed, ComputedRef, Ref, ref } from 'vue';
import Settings from '@/dto/Settings';
import PhpClass from '@/dto/PhpClass';
import JsonToPhpFactory from '@/factories/JsonToPhpFactory';

interface UseJsonConverterProps {
  jsonContent: Ref<string>;
  settings: Ref<Settings>;
}

interface UseJsonConverter {
  error: Ref<string | null>;
  phpClass: ComputedRef<PhpClass | null>;
}

export const useJsonConverter = ({ jsonContent, settings }: UseJsonConverterProps): UseJsonConverter => {
  const error = ref<string | null>(null);

  const phpClass = computed(() => {
    error.value = null;

    if (!jsonContent.value) {
      return null;
    }

    try {
      // Make a copy of the settings value, to trigger deep reactivity
      return JsonToPhpFactory.make(jsonContent.value, { ...settings.value });
    } catch (e) {
      error.value = (e as Error).message;
    }

    return null;
  });

  return {
    error,
    phpClass,
  };
};
