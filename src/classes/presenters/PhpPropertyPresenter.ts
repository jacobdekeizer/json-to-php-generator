import Settings from '@/classes/dto/Settings';
import {PhpDocblock} from '@/classes/enums/PhpDocblock';
import {PropertyDocblockType} from '@/classes/enums/PropertyDocblockType';
import PhpPropertyTypePresenter from '@/classes/presenters/PhpPropertyTypePresenter';

export default class PhpPropertyPresenter {
    private readonly propertyTypePresenter: PhpPropertyTypePresenter;
    private readonly settings: Settings;

    public constructor(propertyTypePresenter: PhpPropertyTypePresenter, settings: Settings) {
        this.propertyTypePresenter = propertyTypePresenter;
        this.settings = settings;
    }

    public toString(): string {
        let content = '';

        const mustAddDocblock = this.settings.propertyDocblock !== PhpDocblock.None
            && this.propertyTypePresenter.getProperty().isDocblockRequired();

        if (mustAddDocblock || this.settings.propertyDocblock === PhpDocblock.All) {
            if (this.settings.propertyDocblockType === PropertyDocblockType.Inline) {
                content += '\t/** @var ' + this.propertyTypePresenter.getDocblockContent() + ' */\n';
            } else {
                content += '\t/**\n';
                content += '\t * @var ' + this.propertyTypePresenter.getDocblockContent() + '\n';
                content += '\t */\n';
            }
        }

        content += '\t' + this.settings.propertyVisibility + ' ';

        if (this.settings.supportsTypedProperties()) {
            content += this.propertyTypePresenter.getPhpVarWithType();
        } else {
            content += this.propertyTypePresenter.getPhpVar();
        }

        content += ';';

        return content;
    }
}