import Settings from '@/dto/Settings';
import PhpDocblockPresenter from '@/presenters/PhpDocblockPresenter';
import PhpPropertyTypePresenter from '@/presenters/PhpPropertyTypePresenter';
import CodeWriter from '@/writers/CodeWriter';
import {PhpVisibility} from '@/enums/PhpVisibility';
import PhpPropertyPresenter from '@/presenters/PhpPropertyPresenter';

export default class PhpConstructorPresenter {
    private readonly propertyTypePresenters: PhpPropertyTypePresenter[];
    private readonly settings: Settings;

    public constructor(propertyTypePresenters: PhpPropertyTypePresenter[], settings: Settings) {
        this.propertyTypePresenters = propertyTypePresenters;
        this.settings = settings;
    }

    public write(codeWriter: CodeWriter): void {
        (new PhpDocblockPresenter(this.settings, this.propertyTypePresenters)).write(codeWriter);

        const constructorContent = this.getConstructorContent();

        codeWriter.openMethod(
            PhpVisibility.Public,
            '__construct',
            null,
            constructorContent,
            {
                isMultiline: constructorContent.length > 2
            }
        );

        if (!this.settings.constructorPropertyPromotion) {
            codeWriter.writeLines(this.propertyTypePresenters.map(item => {
                return `$this->${item.getPhpVarName()} = ${item.getPhpVar()};`
            }));
        }

        codeWriter.closeMethod();
    }

    private getConstructorContent(): string[] {
        if (this.propertyTypePresenters.length === 0) {
            return [];
        }

        if (this.settings.constructorPropertyPromotion) {
            return this.propertyTypePresenters.map(property => {
                return (new PhpPropertyPresenter(property, this.settings)).getPropertyString()
            });
        }

        return this.propertyTypePresenters.map(property => property.getPhpVarWithType());
    }
}