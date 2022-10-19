import axios from 'axios';
import {describe, expect, it, beforeAll, afterAll} from '@jest/globals';
import io from "socket.io-client";


describe('[CTR]', () => {
		  
describe('[Trailer Master management]', () => {
	const accumulation = {};
    
		
  	it('Login CTR', async () => {
  		let result /** Variable naming */;
    let response /** Variable naming */;
    
  		
  		
        const headers = {"referer":"https://psa-portal-eservices-uat.cdaslink.sg/","origin":"https://psa-portal-eservices-uat.cdaslink.sg","content-type":"application/json"}
  
  
        const payload = {"strategy":"local","email":"hungle@beeknights.com","password":"1234567!","device":{"os":"computer","FCMId":"portal"},"remember":true} 
  
        response = await axios.post('https://psa-ws-eservices-uat.cdaslink.sg/authentication' ,payload ,{headers})
        result = response.data;
		  
      try {
        expect(result).toBeDefined();
      } catch(err) {
        console.log("Fail with response", response);
        throw err
      }
		  accumulation['accessToken'] = result.accessToken;
          
	}, 10000);
    

  	it('Socket get trailers', async () => {
  		let result /** Variable naming */;
    let response /** Variable naming */;
    
  		
  		const socket = io.connect("ws://localhost:3030",
      { 
        forceNew: true,
        reconnection: false,
        transports: ['polling'],
        query: { token: (' ' + accumulation['accessToken']).trim()},
      })
      
        response = await new Promise((resolve) => {
          socket.on("connect", async () => {
            await new Promise(() => {
              socket.emit('find', "trailers",{}, (err, data) => {
              if (err){
                resolve(err)
              }
              resolve(data)
              });
            });
          });
        }) as any; 
      socket.close();
        result = response.data;
		  
      try {
        expect(result).toBeDefined();
      } catch(err) {
        console.log("Fail with response", response);
        throw err
      }
		  
	}, 10000);
    
});

describe('[Kịch bản 2 lỗi đăng nhập]', () => {
	const accumulation = {};
    
		
});
});
	