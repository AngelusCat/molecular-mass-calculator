import { Container } from "inversify";
import { TYPES } from "./types.js";
import "reflect-metadata";
import { MoleculeChemicalFormulaParser } from "../models/services/MoleculeChemicalFormulaParser.js";
import { MoleculeController } from "../controllers/MoleculeController.js";
import { XssEscaper } from "../view/XssEscaper.js";
import { ViewRenderer } from "../view/ViewRenderer.js";
import { BaseController } from "../controllers/BaseController.js";
import { FileReader } from "../fileSystem/FileReader.js";
import { Validator } from "../validation/Validator.js";
import { NotBlank } from "../validation/validationRules/NotBlank.js";
import { String } from "../validation/validationRules/String.js";
import { MinLineLength } from "../validation/validationRules/MinLineLength.js";
import { MaxLineLength } from "../validation/validationRules/MaxLineLength.js";
import { Regex } from "../validation/validationRules/Regex.js";
import { ValidParentheses } from "../validation/validationRules/ValidParentheses.js";
import { RedisCache } from "../cache/RedisCache.js";
import { Cache } from "../interfaces/Cache.js";
import { ApiDocsController } from "../controllers/ApiDocsController.js";

const container = new Container();

container
  .bind<MoleculeChemicalFormulaParser>(TYPES.MoleculeChemicalFormulaParser)
  .to(MoleculeChemicalFormulaParser);

container
  .bind<MoleculeController>(TYPES.MoleculeController)
  .to(MoleculeController);

container.bind<XssEscaper>(TYPES.XssEscaper).to(XssEscaper);
container.bind<ViewRenderer>(TYPES.ViewRenderer).to(ViewRenderer);
container.bind<BaseController>(TYPES.BaseController).to(BaseController);
container.bind<FileReader>(TYPES.FileReader).to(FileReader);

container.bind<Validator>(TYPES.FormulaValidator).toDynamicValue(() => {
  return new Validator({
    formula: [
      new NotBlank({ fieldName: "formula" }),
      new String({ fieldName: "formula" }),
      new MinLineLength({ min: 1, fieldName: "formula" }),
      new MaxLineLength({ max: 50, fieldName: "formula" }),
      new Regex({
        fieldName: "formula",
        pattern:
          /(^([A-Z][a-z]?[1-9]{0,2})+$|^(\(([A-Z][a-z]?[1-9]{0,2})+\)[1-9]{1,2}([A-Z][a-z]?[1-9]{0,2})*)+$|^(([A-Z][a-z]?[1-9]{0,2})+\(([A-Z][a-z]?[1-9]{0,2})+\)[1-9]{1,2})+$)/,
        stringStructureHint:
          "химический элемент пишется как заглавная буква и строчная буква (если есть), пример: H, Cl (принимаются только буквы английского алфавита). после химического элемента может идти число или не идти, но если оно идет, то должно состоять из 1-2 цифры, пример: H, H2, H22. химическая формула может содержать скобки, после скобок обязательно должно быть указано число, состоящее из 1-2 цифры, пример: H2(O)2.",
      }),
      new ValidParentheses(),
    ],
  });
});

container.bind<Cache>(TYPES.RedisCache).to(RedisCache);
container.bind<ApiDocsController>(TYPES.ApiDocsController).to(ApiDocsController);

export { container };