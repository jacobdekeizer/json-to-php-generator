import Settings, {supportsTypedProperties} from '@/dto/Settings';
import {PhpDocblock} from '@/enums/PhpDocblock';
import {PropertyDocblockType} from '@/enums/PropertyDocblockType';
import PhpPropertyTypePresenter from '@/presenters/PhpPropertyTypePresenter';
import CodeWriter from '@/writers/CodeWriter';

export default class PhpPropertyPresenter {
    private readonly propertyTypePresenter: PhpPropertyTypePresenter;
    private readonly settings: Settings;

    public constructor(propertyTypePresenter: PhpPropertyTypePresenter, settings: Settings) {
        this.propertyTypePresenter = propertyTypePresenter;
        this.settings = settings;
    }

    public getPropertyString(): string {
        return this.settings.propertyVisibility + ' ' + (
            supportsTypedProperties(this.settings)
                ? this.propertyTypePresenter.getPhpVarWithType()
                : this.propertyTypePresenter.getPhpVar()
        );
    }

    public write(codeWriter: CodeWriter): void {
        const mustAddDocblock = this.settings.propertyDocblock === PhpDocblock.All
             || (
                this.settings.propertyDocblock !== PhpDocblock.None
                && this.propertyTypePresenter.getProperty().isDocblockRequired()
            );

        if (mustAddDocblock) {
            const docblockContent = '@var ' + this.propertyTypePresenter.getDocblockContent();

            this.settings.propertyDocblockType === PropertyDocblockType.Inline
                ? codeWriter.writeInlineDocblock(docblockContent)
                : codeWriter.writeMultilineDocblock([docblockContent]);
        }

        codeWriter.writeLine(this.getPropertyString() + ';');
    }
}
