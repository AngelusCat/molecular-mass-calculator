import { keyIsInObject, correctType, notEmptyValue } from "../../src/helpers/argumentChecks";

const variableName = "VariableNameTest";

test('keyIsInObject() не выбрасывает исключение', () => {
    const key = "test";
    const obj = {test: "test"};

    expect(() => keyIsInObject(key, obj, variableName)).not.toThrow();
});

test('keyIsInObject() выбрасывает исключение', () => {
    const key = "test";
    const obj = {example: "example"};

    expect(() => keyIsInObject(key, obj, variableName)).toThrow(`${variableName} обязан иметь ключ ${key}.`);
});

test('correctType() не выбрасывает исключение', () => {
    const value = "test";
    const type = "string";

    expect(() => correctType(value, type, variableName)).not.toThrow();
});

test('correctType() выбрасывает исключение', () => {
    const value = 5;
    const type = "string";

    expect(() => correctType(value, type, variableName)).toThrow();
});

test('notEmptyValue() не выбрасывает исключение', () => {
    const value = "test";

    expect(() => notEmptyValue(value, variableName)).not.toThrow();
});

test('notEmptyValue() выбрасывает исключение', () => {
    const value = "";

    expect(() => notEmptyValue(value, variableName)).toThrow(`${variableName} не может иметь пустое значение.`);
});