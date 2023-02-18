import Settings from '@/dto/Settings';
import ArrayType from '@/php-types/ArrayType';
import PhpSetterPresenter from '@/presenters/PhpSetterPresenter';
import PhpDocblockPresenter from '@/presenters/PhpDocblockPresenter';
import PhpPropertyTypePresenter from '@/presenters/PhpPropertyTypePresenter';
import PhpProperty from '@/dto/PhpProperty';
import CodeWriter from '@/writers/CodeWriter';
import {PhpVisibility} from '@/enums/PhpVisibility';
import PhpClassType from '@/php-types/PhpClassType';
import StdClassType from '@/php-types/StdClassType';

export default class PhpClassFromJsonMethodPresenter {
    private readonly paramName = 'data';
    private readonly paramVar = `$${this.paramName}`;
    private readonly propertyTypePresenter: PhpPropertyTypePresenter[];
    private readonly settings: Settings;

    public constructor(propertyTypePresenter: PhpPropertyTypePresenter[], settings: Settings) {
        this.propertyTypePresenter = propertyTypePresenter;
        this.settings = settings;
    }

    public write(codeWriter: CodeWriter): void {
        const paramType = this.settings.jsonIsArray ? new ArrayType() : new StdClassType();

        const arrayPresenter = new PhpPropertyTypePresenter(
            new PhpProperty(this.paramName).add(paramType),
            this.settings
        );

        (new PhpDocblockPresenter(this.settings, [arrayPresenter], 'self')).write(codeWriter);

        codeWriter.openMethod(
            PhpVisibility.Public,
            'fromJson',
            'self',
            [`${paramType.getType()} ${this.paramVar}`],
            {isStatic: true}
        );

        if (this.settings.addConstructor) {
            this.writeWithConstructor(codeWriter);
        } else if (this.settings.addSetters) {
            this.writeWithoutConstructor(
                codeWriter,
                (type) => (new PhpSetterPresenter(type, this.settings)).getMethodName() + '(',
                ');'
            );
        } else {
            this.writeWithoutConstructor(
                codeWriter,
                (type) => type.getPhpVarName() + ' = ',
                ';'
            );
        }

        codeWriter.closeMethod();
    }

    private writeWithConstructor(codeWriter: CodeWriter): void {
        codeWriter.writeLine('return new self(');
        codeWriter.indent();

        for (let i = 0; i < this.propertyTypePresenter.length; i++) {
            const presenter = this.propertyTypePresenter[i];

            const lines = this.getPropertyFromData(presenter);

            if (lines[lines.length - 1] && i !== this.propertyTypePresenter.length - 1) {
                lines[lines.length - 1] += ',';
            }

            PhpClassFromJsonMethodPresenter.writeLines(codeWriter, lines);
        }

        codeWriter.outdent();
        codeWriter.writeLine(');');
    }

    private writeWithoutConstructor(
        codeWriter: CodeWriter,
        initCode: (type: PhpPropertyTypePresenter) => string,
        closeCode: string
    ): void {
        codeWriter.writeLine('$instance = new self();');

        this.propertyTypePresenter.forEach(type => {
            const lines = this.getPropertyFromData(type);

            const instancePropInitCode = `$instance->${initCode(type)}`;

            // add instance property initialize code to first element;
            // E.g. $lines[0] === $instance->setValue($data['value'];
            lines[0] = lines[0] ? instancePropInitCode + lines[0] : instancePropInitCode;

            // E.g. $lines[0] === $instance->setValue($data['value']);
            lines[lines.length - 1] = lines[lines.length - 1] + closeCode;

            PhpClassFromJsonMethodPresenter.writeLines(codeWriter, lines);
        });

        codeWriter.writeLine('return $instance;');
    }

    private static writeLines(codeWriter: CodeWriter, lines: string[]): void {
        for (let i = 0; i < lines.length; i++) {
            if (i === 0) {
                codeWriter.writeLine(lines[i]);

                if (lines.length > 1) {
                    codeWriter.indent();
                }
                continue;
            }

            if (i === lines.length - 1) {
                codeWriter.outdent();
                codeWriter.writeLine(lines[i]);
                continue;
            }

            codeWriter.writeLine(lines[i]);
        }
    }

    private getPropertyFromData(typePresenter: PhpPropertyTypePresenter): string[] {
        const dataItem = this.settings.jsonIsArray
            ? `${this.paramVar}['${typePresenter.getProperty().getName()}']`
            : `${this.paramVar}->${typePresenter.getProperty().getName()}`

        const property = typePresenter.getProperty();

        const classArrayType = property.getTypes()
            .find(type => type instanceof ArrayType && type.isPhpClassArray()) as ArrayType | undefined;

        const dataItemNullCheck = `(${dataItem} ?? null) !== null`;

        if (classArrayType) {
            const lines: string[] = [];

            lines.push(
                `${property.isNullable() ? `${dataItemNullCheck} ? ` : ''}array_map(static function($data) {`
            );

            let line ='return ';

            const phpClassType = classArrayType.getPhpClass();

            if (classArrayType.isPhpClassArray() && phpClassType) {
                line += phpClassType.getType() + '::fromJson($data);'
            } else {
                line += '$data;';
            }

            lines.push(line);
            lines.push(`}, ${dataItem})${property.isNullable() ? ' : null' : ''}`);

            return lines;
        }

        const phpClass = property.getTypes().find(t => t instanceof PhpClassType) as PhpClassType | undefined;

        if (phpClass) {
            const classFromJsonCode = `${phpClass.getType()}::fromJson(${dataItem})`;

            if (property.isNullable()) {
                return [`${dataItemNullCheck} ? ${classFromJsonCode} : null`];
            }

            return [classFromJsonCode];
        }

        return [dataItem + (property.isNullable() ? ' ?? null': '')];
    }
}