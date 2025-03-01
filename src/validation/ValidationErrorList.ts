import { ValidationError } from "./ValidationError.js";

export class ValidationErrorList {
    private errors: Record<string, Array<ValidationError>> = {};
    
    /**
     * Добавляет ошибку валидации в список ошибок валидации определенного поля, пример: <input name="age"> -> {age: [ValidationError, ValidationError]}
     * @param {string} fieldName название поля формы, над которым происходит валидация значения
     * @param {ValidationError} validationError ошибка валидации
     */
    add(fieldName: string, validationError: ValidationError): void {
        if (!this.errors[fieldName]) {
            this.errors[fieldName] = [];
        }
        
        this.errors[fieldName].push(validationError);
    }

    getListOfFieldErrors(fieldName: string): Array<ValidationError> {
        return this.errors[fieldName];
    }

    isEmpty(): boolean {
        return Object.keys(this.errors).length === 0;
    }

    getAll(): Record<string, Array<string>> {
        if (this.isEmpty()) {
            return {};
        }
        return Object.fromEntries(Object.entries(this.errors).map(([fieldName, validationErrors]) => [
            fieldName, validationErrors.map(validationError => validationError.getMessage()),
        ]));
    }
}

/* TEST
const errList = new ValidationErrorList();
const v1 = new ValidationError("1");
const v2 = new ValidationError("2");
const fieldName = "name";
errList.add(fieldName, v1);
console.log(errList.getListOfFieldErrors(fieldName));
errList.add(fieldName, v2);
console.log(errList.getListOfFieldErrors(fieldName));
*/