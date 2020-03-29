import PhpType from "@/classes/php-types/PhpType";

export default class ArrayType implements PhpType {
    private readonly name: string;
    private readonly type: PhpType;
    private nullable = false;

    public constructor(name: string, type: PhpType) {
        this.name = name;
        this.type = type;
    }

    public getName(): string {
        return this.name;
    }

    public getType(): string {
        return 'array';
    }

    public getDocblockContent(): string {
        return '@var ' + this.type.getType() + '[]';
    }

    public isDocblockRequired(): boolean {
        return true;
    }

    public isNullable(): boolean {
        return this.nullable;
    }

    public setNullable(nullable: boolean): void {
        this.nullable = nullable;
    }
}