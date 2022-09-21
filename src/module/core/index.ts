import FormData from "form-data";
import pathNpm from "path";
import fs from "fs";
import { execa, execaCommand, execaCommandSync } from "execa";
import * as template from "../../template/testCaseTemplate.js";
import { RequestType } from "../../constants/constant.js";

export default async function runTest() {
  try {
    // Create test
    const stepS1: IStep = {
      name: "API get token",
      requestData: {
        inputType: RequestType.FORM,
        headers: { payload: { Accept: "*/*" } },
        prevStepValue: null,
        payload: {
          strategy: "local",
          email: "hi@ftech.ltd",
          password: "123123123",
        },
      },

      outputExpected: {
        type: "toBeDefined",
        expectValue: null,
        resultField: "authentication",
      },
      responseData: { setAccumulation: ['accessToken', 'danh'] },
      stopOnError: true,
      endpoint: { url: "http://localhost:3030/authentication" },
      method: "post",
    };

    const stepS21: IStep = {
      name: "Fail to login",
      requestData: {
        inputType: "query",
        headers: { payload: { Accept: "*/*" } },
        prevStepValue: null,
        payload: {
          strategy: "local",
          email: "hi@ftech.ltd",
          password: "1123123123",
        },
      },

      outputExpected: {
        type: "toMatchObject",
        expectValue: {"message": "Thông tin đăng nhập không đúng"},
        resultField: "",
      },
      responseData: { setAccumulation: ["accessToken"] },
      stopOnError: true,
      endpoint: { url: "http://localhost:3030/authentication" },
      method: "post",
    };

    const stepS2: IStep = {
      name: "API get traders",
      requestData: {
        inputType: RequestType.QUERY,
        headers: {
          accumulation: [
            {
              headerField: "Authorization",
              headerValue: "accessToken",
              headerPrefix: "Bearer",
            },
          ],
          payload: {},
        },
        prevStepValue: ["token"],
        payload: null,
      },
      outputExpected: {
        type: "toBeDefined",
        expectValue: "",
        resultField: "data",
      },
      responseData: { setAccumulation: [] },
      stopOnError: true,
      endpoint: { url: "http://localhost:3030/trader" },
      method: "get",
    };

    const stepS22: IStep = {
      name: "API update trader fail authen",
      requestData: {
        inputType: RequestType.BODY,
        headers: {
          accumulation: [],
          payload: {},
        },
        prevStepValue: null,
        payload: null,
      },
      outputExpected: {
        type: "toBeDefined",
        expectValue: "",
        resultField: "data",
      },
      responseData: { setAccumulation: [] },
      stopOnError: true,
      endpoint: { url: "http://localhost:3030/trader/630dd7e6674c0c54111acbbe" },
      method: "put",
    };

    const stepS3: IStep = {
      name: "API create trader",
      requestData: {
        inputType: RequestType.BODY,
        headers: {
          accumulation: [
            {
              headerField: "Authorization",
              headerValue: "accessToken",
              headerPrefix: "Bearer",
            },
          ],
          payload: "",
        },
        prevStepValue: null,
        payload: {
          init_balance: 50,
          full_name: "Nguyen Hoang Danh",
          email: (() => {
            return generateString(11)+'@gmail.com';
          })(),
          telephone: (() => {
            return Math.floor(Math.random() * 1000000000);
          })(),
          secret_key:(() => {
            return generateString(11);
          })(),
          api_key:(() => {
            return generateString(11);
          })(),
          subscribed_callback: 
          (() => {
            return generateString(11);
          })()
        },
      },
      outputExpected: {
        type: "toBeDefined",
        expectValue: "",
        resultField: "_id",
      },
      responseData: { setAccumulation: [] },
      stopOnError: true,
      endpoint: { url: "http://localhost:3030/trader" },
      method: "post",
    };

    const step1 = createStep(stepS1);
    const step2 = createStep(stepS2);
    const step3 = createStep(stepS3);
    const step21 = createStep(stepS21);
    const step22 = createStep(stepS22);
    const scenario = createScenario(
      "Kịch bản 1",
      step1 + "\n" + step2 + "\n" + step3
    );

    const scenario2 = createScenario(
      "Kịch bản 2 lỗi đăng nhập",
      step21+ "\n" + step22
    );

    const fileTestContent = createProject("ProjectName", scenario+ "\n" + scenario2);
    // fs.writeFile("test/hoang-danh.spec.ts", fileTestContent, function (err) {
    //   if (err) throw err;
    //   console.log("Saved!");
    // });
  } catch (err) {
    console.log("📖 ~ file: index.ts ~ line 9 ~ runTest ~ err", err);
  }

  try {
    // Run test
    const result = await execaCommand("jest");
    console.log("📖 ~ file: index.ts ~ line 16 ~ runTest ~ result", result);
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

function createScenario(name, steps: string) {
  return template.scenario(name, steps);
}

function createStep(step: IStep) {
  const originPayload = step.requestData.payload ? step.requestData.payload : null;
  let headers = step.requestData.headers.payload;

  let prevPayloadValue = step.requestData.prevStepValue
    ? step.requestData.prevStepValue
    : null;
  let payload;
  if ( step.requestData.inputType === RequestType.FORM) {
    payload = new FormData();
    
    for (const property in originPayload) {
      payload.append(property, originPayload[property]);
    }

    headers = { ...headers, ...payload.getHeaders()};
  }


  if ( step.requestData.inputType === RequestType.BODY) { 
    payload = originPayload;
  }

  const request = template.request(
    step.endpoint.url,
    headers,
    step.method,
    payload,
    prevPayloadValue
  );

  let accumulation = "";

  if (step.responseData.setAccumulation.length) {
    step.responseData.setAccumulation.map((accumulate) => {
      accumulation += template.accumulation(accumulate);
    })
  }

  const expect = template.expect(
    step.outputExpected.resultField,
    step.outputExpected.expectValue,
    step.outputExpected.type
  );
  return template.step(step.name, request, expect, accumulation, 10000);
}


const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}