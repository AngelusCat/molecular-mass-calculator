import { IncomingMessage, ServerResponse } from "http";
import { BaseController } from "./BaseController.js";
import { swaggerSpec } from "../api/swagger.js";
import { injectable } from "inversify";

@injectable()
export class ApiDocsController extends BaseController {
    get(req: IncomingMessage, res: ServerResponse) {
        this.sendJsonResponse(res, 200, swaggerSpec);
    }
}