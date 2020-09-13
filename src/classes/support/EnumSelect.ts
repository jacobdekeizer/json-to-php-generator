import SelectOption from '@/classes/dto/SelectOption';

export default class EnumSelect {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    public static getOptions(enumObject: any): SelectOption[] {
        const options: SelectOption[] = [];
        const keys = Object.keys(enumObject);

        for (const key of keys) {
            options.push(new SelectOption(enumObject[key] as string, enumObject[key] as string));
        }

        return options;
    }
}