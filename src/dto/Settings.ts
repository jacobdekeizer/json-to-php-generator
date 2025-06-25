import { PhpVersion } from '@/enums/PhpVersion';
import { StringCase } from '@/enums/StringCase';
import { PhpVisibility } from '@/enums/PhpVisibility';
import { PhpDocblock } from '@/enums/PhpDocblock';
import { PropertyDocblockType } from '@/enums/PropertyDocblockType';

export default interface Settings {
  phpVersion: PhpVersion;

  classCase: StringCase;
  propertyCase: StringCase;

  propertyVisibility: PhpVisibility;
  propertyDocblock: PhpDocblock;
  propertyDocblockType: PropertyDocblockType;
  propertyAddExtraNewLine: boolean;
  readonlyProperties: boolean;

  addGetters: boolean;
  getterCase: StringCase;
  addSetters: boolean;
  setterCase: StringCase;
  isFluentSetter: boolean;

  addConstructor: boolean;
  constructorPropertyPromotion: boolean;

  finalClasses: boolean;
  readonlyClasses: boolean;
  allPropertiesNullable: boolean;

  addFromJsonMethod: boolean;
  jsonIsArray: boolean;

  addToArrayMethod: boolean;

  docblock: PhpDocblock;

  namespace: string;
  rootClassName: string;
  declareStrictTypes: boolean;
}

const getPhpVersionNumber = (version: PhpVersion): number => {
  return parseInt(version.toString().replace('PHP', '').replace(' ', '').replace('.', ''));
};

const isVersionSupported = (selectedVersion: PhpVersion, fromVersion: PhpVersion): boolean => {
  return getPhpVersionNumber(selectedVersion) >= getPhpVersionNumber(fromVersion);
};

export const supportsTypedProperties = (settings: Settings): boolean => {
  return isVersionSupported(settings.phpVersion, PhpVersion.PHP74);
};

export const supportsUnionType = (settings: Settings): boolean => {
  return isVersionSupported(settings.phpVersion, PhpVersion.PHP80);
};

export const supportsMixedType = (settings: Settings): boolean => {
  return isVersionSupported(settings.phpVersion, PhpVersion.PHP80);
};

export const supportsConstructorPropertyPromotion = (settings: Settings): boolean => {
  return isVersionSupported(settings.phpVersion, PhpVersion.PHP80);
};

export const supportsReadonlyProperties = (settings: Settings): boolean => {
  return isVersionSupported(settings.phpVersion, PhpVersion.PHP81);
};

export const supportsReadonlyClasses = (settings: Settings): boolean => {
  return isVersionSupported(settings.phpVersion, PhpVersion.PHP82);
};

export const createDefaultSettings = (): Settings => {
  return {
    phpVersion: PhpVersion.PHP83,

    classCase: StringCase.PascalCase,
    propertyCase: StringCase.CamelCase,

    propertyVisibility: PhpVisibility.Public,
    propertyDocblock: PhpDocblock.Necessary,
    propertyDocblockType: PropertyDocblockType.Inline,
    propertyAddExtraNewLine: false,
    readonlyProperties: false,

    addGetters: false,
    getterCase: StringCase.CamelCase,
    addSetters: false,
    setterCase: StringCase.CamelCase,
    isFluentSetter: true,

    addConstructor: true,
    constructorPropertyPromotion: false,

    finalClasses: false,
    readonlyClasses: false,
    allPropertiesNullable: false,

    addFromJsonMethod: false,
    jsonIsArray: true,

    addToArrayMethod: false,

    docblock: PhpDocblock.Necessary,

    namespace: '',
    rootClassName: 'RootObject',
    declareStrictTypes: false,
  };
};
