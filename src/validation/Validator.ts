import { injectable } from "inversify";
import { ValidationRule } from "../interfaces/ValidationRule.js";
import { ValidationError } from "./ValidationError.js";
import { ValidationErrorList } from "./ValidationErrorList.js";

@injectable()
export class Validator {
    /**
     * @property {object} rules
     * У нас есть validationTarget - объект, значения свойств которого будут проходить проверку на валидацию
     * Ключи rules - те свойства validationTarget, которые нужно валидировать
     * Значения rules - массивы объектом ValidationRule, которые должны применяться к значению соответствующего поля
     * Пример: {formula: "H2O"} -> {formula: [ValidationRule, ValidationRule]}
     */
    private rules: Record<string, Array<ValidationRule>>;

    constructor(rules: Record<string, Array<ValidationRule>>) {
        this.rules = rules;
    }

    /**
     * Применяет правила валидации к объекту
     * @param {object} validationTarget объект, к свойствам которого применяются соответствующие правила валидации, пример: {formula: "H2O"} 
     * @returns {ValidationErrorList} validationErrorList список ошибок валидации
     */
    validate(validationTarget: Record<string, any>): ValidationErrorList {
        const validationErrorList = new ValidationErrorList();

        for (let fieldName in this.rules) {
            const getterName = "get" + fieldName.charAt(0).toUpperCase() + fieldName.slice(1).toLowerCase();

            let value = (fieldName in validationTarget) ? validationTarget[fieldName] : (getterName in validationTarget) ? validationTarget[getterName]() : null;

            if (value === null) {
                continue;
            }

            this.rules[fieldName].forEach((validationRule) => {
                let validationResult = validationRule.validate(value);

                if (validationResult instanceof ValidationError) {
                    validationErrorList.add(fieldName, validationResult);
                }
            });
        }

        return validationErrorList;
    }
}

/* TEST
const string = new String({fieldName: "line"});
//const validationTarget = {getLine: () => {return "example"}};
const validationTarget = {getLine: () => {return 1}};
const rules = {line: [string]};
const validator = new Validator(rules);
const errList = validator.validate(validationTarget);
console.log(errList.isEmpty());
*/