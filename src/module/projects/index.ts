import express  from 'express';
import ProjectsController from './projects.controller';

const router = express.Router()
const projectsController = new ProjectsController();

router.get('/projects', (request, response) => {
	response.send(projectsController.show({params: {request, response}}))
  });

export {router};