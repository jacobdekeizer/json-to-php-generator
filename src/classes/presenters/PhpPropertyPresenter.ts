import Settings from "@/classes/dto/Settings";
import PhpTypePresenter from "@/classes/presenters/PhpTypePresenter";
import {PhpPropertyDocblock} from "@/classes/enums/PhpPropertyDocblock";
import {PropertyDocblockType} from "@/classes/enums/PropertyDocblockType";

export default class PhpPropertyPresenter {
    private readonly typePresenter: PhpTypePresenter;
    private readonly settings: Settings;

    public constructor(typePresenter: PhpTypePresenter, settings: Settings) {
        this.typePresenter = typePresenter;
        this.settings = settings;
    }

    public toString(): string {
        let content = '';

        const mustAddDocblock = this.typePresenter.getPhpType().isDocblockRequired()
            && this.settings.propertyDocblock !== PhpPropertyDocblock.None;

        if (mustAddDocblock || this.settings.propertyDocblock === PhpPropertyDocblock.All) {
            if (this.settings.propertyDocblockType === PropertyDocblockType.Inline) {
                content += '\t/** ' + this.typePresenter.getDocblockContent() + ' */\n';
            } else {
                content += '\t/**\n';
                content += '\t * ' + this.typePresenter.getDocblockContent() + '\n';
                content += '\t */\n';
            }
        }

        content += '\t' + this.settings.propertyVisibility + ' ';

        if (this.settings.supportsTypedProperties()) {
            content += this.typePresenter.getPhpVarWithType();
        } else {
            content += this.typePresenter.getPhpVar();
        }

        content += ';';

        return content;
    }
}