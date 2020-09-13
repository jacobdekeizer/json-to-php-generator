import PhpType from '@/classes/php-types/PhpType';

export default class NullType extends PhpType {
    public getType(): string {
        return '';
    }

    public getDocblockContent(): string {
        return 'null';
    }

    public isDocblockRequired(): boolean {
        return false;
    }
}