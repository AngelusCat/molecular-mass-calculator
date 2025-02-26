import { InvalidArgumentError } from "../../exceptions/InvalidArgumentError.js";
import { ValidationRule } from "../../interfaces/ValidationRule.js";
import { ValidationError } from "../ValidationError.js";

export class String implements ValidationRule {
    /**
     * Проверяет, что значение является строкой
     * @param {any} value значение, которое проверяется на соответствие правилу валидации
     * @param {{fieldName: string}} validationDetails название поля формы
     * @returns {ValidationError|null} значение не соответствует правилу валидации -> ValidationError, соответствует -> null
     */
    validate(value: any, validationDetails: {fieldName: string}): ValidationError | null {
        if (!value) {
            throw new InvalidArgumentError(`value обязан иметь значение (не принимаются пустые значения).`);
        }

        if (!('fieldName' in validationDetails)) {
            throw new InvalidArgumentError(`validationDetails обязан иметь ключ fieldName.`);
        }

        if (typeof validationDetails.fieldName !== "string") {
            throw new InvalidArgumentError(`validationDetails.fieldName обязан иметь тип string.`);
        }

        if (!validationDetails.fieldName) {
            throw new InvalidArgumentError(`validationDetails.fieldName не может быть пустой строкой.`);
        }
        
        return typeof value !== "string" ? new ValidationError(`Поле ${validationDetails.fieldName} должно быть строкой.`) : null;
    }
}