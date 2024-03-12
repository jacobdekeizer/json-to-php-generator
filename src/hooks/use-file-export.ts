import JSZip from 'jszip';

export interface ExportFile {
    filename: string;
    contents: string;
}

interface UseFileExport {
    exportFilesZip: (zipFilename: string, files: ExportFile[]) => Promise<void>;
}

export const useFileExport = (): UseFileExport => {
    const downloadBlob = (blob: Blob, filename: string) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
    };

    const exportFilesZip = async (zipFilename: string, files: ExportFile[]): Promise<void> => {
        const zip = new JSZip();

        for (const file of files) {
            zip.file(file.filename, file.contents);
        }

        const blob = await zip.generateAsync({ type: 'blob' });

        downloadBlob(blob, zipFilename);
    }

    return {
        exportFilesZip,
    }
}