import { ValidationError } from "../../../src/validation/ValidationError";
import { MaxLineLength } from "../../../src/validation/validationRules/MaxLineLength"

const validationDetails = {max: 50, fieldName: "test"};
const maxLineLength: MaxLineLength = new MaxLineLength(validationDetails);

test('MaxLineLength.validate() выдает ValidationError с корретным текстом, когда правило валидации нарушено.', () => {
    const value = "testtesttesttesttesttesttesttesttesttesttesttesttesttesttest";
    const error = new ValidationError(`Количество символов в строке (поле ${validationDetails.fieldName}) должно быть не больше ${validationDetails.max}, у вас - ${Array.from(value).length}.`);

    const result = maxLineLength.validate(value);

    expect(result).toEqual(error);
});

test('MaxLineLength.validate() выдает null, когда значение проходит правило валидации.', () => {
    const value = "testtesttesttesttesttesttesttesttesttest";
    const error = null;

    const result = maxLineLength.validate(value);

    expect(result).toBe(error);
});