import FormData from "form-data";
import pathNpm from "path";
import fs from "fs";
import { execa, execaCommand, execaCommandSync } from "execa";
import * as template from "../../template/testCaseTemplate.js";
import { InputType, RequestType } from "../../constants/constant.js";

export default async function runTest() {
  try {
    // Create test
    const signIn: IStep = {
      name: "API get token",
      requestData: {
        requestType: RequestType.RESTFUL,
        restfulRequest: {
          inputType: InputType.BODY,
      method: "post",

          headers: { initHeaders: { Accept: "*/*" } },
          prevStepValue: null,
          payload: {
            strategy: "local",
            email: "hi@ftech.ltd",
            password: "123123123",
          },
        },
      },

      outputExpected: {
        type: "toBeDefined",
        expectValue: null,
        status: 200,
        resultField: "authentication",
      },
      responseData: { setAccumulation: ["accessToken", "danh"] },
      stopOnError: true,
      endpoint: { url: "http://localhost:3030/authentication" },
    };

    const failToLogin: IStep = {
      name: "Fail to login",
      requestData: {
        requestType: RequestType.RESTFUL,
        restfulRequest: {
          inputType: InputType.BODY,
      method: "post",
      headers: { initHeaders: { Accept: "*/*" } },
          prevStepValue: null,
          payload: {
            strategy: "local",
            email: "hi@ftech.ltd",
            password: "1123123123",
          },
        },
      },

      outputExpected: {
        type: "toMatchObject",
        status: 200,
        expectValue: { message: "Thông tin đăng nhập không đúng" },
        resultField: "",
      },
      responseData: { setAccumulation: [] },
      stopOnError: true,
      endpoint: { url: "http://localhost:3030/authentication" },
    };

    const getTrader: IStep = {
      name: "API get traders",
      requestData: {
        requestType: RequestType.RESTFUL,
        restfulRequest: {
          inputType: InputType.QUERY,
      method: "get",
      headers: {
            accumulation: [
              {
                headerField: "Authorization",
                headerValue: "accessToken",
                headerPrefix: "",
              },
              {
                headerField: "Authorization2",
                headerValue: "accessToken",
                headerPrefix: "Beare2r",
              },
            ],
            initHeaders: {}, //TODO create interface
          },
          prevStepValue: ["token", "Token1"],
          payload: {},
        },
      },
      outputExpected: {
        type: "toBeDefined",
        expectValue: "",
        status: 200,
        resultField: "data",
      },
      responseData: { setAccumulation: [] },
      stopOnError: true,
      endpoint: { url: "http://localhost:3030/trader" },
    };

    const updateTrader: IStep = {
      name: "API update trader fail authenticate",
      requestData: {
        requestType: RequestType.RESTFUL,
        restfulRequest: {
          inputType: InputType.BODY,
      method: "put",
      headers: {
            accumulation: [],
            initHeaders: {},
          },
          prevStepValue: null,
          payload: {full_name: 'hoangdanh'},
        },
      },
      outputExpected: {
        type: "toBe",
        status: 401,
        expectValue: 401,
        resultField: "status",
      },
      responseData: { setAccumulation: [] },
      stopOnError: true,
      endpoint: {
        url: "http://localhost:3030/trader/630dd7e6674c0c54111acbbe",
      },
    };

    const createTrader: IStep = {
      name: "API create trader",
      requestData: {
        requestType: RequestType.RESTFUL,
        restfulRequest: {
          inputType: InputType.BODY,
          method: "post",
          headers: {
            accumulation: [
              {
                headerField: "Authorization",
                headerValue: "accessToken",
                headerPrefix: "Bearer",
              },
            ],
            initHeaders: "",
          },
          prevStepValue: null,
          payload: {
            init_balance: 50,
            full_name: "Nguyen Hoang Danh",
            email: (() => {
              return generateString(11) + "@gmail.com";
            })(),
            telephone: (() => {
              return Math.floor(Math.random() * 1000000000);
            })(),
            secret_key: (() => {
              return generateString(11);
            })(),
            api_key: (() => {
              return generateString(11);
            })(),
            subscribed_callback: (() => {
              return generateString(11);
            })(),
          },
        },
      },
      outputExpected: {
        type: "toBeDefined",
        expectValue: "",
        status: 200,
        resultField: "_id",
      },
      responseData: { setAccumulation: [] },
      stopOnError: true,
      endpoint: { url: "http://localhost:3030/trader" },
    };

    const createTraderBySocket: IStep = {
      name: "API create trader by socket",
      requestData: {
        requestType: RequestType.SOCKET,
        socketRequest: {
          opts: {
            initOpts: null,
            accumulation: [ { field: 'extraHeaders', value: {field: 'Authorization', value: 'accessToken', prefix: 'Bearer'}, prefix:'' },]
          },
          eventName: 'create',
          payload: {
            init_balance: 50,
            full_name: "Nguyen Hoang Danh",
            email: (() => {
              return generateString(11) + "@gmail.com";
            })(),
            telephone: (() => {
              return Math.floor(Math.random() * 1000000000);
            })(),
            secret_key: (() => {
              return generateString(11);
            })(),
            api_key: (() => {
              return generateString(11);
            })(),
            subscribed_callback: (() => {
              return generateString(11);
            })(),
          },
          args: ['trader']
        }
      },
      outputExpected: {
        type: "toBeDefined",
        expectValue: "",
        status: 200,
        resultField: "_id",
      },
      responseData: { setAccumulation: [] },
      stopOnError: true,
      endpoint: { url: "http://localhost:3030/trader" },
    };

    const getTraderSocket: IStep = {
      name: "API get traders by socket",
      requestData: {
        requestType: RequestType.SOCKET,
        socketRequest: {
          opts: {
            initOpts: null,
            accumulation: [ { field: 'extraHeaders', value: {field: 'Authorization', value: 'accessToken', prefix: 'Bearer'}, prefix:'' },]
          },
          eventName: 'find',
          args: ['trader'],
          payload: {}
        }
      },
      outputExpected: {
        type: "toBe",
        expectValue: 10,
        status: 200,
        resultField: "limit",
      },
      responseData: { setAccumulation: [] },
      stopOnError: true,
      endpoint: { url: "http://localhost:3030/trader" },
      method: "get",
    };


    const stepSignIn = createStep(signIn);
    const stepGetTrader = createStep(getTrader);
    const stepCreateTrader = createStep(createTrader);
    const stepFailToLogin = createStep(failToLogin);
    const stepUpdateTrader = createStep(updateTrader);
    const stepGetTraderSocket = createStep(getTraderSocket);
    const stepCreateTraderBySocket = createStep(createTraderBySocket);
    const sce1 = [stepSignIn,stepGetTrader, stepCreateTraderBySocket];
    const sce2 = [stepFailToLogin,stepUpdateTrader];
    const scenario = createScenario(
      "Kịch bản 1",
      sce1.join('\n')
    );

    const scenario2 = createScenario(
      "Kịch bản 2 lỗi đăng nhập",
      sce2.join('\n')
    );

    const fileTestContent = createProject(
      "ProjectName",
      scenario + "\n" + scenario2
    );

    //TODO naming file by format: 'projectname_datetime'
    fs.writeFile("test/hoang-danh.spec.ts", fileTestContent, function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  } catch (err) {
    console.log("📖 ~ file: index.ts ~ line 9 ~ runTest ~ err", err);
  }

  try {
    // Run test
    const result = await execaCommand("jest --detectOpenHandles /test");
    console.log("📖 ~ file: index.ts ~ line 16 ~ runTest ~ result", result.stderr);
  } catch (e) {
    console.log("📖 ~ file: main.js ~ line 17 ~ e", e);
  }

  const dir = pathNpm.resolve();
  // try {
  //   // Remove test
  //   glob(`${dir}/test/**/*.test.ts`, (err, files) => {
  //     files.map(async (file) => {
  //       console.log("file-log", file);
  //       await execaCommand(`rm -rf ${file}`);
  //     });
  //   });
  // } catch (err) {
  //   console.log("📖 ~ file: index.ts ~ line 25 ~ runTest ~ err", err);
  // }
}

function createProject(name, scenarios: string) {
  return template.importLib() + "\n" + template.project(name, scenarios);
}
/**
 * 
 * @param name 
 * @param steps 
 * @param preparation 
 * @returns 
 */
function createScenario(name, steps: string) { //TODO docs create socket in beforeAll
  return template.scenario(
    name,
    template.initVariables([]),
    steps
  );
}

function createStep(step: IStep) { //TODO refactor this function
  const initVariables = template.initVariables([{ name: "result /** Variable naming */", value: "" }, { name: "response /** Variable naming */", value: "" }]);

  let request = '';
  // Set restful request
  if (step.requestData.requestType === RequestType.RESTFUL) {
    const restfulRequest = step.requestData.restfulRequest;
    const originPayload = restfulRequest.payload
      ? restfulRequest.payload
      : null;
    let headers = restfulRequest.headers;

    let prevPayloadValue = restfulRequest.prevStepValue
      ? restfulRequest.prevStepValue
      : null;
    let payload;
    // SET request payload
    if (restfulRequest.inputType === InputType.FORM) {
      payload = new FormData();

      for (const property in originPayload) {
        payload.append(property, originPayload[property]);
      }

      headers = { ...headers, ...payload.getHeaders() };
    }

    if (restfulRequest.inputType === InputType.BODY) {
      payload = originPayload;
    }

    request = template.restfulRequest(
      step.endpoint.url,
      headers,
      step.requestData.restfulRequest.method,
      payload,
      prevPayloadValue
    );
  }

  // Set socket request
  if (step.requestData.requestType === RequestType.SOCKET) { 
    const socketConnect = template.socketConnect(
      "ws://localhost:3030",
      step.requestData.socketRequest.opts
    );
    const socketCloseConnect = template.socketCloseConnect();
    request = 
    socketConnect + 
    template.socketRequest( 
      step.requestData.socketRequest.eventName,
      [...step.requestData.socketRequest.args, step.requestData.socketRequest.payload], 
    ) + socketCloseConnect;
  }

  let tryCatchExpression = "";
  let result = "";
  let expect = "";  

  // Set result
  if (step.requestData.requestType === RequestType.RESTFUL) {
    result = template.getResultFromResponse(
      step.outputExpected.resultField
    );
  } else {
    result = template.getResultFromSocket(
      step.outputExpected.resultField
    );
  }

  if (step.requestData.requestType === RequestType.RESTFUL && step.outputExpected.status !== 200 /** TODO: 200 constant value and default if not set */) {
    const resultInCatch = template.getResultFromError( 
      step.outputExpected.resultField
    );
    tryCatchExpression = template.tryCatchExpression(request, resultInCatch);
  }



  expect = template.expect(step.outputExpected.expectValue, step.outputExpected.type);
  let accumulation = "";
  if (step.responseData.setAccumulation.length) {
    step.responseData.setAccumulation.map((accumulate) => {
      accumulation += template.accumulation(accumulate);
    });
  }

  return template.step(
    step.name,
    initVariables,
    tryCatchExpression,
    tryCatchExpression ? "//Request" : request,
    tryCatchExpression ? "//Result" : result,
    expect,
    accumulation,
    10000
  );
}

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  //TODO accept fn register from FE
function generateString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
