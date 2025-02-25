import { ValidationRule } from "../../interfaces/ValidationRule.js";
import { ValidationError } from "../ValidationError.js";

export class ValidParentheses implements ValidationRule {
    validate(fieldName: string, value: any, validationDetails: Record<string, any> = {}): ValidationError | null {
        return this.parenthesesAreInCorrectOrder(value);
    }

    private parenthesesAreInCorrectOrder(value: string, errors: Array<ValidationError> = []): ValidationError|null {
        const openingParenthesis = value.indexOf("(");
        const closingParenthesis = value.indexOf(")");
        
        if (openingParenthesis > closingParenthesis && openingParenthesis >= 0 && closingParenthesis > 0) {
            errors.push(new ValidationError(`Открывающая скобка должна идти раньше, чем закрывающая скобка.`));
        }

        if (closingParenthesis === -1 && openingParenthesis >= 0) {
            errors.push(new ValidationError(`Не закрыли скобку.`));
        }

        if (openingParenthesis === -1 && closingParenthesis > 0) {
            errors.push(new ValidationError(`Есть закрывающая скобка, но нет открывающей скобки.`));
        }

        try {
            const newValue = (value.slice(0, openingParenthesis) + value.slice(openingParenthesis + 1, closingParenthesis) + value.slice(closingParenthesis + 1));
            return /[\(\)]+/g.test(newValue) ? this.parenthesesAreInCorrectOrder(newValue, errors) : errors.length > 0 ? new ValidationError(errors.map(error => error.getMessage()).join(' ')) : null;
        } catch(err: any) {
            return errors.length > 0 ? new ValidationError(errors.map(error => error.getMessage()).join(' ')) : null;
        }
    }
}

const valid = new ValidParentheses();
const fieldName = "test";
for (let value of ["H2SO4", "H2(O)2", ")H2", "(H2", "((H2", ")H2("]) {
    if (valid.validate(fieldName, value) !== null) {
        console.log(`Значение: ${value}, ошибки: `);
        console.log(valid.validate(fieldName, value));
    }
}