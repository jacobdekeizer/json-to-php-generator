import PhpType from "@/classes/php-types/PhpType";
import PhpClass from "@/classes/dto/PhpClass";
import PhpClassPresenter from "@/classes/presenters/PhpClassPresenter";

export default class PhpClassType extends PhpType {
    private readonly phpClass: PhpClass;
   
    public constructor(phpClass: PhpClass) {
        super();
        this.phpClass = phpClass;
    }
    
    public getType(): string {
       return this.getClassName();
    }

    public getDocblockContent(): string {
        return this.getClassName();
    }

    public isDocblockRequired(): boolean {
        return false;
    }

    private getClassName(): string {
        return this.settings
            ? (new PhpClassPresenter(this.phpClass, this.settings)).getClassName()
            : this.phpClass.getName();
    }
}