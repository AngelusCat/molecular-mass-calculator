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

@injectable()
export class MoleculeController extends BaseController {
  protected parser: MoleculeChemicalFormulaParser;
  protected viewRenderer: ViewRenderer;
  
  constructor(@inject(TYPES.MoleculeChemicalFormulaParser) parser: MoleculeChemicalFormulaParser, @inject(TYPES.ViewRenderer) viewRenderer: ViewRenderer) {
    super(container.get<ViewRenderer>(TYPES.ViewRenderer));
    this.parser = parser;
    this.viewRenderer = viewRenderer;
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
      const molecularWeight: number = molecule.calculateMolecularWeight();
    
      this.sendHtmlResponse(res, 200, "molecule", {molecule: molecule.getFormula(), molecularWeight: molecularWeight});
    }
  }
}
