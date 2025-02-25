import { ValidationError } from "../validation/ValidationError";

export interface ValidationRule {
    validate(value: any): ValidationError|null;
}