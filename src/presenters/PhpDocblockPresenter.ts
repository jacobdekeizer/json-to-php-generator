import Settings from '@/dto/Settings';
import {PhpDocblock} from '@/enums/PhpDocblock';
import PhpPropertyTypePresenter from '@/presenters/PhpPropertyTypePresenter';
import CodeWriter from '@/writers/CodeWriter';

export default class PhpDocblockPresenter {
    private readonly propertyTypePresenters: PhpPropertyTypePresenter[];
    private readonly settings: Settings;
    private readonly returnType: string | null;
    private readonly returnTypeNecessary: boolean;

    public constructor(
        settings: Settings,
        propertyTypePresenters: PhpPropertyTypePresenter[],
        returnType: string | null = null,
        returnTypeNecessary = false
    ) {
        this.settings = settings;
        this.propertyTypePresenters = propertyTypePresenters;
        this.returnType = returnType;
        this.returnTypeNecessary = returnTypeNecessary;
    }

    public write(codeWriter: CodeWriter): void {
        if (this.settings.docblock === PhpDocblock.None) {
            return;
        }

        const filteredTypePresenters = this.propertyTypePresenters.filter(presenter => {
            if (this.settings.docblock === PhpDocblock.None) {
                return false;
            }

            if (this.settings.docblock === PhpDocblock.All) {
                return true;
            }

            return this.settings.docblock === PhpDocblock.Necessary && presenter.getProperty().isDocblockRequired();
        });

        const addReturnTypeDocblock = this.returnType !== null
            && (this.settings.docblock === PhpDocblock.All
                || (this.returnTypeNecessary && this.settings.docblock === PhpDocblock.Necessary)
            );

        if (filteredTypePresenters.length === 0 && !addReturnTypeDocblock) {
            return;
        }

        const lines: string[] = [];

        if (filteredTypePresenters.length) {
            lines.push(...filteredTypePresenters.map(presenter => {
                return `@param ${presenter.getDocblockContent()} ${presenter.getPhpVar()}`;
            }));
        }

        if (addReturnTypeDocblock) {
            lines.push('@return ' + this.returnType);
        }

        codeWriter.writeMultilineDocblock(lines);
    }
}