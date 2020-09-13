import Settings from '@/classes/dto/Settings';
import {PhpDocblock} from '@/classes/enums/PhpDocblock';
import PhpPropertyTypePresenter from '@/classes/presenters/PhpPropertyTypePresenter';

export default class PhpDocblockPresenter {
    private readonly propertyTypePresenters: PhpPropertyTypePresenter[];
    private readonly returnType: string | null;
    private readonly settings: Settings;

    public constructor(
        settings: Settings,
        propertyTypePresenters: PhpPropertyTypePresenter[],
        returnType: string | null = null
    ) {
        this.settings = settings;
        this.propertyTypePresenters = propertyTypePresenters;
        this.returnType = returnType;
    }

    public toString(): string {
        if (this.settings.docblock === PhpDocblock.None) {
            return '';
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

        if (filteredTypePresenters.length === 0 && (this.returnType === null || this.settings.docblock === PhpDocblock.Necessary)) {
            return '';
        }

        let content = '\t/**\n';

        if (filteredTypePresenters.length) {
            content += filteredTypePresenters
                .map(presenter => '\t * @param ' + presenter.getDocblockContent() + ' ' + presenter.getPhpVar()).join('\n') + '\n';
        }

        if (this.settings.docblock === PhpDocblock.All && this.returnType) {
            content += '\t * @return ' + this.returnType + '\n';
        }

        content += '\t */\n';

        return content;
    }
}