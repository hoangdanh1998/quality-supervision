import { StepSchema } from '../../models/step.schema.js';
import ProjectController from './project.controller.js';
import { ProjectSchema } from '../../models/project.schema.js';
import BaseRouter from '../base/base.router.js';
export default class ProjectRouter extends BaseRouter{
	constructor() {
		const controller = new ProjectController('project', ProjectSchema);
		super(controller);
	}
	
}
