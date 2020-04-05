import PhpTypePresenter from "@/classes/presenters/PhpTypePresenter";
import Settings from "@/classes/dto/Settings";
import ArrayType from "@/classes/php-types/ArrayType";
import PhpSetterPresenter from "@/classes/presenters/PhpSetterPresenter";
import PhpDocblockPresenter from "@/classes/presenters/PhpDocblockPresenter";
import UnknownType from "@/classes/php-types/UnknownType";

export default class PhpClassFromJsonMethodPresenter {
    private readonly typePresenters: PhpTypePresenter[];
    private readonly settings: Settings;

    public constructor(typePresenters: PhpTypePresenter[], settings: Settings) {
        this.typePresenters = typePresenters;
        this.settings = settings;
    }

    public toString(): string {
        let content = '\n';

        const arrayPresenter = new PhpTypePresenter(new ArrayType('data', new UnknownType('data')), this.settings);

        content += (new PhpDocblockPresenter(this.settings, [arrayPresenter], 'self')).toString();

        content += '\tpublic static function fromJson(array $data): self\n';
        content += '\t{\n';

        if (this.settings.addConstructor) {
            // add through constructor
            content += this.getNewFromConstructor() + '\n';
        } else if (this.settings.addSetters) {
            // add through setters
            content += '\t\t$instance = new self();\n';
            content += this.typePresenters.map(type => {
                return  '\t\t$instance->' + (new PhpSetterPresenter(type, this.settings)).getMethodName() + '('
                    + PhpClassFromJsonMethodPresenter.getPropertyFromData(type, '\t\t') + ');'
            }).join('\n') + '\n';
            content += '\t\treturn $instance;\n';
        } else {
            // add through new instance creation
            content += '\t\t$instance = new self();\n';
            content += this.typePresenters
                .map(type => '\t\t$instance->' + type.getPhpVarName() + ' = ' + PhpClassFromJsonMethodPresenter.getPropertyFromData(type, '\t\t') + ';')
                .join('\n') + '\n';
            content += '\t\treturn $instance;\n';
        }

        content += '\t}\n';

        return content;
    }

    private getNewFromConstructor(): string {
        return '\t\treturn new self(\n\t\t\t'
            + this.typePresenters.map(type => PhpClassFromJsonMethodPresenter.getPropertyFromData(type, '\t\t\t'))
                .join(',\n\t\t\t') + '\n'
            + '\t\t);';
    }

    private static getPropertyFromData(typePresenter: PhpTypePresenter, indent: string): string {
        const dataItem = '$data[\'' + typePresenter.getPhpVarName() + '\']';

        if (typePresenter.getPhpType() instanceof ArrayType) {
            let content = '';
            if (typePresenter.isNullable()) {
                content += '(' + dataItem + ' ?? null ) !== null ? '
            }

            content += 'array_map(function($data) {\n';
            content += indent + '\treturn ';

            const arrayTypePresenter = typePresenter.getPhpType() as ArrayType;
            if (arrayTypePresenter.isPhpClassArray()) {
                content += arrayTypePresenter.getPhpType().getType() + '::fromJson($data);\n'
            } else {
                content += '$data;\n';
            }

            content += indent + '}, ' + dataItem + (typePresenter.isNullable() ? ' : null' : '') + ')';

            return content;
        }

        return dataItem + (typePresenter.isNullable() ? ' ?? null': '');
    }
}