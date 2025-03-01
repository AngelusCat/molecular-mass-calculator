import { ValidationError } from "../../../src/validation/ValidationError";
import { NotBlank } from "../../../src/validation/validationRules/NotBlank";

const validationDetails = {fieldName: "test"}
const notBlank: NotBlank = new NotBlank(validationDetails);

test('NotBlank.validate() выдает ValidationError с корректным текстом, когда правило валидации нарушено.', () => {
    const value = "";
    const error = new ValidationError(`Значение поля ${validationDetails.fieldName} не может быть пустой строкой.`);

    const result = notBlank.validate(value);

    expect(result).toEqual(error);
});

test('NotBlank.validate() выдает null, когда значение проходит правило валидации.', () => {
    const value = "test";
    const error = null;

    const result = notBlank.validate(value);
    expect(result).toBe(error);
});