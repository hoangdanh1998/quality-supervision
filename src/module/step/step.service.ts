
import { StepSchema } from '../../models/step.schema.js';
import BaseService from '../base/base.service.js';
import { IStep } from './../../interface/step.interface.js';
export default class StepService extends BaseService<IStep> { 
	constructor() {
		super('step', StepSchema)
	}
}