import { InvalidArgumentError } from "../../exceptions/InvalidArgumentError.js";
import { ValidationRule } from "../../interfaces/ValidationRule.js";
import { ValidationError } from "../ValidationError.js";

export class MinLineLength implements ValidationRule {
    /**
     * Проверяет строку на минимальное количество символов
     * @param {string} fieldName имя поля формы, которое подвергается проверке
     * @param {string} value 
     * @param {{min: number}} validationDetails минимальное количество символов, которое должна содержать строка
     * @returns {ValidationError|null} значение не соответствует правилу валидации -> ValidationError, соответствует -> null
     */
    validate(fieldName: string, value: string, validationDetails: {min: number}): ValidationError | null {
        if (!('min' in validationDetails)) {
            throw new InvalidArgumentError(`validationDetails обязан иметь ключ min.`);
        }

        if (typeof validationDetails.min !== "number") {
            throw new InvalidArgumentError(`validationDetails.min обязан иметь тип number.`);
        }

        if (!fieldName || fieldName && typeof fieldName !== "string") {
            throw new InvalidArgumentError(`fieldName обязан быть строкой.`);
        }

        if (!value || value && typeof value !== "string") {
            throw new InvalidArgumentError(`value обязан быть строкой.`);
        }

        const charCount = Array.from(value).length;

        return charCount < validationDetails.min ? new ValidationError(`Количество символов в строке (поле ${fieldName}) должно быть не меньше ${validationDetails.min}, у вас - ${charCount}.`) : null;
    }
}