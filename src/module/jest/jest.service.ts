import { ScenarioSchema } from './../../models/scenario.schema.js';
import { IScenario } from './../../interface/scenario.interface.js';

import BaseService from '../base/base.service.js';
import { IStep } from './../../interface/step.interface.js';
import ScenarioService from '../scenario/scenario.service.js';
import { createScenario, createStep } from './index.js';
export default class JestService { 
	scenarioService: ScenarioService;
	constructor() {
		this.scenarioService = new ScenarioService();
	}

	public async generateTestCode(scenarioId: string): Promise<any> { 
		const sc = await this.scenarioService._getAndPopulate(scenarioId, [{property: 'steps', getFields: []}]);
		let steps = '';
		sc.steps.forEach((step) => { 
			steps += createStep(step)
		});

		return createScenario(
			sc.name,
			steps
		  );
	}

}