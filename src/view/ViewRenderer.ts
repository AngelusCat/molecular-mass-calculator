import fs from "fs";
import { template_path } from "../helpers/paths.js";
import path from "path";
import { FileReadError } from "../exceptions/FileReadError.js";

export class ViewRenderer {
    async render(templateName: string, variables: Record<string, any>) {
        
        const template = await this.readTemplate(templateName);

        const placeholderPattern = /{{\s*[a-zA-Z]+\s*}}/g;

        return template.replace(placeholderPattern, (placeholder) => {
            const variablePattern = /{{\s*([a-zA-Z]+)\s*}}/;
            const variable = placeholder.match(variablePattern);

            if (variable) {
                return variables[variable[1]];
            }
        });
    }

    private readTemplate(fileName: string): Promise<string> {
        let pathToFile = path.join(template_path(), fileName + ".html");

        return new Promise((resolve, reject) => {
            fs.readFile(pathToFile, 'utf8', (err, data) => {
                if (err) {
                    reject(new FileReadError(`Не удалось прочитать файл ${pathToFile}: ${err.message}.`));
                } else {
                    resolve(data);
                }
            });
        });
    }
}


let renderer = new ViewRenderer();

for (let template of ["test"]) {
    console.log(await renderer.render(template, {name: "Anon"}));
}