import { MoleculeChemicalFormulaParser } from "../../src/models/services/MoleculeChemicalFormulaParser";
import { Molecule } from "../../src/models/Molecule";

test('Molecule.calculateMolecularWeight() возвращает корректные значения', () => {
    const results = {
        H: {H: 1},
        H2: {H: 2},
        Na: {Na: 1},
        Na2: {Na: 2},
        NaCl: {Na: 1, Cl: 1},
        H2OH: {H: 3, O: 1},
        "(H2)2": {H: 4},
        "H2(H2)2": {H: 6},
        "(H2)2H2(H2)2": {H: 10}
    };
    
    jest.mock("../../src/models/services/MoleculeChemicalFormulaParser", () => {
        return {
            MoleculeChemicalFormulaParser: jest.fn().mockImplementation(() => {
                return {
                    parse: jest.fn((formula: keyof typeof results) => {
                        return results[formula] || null;
                    })
                }
            })
        }
    });
    
    const parser = new MoleculeChemicalFormulaParser();
    
    const testCases = [
        {formula: "H", expected: 1.008},
        {formula: "H2", expected: 2.016},
        {formula: "Na", expected: 22.99},
        {formula: "Na2", expected: 45.98},
        {formula: "NaCl", expected: 58.44},
        {formula: "H2OH", expected: 19.023},
        {formula: "(H2)2", expected: 4.032},
        {formula: "H2(H2)2", expected: 6.048},
        {formula: "(H2)2H2(H2)2", expected: 10.08}
    ];
    
    for(let { formula, expected } of testCases) {
        let molecule = new Molecule(parser, formula);
        expect(molecule.calculateMolecularWeight()).toEqual(expected);
    }
});