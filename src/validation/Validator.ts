import { ValidationRule } from "../interfaces/ValidationRule";
import { ValidationErrorList } from "./ValidationErrorList";

export class Validator {
    private rules: Record<string, Array<ValidationRule>>;

    constructor(rules: Record<string, Array<ValidationRule>>) {
        this.rules = rules;
    }

    validate(validationTarget: Record<string, any>): ValidationErrorList {
        const validationErrorList = new ValidationErrorList();

        return validationErrorList;
    }
}