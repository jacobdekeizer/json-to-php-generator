import {computed, ComputedRef, Ref, ref} from 'vue';
import Settings from '@/dto/Settings';
import PhpClass from '@/dto/PhpClass';
import JsonToPhpFactory from '@/factories/JsonToPhpFactory';
import PhpClassPresenter from '@/presenters/PhpClassPresenter';

interface UseJsonConverterProps {
    jsonContent: Ref<string>;
    settings: Ref<Settings>;
}

interface UseJsonConverter {
    error: Ref<string | null>;
    result: ComputedRef<PhpClass | null>;
    code: ComputedRef<string | null>;
}

export const useJsonConverter = ({ jsonContent, settings }: UseJsonConverterProps): UseJsonConverter => {
    const error = ref<string | null>(null);

    const result = computed(() => {
        error.value = null;
        if (!jsonContent.value) {
            return null;
        }

        try {
            return JsonToPhpFactory.make(jsonContent.value);
        } catch (e) {
            error.value = (e as Error).message;
            return null;
        }
    });

    const code = computed(() => {
        if (!result.value) {
            return null;
        }

        return (new PhpClassPresenter(result.value, settings.value)).toString();
    });

    return {
        error,
        result,
        code
    }
}
