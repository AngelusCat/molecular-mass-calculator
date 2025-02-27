import { ValidationRule } from "../../interfaces/ValidationRule.js";
import { ValidationError } from "../ValidationError.js";
import { BaseValidationRule } from "../BaseValidationRule.js";
import { correctType } from "../../helpers/argumentChecks";

export class NotBlank extends BaseValidationRule implements ValidationRule {
    /**
     * Проверяет, что строка не состоит полностью из пробелов
     * @param {string} value значение, которое проверяется на соответствие правилу валидации
     * @param {{fieldName: string}} validationDetails название поля формы
     * @returns {ValidationError | null} значение проходит проверку -> возвращает null; не проходит - ValidationError
     */
    validate(value: string, validationDetails: {fieldName: string}): ValidationError | null {
        correctType(value, "string", "value");
        this.checkValidationDetails(validationDetails, {fieldName: "string"});
        
        const patternStringConsistsOfSpaces = /^\s*$/;

        return patternStringConsistsOfSpaces.test(value) ? new ValidationError(`Значение поля ${validationDetails.fieldName} не может быть пустой строкой.`) : null;
    }
}