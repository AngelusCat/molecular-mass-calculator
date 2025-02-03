export class FormatError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.stack = (new Error()).stack;
    }
}