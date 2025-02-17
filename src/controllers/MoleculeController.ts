import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { URL } from "url";
import { IncomingMessage, ServerResponse } from "http";
import { Molecule } from "../models/Molecule.js";
import { MoleculeChemicalFormulaParser } from "../models/services/MoleculeChemicalFormulaParser.js";
import { inject, injectable } from "inversify";
import { InvalidStateException } from "../exceptions/InvalidStateException.js";
import { TYPES } from "../di/types.js";

@injectable()
export class MoleculeController {
  #parser: MoleculeChemicalFormulaParser;
  
  constructor(@inject(TYPES.MoleculeChemicalFormulaParser) parser: MoleculeChemicalFormulaParser) {
    this.#parser = parser;
  }
  
  index(req: IncomingMessage, res: ServerResponse) {
    const pathToHtmlTemplate = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "..",
      "resources",
      "views",
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

  calculateMolecularWeight(req: IncomingMessage, res: ServerResponse) {
    if (req.url) {
      const moleculeFromGetParameters: string|null = new URL(req.url, `http://${req.headers.host}`).searchParams.get("molecule");

      if (moleculeFromGetParameters === null) {
        throw new InvalidStateException(`moleculeFromGetParameters не может быть null.`);
      }

      const molecule: Molecule = new Molecule(this.#parser, moleculeFromGetParameters);
    
      res.writeHead(200, {"Content-type": "text/html"});
      res.end(`<p>${molecule.getFormula()}</p>`);
    }
  }
}
