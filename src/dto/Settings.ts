import {PhpVersion} from '@/enums/PhpVersion';
import {StringCase} from '@/enums/StringCase';
import {PhpVisibility} from '@/enums/PhpVisibility';
import {PhpDocblock} from '@/enums/PhpDocblock';
import {PropertyDocblockType} from '@/enums/PropertyDocblockType';

export default interface Settings {
    phpVersion: PhpVersion;
    classCase: StringCase;
    propertyCase: StringCase;

    propertyVisibility: PhpVisibility;
    propertyDocblock: PhpDocblock;
    propertyDocblockType: PropertyDocblockType;
    propertyAddExtraNewLine: boolean;

    addGetters: boolean;
    getterCase: StringCase;
    addSetters: boolean;
    setterCase: StringCase;
    isFluentSetter: boolean;

    addConstructor: boolean;
    finalClasses: boolean;
    allPropertiesNullable: boolean;

    addFromJsonMethod: boolean;
    jsonIsArray: boolean;

    docblock: PhpDocblock;
}

export const supports = (settings: Settings, versions: PhpVersion[]): boolean => versions.includes(settings.phpVersion);

export const supportsTypedProperties = (settings: Settings): boolean => {
    return supports(settings, [PhpVersion.PHP74, PhpVersion.PHP80, PhpVersion.PHP81]);
}

export const supportsUnionType = (settings: Settings): boolean => {
    return supports(settings, [PhpVersion.PHP80, PhpVersion.PHP81]);
}

export const supportsMixedType = (settings: Settings): boolean => {
    return supports(settings, [PhpVersion.PHP80, PhpVersion.PHP81]);
}

export const createDefaultSettings = (): Settings => {
    return {
        phpVersion: PhpVersion.PHP80,
        classCase: StringCase.PascalCase,
        propertyCase: StringCase.CamelCase,

        propertyVisibility: PhpVisibility.Public,
        propertyDocblock: PhpDocblock.Necessary,
        propertyDocblockType: PropertyDocblockType.Inline,
        propertyAddExtraNewLine: false,

        addGetters: false,
        getterCase: StringCase.CamelCase,
        addSetters: false,
        setterCase: StringCase.CamelCase,
        isFluentSetter: true,

        addConstructor: true,
        finalClasses: false,
        allPropertiesNullable: false,

        addFromJsonMethod: false,
        jsonIsArray: true,

        docblock: PhpDocblock.Necessary,
    }
}