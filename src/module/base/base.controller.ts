import { IResponse } from "../../interface/response.interface.js";
import BaseControllerFunction from "./base.controller.function.js";
import BaseService from "./base.service.js";

export default class BaseController<T> extends BaseControllerFunction {
  service
  constructor(name, schema) {
    super();
		this.service = new BaseService<T>(name, schema);
	}
  createResponseSuccess(result: any) {
    return {
      status: 200,
      message: "Success",
      data: result,
    };
  }
  createResponseError(error: any) {
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


  public async create(param): Promise<IResponse> {
    const createDTO = param;
    // format, validate param
    return this.executeService(
      (createDto) => {
          return this.service._create(createDto);
      },
      createDTO
    );
  }

  public async get(id: string): Promise<IResponse> {
    return this.executeService(
      (id) => {
          return this.service._get(id);
      },
      id
    );
  }

  public async find(param: any): Promise<IResponse> {
    console.log("📖 ~ file: base.controller.ts ~ line 55 ~ BaseController<T> ~ find ~ param", param)
    return this.executeService(
      (param) => {
          return this.service._find(param);
      },
      param
    );
  }

  public async patch(id: string, param: any): Promise<IResponse> {
    return this.executeService(
      (id, param) => {
          return this.service._patch(id, param);
      },
      id,
      param
    );
  }

  //TODO update, patch, delete implement here
  
}
