import {PhpVersion} from "@/classes/enums/PhpVersion";
import {StringCase} from "@/classes/enums/StringCase";
import {PhpVisibility} from "@/classes/enums/PhpVisibility";
import {PhpPropertyDocblock} from "@/classes/enums/PhpPropertyDocblock";
import {PropertyDocblockType} from "@/classes/enums/PropertyDocblockType";

export default class Settings {
    public phpVersion = PhpVersion.PHP74;
    public classCase = StringCase.PascalCase;
    public propertyCase = StringCase.CamelCase;

    public propertyVisibility = PhpVisibility.Private;
    public propertyDocblock = PhpPropertyDocblock.Necessary;
    public propertyDocblockType = PropertyDocblockType.Inline;
    public propertyAddExtraNewLine = false;

    public addGetters = false;
    public getterCase = StringCase.CamelCase;
    public addSetters = false;
    public setterCase = StringCase.CamelCase;
    public isFluentSetter = true;

    public addConstructor = true;
    public addDocBlocks = false;
    public finalClasses = false;
    public addFromJsonMethod = false;

    public supportsTypedProperties(): boolean {
        const supportedVersions = [PhpVersion.PHP74];
        return supportedVersions.includes(this.phpVersion);
    }
}