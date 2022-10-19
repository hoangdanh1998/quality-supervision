
import { ScenarioSchema } from '../../models/scenario.schema.js';
import BaseRouter from '../base/base.router.js';
import ScenarioController from './scenario.controller.js';
export default class ScenarioRouter extends BaseRouter{
	constructor() {
		const controller = new ScenarioController('scenario', ScenarioSchema);
		super(controller);
	}
	
}


