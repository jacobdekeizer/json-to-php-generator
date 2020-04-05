import PhpType from "@/classes/php-types/PhpType";
import Settings from "@/classes/dto/Settings";
import PhpClassType from "@/classes/php-types/PhpClassType";
import UnknownType from "@/classes/php-types/UnknownType";

export default class ArrayType implements PhpType {
    private readonly name: string;
    private readonly type: PhpType;
    private nullable = false;
    private settings: Settings | null = null;

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
        if (this.type instanceof UnknownType) {
            return '@var array';
        }
        return '@var ' + this.type.getType() + '[]';
    }

    public isDocblockRequired(): boolean {
        return !(this.type instanceof UnknownType);
    }

    public isNullable(): boolean {
        return this.nullable;
    }

    public setNullable(nullable: boolean): void {
        this.nullable = nullable;
    }

    public setSettings(settings: Settings | null): void {
        this.settings = settings;
        this.type.setSettings(settings);
    }

    public isPhpClassArray(): boolean {
        return this.type instanceof PhpClassType;
    }

    public getPhpType(): PhpType {
        return this.type;
    }
}