import { ValidationRule } from "../../interfaces/ValidationRule.js";
import { ValidationError } from "../ValidationError.js";
import { BaseValidationRule } from "../BaseValidationRule.js";
import { correctType } from "../../helpers/argumentChecks.js";

export class MaxLineLength extends BaseValidationRule implements ValidationRule {
    /**
     * Проверяет строку на максимальное количество символов
     * @param {string} value значение, которое проверяется на соответствие правилу валидации
     * @param {{max: number, fieldName: string}} validationDetails максимальное количество символов, больше которого строка не должна содержать и название поля формы
     * @returns {ValidationError|null} значение не соответствует правилу валидации -> ValidationError, соответствует -> null
     */
    validate(value: string, validationDetails: {max: number, fieldName: string}): ValidationError | null {
        correctType(value, "string", "value");
        this.checkValidationDetails(validationDetails, {max: "number", fieldName: "string"});

        const charCount = Array.from(value).length;

        return charCount > validationDetails.max ? new ValidationError(`Количество символов в строке (поле ${validationDetails.fieldName}) должно быть не больше ${validationDetails.max}, у вас - ${charCount}.`) : null;
    }
}

/* TEST
const maxLineLength = new MaxLineLength();
const value = "test";
const validationDetails = {max: 4, fieldName: ""};
console.log(maxLineLength.validate(value, validationDetails));
*/