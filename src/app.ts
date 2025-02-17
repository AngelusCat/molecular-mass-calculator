import { TYPES } from "./di/types.js";
import "reflect-metadata";
import { container } from "./di/container.js";
import http from "http";
import { IncomingMessage, ServerResponse } from 'http';
import { URL } from "url";
import { MoleculeController } from "./controllers/MoleculeController.js";

const moleculeController: MoleculeController = container.get<MoleculeController>(TYPES.MoleculeController);

const routes: Record<string, Function> = {
    '/index': moleculeController.index,
    '/calculateMolecularWeight': moleculeController.calculateMolecularWeight
};

const requestListener = (req: IncomingMessage, res: ServerResponse): void => {
    if (req.url) {
        const pathName: string = new URL(req.url, `http://${req.headers.host}`).pathname;
        if (routes[pathName]) {
            routes[pathName](req,res);
        }
    } else {
        res.writeHead(404, {"Content-Type": "text/html; charset=utf-8"});
        res.end(`<p>Страница не найдена.</p>`);
    }
};

const server: http.Server = http.createServer(requestListener);

server.listen(3000, () => {
    console.log("Сервер запущен.")
});