import PhpType from '@/php-types/PhpType';

export default class UnknownType extends PhpType {
    public getType(): string {
        return '';
    }

    public getDocblockContent(): string {
        return 'mixed';
    }

    public isDocblockRequired(): boolean {
        return !this.settings?.supportsMixedType();
    }
}