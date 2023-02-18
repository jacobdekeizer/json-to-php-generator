import Settings, { createDefaultSettings, supportsConstructorPropertyPromotion } from '@/dto/Settings';
import { ref, Ref, watch } from 'vue';

export interface UseSettings {
    settings: Ref<Settings>
}

export const useSettings = (): UseSettings => {
    const settings = ref(createDefaultSettings());

    watch(settings, () => {
        if (
            settings.value.constructorPropertyPromotion
            && !supportsConstructorPropertyPromotion(settings.value)
        ) {
            settings.value.constructorPropertyPromotion = false;
        }
    });

    return {
        settings,
    }
}