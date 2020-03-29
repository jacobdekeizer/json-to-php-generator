import PhpTypePresenter from "@/classes/presenters/PhpTypePresenter";
import Settings from "@/classes/dto/Settings";
import Str from "@/classes/support/Str";

export default class PhpSetterPresenter {
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
            content += '\t * @var ' + this.typePresenter.getPhpVarWithType() + '\n';
            content += '\t * @return void';
            content += '\t */\n'
        }

        content += '\tpublic function '
            + Str.changeCase('set_' + this.typePresenter.getPhpVarName(), this.settings.setterCase)
            + '(' + this.typePresenter.getPhpVarWithType() + '): void\n';

        content += '\t{\n';
        content += '\t\t$this->' + this.typePresenter.getPhpVarName() + ' = ' + this.typePresenter.getPhpVar() +';\n';
        content += '\t}\n';

        return content;
    }
}