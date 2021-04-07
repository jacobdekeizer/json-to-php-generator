import Settings from '@/dto/Settings';
import Str from '@/support/Str';
import PhpDocblockPresenter from '@/presenters/PhpDocblockPresenter';
import PhpPropertyTypePresenter from '@/presenters/PhpPropertyTypePresenter';

export default class PhpGetterPresenter {
    private readonly propertyTypePresenter: PhpPropertyTypePresenter;
    private readonly settings: Settings;

    public constructor(propertyTypePresenter: PhpPropertyTypePresenter, settings: Settings) {
        this.propertyTypePresenter = propertyTypePresenter;
        this.settings = settings;
    }

    public toString(): string {
        let content = '';

        const docblock = new PhpDocblockPresenter(
            this.settings,
            [],
            this.propertyTypePresenter.getDocblockContent(),
            this.propertyTypePresenter.getProperty().isDocblockRequired()
        );

        content += docblock.toString();

        const returnType = this.propertyTypePresenter.getPhpTypeNotation() ? ': ' + this.propertyTypePresenter.getPhpTypeNotation() : '';

        content += '\tpublic function '
            + Str.changeCase('get_' + this.propertyTypePresenter.getPhpVarName(), this.settings.getterCase)
            + '()' + returnType + '\n';

        content += '\t{\n';
        content += '\t\treturn $this->' + this.propertyTypePresenter.getPhpVarName() + ';\n';
        content += '\t}\n';

        return content;
    }
}