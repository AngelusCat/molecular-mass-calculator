import { ValidationError } from "../../src/validation/ValidationError";
import { ValidationErrorList } from "../../src/validation/ValidationErrorList";
import { Validator } from "../../src/validation/Validator";
import { NotBlank } from "../../src/validation/validationRules/NotBlank";

const validationDetails = {fieldName: "test"}
const rules = {test: [new NotBlank(validationDetails)]};
const validator = new Validator(rules);

test('Validator.validate() возвращает пустой ValidationErrorList, когда validationTarget проходит валидацию', () => {
    const validationTarget = {test: "test"};
    const validationErrorList = new ValidationErrorList();

    const result = validator.validate(validationTarget);
    expect(result).toEqual(validationErrorList);
});

test('Validator.validate() возвращает ValidationErrorList с соответствующей ValidationError, когда validationTarget не проходит валидацию', () => {
    const validationTarget = {test: ""};
    const validationErrorList = new ValidationErrorList();
    validationErrorList.add("test", new ValidationError(`Значение поля ${validationDetails.fieldName} не может быть пустой строкой.`));

    const result = validator.validate(validationTarget);
    expect(result).toEqual(validationErrorList);
});