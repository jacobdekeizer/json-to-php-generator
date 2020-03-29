import PhpTypePresenter from "@/classes/presenters/PhpTypePresenter";
import Settings from "@/classes/dto/Settings";
import Str from "@/classes/support/Str";

export default class PhpGetterPresenter {
    private readonly typePresenter: PhpTypePresenter;
    private readonly settings: Settings;

    public constructor(type: PhpTypePresenter, settings: Settings) {
        this.typePresenter = type;
        this.settings = settings;
    }

    public toString(): string {
        let content = '';

        if (this.settings.addDocBlocks) {
            content += '\t/**\n';
            content += '\t * @return ' + this.typePresenter.getPhpTypeNotation() + '\n';
            content += '\t */\n'
        }

        content += '\tpublic function '
            + Str.changeCase('get_' + this.typePresenter.getPhpVarName(), this.settings.getterCase)
            + '(): ' + this.typePresenter.getPhpTypeNotation() + '\n';

        content += '\t{\n';
        content += '\t\treturn $this->' + this.typePresenter.getPhpVarName() + ';\n';
        content += '\t}\n';

        return content;
    }
}