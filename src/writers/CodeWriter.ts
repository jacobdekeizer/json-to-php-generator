import {PhpVisibility} from '@/enums/PhpVisibility';

const INDENT = '\t';
const NEW_LINE = '\n';

export default class CodeWriter {
    private content = '';
    private indentation = '';

    public openClass(name: string, final: boolean): void {
        this.writeLine(`${(final ? 'final ' : '')}class ${name}`);
        this.writeLine('{');
        this.indent();
    }

    public closeClass(): void {
        this.outdent();
        this.writeLine('}');
    }

    public writeInlineDocblock(line: string): void {
        this.writeLine(`/** ${line} */`);
    }

    public writeMultilineDocblock(lines: string[]): void {
        this.writeLine('/**');
        lines.forEach((line) => this.writeLine(' * ' + line));
        this.writeLine(' */');
    }

    public openMethod(visibility: PhpVisibility, method: string, isStatic = false): void {
        this.writeLine(`${visibility}${isStatic ? ' static': ''} function ${method}`);
        this.writeLine('{');
        this.indent();
    }

    public closeMethod(): void {
        this.outdent();
        this.writeLine('}');
    }

    public insertNewLine(): void {
        this.content += NEW_LINE;
    }

    public writeLine(line: string): void {
        this.content += this.indentation + line + NEW_LINE;
    }

    public writeLines(lines: string[]): void {
        lines.forEach((line) => this.writeLine(line));
    }

    public indent(): void {
        this.indentation += INDENT;
    }

    public outdent(): void {
        this.indentation = this.indentation.substr(0, this.indentation.length - INDENT.length);
    }

    public getContent(): string {
        return this.content;
    }
}
