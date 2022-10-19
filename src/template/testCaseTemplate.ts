const importLib = () => {
  const importString = `import axios from 'axios';
import {describe, expect, it, beforeAll, afterAll} from '@jest/globals';
import io from "socket.io-client";
`;
  return importString;
};

const project = (name, scenarios) => {
  return `
describe('[${name}]', () => {
		  ${scenarios}
});
	`;
};

const scenario = (name, initVariables, steps) => {
  return `
describe('[${name}]', () => {
	const accumulation = {};
    ${initVariables}
		${steps}
});`;
};

const step = (
  name,
  initVariables,
  tryCatchExpression,
  request,
  result,
  expect,
  accumulation,
  timeout
) => {
  return `
  	it('${name}', async () => {
  		${initVariables}
  		${tryCatchExpression}
  		${request}
      ${result}
		  ${expect}
		  ${accumulation}
	}, ${timeout});
    `;
};

const getResultFromResponse = (resultField) => {
  return `  result = response.data${resultField ? `.${resultField}` : ""};`;
};

const getResultFromError = (resultField) => {
  return `result = err.response${resultField ? `.${resultField}` : ""};`;
};

const getResultFromSocket = (resultField) => {
  return `  result = response${resultField ? `.${resultField}` : ""};`;
};

const expect = (expectResult, type) => {
  const expectString = `
      try {
        expect(result).${type}(${expectResult ? JSON.stringify(expectResult) : ""});
      } catch(err) {
        console.log("Fail with response", response);
        throw err
      }`;

  return expectString;
};

const tryCatchExpression = (inTryExpression, inCatchExpression) => {
  return `
        try {
          ${inTryExpression}
        } catch (err) {
          if (err.message.includes('ECONNREFUSED')) {
            throw err
          }
          ${inCatchExpression}
        }`;
};

const restfulRequest1 /** cũ rồi nhưng để từ từ xóa */ = (
  endpoint,
  headers,
  method,
  payload,
  payloadPrevValue
) => {
  let returnString = `response = await axios.${method}('${endpoint}'`;

  if (payload) {
    let setupPayload = "";
    setupPayload += `const payload = ${JSON.stringify(payload)};
		`;
    if (payloadPrevValue) {
      payloadPrevValue.map((value) => {
        setupPayload += `payload['${value}'] = accumulation['${value}'];
		`;
      });
    }
    returnString = setupPayload + returnString;
    returnString += `,payload`;
  }

  if (headers) {
    let setupHeader = "";
    setupHeader += `const headers = ${
      headers.initHeaders ? JSON.stringify(headers.initHeaders) : JSON.stringify({})
    };
		`;
    if (headers.accumulation) {
      headers.accumulation?.map((value) => {
        setupHeader += `headers[\`${value.headerField}\`] = '${value.headerPrefix} ' +  accumulation['${value.headerValue}'];
		`;
      });
    }
    returnString = setupHeader + returnString;
    returnString += `,{headers}`;
  }
  returnString += `)`;

  return returnString;
};

