const importLib = () => {
  const importString = `import axios from 'axios';
import {describe, expect, it} from '@jest/globals';
import { Server } from 'socket.io';
import Client from 'socket.io-client';
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

const scenario = (name, steps) => {
  return `
describe('[${name}]', () => {
	const accumulation = {};
		${steps}
});`;
};

const step = (name, request, expect, accumulation, timeout) => {
  return `
  	it('${name}', async () => {
  		${request}
		${expect}
		${accumulation}
	}, ${timeout});
    `;
};

const expect = (resultField, expectResult, type) => {
	const expectedResult = JSON.stringify(expectResult); 
	const result = resultField ? `const result = response.data.${resultField};`: `const result = response.data;`;
	const expectString = `
		${result}
		expect(result).${type}(${expectResult ? JSON.stringify(expectResult) :'' });`;

	return expectString;
};

const request = (endpoint, headers, method, payload, payloadPrevValue) => {
  let returnString = `
		const response = await axios.${method}('${endpoint}'`;

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
    setupHeader += `const headers = ${headers ? JSON.stringify(headers) : JSON.stringify({})};
		`;
    if (headers) {

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

const accumulation = (fieldName) => {
	
  return `accumulation['${fieldName}'] = result.${fieldName};
        `;
};
export { project, scenario, step, request, importLib, expect, accumulation };
