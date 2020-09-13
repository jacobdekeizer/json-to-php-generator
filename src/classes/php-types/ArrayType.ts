import PhpType from "@/classes/php-types/PhpType";
import Settings from "@/classes/dto/Settings";
import PhpClassType from "@/classes/php-types/PhpClassType";
import UnknownType from "@/classes/php-types/UnknownType";
import NullType from '@/classes/php-types/NullType';

export default class ArrayType extends PhpType {
    private readonly types: PhpType[] = [];

    public getType(): string {
        return 'array';
    }

    public getDocblockContent(): string {
        if (this.types.length === 0 || !this.isTyped()) {
            return 'array';
        }
        
        if (this.types.length === 1) {
            return this.types[0].getDocblockContent() + '[]';
        }

        return '('+ this.types.map(type => type.getDocblockContent()).join('|') + ')' + '[]';
    }

    public isDocblockRequired(): boolean {
        return true;
    }

    public setSettings(settings: Settings | null): void {
        super.setSettings(settings);
        for (const type of this.types) {
            type.setSettings(settings);
        }
    }

    public isPhpClassArray(): boolean {
        return this.types.some(type => type instanceof PhpClassType)
    }

    public addType(type: PhpType): this {
        if (this.types.some(t => t.constructor === type.constructor)) {
            return this;
        }

        this.types.push(type);
        return this;
    }

    private isTyped(): boolean {
        for (const type of this.types) {
            if (type instanceof UnknownType) {
                continue;
            }

            if (type instanceof NullType) {
                continue;
            }

            return true;
        }

        return false;
    }
}