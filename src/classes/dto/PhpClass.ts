import PhpType from "@/classes/php-types/PhpType";

export default class PhpClass {

    private readonly name: string;
    private readonly properties: PhpType[];
    private readonly children: PhpClass[];

    public constructor (name: string, properties: PhpType[], children: PhpClass[] = []) {
        this.name = name;
        this.properties = properties;
        this.children = children;
    }

    public getName(): string {
        return this.name;
    }

    public getProperties(): PhpType[] {
        return this.properties;
    }

    public getChildren(): PhpClass[] {
        return this.children;
    }
}