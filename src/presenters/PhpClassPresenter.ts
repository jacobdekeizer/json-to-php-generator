import PhpClass from '@/dto/PhpClass';
import Settings from '@/dto/Settings';
import Str from '@/support/Str';
import PhpGetterPresenter from '@/presenters/PhpGetterPresenter';
import PhpSetterPresenter from '@/presenters/PhpSetterPresenter';
import PhpFluentSetterPresenter from '@/presenters/PhpFluentSetterPresenter';
import PhpConstructorPresenter from '@/presenters/PhpConstructorPresenter';
import PhpClassFromJsonMethodPresenter from '@/presenters/PhpClassFromJsonMethodPresenter';
import PhpPropertyPresenter from '@/presenters/PhpPropertyPresenter';
import PhpPropertyTypePresenter from '@/presenters/PhpPropertyTypePresenter';

export default class PhpClassPresenter {
    private readonly phpClass: PhpClass;
    private readonly settings: Settings;

    public constructor(phpClass: PhpClass, settings: Settings) {
        this.phpClass = phpClass;
        this.settings = settings;
    }

    public getClassName(): string
    {
        return Str.changeCase(this.phpClass.getName(), this.settings.classCase);
    }

    public toString(): string
    {
        // setup properties with presenters
        this.phpClass.getProperties().forEach(item => item.setSettings(this.settings));

        if (this.settings.allPropertiesNullable) {
            this.phpClass.getProperties().forEach(item => item.makeNullable());
        }

        const propertyTypePresenters = this.phpClass.getProperties().map(property => new PhpPropertyTypePresenter(property, this.settings));

        // open current class
        let content = '\n';

        content += (this.settings.finalClasses ? 'final ' : '') + 'class ' + this.getClassName() + '\n';
        content += '{\n';

        // properties
        content += propertyTypePresenters.map(property => (new PhpPropertyPresenter(property, this.settings)).toString())
            .join('\n' + (this.settings.propertyAddExtraNewLine ? '\n' : '')) + '\n';

        // constructor
        if (this.settings.addConstructor) {
            content += (new PhpConstructorPresenter(propertyTypePresenters, this.settings)).toString();
        }

        // getters
        if (this.settings.addGetters) {
            content += '\n';
            content += propertyTypePresenters.map(property => (new PhpGetterPresenter(property, this.settings)).toString()).join('\n');
        }

        // setters
        if (this.settings.addSetters) {
            content += '\n';
            if (this.settings.isFluentSetter) {
                content += propertyTypePresenters.map(property => (new PhpFluentSetterPresenter(property, this.settings)).toString()).join('\n');
            } else {
                content += propertyTypePresenters.map(property => (new PhpSetterPresenter(property, this.settings)).toString()).join('\n');
            }
        }

        // from json method
        if (this.settings.addFromJsonMethod) {
            content += (new PhpClassFromJsonMethodPresenter(propertyTypePresenters, this.settings)).toString();
        }

        // close current class
        content += '}';

        // print other used classes
        if (this.phpClass.getChildren().length > 0) {
            content += '\n' + this.phpClass.getChildren()
                .map(phpClass => (new PhpClassPresenter(phpClass, this.settings)).toString())
                .join('\n');
        }

        return content;
    }
}