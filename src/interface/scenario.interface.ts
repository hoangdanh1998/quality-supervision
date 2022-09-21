interface ITestProject {
  name: string;
  scenarios: [IScenario];
}

interface IScenario {
  name: string;
  status?: string;
  logs?: [Object];
  step?: [IStep];
  owner?: string;
}

interface IAuthenticate {
	scenario: IScenario;
	token: string;
}