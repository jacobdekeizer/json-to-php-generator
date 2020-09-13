import PhpType from '@/classes/php-types/PhpType';

export default class UnknownType extends PhpType {
    public getType(): string {
        return '';
    }

    public getDocblockContent(): string {
        return 'mixed';
    }

    public isDocblockRequired(): boolean {
        return true;
    }
}