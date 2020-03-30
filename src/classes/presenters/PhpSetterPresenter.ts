import PhpTypePresenter from "@/classes/presenters/PhpTypePresenter";
import Settings from "@/classes/dto/Settings";
import Str from "@/classes/support/Str";
import PhpMethodDocblockPresenter from "@/classes/presenters/PhpMethodDocblockPresenter";

export default class PhpSetterPresenter {
    protected readonly typePresenter: PhpTypePresenter;
    protected readonly settings: Settings;

    public constructor(type: PhpTypePresenter, settings: Settings) {
        this.typePresenter = type;
        this.settings = settings;
    }

    public getMethodName(): string {
        return Str.changeCase('set_' + this.typePresenter.getPhpVarName(), this.settings.setterCase);
    }

    public toString(): string {
        let content = '';

        if (this.settings.addDocBlocks) {
            content += (new PhpMethodDocblockPresenter([this.typePresenter], 'void')).toString();
        }

        content += '\tpublic function ' + this.getMethodName() + '(' + this.typePresenter.getPhpVarWithType() + '): void\n';

        content += '\t{\n';
        content += '\t\t$this->' + this.typePresenter.getPhpVarName() + ' = ' + this.typePresenter.getPhpVar() +';\n';
        content += '\t}\n';

        return content;
    }
}