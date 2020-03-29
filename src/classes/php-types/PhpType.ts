export default interface PhpType {
    getName(): string;

    getType(): string;

    getDocblockContent(): string;

    isDocblockRequired(): boolean;

    setNullable(nullable: boolean): void;

    isNullable(): boolean;
}