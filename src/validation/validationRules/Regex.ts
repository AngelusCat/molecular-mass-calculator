import { InvalidArgumentError } from "../../exceptions/InvalidArgumentError.js";
import { ValidationRule } from "../../interfaces/ValidationRule.js";
import { ValidationError } from "../ValidationError.js";

export class Regex implements ValidationRule {
    validate(value: string, validationDetails: {fieldName: string, pattern: RegExp, stringStructureHint: string}): ValidationError | null {
        if (typeof value !== "string") {
            throw new InvalidArgumentError(`value обязан быть строкой.`);
        }

        this.checkValidationDetails(validationDetails);
        
        return validationDetails.pattern.test(value) ? null : new ValidationError(`Значение поля ${validationDetails.fieldName} должно иметь следующую структуру: ${validationDetails.stringStructureHint}`);
    }

    private checkValidationDetails(validationDetails: {fieldName: string, pattern: RegExp, stringStructureHint: string}): void {
        if (!('fieldName' in validationDetails)) {
            throw new InvalidArgumentError(`validationDetails обязан иметь ключ fieldName.`);
        }

        if (typeof validationDetails.fieldName !== "string") {
            throw new InvalidArgumentError(`validationDetails.fieldName обязан иметь тип string.`);
        }

        if (!validationDetails.fieldName) {
            throw new InvalidArgumentError(`validationDetails.fieldName не может быть пустой строкой.`);
        }

        if (!('pattern' in validationDetails)) {
            throw new InvalidArgumentError(`validationDetails обязан иметь ключ pattern.`);
        }

        if (!(validationDetails.pattern instanceof RegExp)) {
            throw new InvalidArgumentError(`validationDetails.pattern обязан иметь тип RegExp.`);
        }

        if (!validationDetails.pattern) {
            throw new InvalidArgumentError(`validationDetails.pattern не может быть пустым значением.`);
        }

        if (!('stringStructureHint' in validationDetails)) {
            throw new InvalidArgumentError(`validationDetails обязан иметь ключ stringStructureHint.`);
        }

        if (typeof validationDetails.stringStructureHint !== "string") {
            throw new InvalidArgumentError(`validationDetails.stringStructureHint обязан иметь тип string.`);
        }

        if (!validationDetails.stringStructureHint) {
            throw new InvalidArgumentError(`validationDetails.stringStructureHint не может быть пустой строкой.`);
        }
    }
}