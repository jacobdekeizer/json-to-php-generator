import PhpType from "@/classes/php-types/PhpType";

export default class StringType implements PhpType {
    private readonly name: string;
    private nullable = false;

    public constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public getType(): string {
        return 'string';
    }

    public getDocblockContent(): string {
        return "@var string";
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