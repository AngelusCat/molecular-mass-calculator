import { FormatError } from "./FormatError.js";

export class InvalidStringFormatError extends FormatError {
    constructor(message: string) {
        super(message);
    }
}