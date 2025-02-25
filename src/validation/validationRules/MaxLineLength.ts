import { InvalidArgumentError } from "../../exceptions/InvalidArgumentError.js";
import { ValidationRule } from "../../interfaces/ValidationRule.js";
import { ValidationError } from "../ValidationError.js";

export class MaxLineLength implements ValidationRule {
    /**
     * Проверяет строку на максимальное количество символов
     * @param {string} fieldName имя поля формы, которое подвергается проверке
     * @param {string} value 
     * @param {{max: number}} validationDetails максимальное количество символов, больше которого строка не должна содержать
     */
    validate(fieldName: string, value: string, validationDetails: {max: number}): ValidationError | null {
        if (!('max' in validationDetails)) {
            throw new InvalidArgumentError(`validationDetails обязан иметь ключ max.`);
        }

        if (typeof validationDetails.max !== "number") {
            throw new InvalidArgumentError(`validationDetails.max обязан иметь тип number.`);
        }

        if (!fieldName || fieldName && typeof fieldName !== "string") {
            throw new InvalidArgumentError(`fieldName обязан быть строкой.`);
        }

        if (!value || value && typeof value !== "string") {
            throw new InvalidArgumentError(`value обязан быть строкой.`);
        }

        const charCount = Array.from(value).length;

        return charCount > validationDetails.max ? new ValidationError(``) : null;
    }
}