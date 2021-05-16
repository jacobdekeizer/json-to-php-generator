import SelectOption from '@/dto/SelectOption';

export default class EnumSelect {
    public static getOptions(enumObject: Record<string, string | number>): SelectOption[] {
        const options: SelectOption[] = [];
        const keys = Object.keys(enumObject);

        for (const key of keys) {
            options.push(new SelectOption(enumObject[key] as string, enumObject[key] as string));
        }

        return options;
    }
}