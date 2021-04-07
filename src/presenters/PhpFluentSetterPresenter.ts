import PhpSetterPresenter from '@/presenters/PhpSetterPresenter';
import PhpDocblockPresenter from '@/presenters/PhpDocblockPresenter';

export default class PhpFluentSetterPresenter extends PhpSetterPresenter{
    public toString(): string {
        let content = '';

        content += (new PhpDocblockPresenter(this.settings, [this.propertyTypePresenter], 'self')).toString();

        content += '\tpublic function ' + this.getMethodName() + '(' + this.propertyTypePresenter.getPhpVarWithType() + '): self\n';
        content += '\t{\n';
        content += '\t\t$this->' + this.propertyTypePresenter.getPhpVarName() + ' = ' + this.propertyTypePresenter.getPhpVar() +';\n';
        content += '\t\treturn $this;\n';
        content += '\t}\n';

        return content;
    }
}