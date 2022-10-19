
import ProjectRouter from "./project/index.js";
import StepRouter from "./step/index.js";
import ScenarioRouter from "./scenario/index.js";
import { auth } from "../middleware/authenticate.js";
export default function (app): void { 
  // ProjectsController
  app.use('/api/projects',auth, new ProjectRouter().router);
  app.use('/api/steps', new StepRouter().router);
  app.use('/api/scenarios', new ScenarioRouter().router);
}
