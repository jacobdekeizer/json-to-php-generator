import Settings from "@/classes/dto/Settings";
import Str from "@/classes/support/Str";
import PhpDocblockPresenter from "@/classes/presenters/PhpDocblockPresenter";
import PhpPropertyTypePresenter from '@/classes/presenters/PhpPropertyTypePresenter';

export default class PhpGetterPresenter {
    private readonly propertyTypePresenter: PhpPropertyTypePresenter;
    private readonly settings: Settings;

    public constructor(propertyTypePresenter: PhpPropertyTypePresenter, settings: Settings) {
        this.propertyTypePresenter = propertyTypePresenter;
        this.settings = settings;
    }

    public toString(): string {
        let content = '';

        content += (new PhpDocblockPresenter(this.settings, [], this.propertyTypePresenter.getPhpTypeNotation())).toString();

        const returnType = this.propertyTypePresenter.getPhpTypeNotation() ? ': ' + this.propertyTypePresenter.getPhpTypeNotation() : '';

        content += '\tpublic function '
            + Str.changeCase('get_' + this.propertyTypePresenter.getPhpVarName(), this.settings.getterCase)
            + '()' + returnType + '\n';

        content += '\t{\n';
        content += '\t\treturn $this->' + this.propertyTypePresenter.getPhpVarName() + ';\n';
        content += '\t}\n';

        return content;
    }
}