import PhpTypePresenter from "@/classes/presenters/PhpTypePresenter";
import Settings from "@/classes/dto/Settings";
import Str from "@/classes/support/Str";

export default class PhpFluentSetterPresenter {
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
            content += '\t * @var ' + this.type.getPhpVarWithType() + '\n';
            content += '\t * @return self\n';
            content += '\t */\n'
        }

        content += '\tpublic function '
            + Str.changeCase('set_' + this.type.getPhpVarName(), this.settings.setterCase)
            + '(' + this.type.getPhpVarWithType() + '): self';

        content += '\t{\n';
        content += '\t\t$this->' + this.type.getPhpVarName() + ' = ' + this.type.getPhpVar() +';\n';
        content += '\t\treturn $this;\n';
        content += '\t}\n';

        return content;
    }
}