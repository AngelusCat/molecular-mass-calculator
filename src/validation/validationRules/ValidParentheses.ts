import { InvalidArgumentError } from "../../exceptions/InvalidArgumentError.js";
import { correctType } from "../../helpers/argumentChecks.js";
import { ValidationRule } from "../../interfaces/ValidationRule.js";
import { ValidationError } from "../ValidationError.js";


export class ValidParentheses implements ValidationRule {
  /**
   * Проверяет, что круглые скобки идут в правильном порядке (открывающая предшествует закрывающей) и что все скобки закрыты
   * @param {string} value строка, которая потенциально может содержать круглые скобки
   * @param {object} validationDetails дополнительная информация, чтобы осуществить проверку (в этой проверке не используется)
   * @returns {ValidationError|null} значение проходит проверку -> возвращает null; не проходит - ValidationError 
   */
  validate(
    value: string,
    validationDetails: Record<string, any> = {}
  ): ValidationError | null {
    correctType(value, "string", "value");
    
    return this.parenthesesAreInCorrectOrder(value);
  }

  private parenthesesAreInCorrectOrder(
    value: string,
    errors: Array<ValidationError> = []
  ): ValidationError | null {
    const openingParenthesis = value.indexOf("(");
    const closingParenthesis = value.indexOf(")");

    if (openingParenthesis >= 0 && closingParenthesis === -1) {
      errors.push(new ValidationError(`Не закрыли скобку.`));
    }

    if (closingParenthesis >= 0 && openingParenthesis === -1) {
      errors.push(
        new ValidationError(
          `Есть закрывающая скобка, но нет открывающей скобки.`
        )
      );
    }

    if (
      openingParenthesis > closingParenthesis &&
      openingParenthesis >= 0 &&
      closingParenthesis >= 0
    ) {
      errors.push(
        new ValidationError(
          `Открывающая скобка должна идти раньше, чем закрывающая скобка.`
        )
      );
    }

    const newValue = Array.from(value)
      .filter(
        (_, index) =>
          index !== openingParenthesis && index !== closingParenthesis
      )
      .join("");

    return /[\(\)]+/g.test(newValue)
      ? this.parenthesesAreInCorrectOrder(newValue, errors)
      : errors.length > 0
      ? new ValidationError(errors.map((error) => error.getMessage()).join(" "))
      : null;
  }
}

/* TEST
const validParentheses = new ValidParentheses();
for (let value of ["H2SO4", "H2(O)2", ")H2", "(H2", "((H2", ")H2((", ""]) {
  let errors = validParentheses.validate(value);
  if (errors) {
    console.log(`Значение: ${value}, ошибки: ${errors.getMessage()}`);
  }
}
*/