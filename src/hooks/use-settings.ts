import Settings, {
    createDefaultSettings,
    supportsConstructorPropertyPromotion, supportsReadonlyClasses,
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

        // Readonly classes checks
        if (settings.value.readonlyClasses && !supportsReadonlyClasses(settings.value)) {
            settings.value.readonlyClasses = false;
        }

        if (settings.value.readonlyClasses) {
            settings.value.addSetters = false;
            settings.value.readonlyProperties = false;
        }
    });

    return {
        settings,
    }
}