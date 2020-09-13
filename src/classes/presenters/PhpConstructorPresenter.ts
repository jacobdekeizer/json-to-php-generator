import Settings from '@/classes/dto/Settings';
import PhpDocblockPresenter from '@/classes/presenters/PhpDocblockPresenter';
import PhpPropertyTypePresenter from '@/classes/presenters/PhpPropertyTypePresenter';

export default class PhpConstructorPresenter {
    private readonly propertyTypePresenters: PhpPropertyTypePresenter[];
    private readonly settings: Settings;

    public constructor(propertyTypePresenters: PhpPropertyTypePresenter[], settings: Settings) {
        this.propertyTypePresenters = propertyTypePresenters;
        this.settings = settings;
    }

    public toString(): string {
        let content = '\n';

        content += (new PhpDocblockPresenter(this.settings, this.propertyTypePresenters)).toString();

        content += '\tpublic function __construct(' + this.propertyTypePresenters.map(property => property.getPhpVarWithType()).join(', ') +') \n';
        content +='\t{\n';
        content += this.propertyTypePresenters.map(item => '\t\t$this->' + item.getPhpVarName() + ' = ' + item.getPhpVar()).join(';\n') + ';\n';
        content += '\t}\n';

        return content;
    }
}