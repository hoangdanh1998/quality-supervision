interface ITestProject {
  name: string;
  scenarios: IScenario[];
}

interface IScenario {
  name: string;
  status?: string;
  logs?: Object[];
  steps?: IStep[];
  owner?: string;
  preCondition: string;

}

interface IAuthenticate {
	scenario: IScenario;
	token: string;
}