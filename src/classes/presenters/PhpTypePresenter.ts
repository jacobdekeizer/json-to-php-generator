import PhpType from "@/classes/php-types/PhpType";
import Settings from "@/classes/dto/Settings";
import Str from "@/classes/support/Str";

export default class PhpTypePresenter {
    private readonly phpType: PhpType;
    private readonly settings: Settings;

    public constructor(phpType: PhpType, settings: Settings) {
        this.phpType = phpType;
        this.settings = settings;
    }

    public getPhpTypeNotation(): string {
        return (this.phpType.isNullable() && this.phpType.getType() !== '' ? '?' : '') + this.phpType.getType();
    }

    public getPhpVarName(): string {
        return Str.changeCase(this.phpType.getName(), this.settings.propertyCase);
    }

    public getPhpVar(): string {
        return '$' + this.getPhpVarName();
    }

    public getPhpVarWithType(): string {
        return this.getPhpTypeNotation() + (this.phpType.getType() !== '' ? ' ' : '') + this.getPhpVar();
    }

    public getDocblockContent(): string {
        return this.phpType.getDocblockContent() + (this.phpType.isNullable() ? '|null' : '');
    }

    public isNullable(): boolean {
        return this.phpType.isNullable();
    }

    public getPhpType(): PhpType {
        return this.phpType;
    }
}