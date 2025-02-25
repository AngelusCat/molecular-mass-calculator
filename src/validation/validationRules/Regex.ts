import { ValidationRule } from "../../interfaces/ValidationRule.js";
import { ValidationError } from "../ValidationError.js";

export class Regex implements ValidationRule {
    validate(fieldName: string, value: any, validationDetails: Record<string, any>): ValidationError | null {
        return validationDetails.pattern.test(value) ? null : new ValidationError(`Значение поля ${fieldName} должно иметь следующую структуру: ${validationDetails.placeholder}`);
    }
}