import { XssEscaper } from "../../src/view/XssEscaper";

const xssEscaper: XssEscaper = new XssEscaper();
const suspiciousValue = "&<>\"'";

test('xssEscaper.escapeHtml() корректно заменяет опасные символы (&, <, >, \', ") на соответствующие HTML-сущности (двойное кодирование)', () => {
    const doubleEncode = true;
    const expected = "&amp;amp;&amp;lt;&amp;gt;&amp;quot;&amp;#x27;";

    const result = xssEscaper.escapeHtml(suspiciousValue, doubleEncode);
    expect(result).toBe(expected);
});

test('xssEscaper.escapeHtml() корректно заменяет опасные символы (&, <, >, \', ") на соответствующие HTML-сущности (без двойного кодирования)', () => {
    const doubleEncode = false;
    const expected = "&amp;&lt;&gt;&quot;&#x27;";

    const result = xssEscaper.escapeHtml(suspiciousValue, doubleEncode);
    expect(result).toBe(expected);
});