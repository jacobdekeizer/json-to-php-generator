import PhpType from '@/php-types/PhpType';
import {supportsMixedType} from '@/dto/Settings';

export default class UnknownType extends PhpType {
    public getType(): string {
        return '';
    }

    public getDocblockContent(): string {
        return 'mixed';
    }

    public isDocblockRequired(): boolean {
        return !(this.settings !== null && supportsMixedType(this.settings));
    }
}