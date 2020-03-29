import PhpType from "@/classes/php-types/PhpType";
import Settings from "@/classes/dto/Settings";

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

    public getPhpVar(): string {
        return '$' + this.phpType.getName();
    }

    public getPhpVarWithType(): string {
        return this.getPhpTypeNotation() + (this.phpType.getType() !== '' ? ' ' : '') + this.getPhpVar();
    }

    public getDocblockContent(): string {
        return this.phpType.getDocblockContent() + (this.phpType.isNullable() ? '|null' : '');
    }

    public getPhpType(): PhpType {
        return this.phpType;
    }

    public toString(): string {
        let content = '';

        if (this.phpType.isDocblockRequired() || this.settings.addDocBlocks) {
            // todo implement settings on how to display docblock
            content += '\t/** ' + this.getDocblockContent() + ' */\n';
        }

        if (this.settings.supportsTypedProperties()) {
            content += '\tprivate ' + this.getPhpVarWithType();
        } else {
            content += '\tprivate ' + this.getPhpVar();
        }


        return content;
    }
}