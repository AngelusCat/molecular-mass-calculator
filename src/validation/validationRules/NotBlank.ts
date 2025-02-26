import { ValidationRule } from "../../interfaces/ValidationRule";
import { ValidationError } from "../ValidationError";

export class NotBlank implements ValidationRule {
    /**
     * Проверяет, что строка не состоит полностью из пробелов
     * @param {string} value значение, которое проверяется на соответствие правилу валидации
     * @param {{fieldName: string}} validationDetails название поля формы
     * @returns {ValidationError | null} значение проходит проверку -> возвращает null; не проходит - ValidationError
     */
    validate(value: string, validationDetails: {fieldName: string}): ValidationError | null {
        const patternStringConsistsOfSpaces = /^\s*$/;

        return patternStringConsistsOfSpaces.test(value) ? new ValidationError(`Значение поля ${validationDetails.fieldName} не может быть пустой строкой.`) : null;
    }
}