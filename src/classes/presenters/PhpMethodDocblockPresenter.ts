import PhpTypePresenter from "@/classes/presenters/PhpTypePresenter";

export default class PhpMethodDocblockPresenter {
    private readonly typePresenters: PhpTypePresenter[];
    private readonly returnType: string | null;

    public constructor(typePresenters: PhpTypePresenter[], returnType: string | null = null) {
        this.typePresenters = typePresenters;
        this.returnType = returnType;
    }

    public toString(): string {
        let content = '\t/**\n';
        content += this.typePresenters.map(property => '\t * ' + property.getDocblockContent() + ' ' + property.getPhpVar()).join('\n') + '\n';

        if (this.returnType) {
            content += '\t * @return ' + this.returnType + '\n';
        }

        content += '\t */\n';
        return content;
    }
}