import PhpTypePresenter from "@/classes/presenters/PhpTypePresenter";
import Settings from "@/classes/dto/Settings";
import Str from "@/classes/support/Str";

export default class PhpGetterPresenter {
    private readonly type: PhpTypePresenter;
    private readonly settings: Settings;

    public constructor(type: PhpTypePresenter, settings: Settings) {
        this.type = type;
        this.settings = settings;
    }

    public toString(): string {
        let content = '';

        if (this.settings.addDocBlocks) {
            content += '\t/**\n';
            content += '\t * @return ' + this.type.getPhpTypeNotation() + '\n';
            content += '\t */\n'
        }

        content += '\tpublic function '
            + Str.changeCase('get_' + this.type.getPhpVarName(), this.settings.getterCase)
            + '(): ' + this.type.getPhpTypeNotation() + '\n';

        content += '\t{\n';
        content += '\t\treturn $this->' + this.type.getPhpVarName() + ';\n';
        content += '\t}\n';

        return content;
    }
}