import Settings, {
    createDefaultSettings,
    supportsConstructorPropertyPromotion,
    supportsReadonlyProperties
} from '@/dto/Settings';
import { ref, Ref, watch } from 'vue';

export interface UseSettings {
    settings: Ref<Settings>
}

export const useSettings = (): UseSettings => {
    const settings = ref(createDefaultSettings());

    watch(settings, () => {
        // Constructor property promotion checks
        if (
            settings.value.constructorPropertyPromotion
            && !supportsConstructorPropertyPromotion(settings.value)
        ) {
            settings.value.constructorPropertyPromotion = false;
        }

        // Readonly properties checks
        if (settings.value.readonlyProperties && !supportsReadonlyProperties(settings.value)) {
            settings.value.readonlyProperties = false;
        }

        if (settings.value.readonlyProperties) {
            settings.value.addSetters = false;
        }
    });

    return {
        settings,
    }
}