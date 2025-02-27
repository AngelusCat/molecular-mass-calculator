import { ValidationRule } from "../../interfaces/ValidationRule.js";
import { ValidationError } from "../ValidationError.js";
import { BaseValidationRule } from "../BaseValidationRule.js";

export class String extends BaseValidationRule implements ValidationRule {
    private validationDetails: {fieldName: string};

    /**
     * 
     * @param {{fieldName: string}} validationDetails название поля формы
     */
    constructor(validationDetails: {fieldName: string}) {
        super();
        this.checkValidationDetails(validationDetails, {fieldName: "string"});
        this.validationDetails = validationDetails;
    }
    
    /**
     * Проверяет, что значение является строкой
     * @param {any} value значение, которое проверяется на соответствие правилу валидации
     * @returns {ValidationError|null} значение не соответствует правилу валидации -> ValidationError, соответствует -> null
     */
    validate(value: any): ValidationError | null {
        return typeof value !== "string" ? new ValidationError(`Поле ${this.validationDetails.fieldName} должно быть строкой.`) : null;
    }
}