import { IStep } from "./step.interface.js";

export interface ITestProject {
  name: string;
  scenarios: IScenario[];
}

export interface IScenario {
  name: string;
  steps: IStep[]
}

interface IAuthenticate {
	scenario: IScenario;
	token: string;
}