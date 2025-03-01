import { ValidationError } from "../../../src/validation/ValidationError";
import { Regex } from "../../../src/validation/validationRules/Regex";

const validationDetails = {fieldName: "test", pattern: /^test$/, stringStructureHint: "stringStructureHintTest"};
const regex: Regex = new Regex(validationDetails);

test('Regex.validate() выдает ValidationError с корректным текстом, когда правило валидации нарушено.', () => {
    const value = "tEsT";
    const error = new ValidationError(`Значение поля ${validationDetails.fieldName} должно иметь следующую структуру: ${validationDetails.stringStructureHint}`);

    const result = regex.validate(value);
    expect(result).toEqual(error);
});

test('Regex.validate() выдает null, когда значение проходит правило валидации.', () => {
    const value = "test";
    const error = null;

    const result = regex.validate(value);
    expect(result).toBe(error);
});