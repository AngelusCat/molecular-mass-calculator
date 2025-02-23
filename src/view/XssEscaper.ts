import { injectable } from "inversify";
import { InvalidArgumentError } from "../exceptions/InvalidArgumentError.js";

@injectable()
export class XssEscaper {
    /**
     * Экранирует значение переменной, которая используется в html шаблоне (контексты: html содержимое и html атрибуты)
     * @param {string} suspiciousValue значение переменной, которая используется в html шаблоне
     * @returns {string} экранированое значение переменной, которая используется в html шаблоне
     */
    escapeHtml(suspiciousValue: string): string {
        const unsafeCharactersPattern = /[&<>"']/g;

        if (typeof suspiciousValue !== "string") {
            throw new InvalidArgumentError(`suspiciousValue должен быть строкой.`);
        }

        return suspiciousValue.replace(unsafeCharactersPattern, (unsafeCharacter) => {
            switch(unsafeCharacter) {
                case '&':
                    return '&amp;';
                case '<':
                    return '&lt;';
                case '>':
                    return '&gt;';
                case '"':
                    return '&quot;';
                case "'":
                    return '&#x27;';
                default:
                    return unsafeCharacter;
            }
        });
    }
}