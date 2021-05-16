import PhpProperty from '@/dto/PhpProperty';
import ReservedKeywords from '@/php/ReservedKeywords';

export default class PhpClass {
    private name: string;
    private readonly properties: PhpProperty[];
    private readonly children: PhpClass[];

    public constructor (name: string, properties: PhpProperty[], children: PhpClass[] = []) {
        this.name = name;
        this.properties = properties;
        this.children = children;
    }

    public getName(): string {
        if (ReservedKeywords.isReserved(this.name)) {
            return this.name + 'Object';
        }

        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getProperties(): PhpProperty[] {
        return this.properties;
    }

    public getProperty(name: string): PhpProperty | null {
        return this.properties.find(property => property.getName() === name) || null;
    }

    public getChildren(): PhpClass[] {
        return this.children;
    }
}