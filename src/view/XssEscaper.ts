import { injectable } from "inversify";
import { InvalidArgumentError } from "../exceptions/InvalidArgumentError.js";
import { correctType } from "../helpers/argumentChecks.js";

@injectable()
export class XssEscaper {
    /**
     * Экранирует значение переменной, которая используется в html шаблоне (контексты: html содержимое и html атрибуты; использует по умолчанию двойное кодирование)
     * @param {string} suspiciousValue значение переменной, которая используется в html шаблоне
     * @returns {string} экранированое значение переменной, которая используется в html шаблоне
     */
    escapeHtml(suspiciousValue: string, doubleEncode: boolean = true): string {
        const unsafeCharactersPattern = /[&<>"']/g;

        correctType(suspiciousValue, "string", "suspiciousValue");

        let escaped = suspiciousValue.replace(unsafeCharactersPattern, (unsafeCharacter) => {
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
        return doubleEncode ? this.escapeHtml(escaped, false) : escaped;
    }
}