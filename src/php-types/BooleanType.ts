import PhpType from '@/php-types/PhpType';

export default class BooleanType extends PhpType {
  public getType(): string {
    return 'bool';
  }

  public getDocblockContent(): string {
    return 'bool';
  }

  public isDocblockRequired(): boolean {
    return false;
  }
}
