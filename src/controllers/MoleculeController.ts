import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { URL } from "url";

export class MoleculeController {
  index(req, res) {
    const pathToHtmlTemplate = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "..",
      "resources",
      "views",
      "index.html"
    );

    fs.readFile(pathToHtmlTemplate, "utf-8", (err, data) => {
      if (err) {
        //
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }

  calculateMolecularWeight(req, res) {
    const moleculeFromGetParameters = new URL(req.url, `http://${req.headers.host}`).searchParams.get("molecule");
    
    res.writeHead(200, {"Content-type": "text/html"});
    res.end(`<p>${moleculeFromGetParameters}</p>`);
  }
}
