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
import PhpClassToArrayMethodPresenter from '@/presenters/PhpClassToArrayMethodPresenter';

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
        codeWriter.openClass(this.settings.namespace, this.getClassName(), {
            isFinal: this.settings.finalClasses,
            isReadonly: this.settings.readonlyClasses,
            declareStrictTypes: this.settings.declareStrictTypes,
        });

        // properties
        const propertiesEnabled = propertyTypePresenters.length && !this.settings.constructorPropertyPromotion;
        if (propertiesEnabled) {
            propertyTypePresenters.forEach((property, index) => {
                (new PhpPropertyPresenter(property, this.settings)).write(codeWriter);
                if (this.settings.propertyAddExtraNewLine && index !== propertyTypePresenters.length - 1) {
                    codeWriter.insertNewLine();
                }
            });
        }

        if (this.settings.addConstructor && propertiesEnabled) {
            codeWriter.insertNewLine();
        }

        // constructor
        if (this.settings.addConstructor) {
            (new PhpConstructorPresenter(propertyTypePresenters, this.settings)).write(codeWriter);
        }

        // getters
        if (this.settings.addGetters) {
            propertyTypePresenters.forEach(property => {
                codeWriter.insertNewLine();
                (new PhpGetterPresenter(property, this.settings)).write(codeWriter);
            });
        }

        // setters
        if (this.settings.addSetters) {
            propertyTypePresenters.forEach(property => {
                codeWriter.insertNewLine();

                if (this.settings.isFluentSetter) {
                    (new PhpFluentSetterPresenter(property, this.settings)).write(codeWriter);
                } else {
                    (new PhpSetterPresenter(property, this.settings)).write(codeWriter);
                }
            });
        }

        // from json method
        if (this.settings.addFromJsonMethod) {
            codeWriter.insertNewLine();
            (new PhpClassFromJsonMethodPresenter(propertyTypePresenters, this.settings)).write(codeWriter);
        }

        // toArray method
        if (this.settings.addToArrayMethod) {
            codeWriter.insertNewLine();
            (new PhpClassToArrayMethodPresenter(propertyTypePresenters)).write(codeWriter);
        }

        // close current class
        codeWriter.closeClass();

        return codeWriter.getContent();
    }
}