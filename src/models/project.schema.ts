import { Document, Schema } from "mongoose";
import { ITestProject } from "../interface/scenario.interface.js";

export const ProjectSchema = new Schema<ITestProject>({
  name: { type: String, required: true }
});
