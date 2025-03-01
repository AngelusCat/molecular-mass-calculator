import { ValidationError } from "../../../src/validation/ValidationError";
import { ValidParentheses } from "../../../src/validation/validationRules/ValidParentheses";

const validParentheses: ValidParentheses = new ValidParentheses();

test('ValidParentheses.validate() выдает null, когда значение проходит правило валидации.', () => {
    const value = "(test)";
    const error = null;

    const result = validParentheses.validate(value);
    expect(result).toBe(error);
});

test('ValidParentheses.validate() выдает ValidationError с корректным текстом, когда пользователь передает строку, в которой есть закрывающая скобка, но нет соответствующей ей открывающей.', () => {
    const value = "test)";
    const error = new ValidationError(`Есть закрывающая скобка, но нет открывающей скобки.`);

    const result = validParentheses.validate(value);
    expect(result).toEqual(error);
});

test('ValidParentheses.validate() выдает ValidationError с корректным текстом, когда пользователь передает строку, в которой открывающая скобка идет раньше закрывающей.', () => {
    const value = ")test(";
    const error = new ValidationError(`Открывающая скобка должна идти раньше, чем закрывающая скобка.`);

    const result = validParentheses.validate(value);
    expect(result).toEqual(error);
});

test('ValidParentheses.validate() выдает ValidationError с корректным текстом, когда пользователь передает строку, в которой есть открывающая скобка, но нет соответствующей ей закрывающей.', () => {
    const value = "(test";
    const error = new ValidationError(`Не закрыли скобку.`);

    const result = validParentheses.validate(value);
    expect(result).toEqual(error);
});