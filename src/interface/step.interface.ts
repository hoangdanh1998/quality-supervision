interface IStep {
  name: string;
  requestData: IInputData;
  outputExpected: IExpectOutput;
  responseData: IOutputData;
  stopOnError: boolean;
  endpoint: IEndpoint;
  method: string;
}

interface IInputData {
  inputType: string;

  headers: any;
  payload: Object;
  prevStepValue: any;
}

interface IOutputData {
  setAccumulation: string[];
}
interface IEndpoint {
  url: string;
}

interface IExpectOutput {
  type: string;

  expectValue: any;

  resultField: any;
}
