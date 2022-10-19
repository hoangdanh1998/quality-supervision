import { IStep } from "../../interface/step.interface.js";
import { StepSchema } from "../step.schema.js";
import BaseRepository from "../../module/base/base.repository.js";


export default class StepRepository extends BaseRepository<IStep>{ 
	constructor() {
		super('step', StepSchema);
	}
}
