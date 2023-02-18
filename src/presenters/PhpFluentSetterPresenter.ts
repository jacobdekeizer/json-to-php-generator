import PhpSetterPresenter from '@/presenters/PhpSetterPresenter';
import PhpDocblockPresenter from '@/presenters/PhpDocblockPresenter';
import CodeWriter from '@/writers/CodeWriter';
import {PhpVisibility} from '@/enums/PhpVisibility';

export default class PhpFluentSetterPresenter extends PhpSetterPresenter{
    public write(codeWriter: CodeWriter): void {
        (new PhpDocblockPresenter(this.settings, [this.propertyTypePresenter], 'self')).write(codeWriter);
        codeWriter.openMethod(
            PhpVisibility.Public,
            this.getMethodName(),
            'self',
            [this.getMethodParameter()]
        );
        codeWriter.writeLine(
            `$this->${this.propertyTypePresenter.getPhpVarName()} = ${this.propertyTypePresenter.getPhpVar()};`
        );
        codeWriter.writeLine('return $this;');
        codeWriter.closeMethod();
    }
}