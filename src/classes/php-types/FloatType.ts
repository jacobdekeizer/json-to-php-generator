import PhpType from '@/classes/php-types/PhpType';

export default class FloatType extends PhpType {
    public getType(): string {
        return 'float';
    }

    public getDocblockContent(): string {
        return 'float';
    }

    public isDocblockRequired(): boolean {
        return false;
    }
}