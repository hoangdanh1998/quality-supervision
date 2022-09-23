interface IStep {
  name: string;
  requestData: IRequestData;
  outputExpected: IExpectOutput;
  responseData: IOutputData;
  stopOnError: boolean;
  endpoint: IEndpoint;
  
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
  opts: {
    initOpts: any;
    accumulation: IOptsField[];
  };
  args: any[];

  payload: object;
}

interface IOptsField {
  field: string;
  value: string | IOptsField;
  prefix: string;
}


interface IHeadersField {
  headerField: string;
  headerValue: string;
  headerPrefix: string;
}

interface IRestfulRequest {
  inputType: string;
  headers: { initHeaders: any; accumulation?: IHeadersField[] };
  payload: Object;
  prevStepValue: any;
  method: string;
}
