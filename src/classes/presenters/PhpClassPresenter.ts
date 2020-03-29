import PhpClass from "@/classes/dto/PhpClass";
import PhpTypePresenter from "@/classes/presenters/PhpTypePresenter";
import Settings from "@/classes/dto/Settings";

export default class PhpClassPresenter {
    private readonly phpClass: PhpClass;
    private readonly settings: Settings;

    public constructor(phpClass: PhpClass, settings: Settings) {
        this.phpClass = phpClass;
        this.settings = settings;
    }

    public toString(): string
    {
        // open current class
        let content = '\n';

        content += (this.settings.finalClasses ? 'final ' : '') + 'class ' + this.phpClass.getName() + '\n';
        content += '{\n';

        const typePresenters = this.phpClass.getProperties().map(property => new PhpTypePresenter(property, this.settings));

        // properties
        content += typePresenters.map(property => property.toString()).join('\n') + '\n';

        // constructor
        if (this.settings.addConstructor) {
            content += '\n';

            if (this.settings.addDocBlocks) {
                content += '\t/**\n';
                content += typePresenters.map(property => '\t * ' + property.getDocblockContent() + ' ' + property.getPhpVar()).join('\n') + '\n';
                content += '\t */\n';
            }

            content += '\tpublic constructor(' + typePresenters.map(property => property.getPhpVarWithType()).join(', ') +') \n';
            content +='\t{\n';
            content += typePresenters.map(item => '\t\t$this->' + item.getPhpType().getName() + ' = ' + item.getPhpVar()).join(';\n') + '\n';
            content += '\t}\n';
        }

        // close current class
        content += '}\n';

        // print other used classes
        if (this.phpClass.getChildren().length > 0) {
            content += '\n' + this.phpClass.getChildren()
                .map(phpClass => (new PhpClassPresenter(phpClass, this.settings)).toString())
                .join('\n');
        }

        return content;
    }
}