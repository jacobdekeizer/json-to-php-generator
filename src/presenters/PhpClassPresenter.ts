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
import CodeWriter from '@/writers/CodeWriter';

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

        const propertyTypePresenters = this.phpClass.getProperties().map(property => {
            return new PhpPropertyTypePresenter(property, this.settings);
        });

        const codeWriter = new CodeWriter();

        // open new class
        codeWriter.openClass(this.getClassName(), this.settings.finalClasses);

        // properties
        propertyTypePresenters.forEach(property => {
            (new PhpPropertyPresenter(property, this.settings)).write(codeWriter);
        });

        if (!this.settings.propertyAddExtraNewLine) {
            // new line after last property
            codeWriter.insertNewLine();
        }

        // constructor
        if (this.settings.addConstructor) {
            (new PhpConstructorPresenter(propertyTypePresenters, this.settings)).write(codeWriter);
            codeWriter.insertNewLine();
        }

        // getters
        if (this.settings.addGetters) {
            propertyTypePresenters.forEach(property => {
                (new PhpGetterPresenter(property, this.settings)).write(codeWriter);
                codeWriter.insertNewLine();
            });
        }

        // setters
        if (this.settings.addSetters) {
            propertyTypePresenters.forEach(property => {
                if (this.settings.isFluentSetter) {
                    (new PhpFluentSetterPresenter(property, this.settings)).write(codeWriter);
                } else {
                    (new PhpSetterPresenter(property, this.settings)).write(codeWriter);
                }

                codeWriter.insertNewLine();
            });
        }

        // from json method
        if (this.settings.addFromJsonMethod) {
            (new PhpClassFromJsonMethodPresenter(propertyTypePresenters, this.settings)).write(codeWriter);
        }

        // close current class
        codeWriter.closeClass();

        // get php class content
        let content = codeWriter.getContent();

        // print other used classes
        if (this.phpClass.getChildren().length > 0) {
            content += '\n' + this.phpClass.getChildren()
                .map(phpClass => (new PhpClassPresenter(phpClass, this.settings)).toString())
                .join('\n');
        }

        return content;
    }
}