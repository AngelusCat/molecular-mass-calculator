import http from "http";
import { URL } from "url";

import { MoleculeController } from "./controllers/MoleculeController.js";

const moleculeController = new MoleculeController();

const routes = {
    '/index': moleculeController.index,
    '/calculateMolecularWeight': moleculeController.calculateMolecularWeight
};

const requestListener = (req, res) => {
    const pathName = new URL(req.url, `http://${req.headers.host}`).pathname;
    
    if (routes[pathName]) {
        routes[pathName](req,res);
    } else {
        res.writeHeader(404, {"Content-Type": "text/html; charset=utf-8"});
        res.end(`<p>Страница не найдена.</p>`);
    }
};

const server = http.createServer(requestListener);

server.listen(3000, () => {
    console.log("Сервер запущен.")
});