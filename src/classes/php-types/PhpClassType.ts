import PhpType from "@/classes/php-types/PhpType";
import PhpClass from "@/classes/dto/PhpClass";
import Settings from "@/classes/dto/Settings";
import PhpClassPresenter from "@/classes/presenters/PhpClassPresenter";

export default class PhpClassType implements PhpType {
    private readonly name: string;
    private readonly phpClass: PhpClass;
    private nullable = false;
    private settings: Settings | null = null;

    public constructor(name: string, phpClass: PhpClass) {
        this.name = name;
        this.phpClass = phpClass;
    }

    public getName(): string {
        return this.name;
    }

    public getType(): string {
       return this.getClassName();
    }

    public getDocblockContent(): string {
        return "@var " + this.getClassName();
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

    public setSettings(settings: Settings | null): void {
        this.settings = settings;
    }

    private getClassName(): string {
        return this.settings
            ? (new PhpClassPresenter(this.phpClass, this.settings)).getClassName()
            : this.phpClass.getName();
    }
}