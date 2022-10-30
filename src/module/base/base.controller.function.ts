import { IResponse } from "../../interface/response.interface.js";
import BaseService from "./base.service.js";

export default class BaseControllerFunction {
  createResponseSuccess(result: any) {
    return {
      status: 200,
      message: "Success",
      data: result,
    };
  }
  createResponseError(error: any) {
    console.log("📖 ~ file: base.controller.function.ts ~ line 13 ~ BaseControllerFunction ~ createResponseError ~ error", error)
    return {
      status: 500,
      message: error.message,
      data: null
    };
  }

  async executeService(serviceName, ...args) {
    try {
      const data = await serviceName(...args);
      return this.createResponseSuccess(data);
    } catch(error) {
      return this.createResponseError(error);
    }
  }

}
