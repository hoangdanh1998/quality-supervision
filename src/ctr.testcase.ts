import { IStep } from "./interface/step.interface.js";
export const getTrailers: IStep = {
  name: "Socket get trailers",
  requestData: {
    requestType: "socket",
    socketRequest: {
      // url: "ws://etrailer-api-uat.cdaslink.sg",
      url: "ws://localhost:3030", 
      eventName: "find",
      args: ["trailers"],
      payload: {},
      opts: {
        initOpts: {},
        accumulation: [{field: 'query', value: { field: "token", prefix: "", value: "accessToken" }, prefix:''},],
      },
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
};

export const loginCTR: IStep = {
  name: "Login CTR",
  requestData: {
    requestType: "restful",
    restfulRequest: {
      url: "https://psa-ws-eservices-uat.cdaslink.sg/authentication",
      prevStepValue: [],
      headers: {
        initHeaders: {
          referer: "https://psa-portal-eservices-uat.cdaslink.sg/",
          origin: "https://psa-portal-eservices-uat.cdaslink.sg",
          "content-type": "application/json",
        },
        accumulation: [],
      },
      inputType: "body",
      method: "post",
      payload: {
        strategy: "local",
        email: "hungle@beeknights.com",
        password: "1234567!",
        device: {
          os: "computer",
          FCMId: "portal",
        },
        remember: true,
      },
    },
  },
  outputExpected: {
    type: "toBeDefined",
    expectValue: "",
    status: 200,
    resultField: "",
  },
  responseData: { setAccumulation: ["accessToken"] },
  stopOnError: true,
};
