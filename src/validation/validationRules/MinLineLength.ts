import { InvalidArgumentError } from "../../exceptions/InvalidArgumentError.js";
import { ValidationRule } from "../../interfaces/ValidationRule.js";
import { ValidationError } from "../ValidationError.js";

export class MinLineLength implements ValidationRule {
    /**
     * Проверяет строку на минимальное количество символов
     * @param {string} value значение, которое проверяется на соответствие правилу валидации
     * @param {{min: number, fieldName: string}} validationDetails минимальное количество символов, которое должна содержать строка и название поля формы
     * @returns {ValidationError|null} значение не соответствует правилу валидации -> ValidationError, соответствует -> null
     */
    validate(value: string, validationDetails: {min: number}): ValidationError | null {
        if (!('min' in validationDetails)) {
            throw new InvalidArgumentError(`validationDetails обязан иметь ключ min.`);
        }

        if (typeof validationDetails.min !== "number") {
            throw new InvalidArgumentError(`validationDetails.min обязан иметь тип number.`);
        }

        if (!('fieldName' in validationDetails)) {
            throw new InvalidArgumentError(`validationDetails обязан иметь ключ fieldName.`);
        }

        if (typeof validationDetails.fieldName !== "string") {
            throw new InvalidArgumentError(`validationDetails.fieldName обязан иметь тип string.`);
        }

        if (/^\s*$/.test(validationDetails.fieldName)) {
            throw new InvalidArgumentError(`validationDetails.fieldName не может быть пустой строкой.`);
        }

        if (!validationDetails.fieldName || validationDetails.fieldName && typeof validationDetails.fieldName !== "string") {
            throw new InvalidArgumentError(`fieldName обязан быть строкой.`);
        }

        if (!value || value && typeof value !== "string") {
            throw new InvalidArgumentError(`value обязан быть строкой.`);
        }

        const charCount = Array.from(value).length;

        return charCount < validationDetails.min ? new ValidationError(`Количество символов в строке (поле ${validationDetails.fieldName}) должно быть не меньше ${validationDetails.min}, у вас - ${charCount}.`) : null;
    }
}