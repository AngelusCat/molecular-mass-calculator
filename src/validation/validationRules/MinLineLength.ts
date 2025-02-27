import { ValidationRule } from "../../interfaces/ValidationRule.js";
import { ValidationError } from "../ValidationError.js";
import { BaseValidationRule } from "../BaseValidationRule.js";
import { correctType } from "../../helpers/argumentChecks.js";

export class MinLineLength extends BaseValidationRule implements ValidationRule {
    private validationDetails: {min: number, fieldName: string};

    /**
     * 
     * @param {{min: number, fieldName: string}} validationDetails минимальное количество символов, которое должна содержать строка и название поля формы
     */
    constructor(validationDetails: {min: number, fieldName: string}) {
        super();
        this.checkValidationDetails(validationDetails, {min: "number", fieldName: "string"});
        this.validationDetails = validationDetails;
    }
    
    /**
     * Проверяет строку на минимальное количество символов
     * @param {string} value значение, которое проверяется на соответствие правилу валидации
     * @returns {ValidationError|null} значение не соответствует правилу валидации -> ValidationError, соответствует -> null
     */
    validate(value: string): ValidationError | null {
        correctType(value, "string", "value");

        const charCount = Array.from(value).length;

        return charCount < this.validationDetails.min ? new ValidationError(`Количество символов в строке (поле ${this.validationDetails.fieldName}) должно быть не меньше ${this.validationDetails.min}, у вас - ${charCount}.`) : null;
    }
}