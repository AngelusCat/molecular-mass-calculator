import { ValidationRule } from "../../interfaces/ValidationRule.js";
import { ValidationError } from "../ValidationError.js";
import { BaseValidationRule } from "../BaseValidationRule.js";
import { notEmptyValue } from "../../helpers/argumentChecks.js";

export class Regex extends BaseValidationRule implements ValidationRule {
    private validationDetails: {fieldName: string, pattern: RegExp, stringStructureHint: string};

    /**
     * 
     * @param {{fieldName: string, pattern: RegExp, stringStructureHint: string}} validationDetails имя поля формы; паттерн, на соответствие которому проверяется строка; текст, который говорит о том, какую структуру должна иметь строка (чтобы сформировать сообщение об ошибке валидации пользователю)
     */
    constructor(validationDetails: {fieldName: string, pattern: RegExp, stringStructureHint: string}) {
        super();
        this.checkValidationDetails(validationDetails, {fieldName: "string", pattern: "RegExp", stringStructureHint: "string"});
        this.validationDetails = validationDetails;
    }
    
    /**
     * Проверяет, что строка соответствует регулярному выражению
     * @param {string} value значение, которое проверяется на соответствие правилу валидации
     * @returns {ValidationError|null} значение проходит проверку -> возвращает null; не проходит - ValidationError
     */
    validate(value: string): ValidationError | null {
        notEmptyValue(value, "value");
        
        return this.validationDetails.pattern.test(value) ? null : new ValidationError(`Значение поля ${this.validationDetails.fieldName} должно иметь следующую структуру: ${this.validationDetails.stringStructureHint}`);
    }
}