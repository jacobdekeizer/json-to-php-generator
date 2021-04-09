import Settings from '@/dto/Settings';
import PhpDocblockPresenter from '@/presenters/PhpDocblockPresenter';
import PhpPropertyTypePresenter from '@/presenters/PhpPropertyTypePresenter';
import CodeWriter from '@/writers/CodeWriter';
import {PhpVisibility} from '@/enums/PhpVisibility';

export default class PhpConstructorPresenter {
    private readonly propertyTypePresenters: PhpPropertyTypePresenter[];
    private readonly settings: Settings;

    public constructor(propertyTypePresenters: PhpPropertyTypePresenter[], settings: Settings) {
        this.propertyTypePresenters = propertyTypePresenters;
        this.settings = settings;
    }

    public write(codeWriter: CodeWriter): void {
        (new PhpDocblockPresenter(this.settings, this.propertyTypePresenters)).write(codeWriter);

        codeWriter.openMethod(
            PhpVisibility.Public,
            '__construct(' + this.propertyTypePresenters.map(property => property.getPhpVarWithType()).join(', ') +')'
        );

        codeWriter.writeLines(this.propertyTypePresenters.map(item => {
            return `$this->${item.getPhpVarName()} = ${item.getPhpVar()};`
        }));

        codeWriter.closeMethod();
    }
}