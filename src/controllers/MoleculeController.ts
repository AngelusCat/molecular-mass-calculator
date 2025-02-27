import { inject, injectable } from "inversify";
import { TYPES } from "../di/types.js";
import { container } from "../di/container.js";
import { URL } from "url";
import { IncomingMessage, ServerResponse } from "http";
import { Molecule } from "../models/Molecule.js";
import { MoleculeChemicalFormulaParser } from "../models/services/MoleculeChemicalFormulaParser.js";
import { InvalidStateException } from "../exceptions/InvalidStateException.js";
import { ViewRenderer } from "../view/ViewRenderer.js";
import { BaseController } from "./BaseController.js";
import { Validator } from "../validation/Validator.js";

@injectable()
export class MoleculeController extends BaseController {
  protected parser: MoleculeChemicalFormulaParser;
  protected viewRenderer: ViewRenderer;
  protected validator: Validator;
  
  constructor(@inject(TYPES.MoleculeChemicalFormulaParser) parser: MoleculeChemicalFormulaParser, @inject(TYPES.ViewRenderer) viewRenderer: ViewRenderer, @inject(TYPES.FormulaValidator) validator: Validator) {
    super(container.get<ViewRenderer>(TYPES.ViewRenderer));
    this.parser = parser;
    this.viewRenderer = viewRenderer;
    this.validator = validator;
  }
  
  async index(req: IncomingMessage, res: ServerResponse) {
    this.sendHtmlResponse(res, 200, "index");
  }

  async calculateMolecularWeight(req: IncomingMessage, res: ServerResponse) {
    if (req.url) {
      const moleculeFromGetParameters: string|null = new URL(req.url, `http://${req.headers.host}`).searchParams.get("molecule");

      if (moleculeFromGetParameters === null) {
        throw new InvalidStateException(`moleculeFromGetParameters не может быть null.`);
      }

      const molecule: Molecule = new Molecule(this.parser, moleculeFromGetParameters);

      const listOfValidationErrors = this.validator.validate(molecule);

      if (!(listOfValidationErrors.isEmpty())) {
        this.sendHtmlResponse(res, 400, "index", {molecule: molecule.getFormula(), validationErrorMessage: `Неправильно введены данные формы. Ошибки: ${listOfValidationErrors.getListOfFieldErrors("formula").map(error => error.getMessage()).join(' ')}.`});
      }

      const molecularWeight: number = molecule.calculateMolecularWeight();
    
      this.sendHtmlResponse(res, 200, "molecule", {molecule: molecule.getFormula(), molecularWeight: molecularWeight});
    }
  }
}
