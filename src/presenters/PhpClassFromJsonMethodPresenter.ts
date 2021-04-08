import Settings from '@/dto/Settings';
import ArrayType from '@/php-types/ArrayType';
import PhpSetterPresenter from '@/presenters/PhpSetterPresenter';
import PhpDocblockPresenter from '@/presenters/PhpDocblockPresenter';
import PhpPropertyTypePresenter from '@/presenters/PhpPropertyTypePresenter';
import PhpProperty from '@/dto/PhpProperty';

export default class PhpClassFromJsonMethodPresenter {
    private readonly propertyTypePresenter: PhpPropertyTypePresenter[];
    private readonly settings: Settings;

    public constructor(propertyTypePresenter: PhpPropertyTypePresenter[], settings: Settings) {
        this.propertyTypePresenter = propertyTypePresenter;
        this.settings = settings;
    }

    public toString(): string {
        let content = '\n';

        const arrayPresenter = new PhpPropertyTypePresenter(new PhpProperty('data').add(new ArrayType), this.settings);

        content += (new PhpDocblockPresenter(this.settings, [arrayPresenter], 'self')).toString();

        content += '\tpublic static function fromJson(array $data): self\n';
        content += '\t{\n';

        if (this.settings.addConstructor) {
            // add through constructor
            content += this.getNewFromConstructor() + '\n';
        } else if (this.settings.addSetters) {
            // add through setters
            content += '\t\t$instance = new self();\n';
            content += this.propertyTypePresenter.map(type => {
                return  '\t\t$instance->' + (new PhpSetterPresenter(type, this.settings)).getMethodName() + '('
                    + PhpClassFromJsonMethodPresenter.getPropertyFromData(type, '\t\t') + ');'
            }).join('\n') + '\n';
            content += '\t\treturn $instance;\n';
        } else {
            // add through new instance creation
            content += '\t\t$instance = new self();\n';
            content += this.propertyTypePresenter
                .map(type => '\t\t$instance->' + type.getPhpVarName() + ' = ' + PhpClassFromJsonMethodPresenter.getPropertyFromData(type, '\t\t') + ';')
                .join('\n') + '\n';
            content += '\t\treturn $instance;\n';
        }

        content += '\t}\n';

        return content;
    }

    private getNewFromConstructor(): string {
        return '\t\treturn new self(\n\t\t\t'
            + this.propertyTypePresenter.map(type => PhpClassFromJsonMethodPresenter.getPropertyFromData(type, '\t\t\t'))
                .join(',\n\t\t\t') + '\n'
            + '\t\t);';
    }

    private static getPropertyFromData(typePresenter: PhpPropertyTypePresenter, indent: string): string {
        const dataItem = '$data[\'' + typePresenter.getProperty().getName() + '\']';

        const property = typePresenter.getProperty();

        const classArrayType = property.getTypes()
            .find(type => type instanceof ArrayType && type.isPhpClassArray()) as ArrayType | undefined;

        if (classArrayType) {
            let content = '';

            if (property.isNullable()) {
                content += '(' + dataItem + ' ?? null ) !== null ? '
            }

            content += 'array_map(static function($data) {\n';
            content += indent + '\treturn ';

            const phpClassType = classArrayType.getPhpClass();

            if (classArrayType.isPhpClassArray() && phpClassType) {
                content += phpClassType.getType() + '::fromJson($data);\n'
            } else {
                content += '$data;\n';
            }

            content += indent + '}, ' + dataItem + (property.isNullable() ? ' : null' : '') + ')';

            return content;
        }

        return dataItem + (property.isNullable() ? ' ?? null': '');
    }
}