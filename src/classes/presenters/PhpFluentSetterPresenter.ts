import PhpSetterPresenter from "@/classes/presenters/PhpSetterPresenter";
import PhpDocblockPresenter from "@/classes/presenters/PhpDocblockPresenter";

export default class PhpFluentSetterPresenter extends PhpSetterPresenter{
    public toString(): string {
        let content = '';

        content += (new PhpDocblockPresenter(this.settings, [this.typePresenter], 'self')).toString();

        content += '\tpublic function ' + this.getMethodName() + '(' + this.typePresenter.getPhpVarWithType() + '): self\n';
        content += '\t{\n';
        content += '\t\t$this->' + this.typePresenter.getPhpVarName() + ' = ' + this.typePresenter.getPhpVar() +';\n';
        content += '\t\treturn $this;\n';
        content += '\t}\n';

        return content;
    }
}