import {ref} from 'vue';
import {expect} from 'vitest';
import Settings from '@/dto/Settings';
import fs from 'fs'
import path from 'path'
import {PhpVersion} from '@/enums/PhpVersion';
import {StringCase} from '@/enums/StringCase';
import {PhpVisibility} from '@/enums/PhpVisibility';
import {PhpDocblock} from '@/enums/PhpDocblock';
import {PropertyDocblockType} from '@/enums/PropertyDocblockType';
import {snakeCase} from 'change-case';
import {withSetup} from '../test-utils';
import {useSettings} from '@/hooks/use-settings';
import {useJsonConverter} from '@/hooks/use-json-converter';

const dataCases: Array<[string, string]> = [
    [
        'all types json',
        fs.readFileSync(path.resolve(__dirname, './fixtures/all_types_json.txt'), 'utf8'),
    ],
    [
        'simple json data',
        fs.readFileSync(path.resolve(__dirname, './fixtures/simple_json.txt'), 'utf8'),
    ],
    [
        'merges nested arrays',
        fs.readFileSync(path.resolve(__dirname, './fixtures/merges_nested_arrays.txt'), 'utf8'),
    ],
]

const versions = [PhpVersion.PHP73, PhpVersion.PHP74, PhpVersion.PHP80, PhpVersion.PHP81, PhpVersion.PHP82];

