import { computed, ComputedRef, Ref } from 'vue';
import PhpClass from '@/dto/PhpClass';
import PhpClassPresenter from '@/presenters/PhpClassPresenter';
import Settings from '@/dto/Settings';

interface UsePhpCodePresenterProps {
  phpClass: Ref<PhpClass | null>;
  settings: Ref<Settings>;
}

interface UsePhpCodePresenter {
  generatedCodeClasses: ComputedRef<string[]>;
}

export const usePhpCodePresenter = ({ phpClass, settings }: UsePhpCodePresenterProps): UsePhpCodePresenter => {
  const generateAllCode = (phpClass: PhpClass, s: Settings): string[] => {
    const result: string[] = [];
    result.push(new PhpClassPresenter(phpClass, s).toString());

    for (const childClass of phpClass.getChildren()) {
      result.push(...generateAllCode(childClass, s));
    }

    return result;
  };

  const generatedCodeClasses = computed(() => {
    if (phpClass.value === null) {
      return [];
    }

    return generateAllCode(phpClass.value, settings.value);
  });

  return {
    generatedCodeClasses,
  };
};
