import { ValidationError } from "../../../src/validation/ValidationError";
import { MinLineLength } from "../../../src/validation/validationRules/MinLineLength";


const validationDetails = {min: 5, fieldName: "test"};
const minLineLength: MinLineLength = new MinLineLength(validationDetails);

test('MinLineLength.validate() выдает ValidationError с корретным текстом, когда правило валидации нарушено.', () => {
    const value = "test";
    const error = new ValidationError(`Количество символов в строке (поле ${validationDetails.fieldName}) должно быть не меньше ${validationDetails.min}, у вас - ${Array.from(value).length}.`);

    const result = minLineLength.validate(value);
    expect(result).toEqual(error);
});

test('MinLineLength.validate() выдает null, когда значение проходит правило валидации.', () => {
    const value = "test5";
    const error = null;

    const result = minLineLength.validate(value);
    expect(result).toBe(error);
});