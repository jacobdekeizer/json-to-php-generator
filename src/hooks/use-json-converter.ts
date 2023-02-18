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
    code: ComputedRef<string | null>;
}

export const useJsonConverter = ({ jsonContent, settings }: UseJsonConverterProps): UseJsonConverter => {
    const error = ref<string | null>(null);

    const code = computed(() => {
        error.value = null;

        if (!jsonContent.value) {
            return null;
        }

        let result: PhpClass;

        try {
            result = JsonToPhpFactory.make(jsonContent.value);
        } catch (e) {
            error.value = (e as Error).message;
            return null;
        }

        return (new PhpClassPresenter(result, settings.value)).toString();
    });

    return {
        error,
        code
    }
}
