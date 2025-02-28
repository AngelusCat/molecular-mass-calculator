import { inject, injectable } from "inversify";
import { TYPES } from "../di/types.js";
import { IncomingMessage, ServerResponse } from "http";
import { ViewRenderer } from "../view/ViewRenderer.js";

@injectable()
export class BaseController {
    protected viewRenderer: ViewRenderer;

    constructor(@inject(TYPES.ViewRenderer) viewRenderer: ViewRenderer) {
        this.viewRenderer = viewRenderer;
    }
    
    async sendHtmlResponse(res: ServerResponse, statusCode: number, templateName: string, data: Record<string, any> = {}) {
        res.writeHead(statusCode, {"Content-Type": "text/html; charset=utf-8"});
        const renderedTemplate = await this.viewRenderer.render(templateName, data);
        res.end(renderedTemplate);
    }

    sendJsonResponse(res: ServerResponse, statusCode: number, data: Record<string, any>) {
        res.writeHead(statusCode, {"Content-Type": "application/json; charset=utf-8"});
        res.end(JSON.stringify(data));
    }

    protected thisIsApiRequest(req: IncomingMessage): boolean {
        if (req.url) {
          return req.url.startsWith('/api/');
        }
        return false;
    }
}