import { Document, Schema } from "mongoose";
import { IStep } from "../interface/step.interface.js";

export const StepSchema = new Schema<IStep>({
  name: { type: String, required: true },
  requestData: { type: Object, required: true },
  outputExpected: { type: Object, required: true },
  responseData: { type: Object, required: true },
});
