import Settings from '@/dto/Settings';
import {PhpDocblock} from '@/enums/PhpDocblock';
import PhpPropertyTypePresenter from '@/presenters/PhpPropertyTypePresenter';

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

        const addReturnTypeDocblock = this.returnType !== null
            && (this.settings.docblock === PhpDocblock.All
                || (this.returnTypeNecessary && this.settings.docblock === PhpDocblock.Necessary)
            );

        if (filteredTypePresenters.length === 0 && !addReturnTypeDocblock) {
            return '';
        }

        let content = '\t/**\n';

        if (filteredTypePresenters.length) {
            content += filteredTypePresenters
                .map(presenter => '\t * @param ' + presenter.getDocblockContent() + ' ' + presenter.getPhpVar()).join('\n') + '\n';
        }

        if (addReturnTypeDocblock) {
            content += '\t * @return ' + this.returnType + '\n';
        }

        content += '\t */\n';

        return content;
    }
}