import Settings from "@/classes/dto/Settings";

export default abstract class PhpType {
    protected settings: Settings | null = null;

    abstract getType(): string;

    abstract getDocblockContent(): string;

    abstract isDocblockRequired(): boolean;

    public setSettings(settings: Settings | null): void {
        this.settings = settings;
    }
}