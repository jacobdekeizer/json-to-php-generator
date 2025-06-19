import ArrayType from '@/php-types/ArrayType';
import PhpPropertyTypePresenter from '@/presenters/PhpPropertyTypePresenter';
import CodeWriter from '@/writers/CodeWriter';
import {PhpVisibility} from '@/enums/PhpVisibility';
import PhpClassType from '@/php-types/PhpClassType';
import {PhpDocblock} from '@/enums/PhpDocblock';
import Settings from '@/dto/Settings';

export default class PhpClassToArrayMethodPresenter {
    private readonly propertyTypePresenter: PhpPropertyTypePresenter[];
    private readonly settings: Settings;

    public constructor(propertyTypePresenter: PhpPropertyTypePresenter[], settings: Settings) {
        this.propertyTypePresenter = propertyTypePresenter;
        this.settings = settings;
    }

    public write(codeWriter: CodeWriter): void {
        // Add method docblock only if propertyDocblock is set to 'all'
        if (this.settings.docblock === PhpDocblock.All) {
            const docblockLines = [
                '@return array'
            ];
            
            codeWriter.writeMultilineDocblock(docblockLines);
        }

        // Open method definition
        codeWriter.openMethod(
            PhpVisibility.Public,
            'toArray',
            'array',
            [],
            {isStatic: false}
        );

        // Start generating array
        codeWriter.writeLine('return [');
        codeWriter.indent();

        // Iterate through all properties
        for (let i = 0; i < this.propertyTypePresenter.length; i++) {
            const presenter = this.propertyTypePresenter[i];
            const property = presenter.getProperty();
            const propertyName = property.getName();
            
            const lines = this.getPropertyToArrayCode(presenter);
            
            // Add array key-value pair
            if (lines.length === 1) {
                codeWriter.writeLine(`'${propertyName}' => ${lines[0]}${i < this.propertyTypePresenter.length - 1 ? ',' : ''}`);
            } else {
                codeWriter.writeLine(`'${propertyName}' => ${lines[0]}`);
                codeWriter.indent();
                
                for (let j = 1; j < lines.length - 1; j++) {
                    codeWriter.writeLine(lines[j]);
                }
                
                codeWriter.outdent();
                codeWriter.writeLine(`${lines[lines.length - 1]}${i < this.propertyTypePresenter.length - 1 ? ',' : ''}`);
            }
        }

        codeWriter.outdent();
        codeWriter.writeLine('];');
        codeWriter.closeMethod();
    }

    private getPropertyToArrayCode(typePresenter: PhpPropertyTypePresenter): string[] {
        const property = typePresenter.getProperty();
        const propertyAccess = `$this->${property.getName()}`;

        // Handle array type properties
        const classArrayType = property.getTypes()
            .find(type => type instanceof ArrayType && type.isPhpClassArray()) as ArrayType | undefined;

        if (classArrayType) {
            if (property.isNullable()) {
                return [
                    `${propertyAccess} !== null ? array_map(function($item) {`,
                    '    return $item->toArray();',
                    `}, ${propertyAccess}) : null`
                ];
            }
            
            return [
                'array_map(function($item) {',
                '    return $item->toArray();',
                `}, ${propertyAccess})`
            ];
        }

        // Handle object type properties
        const phpClass = property.getTypes().find(t => t instanceof PhpClassType) as PhpClassType | undefined;
        
        if (phpClass) {
            if (property.isNullable()) {
                return [`${propertyAccess} !== null ? ${propertyAccess}->toArray() : null`];
            }
            return [`${propertyAccess}->toArray()`];
        }

        // Handle primitive type properties
        return [propertyAccess];
    }
} 