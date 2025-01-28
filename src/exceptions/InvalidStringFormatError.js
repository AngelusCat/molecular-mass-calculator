import { FormatError } from "./FormatError.js";

export class InvalidStringFormatError extends FormatError {
    constructor(message) {
        super(message);
    }
}