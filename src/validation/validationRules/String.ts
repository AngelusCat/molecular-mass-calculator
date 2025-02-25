import { ValidationRule } from "../../interfaces/ValidationRule.js";
import { ValidationError } from "../ValidationError.js";

export class String implements ValidationRule {
    /**
     * Проверяет, что значение является строкой
     * @param {string} fieldName имя поля формы, которое подвергается проверке
     * @param {string} value 
     * @returns {ValidationError|null} значение не соответствует правилу валидации -> ValidationError, соответствует -> null
     */
    validate(fieldName: string, value: any, validationDetails: Record<string, any> = {}): ValidationError | null {
        return typeof value !== "string" ? new ValidationError(`Поле ${fieldName} должно быть строкой.`) : null;
    }
}