import { ValidationRule } from "../../interfaces/ValidationRule.js";
import { ValidationError } from "../ValidationError.js";
import { BaseValidationRule } from "../BaseValidationRule.js";
import { notEmptyValue } from "../../helpers/argumentChecks.js";

export class String extends BaseValidationRule implements ValidationRule {
    /**
     * Проверяет, что значение является строкой
     * @param {any} value значение, которое проверяется на соответствие правилу валидации
     * @param {{fieldName: string}} validationDetails название поля формы
     * @returns {ValidationError|null} значение не соответствует правилу валидации -> ValidationError, соответствует -> null
     */
    validate(value: any, validationDetails: {fieldName: string}): ValidationError | null {
        notEmptyValue(value, "value");
        this.checkValidationDetails(validationDetails, {fieldName: "string"});
        
        return typeof value !== "string" ? new ValidationError(`Поле ${validationDetails.fieldName} должно быть строкой.`) : null;
    }
}