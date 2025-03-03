import path, { dirname } from "path";
import fs from "fs/promises";
import { FileReader } from "../../src/fileSystem/FileReader";

const testFilePath = path.join("testFiles", "fixtures", "test.html");
const testContent = "<p>{{ test }}</p>";

beforeAll(async () => {
    const dirPath = path.dirname(testFilePath);
    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(testFilePath, testContent, { encoding: 'utf8' });
});


afterAll(async () => {
    await fs.unlink(testFilePath);
    await fs.rm(path.dirname(testFilePath), { recursive: true, force: true });
    await fs.rm("testFiles", { recursive: true, force: true });
});

const fileReader = new FileReader();

test('FileReader.read() корректно читает содержимое тестового файла', async () => {
    await expect(fileReader.read(testFilePath)).resolves.toBe(testContent);
});

test('FileReader.read() выбрасывает исключение в случае ошибки', async () => {
    await expect(fileReader.read("unknown/path/to/file.html")).rejects.toThrow();
});