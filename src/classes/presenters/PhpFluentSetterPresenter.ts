import PhpSetterPresenter from "@/classes/presenters/PhpSetterPresenter";

export default class PhpFluentSetterPresenter extends PhpSetterPresenter{
    public toString(): string {
        let content = '';

        if (this.settings.addDocBlocks) {
            content += '\t/**\n';
            content += '\t * @var ' + this.typePresenter.getPhpVarWithType() + '\n';
            content += '\t * @return self\n';
            content += '\t */\n'
        }

        content += '\tpublic function ' + this.getMethodName() + '(' + this.typePresenter.getPhpVarWithType() + '): self\n';
        content += '\t{\n';
        content += '\t\t$this->' + this.typePresenter.getPhpVarName() + ' = ' + this.typePresenter.getPhpVar() +';\n';
        content += '\t\treturn $this;\n';
        content += '\t}\n';

        return content;
    }
}