const restfulRequest = (
  endpoint,
  headers,
  method,
  payload,
  payloadPrevValue
) => {
  let returnString = `
        const payload = ${
          payload ? JSON.stringify(payload) : JSON.stringify({})
        } 
  ${
    payloadPrevValue
      ? payloadPrevValue.map((value) => {
          return `
        payload['${value}'] = accumulation['${value}']`;
        })
      : ``
  }
        response = await axios.${method}('${endpoint}' ${
    payload ? `,payload` : ""
  }`;

  // if (payload) {
  //   let setupPayload = "";
  //   setupPayload += `const payload = ${JSON.stringify(payload)};
  // 	`;
  //   if (payloadPrevValue) {
  //     payloadPrevValue.map((value) => {
  //       setupPayload += `payload['${value}'] = accumulation['${value}'];`;
  //     });
  //   }
  //   returnString = setupPayload + returnString;
  //   returnString += `,payload`;
  // }

  returnString = `
        const headers = ${
          headers.initHeaders ? JSON.stringify(headers.initHeaders) : JSON.stringify({})
        }
  ${
    headers.accumulation
      ? headers.accumulation?.map((value) => {
          return `headers[\`${value.headerField}\`] = ('${value.headerPrefix} ' +  accumulation['${value.headerValue}']).trim()
		`;
        })
      : ``
  }
  ${returnString} ,{headers}`;

  // if (headers) {
  //   let setupHeader = "";
  //   setupHeader += `const headers = ${
  //     headers.initHeaders ? JSON.stringify(headers.initHeaders) : JSON.stringify({})
  //   };
  // 	`;
  //   if (headers.accumulation) {
  //     headers.accumulation?.map((value) => {
  //       setupHeader += `headers[\`${value.headerField}\`] = '${value.headerPrefix} ' +  accumulation['${value.headerValue}'];
  // 	`;
  //     });
  //   }
  //   returnString = setupHeader + returnString;
  //   returnString += `,{headers}`;
  // }
  returnString += `)`;

  return returnString;
};

const socketRequest1 = (socketName, eventName, args) => {
  return `
        response = await new Promise((resolve, reject) => {
          ${socketName}.emit('${eventName}', ${args.map((arg) => {
    return `${JSON.stringify(arg)}`;
  })}, (err, data) => {
          if (err){
            reject(err)
          }
          resolve(data)
          });
        }) as any; `;
};
const socketRequest = (eventName, args) => {
  return `
        response = await new Promise((resolve) => {
          socket.on("connect", async () => {
            await new Promise(() => {
              socket.emit('${eventName}', ${args.map((arg) => {
                return `${JSON.stringify(arg)}`;})}, (err, data) => {
              if (err){
                resolve(err)
              }
              resolve(data)
              });
            });
          });
        }) as any; 
      `;
}

const socketConnect = (url, opts) => {
  return `const socket = io.connect("${url}",
      { 
        forceNew: true,
        reconnection: false,
        transports: ['polling'],
        ${exploreSocketOpts(opts)}
      })
      `;
};

const exploreSocketOpts = (socketOpts) => {

  let returnString = '';
  if (socketOpts.initOpts) {
    Object.keys(socketOpts.initOpts).map((key) => {
      returnString += `${key} : ${JSON.stringify(socketOpts.initOpts[key])},
          `
    })
  }

  // const options = [ { field: 'extraHeader', value: {field: 'Author', value: 'accessToken', prefix: 'bearer'}, prefix:'' }];
  
  for (const option of socketOpts.accumulation) {
    returnString += exploreObject(option);
  }
  
  return returnString;
}

const exploreObject = (option) => {

  if (typeof option.value === 'object') {
    return `${option.field}: { ${exploreObject(option.value)}},`;
  }

  if (typeof option.value === 'string') {
    return `${option.field}: ('${option.prefix} ' + accumulation['${option.value}']).trim()`;
  } 
}

const socketCloseConnect = () => {
  return `socket.close();`;
};

const accumulation = (fieldName) => {
  return `accumulation['${fieldName}'] = result.${fieldName};
          `;
};

const beforeAll = (expression) => {
  return `beforeAll((done) => {
      ${expression}
      
    });
        `;
};

const afterAll = (expression) => {
  return `afterAll((done) => {
      ${expression}
      done();
    });
        `;
};

//todo interface for variables
const initVariables = (variables: { name; value }[]) => {
  let returnInitVariables = ``;
  variables.map((variable) => {
    returnInitVariables += `let ${variable.name}${
      variable.value ? ` =${variable.value}` : ""
    };
    `;
  });
  return returnInitVariables;
};

export {
  project,
  initVariables,
  scenario,
  beforeAll,
  afterAll,
  step,
  restfulRequest,
  importLib,
  expect,
  accumulation,
  socketRequest,
  socketConnect,
  socketCloseConnect,
  getResultFromError,
  getResultFromResponse,
  getResultFromSocket,
  tryCatchExpression,
};
