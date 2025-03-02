import { ValidationError } from "../../src/validation/ValidationError";
import { ValidationErrorList } from "../../src/validation/ValidationErrorList";

const fieldName = "test";
const validationError = new ValidationError(`test`);

test('validationErrorList.add() добавляет ValidationError в свое поле для хранения ошибок валидации', () => {
    const validationErrorList = new ValidationErrorList();
    validationErrorList.add(fieldName, validationError);

    expect(validationErrorList).toEqual({errors: {test: [validationError]}});
});

test('validationErrorList.getListOfFieldErrors() возвращает ValidationError для конкретного поля', () => {
    const validationErrorList = new ValidationErrorList();
    validationErrorList.add(fieldName, validationError);

    expect(validationErrorList.getListOfFieldErrors(fieldName)).toEqual([validationError]);
});

test('validationErrorList.isEmpty() возвращает корректное значение, когда errors внутри validationErrorList пуст', () => {
    const validationErrorList = new ValidationErrorList();

    expect(validationErrorList.isEmpty()).toBe(true);
});

test('validationErrorList.isEmpty() возвращает корректное значение, когда errors внутри validationErrorList содержит ValidationError', () => {
    const validationErrorList = new ValidationErrorList();
    validationErrorList.add(fieldName, validationError);

    expect(validationErrorList.isEmpty()).toBe(false);
});

test('validationErrorList.getAll() возвращает пустой объект, если errors внутри validationErrorList пуст', () => {
    const validationErrorList = new ValidationErrorList();

    expect(validationErrorList.getAll()).toEqual({});
});

test('validationErrorList.getAll() возвращает объект вида "поле -> массив строк", когда errors внутри validationErrorList содержит ValidationError', () => {
    const validationErrorList = new ValidationErrorList();
    validationErrorList.add(fieldName, validationError);

    expect(validationErrorList.getAll()).toEqual({test: [`test`]});
});