import PhpTypePresenter from "@/classes/presenters/PhpTypePresenter";
import Settings from "@/classes/dto/Settings";
import {PhpDocblock} from "@/classes/enums/PhpDocblock";

export default class PhpDocblockPresenter {
    private readonly typePresenters: PhpTypePresenter[];
    private readonly returnType: string | null;
    private readonly settings: Settings;

    public constructor(settings: Settings, typePresenters: PhpTypePresenter[], returnType: string | null = null) {
        this.settings = settings;
        this.typePresenters = typePresenters;
        this.returnType = returnType;
    }

    public toString(): string {
        if (this.settings.docblock === PhpDocblock.None) {
            return "";
        }

        const filteredTypePresenters = this.typePresenters.filter(presenter => {
            return !(this.settings.docblock === PhpDocblock.Necessary && !presenter.getPhpType().isDocblockRequired());
        });

        if (filteredTypePresenters.length === 0 && (this.returnType === null || this.settings.docblock === PhpDocblock.Necessary)) {
            return "";
        }

        let content = '\t/**\n';

        if (filteredTypePresenters.length) {
            content += filteredTypePresenters
                .map(property => '\t * ' + property.getDocblockContent() + ' ' + property.getPhpVar()).join('\n') + '\n';
        }

        if (this.settings.docblock === PhpDocblock.All && this.returnType) {
            content += '\t * @return ' + this.returnType + '\n';
        }

        content += '\t */\n';
        return content;
    }
}