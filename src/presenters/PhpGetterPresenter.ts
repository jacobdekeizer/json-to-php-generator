import Settings from '@/dto/Settings';
import Str from '@/support/Str';
import PhpDocblockPresenter from '@/presenters/PhpDocblockPresenter';
import PhpPropertyTypePresenter from '@/presenters/PhpPropertyTypePresenter';
import CodeWriter from '@/writers/CodeWriter';
import { PhpVisibility } from '@/enums/PhpVisibility';

export default class PhpGetterPresenter {
  private readonly propertyTypePresenter: PhpPropertyTypePresenter;
  private readonly settings: Settings;

  public constructor(propertyTypePresenter: PhpPropertyTypePresenter, settings: Settings) {
    this.propertyTypePresenter = propertyTypePresenter;
    this.settings = settings;
  }

  public write(codeWriter: CodeWriter): void {
    const docblock = new PhpDocblockPresenter(
      this.settings,
      [],
      this.propertyTypePresenter.getDocblockContent(),
      this.propertyTypePresenter.getProperty().isDocblockRequired(),
    );

    const methodName = Str.changeCase('get_' + this.propertyTypePresenter.getPhpVarName(), this.settings.getterCase);

    docblock.write(codeWriter);
    codeWriter.openMethod(PhpVisibility.Public, methodName, this.propertyTypePresenter.getPhpTypeNotation(), []);
    codeWriter.writeLine(`return $this->${this.propertyTypePresenter.getPhpVarName()};`);
    codeWriter.closeMethod();
  }
}
