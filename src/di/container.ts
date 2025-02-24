import { Container } from "inversify";
import { TYPES } from "./types.js";
import "reflect-metadata";
import { MoleculeChemicalFormulaParser } from "../models/services/MoleculeChemicalFormulaParser.js";
import { MoleculeController } from "../controllers/MoleculeController.js";
import { XssEscaper } from "../view/XssEscaper.js";
import { ViewRenderer } from "../view/ViewRenderer.js";
import { BaseController } from "../controllers/BaseController.js";

const container = new Container();

container.bind<MoleculeChemicalFormulaParser>(TYPES.MoleculeChemicalFormulaParser).to(MoleculeChemicalFormulaParser);
container.bind<MoleculeController>(TYPES.MoleculeController).to(MoleculeController);
container.bind<XssEscaper>(TYPES.XssEscaper).to(XssEscaper);
container.bind<ViewRenderer>(TYPES.ViewRenderer).to(ViewRenderer);
container.bind<BaseController>(TYPES.BaseController).to(BaseController);

export {container};