import PhpType from '@/php-types/PhpType';

export default class StringType extends PhpType {
    public getType(): string {
        return 'string';
    }

    public getDocblockContent(): string {
        return 'string';
    }

    public isDocblockRequired(): boolean {
        return false;
    }
}