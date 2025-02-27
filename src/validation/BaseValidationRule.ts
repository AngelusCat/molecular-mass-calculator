import { keyIsInObject, notEmptyValue, correctType } from "../helpers/argumentChecks";

export class BaseValidationRule {
    /**
     * Проверяет validationDetails на то, что объект содержит определенные ключи, эти ключи не имеют пустое значение и эти ключи имеют ожидаемый тип значения
     * @param {object} validationDetails 
     * @param {object} data содержит информацию в стиле "название ключа validationDetails - какой тип должно иметь значение, которое хранится под этим ключом", пример: {max: "number"} 
     * @returns {void} выдает исключение в случае непрохождения проверки
     */
    protected checkValidationDetails(validationDetails: Record<string, any>, data: Record<string, string>): void {
        for (let key in data) {
            keyIsInObject(key, validationDetails, key);
            notEmptyValue(validationDetails[key], key);
            correctType(validationDetails[key], data[key], key);
        }
    }
}