import fs from "fs";
import { template_path } from "../helpers/paths.js";
import path from "path";
import { FileReadError } from "../exceptions/FileReadError.js";
import { InvalidArgumentError } from "../exceptions/InvalidArgumentError.js";

export class ViewRenderer {
    /**
     * рендерит html шаблон
     * @param {string} templateName имя шаблона без расширения (ожидается, что данный шаблон хранится с расширением .html), пример: шаблон хранится в resources/templates/index.html -> templateName будет index
     * @param {object} variables все переменные, которые объявляются в шаблоне, обязаны присутствовать в этом объекте, где ключ - название свойства, значение - значение свойства
     * @returns {Promise} строка, которая содержит html шаблон, в котором плейсхолдеры вида {{ myVar }} заменены на значения одноименных переменных из variables
     */
    async render(templateName: string, variables: Record<string, any>): Promise<string> {
        
        const template = await this.readTemplate(templateName);

        const placeholderPattern = /{{\s*[a-zA-Z]*\s*}}/g;

        return template.replace(placeholderPattern, (placeholder) => {
            const variableNamePattern = /{{\s*([a-zA-Z]+)\s*}}/;
            const variableName = placeholder.match(variableNamePattern);

            if (variableName) {
                if (!(variableName[1] in variables)) {
                    throw new InvalidArgumentError(`variables обязан содержать свойство ${variableName[1]}`);
                }
                return variables[variableName[1]];
            } else {
                return '';
            }
        });
    }

    /**
     * читает html шаблон из файла html
     * @param {string} fileName имя шаблона без расширения (ожидается, что данный шаблон хранится с расширением .html), пример: шаблон хранится в resources/templates/index.html -> fileName будет index
     * @returns {Promise} html шаблон в виде строки
     */
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