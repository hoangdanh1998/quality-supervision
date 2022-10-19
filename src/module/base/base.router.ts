import express  from 'express';
import { logger } from '../../middleware/logger.js';

export default class BaseRouter {
	router = express.Router()
	constructor(controller: any) {
		this.router.get('/',logger, async (request, response) => {
			response.send(await controller.find({query: request.query, params: request.params}));
		});
		
		this.router.get('/:id', logger, async (request, response) => {
			response.send(await controller.get(request.params.id));
		});
		
		this.router.post('/', async (request, response) => {
			response.send(await controller.create(request.body));
		});
		
		this.router.put('/:id', logger, async (request, response) => {
			response.send(await controller.put(request.params.id));
		});
		
		this.router.patch('/:id', logger, async (request, response) => {
			response.send(await controller.patch(request.params.id, request.body));
		});
	}
	
}
