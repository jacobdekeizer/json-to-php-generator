import Settings from "@/classes/dto/Settings";

export default interface PhpType {
    getName(): string;

    getType(): string;

    getDocblockContent(): string;

    isDocblockRequired(): boolean;

    setNullable(nullable: boolean): void;

    isNullable(): boolean;

    setSettings(settings: Settings | null): void;
}