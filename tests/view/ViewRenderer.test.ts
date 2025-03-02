import { ViewRenderer } from "../../src/view/ViewRenderer";
import { FileReader } from "../../src/fileSystem/FileReader";
import { XssEscaper } from "../../src/view/XssEscaper";

jest.mock("../../src/fileSystem/FileReader", () => {
    return {
        FileReader: jest.fn().mockImplementation(() => {
          return {
            read: jest.fn().mockResolvedValue(`<p>{{ test }}</p>`)
          };
        })
    };
});

jest.mock("../../src/view/XssEscaper", () => {
    return {
        XssEscaper: jest.fn().mockImplementation(() => {
          return {
            escapeHtml: jest.fn().mockReturnValue(`&amp;amp;&amp;lt;&amp;gt;&amp;quot;&amp;#x27;`)
          };
        })
    };
});


const fileReader = new FileReader();
const xssEscaper = new XssEscaper();
const viewRenderer = new ViewRenderer(xssEscaper, fileReader);

test('ViewRenderer.render() корректно подставляет значение в соответствующий плейсхолдер шаблона', async () => {
    const templateName = "test";
    const variables = {test: "&<>\"'"};
    const result = await viewRenderer.render(templateName, variables);

    expect(result).toBe("<p>&amp;amp;&amp;lt;&amp;gt;&amp;quot;&amp;#x27;</p>");
});

test('ViewRenderer.render() выбрасывает исключение, если переменная в шаблоне есть, а в variables - нет', async () => {
    const templateName = "test";
    const variables = {};

    await expect(viewRenderer.render(templateName, variables)).rejects.toThrow(`variables обязан содержать свойство test`);
});

test('ViewRenderer.render() возвращает пустую строку, если {{ }} в шаблоне не содержит переменную', async () => {
    const localFileReader = {
        read: jest.fn().mockResolvedValue(`<p>{{  }}</p>`)
    };
    const localViewRenderer = new ViewRenderer(xssEscaper, localFileReader);
    
    const templateName = "test";
    const variables = {};
    const result = await localViewRenderer.render(templateName, variables);

    expect(result).toBe("<p></p>");
});