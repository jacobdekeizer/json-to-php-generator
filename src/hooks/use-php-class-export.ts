import {ref, Ref} from 'vue';
import PhpClass from '@/dto/PhpClass';
import {ExportFile, useFileExport} from '@/hooks/use-file-export';
import PhpClassPresenter from '@/presenters/PhpClassPresenter';
import Settings from '@/dto/Settings';

interface UsePhpClassExport {
    exporting: Ref<boolean>
    exportPhpClassToZip: (phpClass: PhpClass, settings: Settings) => Promise<void>;
}

export const usePhpClassExport = (): UsePhpClassExport => {
    const exporting = ref(false);

    const { exportFilesZip } = useFileExport();

    const generatePhpExportFilesRecursive = (phpClass: PhpClass, settings: Settings): ExportFile[] => {
        const result: ExportFile[] = [];

        const phpClassPresenter = new PhpClassPresenter(phpClass, settings);

        result.push({
            filename: phpClassPresenter.getClassName() + '.php',
            contents: phpClassPresenter.toString()
        });

        for (const childClass of phpClass.getChildren()) {
            result.push(...generatePhpExportFilesRecursive(childClass, settings));
        }

        return result;
    }

    const exportPhpClassToZip = async (phpClass: PhpClass, settings: Settings): Promise<void> => {
        exporting.value = true;

        await exportFilesZip(
            `generated-php-classes-${(new Date()).toISOString()}.zip`,
            generatePhpExportFilesRecursive(phpClass, settings)
        )

        exporting.value = false;
    }

    return {
        exporting,
        exportPhpClassToZip,
    };
}