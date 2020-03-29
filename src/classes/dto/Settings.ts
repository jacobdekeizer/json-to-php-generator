import {PhpVersion} from "@/classes/enums/PhpVersion";
import {StringCase} from "@/classes/enums/StringCase";

export default class Settings {
    public phpVersion: PhpVersion = PhpVersion.PHP74;
    public classCase: StringCase = StringCase.PascalCase;
    public propertyCase: StringCase = StringCase.CamelCase;

    public addConstructor = true;
    public addDocBlocks = false;
    public finalClasses = false;
    public addGetters = false;
    public getterCase: StringCase = StringCase.CamelCase;
    public addSetters = false;
    public setterCase: StringCase = StringCase.CamelCase;
    public isFluentSetter = true;

    public supportsTypedProperties(): boolean {
        const supportedVersions = [PhpVersion.PHP74];
        return supportedVersions.includes(this.phpVersion);
    }
}