interface IStep {
  name: string;
  requestData: IRequestData;
  outputExpected: IExpectOutput;
  responseData: IOutputData;
  stopOnError: boolean;
  endpoint: IEndpoint;
  method: string;
}

interface IRequestData {
  requestType: string;
  restfulRequest?: IRestfulRequest;
  socketRequest?: ISocketRequest;
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

  status: number;
}

interface ISocketRequest {
  eventName: string;

  args: any[];
}

interface IRestfulRequest {
  inputType: string;
  headers: any;
  payload: Object;
  prevStepValue: any;
}