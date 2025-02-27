import { InvalidArgumentError } from "../exceptions/InvalidArgumentError.js";

/**
 * Проверяет, что объект содержит определенное свойство
 * @param {string} key имя свойства
 * @param {object} obj объект, который мы проверяем на наличие в нем свойста key 
 * @param {string} variableName имя переменной, в которой хранится объект
 * @returns {void} выдает исключение в случае непрохождения проверки
 */
export function keyIsInObject(key: string, obj: Record<string, any>, variableName: string): void {
    if (!(key in obj)) {
        throw new InvalidArgumentError(`${variableName} обязан иметь ключ ${key}.`);
    }
    return;
}

/**
 * Проверяет тип переменной
 * @param {any} value 
 * @param {string} type ожидаемый тип переменной
 * @param {string} variableName имя переменной, которая содержит значение value
 * @returns {void} выдает исключение в случае непрохождения проверки
 */
export function correctType(value: any, type: string, variableName: string): void {
    const primitives = new Set(["string", "number", "boolean", "bigint", "symbol", "undefined", "function"]);

    if (primitives.has(type)) {
        if (typeof value !== type) {
            throw new InvalidArgumentError(`${variableName} обязан иметь тип ${type}.`);
        }
        return;
    }

    const constructor = (globalThis as Record<string, any>)[type];
    
    if (!constructor) {
        throw new InvalidArgumentError(`Неизвестный тип: ${type}.`);
    }

    if (!(value instanceof constructor)) {
        throw new InvalidArgumentError(`${variableName} обязан быть экземпляром ${type}.`);
    }
}

/**
 * Проверяет, что значение не пустое
 * @param {any} value 
 * @param {string} variableName имя переменной, которая содержит значение value
 * @returns выдает исключение в случае непрохождения проверки
 */
export function notEmptyValue(value: any, variableName: string): void {
    if (!value) {
        throw new InvalidArgumentError(`${variableName} не может иметь пустое значение.`);
    }
    return;
}