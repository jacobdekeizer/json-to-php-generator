import SelectOption from "@/classes/dto/SelectOption";

export default class EnumSelect {
    public static getOptions(enumObject: any): SelectOption[] {
        const options: SelectOption[] = [];
        const keys = Object.keys(enumObject);

        for (const key of keys) {
            options.push(new SelectOption(enumObject[key], enumObject[key] as string));
        }

        return options;
    }
}