import { ValidationRule } from "../interfaces/ValidationRule";
import { ValidationErrorList } from "./ValidationErrorList";

export class Validator {
    private rules: Record<string, Array<ValidationRule>>;

    constructor(rules: Record<string, Array<ValidationRule>>) {
        this.rules = rules;
    }

    validate(validationTarget: Record<string, any>): ValidationErrorList {
        const validationErrorList = new ValidationErrorList();

        for (let fieldName in this.rules) {
            let getterName = "get" + fieldName.charAt(0).toUpperCase() + fieldName.slice(1).toLowerCase();

            if (!(getterName in validationTarget)) {
                continue;
            }

            this.rules[fieldName].forEach((validationRule) => {
                
            });
        }

        return validationErrorList;
    }
}