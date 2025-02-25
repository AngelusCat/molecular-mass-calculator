import { ValidationError } from "../validation/ValidationError";

export interface ValidationRule {
    /**
     * Проверяет, соответствует ли значение правилу валидации
     * @param {string} fieldName имя поля формы, которое подвергается проверке
     * @param {any} value значение, которое проверяется на соответствие правилу валидации
     * @param {object}  дополнительная информация, чтобы осуществить проверку, пример: для правила валидации Regex validationDetails = {pattern: /example/g}
     * @returns {ValidationError|null} значение не соответствует правилу валидации -> ValidationError, соответствует -> null
     */
    validate(fieldName: string, value: any, validationDetails: Record<string, any>): ValidationError|null;
}