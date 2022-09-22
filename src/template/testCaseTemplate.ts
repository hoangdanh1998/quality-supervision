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

const scenario = (name, initVariables, beforeAll, afterAll, steps) => {
  return `
describe('[${name}]', () => {
	const accumulation = {};
    ${initVariables}
    ${beforeAll}
    ${afterAll}
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
		expect(result).${type}(${expectResult ? JSON.stringify(expectResult) : ""});`;

  return expectString;
};

const tryCatchExpression = (inTryExpression, inCatchExpression) => {
  return `
        try {
          ${inTryExpression}
        } catch (err) {
          ${inCatchExpression}
        }`;
};

const restfulRequest1 = (
  endpoint,
  headers,
  method,
  payload,
  payloadPrevValue
) => {
  let returnString = `const response = await axios.${method}('${endpoint}'`;

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
      headers.payload ? JSON.stringify(headers.payload) : JSON.stringify({})
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
        const response = await axios.${method}('${endpoint}' ${
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
          headers.payload ? JSON.stringify(headers.payload) : JSON.stringify({})
        }
  ${
    headers.accumulation
      ? headers.accumulation?.map((value) => {
          return `headers[\`${value.headerField}\`] = '${value.headerPrefix} ' +  accumulation['${value.headerValue}']
		`;
        })
      : ``
  }
  ${returnString} ,{headers}`;

  // if (headers) {
  //   let setupHeader = "";
  //   setupHeader += `const headers = ${
  //     headers.payload ? JSON.stringify(headers.payload) : JSON.stringify({})
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

const socketRequest = (socketName, eventName, args) => {
  return `
        const response = await new Promise( resolve => {
          ${socketName}.emit('${eventName}', ${args.map((arg) => {
    return `${JSON.stringify(arg)}`;
  })}, (data) => {
            resolve(data)
          });
        });`;
};

const socketConnect = (variable, url, query) => {
  return `${variable} = io.connect("${url}",
      { 
        forceNew: true,
        transports: ['polling'],
        ${query ? `query: + ${JSON.stringify(query)}` : ""}
      })`;
};

const socketCloseConnect = (variable) => {
  return `${variable}.close();`;
};

const accumulation = (fieldName) => {
  return `accumulation['${fieldName}'] = result.${fieldName};
          `;
};

const beforeAll = (expression) => {
  return `beforeAll((done) => {
      ${expression}
      done();
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
