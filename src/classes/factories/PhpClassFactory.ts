import PhpType from "@/classes/php-types/PhpType";
import PhpTypeFactory from "@/classes/factories/PhpTypeFactory";
import PhpClass from "@/classes/dto/PhpClass";
import UnknownType from "@/classes/php-types/UnknownType";

export default class PhpClassFactory {
    public static make(content: any, name: string): PhpClass {
        const properties: PhpType[] = [];
        const children: PhpClass[] = [];

        // merge array of same class to one class
        if (Array.isArray(content)) {
            const result = this.getTypeAndClassFromArray(name, content);

            if (result[0] !== null) {
                children.push(result[0]);
            }

            properties.push(result[1]);

            return new PhpClass(name, properties, children);
        }

        // single class
        if (content instanceof Object) {
            const objectKeys = Object.keys(content);

            for (const key of objectKeys) {
                let type: PhpType | null = null;
                const keyContent = content[key];

                if (Array.isArray(keyContent)) {
                    // nested array
                    const result = this.getTypeAndClassFromArray(key, keyContent);

                    if (result[0] !== null) {
                        children.push(result[0]);
                    }

                    type = result[1];
                } else if (typeof keyContent === 'object' && keyContent !== null) {
                    // nested class
                    const result = this.make(keyContent, key);

                    children.push(result);
                    type = PhpTypeFactory.make(key, result);
                } else {
                    // normal type
                    type = PhpTypeFactory.make(key, keyContent);
                }

                properties.push(type);
            }
        }

        return new PhpClass(name, properties, children);
    }

    private static getTypeAndClassFromArray(name: string, content: any): [PhpClass | null, PhpType] {
        let type: PhpType | null;

        const phpClass = this.makeOneClassFromArray(content, name);

        if (phpClass !== null) {
            type = PhpTypeFactory.make(name, [phpClass]);
        } else {
            type = PhpTypeFactory.make(name, content);
        }

        return [phpClass, type];
    }

    private static makeOneClassFromArray(items: any[], name: string): PhpClass | null {
        const allClasses: PhpClass[] = [];

        for (const item of items) {
            const type = PhpTypeFactory.make(name, item);

            // check if it is a normal php type
            if (!(type instanceof UnknownType)) {
                return null;
            }

            // create new php class, because it isn't a default type
            allClasses.push(PhpClassFactory.make(item, name));
        }

        if (allClasses.length === 0) {
            return null;
        }

        return new PhpClass(name, this.mergeProperties(allClasses));
    }

    private static mergeProperties(phpClasses: PhpClass[]): PhpType[] {
        const properties: PhpType[] = [];

        for (const phpClass of phpClasses) {
            for (const property of phpClass.getProperties()) {
                const item = properties.find(item => item.getName() === property.getName());

                if (item) {
                    if (property.isNullable()) {
                        item.setNullable(true);
                    }
                    continue;
                }

                // todo if item is not here we have to make the property nullable

                properties.push(property);
            }
        }

        // check for properties which are present in one item but not in one of the other items
        // when a difference is found make them nullable
        const currentPropertyNames = properties.map(item => item.getName());

        for (const phpClass of phpClasses) {
            const classPropertyNames = phpClass.getProperties().map(item => item.getName());

            const nullablePropertyNames = currentPropertyNames.filter(item => !classPropertyNames.includes(item));

            for (const nullableProperty of nullablePropertyNames) {
                const item = properties.find(item => item.getName() === nullableProperty);

                if (item) {
                    item.setNullable(true);
                }
            }
        }

        return properties;
    }
}