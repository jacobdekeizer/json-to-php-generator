import Settings from '@/dto/Settings';
import Str from '@/support/Str';
import PhpDocblockPresenter from '@/presenters/PhpDocblockPresenter';
import PhpPropertyTypePresenter from '@/presenters/PhpPropertyTypePresenter';
import CodeWriter from '@/writers/CodeWriter';
import {PhpVisibility} from '@/enums/PhpVisibility';

export default class PhpSetterPresenter {
    protected readonly propertyTypePresenter: PhpPropertyTypePresenter;
    protected readonly settings: Settings;

    public constructor(propertyTypePresenter: PhpPropertyTypePresenter, settings: Settings) {
        this.propertyTypePresenter = propertyTypePresenter;
        this.settings = settings;
    }

    public getMethodName(): string {
        return Str.changeCase('set_' + this.propertyTypePresenter.getPhpVarName(), this.settings.setterCase);
    }

    public write(codeWriter: CodeWriter): void {
        (new PhpDocblockPresenter(this.settings, [this.propertyTypePresenter], 'void')).write(codeWriter);
        codeWriter.openMethod(PhpVisibility.Public, `${this.getMethodSignature()}: void`);
        codeWriter.writeLine(
            `$this->${this.propertyTypePresenter.getPhpVarName()} = ${this.propertyTypePresenter.getPhpVar()};`
        );
        codeWriter.closeMethod();
    }

    protected getMethodSignature(): string {
        return `${this.getMethodName()}(${this.propertyTypePresenter.getPhpVarWithType()})`;
    }
}