import {PhpVersion} from '@/enums/PhpVersion';
import {StringCase} from '@/enums/StringCase';
import {PhpVisibility} from '@/enums/PhpVisibility';
import {PhpDocblock} from '@/enums/PhpDocblock';
import {PropertyDocblockType} from '@/enums/PropertyDocblockType';

export default class Settings {
    public phpVersion = PhpVersion.PHP80;
    public classCase = StringCase.PascalCase;
    public propertyCase = StringCase.CamelCase;

    public propertyVisibility = PhpVisibility.Public;
    public propertyDocblock = PhpDocblock.Necessary;
    public propertyDocblockType = PropertyDocblockType.Inline;
    public propertyAddExtraNewLine = false;

    public addGetters = false;
    public getterCase = StringCase.CamelCase;
    public addSetters = false;
    public setterCase = StringCase.CamelCase;
    public isFluentSetter = true;

    public addConstructor = true;
    public finalClasses = false;
    public addFromJsonMethod = false;
    public allPropertiesNullable = false;

    public docblock = PhpDocblock.Necessary;

    public supportsTypedProperties(): boolean {
        return this.supports([PhpVersion.PHP74, PhpVersion.PHP80]);
    }

    public supportsMixedType(): boolean {
        return this.supports([PhpVersion.PHP80]);
    }

    public supportsUnionType(): boolean {
        return this.supports([PhpVersion.PHP80]);
    }

    private supports(versions: PhpVersion[]): boolean {
        return versions.includes(this.phpVersion);
    }
}