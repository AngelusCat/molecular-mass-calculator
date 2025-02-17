import { InvalidArgumentError } from "../../exceptions/InvalidArgumentError.js";
import { InvalidStringFormatError } from "../../exceptions/InvalidStringFormatError.js";
import { InvalidStateException } from "../../exceptions/InvalidStateException.js";
import { injectable } from "inversify";

@injectable()
export class MoleculeChemicalFormulaParser {
  /**
   * парсит химическую формулу молекулы
   * @param {string} formula примеры: H, H2, Na, Na2, H2SO4, H2SO4(H2O)2, (N2O)3, (H2)2H2SO4(H2)2
   * @returns {object} примеры: H -> {H:1}, H2 -> {H:2}, Na -> {Na:1}, Na2 -> {Na:2}, H2SO4 -> {H:2, S:1, O4}, H2SO4(H2O)2 -> {H:6, S:1, O:6}, (N2O)3 -> {N:6, O:3},
   * (H2)2H2SO4(H2)2 -> {H:10, S:1, O:4}
   */
  parse(formula: string) {
    if (!formula) {
      throw new InvalidArgumentError(`'formula' не может быть пустой строкой.`);
    }

    if (!this.#stringMatchesExpectationsAboutItsStructure(formula)) {
      throw new InvalidStringFormatError(
        `'formula' должна быть вида: H, H2, Na, Na2, NaCl, H2SO4, (N2O)3, (H2)2H2, H2(H2)2, (H2)2H2(H2)2, где вместо H, Na, N могут быть любые хим. элементы, а вместо цифр числа от 1 до 99.`
      );
    }

    return formula.includes("(")
      ? this.#parseStringContainingParentheses(formula)
      : this.#parseStringNotContainingParentheses(formula);
  }

  /**
   * парсит строку, содержащую химический элемент на химический элемент и его количество
   * @param {string} chemicalElementWithIndex примеры: H, H2, Na, Na2
   * @returns {object} примеры: H -> {H:1}, H2 -> {H:2}, Na -> {Na:1}, Na2 -> {Na:2}
   */
  #parseStringIntoChemicalElementAndIndex(chemicalElementWithIndex: string) {
    if (!chemicalElementWithIndex) {
      throw new InvalidArgumentError(`'formula' не может быть пустой строкой.`);
    }

    const argumentCheckingPattern: RegExp = /^[A-Z][a-z]?[1-9]{0,2}$/;

    if (!argumentCheckingPattern.test(chemicalElementWithIndex)) {
      throw new InvalidStringFormatError(
        `'chemicalElementWithIndex' должен иметь вид "хим.элемент, цифра от 1 до 99 или без цифры", примеры: H, H2, Na, Na2.`
      );
    }

    const matchChemicalElement = chemicalElementWithIndex.match(/[A-Z][a-z]?/);
    const matchIndex = chemicalElementWithIndex.match(/[1-9]{0,2}$/);

    if (matchChemicalElement === null) {
      throw new InvalidStateException(`matchChemicalElement не может быть null.`);
    }

    if (matchIndex === null) {
      throw new InvalidStateException(`matchIndex не может быть null.`);
    }

    const chemicalElement: string = matchChemicalElement[0];
    const index: number = Number(matchIndex[0] || 1);

