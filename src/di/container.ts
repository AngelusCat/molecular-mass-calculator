import { Container } from "inversify";
import "reflect-metadata";
import { MoleculeChemicalFormulaParser } from "../models/services/MoleculeChemicalFormulaParser.js";
import { MoleculeController } from "../controllers/MoleculeController.js";
import { TYPES } from "./types.js";

const container = new Container();

container.bind<MoleculeController>(TYPES.MoleculeController).to(MoleculeController);
container.bind<MoleculeChemicalFormulaParser>(TYPES.MoleculeChemicalFormulaParser).to(MoleculeChemicalFormulaParser);

export {container};