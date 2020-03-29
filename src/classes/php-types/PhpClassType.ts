import PhpType from "@/classes/php-types/PhpType";
import PhpClass from "@/classes/dto/PhpClass";

export default class PhpClassType implements PhpType {
    private readonly name: string;
    private readonly phpClass: PhpClass;
    private nullable = false;

    public constructor(name: string, phpClass: PhpClass) {
        this.name = name;
        this.phpClass = phpClass;
    }

    public getName(): string {
        return this.name;
    }

    public getType(): string {
        return this.phpClass.getName();
    }

    public getDocblockContent(): string {
        return "@var " + this.phpClass.getName();
    }

    public isDocblockRequired(): boolean {
        return false;
    }

    public isNullable(): boolean {
        return this.nullable;
    }

    public setNullable(nullable: boolean): void {
        this.nullable = nullable;
    }
}