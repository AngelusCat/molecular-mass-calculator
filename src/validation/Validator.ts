import { ValidationRule } from "../interfaces/ValidationRule";

export class Validator {
    private rules: Record<string, Array<ValidationRule>>;

    constructor(rules: Record<string, Array<ValidationRule>>) {
        this.rules = rules;
    }

    validate() {
        //
    }
}