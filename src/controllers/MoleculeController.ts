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
import { Cache } from "../interfaces/Cache.js";
import { ApiResponse } from "../api/ApiResponse.js";
import { Status } from "../api/Status.js";

@injectable()
export class MoleculeController extends BaseController {
  protected parser: MoleculeChemicalFormulaParser;
  protected viewRenderer: ViewRenderer;
  protected validator: Validator;
  protected cache: Cache;
  
  constructor(@inject(TYPES.MoleculeChemicalFormulaParser) parser: MoleculeChemicalFormulaParser, @inject(TYPES.ViewRenderer) viewRenderer: ViewRenderer, @inject(TYPES.FormulaValidator) validator: Validator, @inject(TYPES.RedisCache) cache: Cache) {
    super(container.get<ViewRenderer>(TYPES.ViewRenderer));
    this.parser = parser;
    this.viewRenderer = viewRenderer;
    this.validator = validator;
    this.cache = cache;
  }
  
  async index(req: IncomingMessage, res: ServerResponse) {
    this.sendHtmlResponse(res, 200, "index", {molecule: " ", validationErrorMessages: " ", validationErrorMessageText: " "});
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
        this.thisIsApiRequest(req) ? this.sendJsonResponse(res, 400, new ApiResponse(Status.ERROR, {}, "Ошибки валидации.", {})) : await this.sendHtmlResponse(res, 400, "index", {molecule: molecule.getFormula(), validationErrorMessages: listOfValidationErrors.getListOfFieldErrors("formula").map(error => error.getMessage()).join(' '), validationErrorMessageText: "Неправильно введены данные формы. Ошибки: "});
        return;
        /*
        await this.sendHtmlResponse(res, 400, "index", {molecule: molecule.getFormula(), validationErrorMessages: listOfValidationErrors.getListOfFieldErrors("formula").map(error => error.getMessage()).join(' '), validationErrorMessageText: "Неправильно введены данные формы. Ошибки: "});
        return;
        */
      }

      const molecularWeightFromCache = await this.cache.get(molecule.getFormula());
      let molecularWeight: number;

      if (molecularWeightFromCache) {
        molecularWeight = Number(molecularWeightFromCache);
      } else {
        molecularWeight = molecule.calculateMolecularWeight();
        this.cache.set(molecule.getFormula(), String(molecularWeight));
      }

      this.thisIsApiRequest(req) ? this.sendJsonResponse(res, 200, new ApiResponse(Status.SUCCESS, {molecularWeight: molecularWeight}, `Получена молекулярная масса ${molecule.getFormula()}.`, {})) : await this.sendHtmlResponse(res, 200, "molecule", {molecule: molecule.getFormula(), molecularWeight: molecularWeight});
    }
  }
}
