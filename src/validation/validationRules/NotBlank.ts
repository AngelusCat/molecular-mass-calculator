import { ValidationRule } from "../../interfaces/ValidationRule";
import { ValidationError } from "../ValidationError";

export class NotBlank implements ValidationRule {
    validate(fieldName: string, value: any, validationDetails: Record<string, any>): ValidationError | null {
        const patternStringConsistsOfSpaces = /^\s*$/;

        return patternStringConsistsOfSpaces.test(value) ? new ValidationError(`Значение поля ${fieldName} не может быть пустой строкой.`) : null;
    }
}