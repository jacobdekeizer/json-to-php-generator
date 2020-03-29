import PhpType from "@/classes/php-types/PhpType";

export default class BooleanType implements PhpType {
    private readonly name: string;
    private nullable = false;

    public constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public getType(): string {
        return 'bool';
    }

    public getDocblockContent(): string {
        return "@var bool";
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