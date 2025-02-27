import { ValidationRule } from "../../interfaces/ValidationRule.js";
import { ValidationError } from "../ValidationError.js";
import { BaseValidationRule } from "../BaseValidationRule.js";
import { correctType } from "../../helpers/argumentChecks.js";

export class NotBlank extends BaseValidationRule implements ValidationRule {
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
     * Проверяет, что строка не состоит полностью из пробелов
     * @param {string} value значение, которое проверяется на соответствие правилу валидации
     * @returns {ValidationError | null} значение проходит проверку -> возвращает null; не проходит - ValidationError
     */
    validate(value: string): ValidationError | null {
        correctType(value, "string", "value");
        
        const patternStringConsistsOfSpaces = /^\s*$/;

        return patternStringConsistsOfSpaces.test(value) ? new ValidationError(`Значение поля ${this.validationDetails.fieldName} не может быть пустой строкой.`) : null;
    }
}