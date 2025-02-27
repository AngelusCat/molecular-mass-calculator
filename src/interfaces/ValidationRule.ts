import { ValidationError } from "../validation/ValidationError";

export interface ValidationRule {
    /**
     * Проверяет, соответствует ли значение правилу валидации
     * @param {any} value значение, которое проверяется на соответствие правилу валидации
     * @returns {ValidationError | null} значение проходит проверку -> возвращает null; не проходит - ValidationError
     */
    validate(value: any): ValidationError|null;
}