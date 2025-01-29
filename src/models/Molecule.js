import { MoleculeChemicalFormulaParser } from "./services/MoleculeChemicalFormulaParser.js";
import { atomicMasses } from "./AtomicMasses.js";

export class Molecule {
  #formula;
  #parser;

  constructor(parser, formula) {
    this.#parser = parser;
    this.#formula = formula;
  }

  /**
   * считает молекулярную массу молекулы
   * @returns {number} молекулярная масса молекулы
   */
  calculateMolecularWeight() {
    let molecularWeight = 0;

    const chemicalElementsAndTheirQuantities = this.#parser.parse(
      this.#formula
    );

    for (const [chemicalElement, quantity] of Object.entries(
      chemicalElementsAndTheirQuantities
    )) {
      molecularWeight += atomicMasses[chemicalElement] * quantity;
    }

    return molecularWeight;
  }

  getFormula() {
    return this.#formula;
  }
}

/*TEST
const parser = new MoleculeChemicalFormulaParser();

for (const molecule of [
  new Molecule(parser, "H"),
  new Molecule(parser, "H2"),
  new Molecule(parser, "Na"),
  new Molecule(parser, "Na"),
  new Molecule(parser, "NaCl"),
  new Molecule(parser, "H2SO4"),
  new Molecule(parser, "(H2)2"),
  new Molecule(parser, "H2(H2)2"),
  new Molecule(parser, "(H2)2H2(H2)2"),
]) {
  console.log(`МОЛЕКУЛА: ${molecule.getFormula()}`);
  console.log(molecule.calculateMolecularWeight());
}
*/