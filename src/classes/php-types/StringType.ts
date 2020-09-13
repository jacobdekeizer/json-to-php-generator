import PhpType from '@/classes/php-types/PhpType';

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