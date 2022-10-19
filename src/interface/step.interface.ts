export type IStep = {
  name: string;
  requestData: IRequestData;
  outputExpected: IExpectOutput;
  responseData: IOutputData;
  stopOnError: boolean;
}

type IRequestData = {
  requestType: RequestType;
  restfulRequest?: IRestfulRequest;
  socketRequest?: ISocketRequest;
}
interface IOutputData {
  setAccumulation: string[];
}

interface IExpectOutput {
  type: string;

  expectValue: any;

  resultField: any;

  status: number;
}

interface ISocketRequest {

  url: string;
  eventName: string;
  opts: {
    initOpts: any;
    accumulation?: IOptsField[];
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
  inputType: InputType;
  url: string;
  headers: { initHeaders: any; accumulation?: IHeadersField[] };
  payload: Object;
  prevStepValue: any;
  method: HttpMethod;
}

type HttpMethod = "get" | "post" | "put" | "patch"
type RequestType = "restful" | "socket"
type InputType = "body" | "query" | "form-data"