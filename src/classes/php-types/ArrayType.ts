import PhpType from "@/classes/php-types/PhpType";
import Settings from "@/classes/dto/Settings";
import set = Reflect.set;

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

    public setSettings(settings: Settings | null): void {
        this.settings = settings;
        this.type.setSettings(settings);
    }
}