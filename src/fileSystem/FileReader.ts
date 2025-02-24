import fs from "fs";
import { injectable } from "inversify";
import { FileReadError } from "../exceptions/FileReadError.js";

@injectable()
export class FileReader {
    async read(pathToFile: string): Promise<string> {
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