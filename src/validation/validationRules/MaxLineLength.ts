import { ValidationRule } from "../../interfaces/ValidationRule.js";
import { ValidationError } from "../ValidationError.js";
import { BaseValidationRule } from "../BaseValidationRule.js";
import { correctType } from "../../helpers/argumentChecks.js";

export class MaxLineLength extends BaseValidationRule implements ValidationRule {
    private validationDetails: {max: number, fieldName: string};

    /**
     * 
     * @param {{max: number, fieldName: string}} validationDetails максимальное количество символов, больше которого строка не должна содержать и название поля формы
     */
    constructor(validationDetails: {max: number, fieldName: string}) {
        super();
        this.checkValidationDetails(validationDetails, {max: "number", fieldName: "string"});
        this.validationDetails = validationDetails;
    }
    
    /**
     * Проверяет строку на максимальное количество символов
     * @param {string} value значение, которое проверяется на соответствие правилу валидации
     * @returns {ValidationError|null} значение не соответствует правилу валидации -> ValidationError, соответствует -> null
     */
    validate(value: string): ValidationError | null {
        correctType(value, "string", "value");

        const charCount = Array.from(value).length;

        return charCount > this.validationDetails.max ? new ValidationError(`Количество символов в строке (поле ${this.validationDetails.fieldName}) должно быть не больше ${this.validationDetails.max}, у вас - ${charCount}.`) : null;
    }
}

/* TEST
const maxLineLength = new MaxLineLength();
const value = "test";
const validationDetails = {max: 4, fieldName: ""};
console.log(maxLineLength.validate(value, validationDetails));
*/