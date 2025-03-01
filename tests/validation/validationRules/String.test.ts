import { ValidationError } from "../../../src/validation/ValidationError";
import { String } from "../../../src/validation/validationRules/String";

const validationDetails = {fieldName: "test"};
const string = new String(validationDetails);

test('String.validate() выдает ValidationError с корретным текстом, когда правило валидации нарушено.', () => {
    const value = 5;
    const error = new ValidationError(`Поле ${validationDetails.fieldName} должно быть строкой.`);

    const result = string.validate(value);
    expect(result).toEqual(error);
});

test('String.validate() выдает null, когда значение проходит правило валидации.', () => {
    const value = "5";
    const error = null;

    const result = string.validate(value);
    expect(result).toBe(error);
});