import PhpType from '@/php-types/PhpType';

export default class StdClassType extends PhpType {
    public getType(): string {
        return '\\stdClass';
    }

    public getDocblockContent(): string {
        return '\\stdClass';
    }

    public isDocblockRequired(): boolean {
        return false;
    }
}