import { InvalidArgumentError } from "../../exceptions/InvalidArgumentError.js";
import { InvalidStringFormatError } from "../../exceptions/InvalidStringFormatError.js";

class MoleculeChemicalFormulaParser {
  /**
   * парсит химическую формулу молекулы
   * @param {string} formula примеры: H, H2, Na, Na2, H2SO4, H2SO4(H2O)2, (N2O)3, (H2)2H2SO4(H2)2
   * @returns {object} примеры: H -> {H:1}, H2 -> {H:2}, Na -> {Na:1}, Na2 -> {Na:2}, H2SO4 -> {H:2, S:1, O4}, H2SO4(H2O)2 -> {H:6, S:1, O:6}, (N2O)3 -> {N:6, O:3},
   * (H2)2H2SO4(H2)2 -> {H:10, S:1, O:4}
   */
  parse(formula) {
    if (!formula) {
      throw new InvalidArgumentError(`'formula' не может быть пустой строкой.`);
    }

    return /\(([A-Z][a-z]?[1-9]{0,2})+\)[1-9]{1,2}/.test(formula)
      ? this.#parseStringContainingParentheses(formula)
      : this.#parseStringNotContainingParentheses(formula);
  }

  /**
   * парсит строку, содержащую химический элемент на химический элемент и его количество
   * @param {string} chemicalElementWithIndex примеры: H, H2, Na, Na2
   * @returns {object} примеры: H -> {H:1}, H2 -> {H:2}, Na -> {Na:1}, Na2 -> {Na:2}
   */
  #parseStringIntoChemicalElementAndIndex(chemicalElementWithIndex) {
    const chemicalElement = chemicalElementWithIndex.match(/[A-Z][a-z]?/)[0];
    const index = Number(chemicalElementWithIndex.match(/[1-9]{0,2}$/)[0] || 1);

    return {
      [chemicalElement]: index,
    };
  }

  /**
   * парсит химическую формулу молекула, если она не содержит скобки
   * @param {string} formula примеры: H2SO4, H2O
   * @returns {object} примеры: H2SO4 -> {H:1, S:1, O:4}, H2O -> {H:2, O:1}
   */
  #parseStringNotContainingParentheses(formula) {
    if (!formula) {
      throw new InvalidArgumentError(`'formula' не может быть пустой строкой.`);
    }
    
    let parsedData = {};

    const chemicalElements = formula.matchAll(/[A-Z][a-z]?[1-9]?[0-9]?/g);

    for (const chemicalElem of chemicalElements) {
      const chemicalElementWithIndex =
        this.#parseStringIntoChemicalElementAndIndex(chemicalElem[0]);
      const [chemicalElement, count] = Object.entries(
        chemicalElementWithIndex
      )[0];

      /*
      ключ с именем chemicalElement в объекте parsedData => возвращает его текущее значение; затем прибавляет это значение к Number(count); иначе прибавляет к 0.
      */
      parsedData[chemicalElement] =
        (parsedData[chemicalElement] || 0) + Number(count);
    }

    return parsedData;
  }

  /**
   * парсит химическую формулу молекулы, если она содержит скобки
   * @param {string} chemicalFormulaOfMolecule примеры: H2SO4(H2O)2, (N2O)3
   * @returns {object} примеры: H2SO4(H2O)2 -> {H:6, S:1, O:6}, (N2O)3 -> {N:6, O:3}
   */
  #parseStringContainingParentheses(formula) {
    let partsOfFormula = [...formula.matchAll(/\([^()]+\)\d*|\w+/g)];

    return partsOfFormula
      .map((part) => {
        return part[0].includes("(")
          ? this.#parseStringEnclosedInParentheses(part[0])
          : this.#parseStringNotContainingParentheses(part[0]);
      })
      .reduce((acc, obj) => {
        for (const key in obj) {
          // Если ключ уже есть в итоговом объекте, добавляем значение
          if (acc[key]) {
            acc[key] += obj[key];
          } else {
            // Если ключа нет, добавляем его с текущим значением
            acc[key] = obj[key];
          }
        }
        return acc;
      }, {});
  }

  /**
   * парсит строки, которые заключены в скобки и имеют после скобок число
   * @param {string} chemicalFormula примеры: (H2O)2 (часть от H2SO4(H2O)2)
   * @returns {object} примеры: (H2O)2 (часть от H2SO4(H2O)2) -> {H:4, O:2}
   */
  #parseStringEnclosedInParentheses(formula) {
    if (!formula) {
      throw new InvalidArgumentError(`'formula' не может быть пустой строкой.`);
    }

    if (!/^\(([A-Z][a-z]?[1-9]{0,2})+\)[1-9]{1,2}$/.test(formula)) {
      throw new InvalidStringFormatError(
        `'formula' должна быть строкой вида - открывающая скобка, хим.элемент(ы) с цифрами или без, закрывающая скобка, коэффициент. Пример: (N2O)3, (NaCl)2.`
      );
    }

    const partsOfFormula = formula.match(/\((.*?)\)(\d+)$/);
    const contentsOfBrackets = partsOfFormula[1];
    const coefficient = Number(partsOfFormula[2]);

    /*
    (N2O)3 -> {N:2, O:1}
    */
    let parsedData =
      this.#parseStringNotContainingParentheses(contentsOfBrackets);

    /*
    (N2O)3 -> {N:6, O:3}
    */
    Object.keys(parsedData).forEach((chemicalElement) => {
      parsedData[chemicalElement] = parsedData[chemicalElement] * coefficient;
    });

    return parsedData;
  }
}

let parser = new MoleculeChemicalFormulaParser();

for (let key of [
  "H",
  "H2",
  "Na",
  "Na2",
  "H2SO4",
  "H2SO4(H2O)2",
  "(H2)2H2SO4(H2)2",
  "(H2O)2",
  "(",
  "()",
  ")"
]) {
  console.log(`МОЛЕКУЛА: ${key}`);
  console.log(parser.parse(key));
}
