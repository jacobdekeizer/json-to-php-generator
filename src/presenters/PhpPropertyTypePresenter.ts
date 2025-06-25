import Settings, { supportsUnionType } from '@/dto/Settings';
import Str from '@/support/Str';
import PhpProperty from '@/dto/PhpProperty';

export default class PhpPropertyTypePresenter {
  private readonly property: PhpProperty;
  private readonly settings: Settings;

  public constructor(property: PhpProperty, settings: Settings) {
    this.property = property;
    this.settings = settings;
  }

  public getPhpTypeNotation(): string {
    if (this.property.getTypes().length === 1) {
      return (this.property.isNullable() ? '?' : '') + this.property.getTypes()[0].getType();
    }

    if (supportsUnionType(this.settings)) {
      const types = this.property.getTypes().map((t) => t.getType());

      if (this.property.isNullable()) {
        types.push('null');
      }

      return types.join('|');
    }

    return '';
  }

  public getPhpVarName(): string {
    return Str.changeCase(this.property.getName(), this.settings.propertyCase);
  }

  public getPhpVar(): string {
    return '$' + this.getPhpVarName();
  }

  public getPhpVarWithType(): string {
    let typeNotation = this.getPhpTypeNotation();

    if (typeNotation !== '') {
      typeNotation += ' ';
    }

    return typeNotation + this.getPhpVar();
  }

  public getDocblockContent(): string {
    return (
      this.property
        .getTypes()
        .map((p) => p.getDocblockContent())
        .join('|') + (this.property.isNullable() ? '|null' : '')
    );
  }

  public getProperty(): PhpProperty {
    return this.property;
  }
}
