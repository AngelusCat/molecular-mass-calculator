import { ValidationRule } from "../../interfaces/ValidationRule.js";
import { ValidationError } from "../ValidationError.js";
import { BaseValidationRule } from "../BaseValidationRule.js";
import { correctType } from "../../helpers/argumentChecks.js";

export class MinLineLength extends BaseValidationRule implements ValidationRule {
    /**
     * Проверяет строку на минимальное количество символов
     * @param {string} value значение, которое проверяется на соответствие правилу валидации
     * @param {{min: number, fieldName: string}} validationDetails минимальное количество символов, которое должна содержать строка и название поля формы
     * @returns {ValidationError|null} значение не соответствует правилу валидации -> ValidationError, соответствует -> null
     */
    validate(value: string, validationDetails: {min: number, fieldName: string}): ValidationError | null {
        correctType(value, "string", "value");
        this.checkValidationDetails(validationDetails, {min: "number", fieldName: "string"});

        const charCount = Array.from(value).length;

        return charCount < validationDetails.min ? new ValidationError(`Количество символов в строке (поле ${validationDetails.fieldName}) должно быть не меньше ${validationDetails.min}, у вас - ${charCount}.`) : null;
    }
}