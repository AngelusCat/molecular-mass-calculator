import { Container } from "inversify";
import { TYPES } from "./types.js";
import "reflect-metadata";
import { MoleculeChemicalFormulaParser } from "../models/services/MoleculeChemicalFormulaParser.js";
import { MoleculeController } from "../controllers/MoleculeController.js";

const container = new Container();

container.bind<MoleculeChemicalFormulaParser>(TYPES.MoleculeChemicalFormulaParser).to(MoleculeChemicalFormulaParser);
container.bind<MoleculeController>(TYPES.MoleculeController).to(MoleculeController);

export {container};