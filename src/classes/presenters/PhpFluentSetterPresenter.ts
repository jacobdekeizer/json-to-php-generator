import PhpSetterPresenter from "@/classes/presenters/PhpSetterPresenter";
import PhpMethodDocblockPresenter from "@/classes/presenters/PhpMethodDocblockPresenter";

export default class PhpFluentSetterPresenter extends PhpSetterPresenter{
    public toString(): string {
        let content = '';

        if (this.settings.addDocBlocks) {
            content += (new PhpMethodDocblockPresenter([this.typePresenter], 'self')).toString();
        }

        content += '\tpublic function ' + this.getMethodName() + '(' + this.typePresenter.getPhpVarWithType() + '): self\n';
        content += '\t{\n';
        content += '\t\t$this->' + this.typePresenter.getPhpVarName() + ' = ' + this.typePresenter.getPhpVar() +';\n';
        content += '\t\treturn $this;\n';
        content += '\t}\n';

        return content;
    }
}