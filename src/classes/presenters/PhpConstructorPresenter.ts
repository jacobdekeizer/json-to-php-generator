import PhpTypePresenter from "@/classes/presenters/PhpTypePresenter";
import Settings from "@/classes/dto/Settings";

export default class PhpConstructorPresenter {
    private readonly typePresenters: PhpTypePresenter[];
    private readonly settings: Settings;

    public constructor(typePresenters: PhpTypePresenter[], settings: Settings) {
        this.typePresenters = typePresenters;
        this.settings = settings;
    }

    public toString(): string {
        let content = '\n';

        if (this.settings.addDocBlocks) {
            content += '\t/**\n';
            content += this.typePresenters.map(property => '\t * ' + property.getDocblockContent() + ' ' + property.getPhpVar()).join('\n') + '\n';
            content += '\t */\n';
        }

        content += '\tpublic constructor(' + this.typePresenters.map(property => property.getPhpVarWithType()).join(', ') +') \n';
        content +='\t{\n';
        content += this.typePresenters.map(item => '\t\t$this->' + item.getPhpVarName() + ' = ' + item.getPhpVar()).join(';\n') + '\n';
        content += '\t}\n';

        return content;
    }
}