    return {
      [chemicalElement]: index,
    };
  }

  /**
   * парсит химическую формулу молекулы, если она не содержит скобки
   * @param {string} formula примеры: H2SO4, H2O
   * @returns {object} примеры: H2SO4 -> {H:1, S:1, O:4}, H2O -> {H:2, O:1}
   */
  #parseStringNotContainingParentheses(formula: string) {
    if (!formula) {
      throw new InvalidArgumentError(`'formula' не может быть пустой строкой.`);
    }

    const argumentCheckingPattern = /^([A-Z][a-z]?[1-9]{0,2})+$/;

    if (!argumentCheckingPattern.test(formula)) {
      throw new InvalidStringFormatError(
        `'formula' не должна содержать скобки.`
      );
    }

    let parsedData: Record<string, number> = {};

    const parsingPattern = /[A-Z][a-z]?[1-9]?[0-9]?/g;

    const chemicalElements = formula.matchAll(parsingPattern);

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
   * @param {string} formula примеры: H2SO4(H2O)2, (N2O)3
   * @returns {object} примеры: H2SO4(H2O)2 -> {H:6, S:1, O:6}, (N2O)3 -> {N:6, O:3}
   */
  #parseStringContainingParentheses(formula: string) {
    if (!formula) {
      throw new InvalidArgumentError(`'formula' не может быть пустой строкой.`);
    }

    const argumentCheckingPattern1 =
      /^(\(([A-Z][a-z]?[1-9]{0,2})+\)[1-9]{1,2}([A-Z][a-z]?[1-9]{0,2})*)+$/;
    const argumentCheckingPattern2 =
      /^(([A-Z][a-z]?[1-9]{0,2})+\(([A-Z][a-z]?[1-9]{0,2})+\)[1-9]{1,2})+$/;

    if (
      !argumentCheckingPattern1.test(formula) &&
      !argumentCheckingPattern2.test(formula)
    ) {
      throw new InvalidStringFormatError(
        `'formula' должна содержать скобки, пример: (H2O)2, H2(H2)2, (H2)2H2, (H2)2H2(H2)2`
      );
    }

    const parsingPattern = /\([^()]+\)\d*|\w+/g;

    let partsOfFormula = [...formula.matchAll(parsingPattern)];

    return partsOfFormula
      .map((part) => {
        return part[0].includes("(")
          ? this.#parseStringEnclosedInParentheses(part[0])
          : this.#parseStringNotContainingParentheses(part[0]);
      })
      .reduce<Record<string, number>>((acc, obj: Record<string, number>) => {
        for (const key in obj) {
          if (acc[key]) {
            acc[key] += obj[key];
          } else {
            acc[key] = obj[key];
          }
        }
        return acc;
      }, {});
  }

  /**
   * парсит строки, которые заключены в скобки и имеют после скобок число
   * @param {string} formula примеры: (H2O)2 (часть от H2SO4(H2O)2)
   * @returns {object} примеры: (H2O)2 (часть от H2SO4(H2O)2) -> {H:4, O:2}
   */
  #parseStringEnclosedInParentheses(formula: string) {
    if (!formula) {
      throw new InvalidArgumentError(`'formula' не может быть пустой строкой.`);
    }

    const argumentCheckingPattern = /^\(([A-Z][a-z]?[1-9]{0,2})+\)[1-9]{1,2}$/;

    if (!argumentCheckingPattern.test(formula)) {
      throw new InvalidStringFormatError(
        `'formula' должна быть строкой вида - открывающая скобка, хим.элемент(ы) с цифрами или без, закрывающая скобка, коэффициент. Пример: (N2O)3, (NaCl)2.`
      );
    }

    const parsingPattern = /\((.*?)\)(\d+)$/;

    const partsOfFormula = formula.match(parsingPattern);

    if (partsOfFormula === null) {
      throw new InvalidStateException(`partsOfFormula не может быть null.`);
    }

    const contentsOfBrackets = partsOfFormula[1];
    const coefficient = Number(partsOfFormula[2]);

    /*
    (N2O)3 -> {N:2, O:1}
    */
    let parsedData: Record<string, number> =
      this.#parseStringNotContainingParentheses(contentsOfBrackets);

    /*
    (N2O)3 -> {N:6, O:3}
    */
    Object.keys(parsedData).forEach((chemicalElement) => {
      parsedData[chemicalElement] = parsedData[chemicalElement] * coefficient;
    });

    return parsedData;
  }

  /**
   * проверяет, соответствует ли строка ожиданиям парсера к ее структуре
   * @param {string} formula химическая формула молекулы
   * @returns {boolean}
   */
  #stringMatchesExpectationsAboutItsStructure(formula: string) {
    if (!formula) {
      throw new InvalidArgumentError(`'formula' не может быть пустой строкой.`);
    }

    //H, H2, Na, Na2, NaCl, H2SO4
    const pattern1 = /^([A-Z][a-z]?[1-9]{0,2})+$/;
    //(H2O)2, (H2)2, (H2)2H2(H2)2
    const pattern2 =
      /^(\(([A-Z][a-z]?[1-9]{0,2})+\)[1-9]{1,2}([A-Z][a-z]?[1-9]{0,2})*)+$/;
    //H2(H2O)2
    const pattern3 =
      /^(([A-Z][a-z]?[1-9]{0,2})+\(([A-Z][a-z]?[1-9]{0,2})+\)[1-9]{1,2})+$/;

    return (
      pattern1.test(formula) || pattern2.test(formula) || pattern3.test(formula)
    );
  }
}

/*TEST
let parser = new MoleculeChemicalFormulaParser();

try {
  for (let formula of [
    "H",
    "H2",
    "Na",
    "Na2",
    "H2SO4",
    "H2SO4(H2O)2",
    "(H2)2H2SO4(H2)2",
    "(H2O)2",
    "(H2O2",
    "(",
    ")",
    ")H2O2",
  ]) {
    console.log(`МОЛЕКУЛА: ${formula}`);
    console.log(parser.parse(formula));
  }
} catch (error) {
  console.log(`Ошибка: ${error.message}\nСтек: ${error.stack}`);
}
*/