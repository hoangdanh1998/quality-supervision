import { ScenarioSchema } from './../../models/scenario.schema.js';
import { IScenario } from './../../interface/scenario.interface.js';

import BaseService from '../base/base.service.js';
import { IStep } from './../../interface/step.interface.js';
export default class ScenarioService extends BaseService<IScenario> { 
	constructor() {
		super('scenario', ScenarioSchema)
	}


	
}