const settingCases = versions.map(version => {
    return [
        [
            version + ' with constructor',
            {
                phpVersion: version,

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
                isFluentSetter: false,

                addConstructor: true,
                constructorPropertyPromotion: false,

                finalClasses: false,
                readonlyClasses: false,
                allPropertiesNullable: false,

                addFromJsonMethod: false,
                jsonIsArray: false,

                docblock: PhpDocblock.Necessary,
            }
        ],
        [
            version + ' without constructor',
            {
                phpVersion: version,

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
                isFluentSetter: false,

                addConstructor: false,
                constructorPropertyPromotion: false,

                finalClasses: false,
                readonlyClasses: false,
                allPropertiesNullable: false,

                addFromJsonMethod: false,
                jsonIsArray: false,

                docblock: PhpDocblock.Necessary,
            }
        ],
        [
            version + ' with constructor and readonly properties',
            {
                phpVersion: version,

                classCase: StringCase.PascalCase,
                propertyCase: StringCase.CamelCase,

                propertyVisibility: PhpVisibility.Public,
                propertyDocblock: PhpDocblock.Necessary,
                propertyDocblockType: PropertyDocblockType.Inline,
                propertyAddExtraNewLine: false,
                readonlyProperties: true,

                addGetters: false,
                getterCase: StringCase.CamelCase,
                addSetters: false,
                setterCase: StringCase.CamelCase,
                isFluentSetter: false,

                addConstructor: true,
                constructorPropertyPromotion: false,

                finalClasses: false,
                readonlyClasses: false,
                allPropertiesNullable: false,

                addFromJsonMethod: false,
                jsonIsArray: false,

                docblock: PhpDocblock.Necessary,
            }
        ],
        [
            version + ' without constructor and readonly properties',
            {
                phpVersion: version,

                classCase: StringCase.PascalCase,
                propertyCase: StringCase.CamelCase,

                propertyVisibility: PhpVisibility.Public,
                propertyDocblock: PhpDocblock.Necessary,
                propertyDocblockType: PropertyDocblockType.Inline,
                propertyAddExtraNewLine: false,
                readonlyProperties: true,

                addGetters: false,
                getterCase: StringCase.CamelCase,
                addSetters: false,
                setterCase: StringCase.CamelCase,
                isFluentSetter: false,

                addConstructor: false,
                constructorPropertyPromotion: false,

                finalClasses: false,
                readonlyClasses: false,
                allPropertiesNullable: false,

                addFromJsonMethod: false,
                jsonIsArray: false,

                docblock: PhpDocblock.Necessary,
            }
        ],
        [
            version + ' without constructor and readonly classes',
            {
                phpVersion: version,

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
                isFluentSetter: false,

                addConstructor: false,
                constructorPropertyPromotion: false,

                finalClasses: false,
                readonlyClasses: true,
                allPropertiesNullable: false,

                addFromJsonMethod: false,
                jsonIsArray: false,

                docblock: PhpDocblock.Necessary,
            }
        ],
        [
            version + ' with constructor, readonly properties and promoted properties',
            {
                phpVersion: version,

                classCase: StringCase.PascalCase,
                propertyCase: StringCase.CamelCase,

                propertyVisibility: PhpVisibility.Public,
                propertyDocblock: PhpDocblock.Necessary,
                propertyDocblockType: PropertyDocblockType.Inline,
                propertyAddExtraNewLine: false,
                readonlyProperties: true,

                addGetters: false,
                getterCase: StringCase.CamelCase,
                addSetters: false,
                setterCase: StringCase.CamelCase,
                isFluentSetter: false,

                addConstructor: true,
                constructorPropertyPromotion: true,

                finalClasses: false,
                readonlyClasses: false,
                allPropertiesNullable: false,

                addFromJsonMethod: false,
                jsonIsArray: false,

                docblock: PhpDocblock.Necessary,
            }
        ],
        [
            version + ' with constructor, promoted properties, getters and setters',
            {
                phpVersion: version,

                classCase: StringCase.PascalCase,
                propertyCase: StringCase.CamelCase,

                propertyVisibility: PhpVisibility.Public,
                propertyDocblock: PhpDocblock.Necessary,
                propertyDocblockType: PropertyDocblockType.Inline,
                propertyAddExtraNewLine: false,
                readonlyProperties: false,

                addGetters: true,
                getterCase: StringCase.CamelCase,
                addSetters: true,
                setterCase: StringCase.CamelCase,
                isFluentSetter: false,

                addConstructor: true,
                constructorPropertyPromotion: true,

                finalClasses: false,
                readonlyClasses: false,
                allPropertiesNullable: false,

                addFromJsonMethod: false,
                jsonIsArray: false,

                docblock: PhpDocblock.Necessary,
            }
        ],
        [
            version + ' with constructor, readonly properties, promoted properties, getters and setters',
            {
                phpVersion: version,

                classCase: StringCase.PascalCase,
                propertyCase: StringCase.CamelCase,

                propertyVisibility: PhpVisibility.Public,
                propertyDocblock: PhpDocblock.Necessary,
                propertyDocblockType: PropertyDocblockType.Inline,
                propertyAddExtraNewLine: false,
                readonlyProperties: true,

                addGetters: true,
                getterCase: StringCase.CamelCase,
                addSetters: true,
                setterCase: StringCase.CamelCase,
                isFluentSetter: false,

                addConstructor: true,
                constructorPropertyPromotion: true,

                finalClasses: false,
                readonlyClasses: false,
                allPropertiesNullable: false,

                addFromJsonMethod: false,
                jsonIsArray: false,

                docblock: PhpDocblock.Necessary,
            }
        ],
        [
            version + ' with constructor, readonly properties, promoted properties and from json method',
            {
                phpVersion: version,

                classCase: StringCase.PascalCase,
                propertyCase: StringCase.CamelCase,

                propertyVisibility: PhpVisibility.Public,
                propertyDocblock: PhpDocblock.Necessary,
                propertyDocblockType: PropertyDocblockType.Inline,
                propertyAddExtraNewLine: false,
                readonlyProperties: true,

                addGetters: false,
                getterCase: StringCase.CamelCase,
                addSetters: false,
                setterCase: StringCase.CamelCase,
                isFluentSetter: false,

                addConstructor: true,
                constructorPropertyPromotion: true,

                finalClasses: false,
                readonlyClasses: false,
                allPropertiesNullable: false,

                addFromJsonMethod: true,
                jsonIsArray: false,

                docblock: PhpDocblock.Necessary,
            }
        ],
        [
            version + ' with constructor, readonly properties, promoted properties and from json array method',
            {
                phpVersion: version,

                classCase: StringCase.PascalCase,
                propertyCase: StringCase.CamelCase,

                propertyVisibility: PhpVisibility.Public,
                propertyDocblock: PhpDocblock.Necessary,
                propertyDocblockType: PropertyDocblockType.Inline,
                propertyAddExtraNewLine: false,
                readonlyProperties: true,

                addGetters: false,
                getterCase: StringCase.CamelCase,
                addSetters: false,
                setterCase: StringCase.CamelCase,
                isFluentSetter: false,

                addConstructor: true,
                constructorPropertyPromotion: true,

                finalClasses: false,
                readonlyClasses: false,
                allPropertiesNullable: false,

                addFromJsonMethod: true,
                jsonIsArray: true,

                docblock: PhpDocblock.Necessary,
            }
        ],
        [
            version + ' with setters and from json method',
            {
                phpVersion: version,

                classCase: StringCase.PascalCase,
                propertyCase: StringCase.CamelCase,

                propertyVisibility: PhpVisibility.Public,
                propertyDocblock: PhpDocblock.Necessary,
                propertyDocblockType: PropertyDocblockType.Inline,
                propertyAddExtraNewLine: false,
                readonlyProperties: false,

                addGetters: false,
                getterCase: StringCase.CamelCase,
                addSetters: true,
                setterCase: StringCase.CamelCase,
                isFluentSetter: false,

                addConstructor: false,
                constructorPropertyPromotion: false,

                finalClasses: false,
                readonlyClasses: false,
                allPropertiesNullable: false,

                addFromJsonMethod: true,
                jsonIsArray: false,

                docblock: PhpDocblock.Necessary,
            }
        ],
        [
            version + ' with setters and from json array method',
            {
                phpVersion: version,

                classCase: StringCase.PascalCase,
                propertyCase: StringCase.CamelCase,

                propertyVisibility: PhpVisibility.Public,
                propertyDocblock: PhpDocblock.Necessary,
                propertyDocblockType: PropertyDocblockType.Inline,
                propertyAddExtraNewLine: false,
                readonlyProperties: false,

                addGetters: false,
                getterCase: StringCase.CamelCase,
                addSetters: true,
                setterCase: StringCase.CamelCase,
                isFluentSetter: false,

                addConstructor: false,
                constructorPropertyPromotion: false,

                finalClasses: false,
                readonlyClasses: false,
                allPropertiesNullable: false,

                addFromJsonMethod: true,
                jsonIsArray: true,

                docblock: PhpDocblock.Necessary,
            }
        ],
        [
            version + ' with getters, fluent setters, all docblocks, extra new lines for properties and from json method',
            {
                phpVersion: version,

                classCase: StringCase.PascalCase,
                propertyCase: StringCase.CamelCase,

                propertyVisibility: PhpVisibility.Public,
                propertyDocblock: PhpDocblock.All,
                propertyDocblockType: PropertyDocblockType.Multiline,
                propertyAddExtraNewLine: true,
                readonlyProperties: false,

                addGetters: true,
                getterCase: StringCase.CamelCase,
                addSetters: true,
                setterCase: StringCase.CamelCase,
                isFluentSetter: true,

                addConstructor: false,
                constructorPropertyPromotion: false,

                finalClasses: false,
                readonlyClasses: false,
                allPropertiesNullable: false,

                addFromJsonMethod: true,
                jsonIsArray: true,

                docblock: PhpDocblock.All,
            }
        ],
        [
            version + ' with final classes and all properties nullable',
            {
                phpVersion: version,

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
                isFluentSetter: false,

                addConstructor: false,
                constructorPropertyPromotion: false,

                finalClasses: true,
                readonlyClasses: false,
                allPropertiesNullable: true,

                addFromJsonMethod: false,
                jsonIsArray: false,

                docblock: PhpDocblock.Necessary,
            }
        ],
    ];
}).flat() as Array<[string, Settings]>;

const cases = dataCases.map((dataCase) => {
    return settingCases.map((settingCase) => {
        return [
            dataCase[0] + ' ' + settingCase[0],
            dataCase[1],
            settingCase[1],
        ]
    });
}).flat() as Array<[string, string, Settings]>;

describe('JsonToPhpFactory tests', () => {
    test.concurrent.each(cases)('It can parse %s', async (name, jsonData, settingsToTest) => {
        const jsonContent = ref(jsonData);

        const [{ settings}] = withSetup(() => useSettings());
        settings.value = settingsToTest;

        const [{ code }] = withSetup(() => useJsonConverter({ jsonContent, settings }));

        const resultPath = path.resolve(__dirname, `./fixtures/results/${snakeCase(name)}.txt`, )

        // fs.writeFileSync(resultPath, code.value ?? ''); // uncomment this line when you want to save fixtures for a new case

        const expectedResult = fs.readFileSync(resultPath, 'utf8');

        expect(code.value).toBe(expectedResult)
    })
})