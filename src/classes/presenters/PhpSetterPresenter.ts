import Settings from '@/classes/dto/Settings';
import Str from '@/classes/support/Str';
import PhpDocblockPresenter from '@/classes/presenters/PhpDocblockPresenter';
import PhpPropertyTypePresenter from '@/classes/presenters/PhpPropertyTypePresenter';

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

    public toString(): string {
        let content = '';

        content += (new PhpDocblockPresenter(this.settings, [this.propertyTypePresenter], 'void')).toString();

        content += '\tpublic function ' + this.getMethodName() + '(' + this.propertyTypePresenter.getPhpVarWithType() + '): void\n';

        content += '\t{\n';
        content += '\t\t$this->' + this.propertyTypePresenter.getPhpVarName() + ' = ' + this.propertyTypePresenter.getPhpVar() +';\n';
        content += '\t}\n';

        return content;
    }
}