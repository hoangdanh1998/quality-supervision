import { StepSchema } from '../../models/step.schema.js';
import express  from 'express';
import { logger } from '../../middleware/logger.js';
import StepController from './step.controller.js';
import BaseRouter from '../base/base.router.js';

export default class StepRouter extends BaseRouter{
	constructor() {
		const controller = new StepController('step', StepSchema);
		super(controller);
	}
	
}
