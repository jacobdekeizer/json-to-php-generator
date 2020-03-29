import {PhpVersion} from "@/classes/enums/PhpVersion";

export default class Settings {
    public phpVersion: PhpVersion = PhpVersion.PHP74;
    public addConstructor = true;
    public addDocBlocks = false;
    public finalClasses = false;

    public supportsTypedProperties(): boolean {
        const supportedVersions = [PhpVersion.PHP74];
        return supportedVersions.includes(this.phpVersion);
    }
}