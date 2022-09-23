interface ITestProject {
  name: string;
  scenarios: IScenario[];
}

interface IScenario {
  name: string;
  socket
}

interface IAuthenticate {
	scenario: IScenario;
	token: string;
}