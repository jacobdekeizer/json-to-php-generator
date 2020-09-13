import PhpTypeFactory from "@/classes/factories/PhpTypeFactory";
import PhpClass from "@/classes/dto/PhpClass";
import PhpProperty from '@/classes/dto/PhpProperty';
import ArrayType from '@/classes/php-types/ArrayType';
import NullType from '@/classes/php-types/NullType';

export default class PhpClassFactory {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    public static make(content: any, name: string): PhpClass {
        const properties: PhpProperty[] = [];
        const children: PhpClass[] = [];

        // merge array of same class to one class
        if (Array.isArray(content)) {
            const result = this.makePropertyFromArray(name, content);

            if (result.phpClass) {
                children.push(result.phpClass);
            }

            properties.push(result.property);

            return new PhpClass(name, properties, children);
        }

        // single class
        if (content instanceof Object) {
            const objectKeys = Object.keys(content);

            for (const key of objectKeys) {
                const keyContent = content[key];

                if (Array.isArray(keyContent)) {
                    // nested array
                    const result = this.makePropertyFromArray(key, keyContent);

                    if (result.phpClass) {
                        children.push(result.phpClass);
                    }

                    properties.push(result.property);
                    continue;
                }

                const newProperty = new PhpProperty(key);
                
                if (typeof keyContent === 'object' && keyContent !== null) {
                    // nested class
                    const result = this.make(keyContent, key);
                    children.push(result);
                    
                    newProperty.add(PhpTypeFactory.make(result));
                } else {
                    // normal type
                    newProperty.add(PhpTypeFactory.make(keyContent));
                }

                properties.push(newProperty);
            }
        }

        return new PhpClass(name, properties, children);
    }

    private static makePropertyFromArray(name: string, items: any[]): {
        property: PhpProperty;
        phpClass: PhpClass | null;
    } {
        const property = new PhpProperty(name);
        let phpClass: PhpClass | null = null;

        if (items.some(item => item instanceof Object)) {
            phpClass = this.makeOneClassFromArray(name, items);
            const arrayType = PhpTypeFactory.make([phpClass]) as ArrayType;

            if (items.some(item => item === null)) {
                arrayType.addType(new NullType);
            }

            property.add(arrayType);
        } else {
            property.add(PhpTypeFactory.make(items));
        }

        return {
            property,
            phpClass
        };
    }

    private static makeOneClassFromArray(name: string, items: any[]): PhpClass {
        const allClasses: PhpClass[] = [];

        for (const item of items) {
            allClasses.push(PhpClassFactory.make(item, name));
        }

        return new PhpClass(name, this.mergeProperties(allClasses), this.mergeChildren(allClasses));
    }

    private static mergeChildren(phpClasses: PhpClass[]): PhpClass[] {
        const tempChildren: Map<string, PhpClass[]> = new Map<string, PhpClass[]>();

        for (const phpClass of phpClasses) {
            for (const childPhpClass of phpClass.getChildren()) {
                if (!tempChildren.has(childPhpClass.getName())) {
                    tempChildren.set(childPhpClass.getName(), [childPhpClass]);
                } else {
                    const result = tempChildren.get(childPhpClass.getName());

                    if (result) {
                       result.push(childPhpClass);
                    }
                }
            }
        }

        const children: PhpClass[] = [];

        for (const [tempName, subChildren] of tempChildren) {
            children.push(new PhpClass(tempName, this.mergeProperties(subChildren), this.mergeChildren(subChildren)));
        }

        return children;
    }

    private static mergeProperties(phpClasses: PhpClass[]): PhpProperty[] {
        const properties: PhpProperty[] = [];

        for (const phpClass of phpClasses) {
            for (const property of phpClass.getProperties()) {
                const currentProperty = properties.find(p => p.getName() === property.getName());

                if (currentProperty) {
                   currentProperty.merge(property);
                   continue;
                }

                properties.push(property);
            }
        }

        return properties;
    }
}