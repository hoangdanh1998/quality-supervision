import { IScenario } from './../interface/scenario.interface.js';
import { Document, Schema } from "mongoose";

export const ScenarioSchema = new Schema<IScenario>({
  name: { type: String, required: true },
});
