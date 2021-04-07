import {StringCase} from '@/enums/StringCase';
import {camelCase, pascalCase, snakeCase} from 'change-case';

export default class Str {
    public static changeCase(value: string, stringCase: StringCase): string {
        switch (stringCase) {
            case StringCase.CamelCase:
                return camelCase(value);
            case StringCase.PascalCase:
                return pascalCase(value);
            case StringCase.SnakeCase:
                return snakeCase(value);
        }

        return value;
    }
}
