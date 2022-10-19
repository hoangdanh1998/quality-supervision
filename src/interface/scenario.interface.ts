export interface ITestProject {
  name: string;
  scenarios: IScenario[];
}

export interface IScenario {
  name: string;
  socket
}

interface IAuthenticate {
	scenario: IScenario;
	token: string;
}