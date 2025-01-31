import fs from "fs";
import path from "path";

export class MoleculeController {
  index(req, res) {
    const pathToHtmlTemplate = path.join(
      path.dirname,
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
    //
  }
}
