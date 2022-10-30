import { IResponse } from "../../interface/response.interface.js";
import BaseControllerFunction from "../base/base.controller.function.js";
import BaseController from "../base/base.controller.js";
import ScenarioService from '../scenario/scenario.service.js';
import JestService from "./jest.service.js";
export default class JestController extends BaseControllerFunction {

	service: JestService
	constructor() {
		super();
		this.service = new JestService();
	}
	public async generateTestCode(scenarioId: string): Promise<IResponse> {
		console.log("📖 ~ file: jest.controller.ts ~ line 13 ~ JestController ~ generateTestCode ~ scenarioId", scenarioId)
		return this.executeService(
			(id) => {
				return this.service.generateTestCode(id);
			},
			scenarioId
		  );
	}
}
