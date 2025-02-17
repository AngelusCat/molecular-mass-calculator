import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { URL } from "url";
import { IncomingMessage, ServerResponse } from "http";

export class MoleculeController {
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
    
      res.writeHead(200, {"Content-type": "text/html"});
      res.end(`<p>${moleculeFromGetParameters}</p>`);
    }
  }
}
