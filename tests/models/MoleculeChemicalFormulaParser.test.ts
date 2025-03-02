import { MoleculeChemicalFormulaParser } from "../../src/models/services/MoleculeChemicalFormulaParser";

const parser = new MoleculeChemicalFormulaParser();

test('MoleculeChemicalFormulaParser.parse() корректно парсит строки', () => {
    const testCases = [
        {formula: "H", expected: {H: 1}},
        {formula: "H2", expected: {H: 2}},
        {formula: "Na", expected: {Na: 1}},
        {formula: "Na2", expected: {Na: 2}},
        {formula: "NaCl", expected: {Na: 1, Cl: 1}},
        {formula: "H2OH", expected: {H: 3, O: 1}},
        {formula: "(H2)2", expected: {H: 4}},
        {formula: "H2(H2)2", expected: {H: 6}},
        {formula: "(H2)2H2(H2)2", expected: {H: 10}}
    ];
    
    for(let { formula, expected } of testCases) {
        expect(parser.parse(formula)).toEqual(expected);
    }
});

test('MoleculeChemicalFormulaParser.parse() выбрасывает исключение, если formula - пустое значение', () => {
    const formula = "";
    expect(() => parser.parse(formula)).toThrow(`'formula' не может быть пустой строкой.`);
});

test('MoleculeChemicalFormulaParser.parse() выбрасывает исключение, если formula не соответствует ожидаемой структуре (определенным регулярным выражениям)', () => {
    const formula = "H2(O2)123";
    expect(() => parser.parse(formula)).toThrow(`'formula' должна быть вида: H, H2, Na, Na2, NaCl, H2SO4, (N2O)3, (H2)2H2, H2(H2)2, (H2)2H2(H2)2, где вместо H, Na, N могут быть любые хим. элементы, а вместо цифр числа от 1 до 99.`);
});