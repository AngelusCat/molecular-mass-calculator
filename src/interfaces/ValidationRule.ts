import { ValidationError } from "../validation/ValidationError";

export interface ValidationRule {
    /**
     * Проверяет, соответствует ли значение правилу валидации
     * @param {any} value значение, которое проверяется на соответствие правилу валидации
     * @param {object} validationDetails дополнительная информация, чтобы осуществить проверку, пример: для правила валидации Regex validationDetails = {pattern: /example/g}
     * @returns {ValidationError | null} значение проходит проверку -> возвращает null; не проходит - ValidationError
     */
    validate(value: any, validationDetails: Record<string, any>): ValidationError|null;
}