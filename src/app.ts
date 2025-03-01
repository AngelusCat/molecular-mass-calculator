import { TYPES } from "./di/types.js";
import "reflect-metadata";
import { container } from "./di/container.js";
import http from "http";
import { IncomingMessage, ServerResponse } from 'http';
import { URL } from "url";
import { MoleculeController } from "./controllers/MoleculeController.js";
import { BaseController } from "./controllers/BaseController.js";
import { ApiDocsController } from "./controllers/ApiDocsController.js";

const moleculeController: MoleculeController = container.get<MoleculeController>(TYPES.MoleculeController);
const baseController: BaseController = container.get<BaseController>(TYPES.BaseController);
const apiDocsController: ApiDocsController = container.get<ApiDocsController>(TYPES.ApiDocsController);

const routes: Record<string, Function> = {
    '/index': moleculeController.index.bind(moleculeController),
    '/calculateMolecularWeight': moleculeController.calculateMolecularWeight.bind(moleculeController),
    '/api/molecularWeight': moleculeController.calculateMolecularWeight.bind(moleculeController),
    '/api/api-docs.json': apiDocsController.get.bind(apiDocsController)
};

const requestListener = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    if (req.url) {
        const pathName: string = new URL(req.url, `http://${req.headers.host}`).pathname;
        if (routes[pathName]) {
            routes[pathName](req,res);
        } else {
           baseController.sendHtmlResponse(res, 404, "404");
        }
    } else {
        baseController.sendHtmlResponse(res, 404, "404");
    }
};

const server: http.Server = http.createServer(requestListener);

server.listen(3000, () => {
    console.log("Сервер запущен.")
});