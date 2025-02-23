import { inject, injectable } from "inversify";
import { TYPES } from "../di/types.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { URL } from "url";
import { IncomingMessage, ServerResponse } from "http";
import { Molecule } from "../models/Molecule.js";
import { MoleculeChemicalFormulaParser } from "../models/services/MoleculeChemicalFormulaParser.js";
import { InvalidStateException } from "../exceptions/InvalidStateException.js";
import { ViewRenderer } from "../view/ViewRenderer.js";


@injectable()
export class MoleculeController {
  protected parser: MoleculeChemicalFormulaParser;
  protected viewRenderer: ViewRenderer;
  
  constructor(@inject(TYPES.MoleculeChemicalFormulaParser) parser: MoleculeChemicalFormulaParser, @inject(TYPES.ViewRenderer) viewRenderer: ViewRenderer) {
    this.parser = parser;
    this.viewRenderer = viewRenderer;
  }
  
  index(req: IncomingMessage, res: ServerResponse) {
    const pathToHtmlTemplate = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "..",
      "resources",
      "templates",
      "index.html"
    );

    fs.readFile(pathToHtmlTemplate, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(404, {"Content-Type": "text/html; charset=utf-8"});
        res.end(`<p>Страница не найдена.</p>`);
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }

  async calculateMolecularWeight(req: IncomingMessage, res: ServerResponse) {
    if (req.url) {
      const moleculeFromGetParameters: string|null = new URL(req.url, `http://${req.headers.host}`).searchParams.get("molecule");

      if (moleculeFromGetParameters === null) {
        throw new InvalidStateException(`moleculeFromGetParameters не может быть null.`);
      }

      const molecule: Molecule = new Molecule(this.parser, moleculeFromGetParameters);
      const molecularWeight: number = molecule.calculateMolecularWeight();
    
      res.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
      //res.end(`<p>Молекула: ${molecule.getFormula()}, ее молекулярная масса - ${molecularWeight}.</p>`);
      const renderedTemplate = await this.viewRenderer.render("molecule", {molecule: molecule.getFormula(), molecularWeight: molecularWeight});
      res.end(renderedTemplate);
    }
  }
}
