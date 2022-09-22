import axios from 'axios';
import {describe, expect, it, beforeAll, afterAll} from '@jest/globals';
import io from "socket.io-client";


describe('[ProjectName]', () => {
		  
describe('[Kịch bản 1]', () => {
	const accumulation = {};
    let socket /** Variable naming */;
    
    beforeAll((done) => {
      socket /** Variable naming */ = io.connect("ws://localhost:3030",
      { 
        forceNew: true,
        transports: ['polling'],
        query: + {"token":"my-token"}
      })
      done();
    });
        
    afterAll((done) => {
      socket.close();
      done();
    });
        
		
  	it('API get token', async () => {
  		let result /** Variable naming */;
    
  		
  		
        const headers = {"Accept":"*/*"}
  
  
        const payload = {"strategy":"local","email":"hi@ftech.ltd","password":"123123123"} 
  
        const response = await axios.post('http://localhost:3030/authentication' ,payload ,{headers})
        result = response.data.authentication;
		  
		expect(result).toBeDefined();
		  accumulation['accessToken'] = result.accessToken;
          accumulation['danh'] = result.danh;
          
	}, 10000);
    

  	it('API get traders', async () => {
  		let result /** Variable naming */;
    
  		
  		
        const headers = {}
  headers[`Authorization`] = 'Bearer ' +  accumulation['accessToken']
		,headers[`Authorization2`] = 'Beare2r ' +  accumulation['accessToken']
		
  
        const payload = {} 
  
        payload['token'] = accumulation['token'],
        payload['Token1'] = accumulation['Token1']
        const response = await axios.get('http://localhost:3030/trader'  ,{headers})
        result = response.data.data;
		  
		expect(result).toBeDefined();
		  
	}, 10000);
    

  	it('API create trader', async () => {
  		let result /** Variable naming */;
    
  		
  		
        const headers = {}
  headers[`Authorization`] = 'Bearer ' +  accumulation['accessToken']
		
  
        const payload = {"init_balance":50,"full_name":"Nguyen Hoang Danh","email":" OB9fDJDbfHP@gmail.com","telephone":44372448,"secret_key":" 5gz3JgaYEuM","api_key":" QYABJABDCIK","subscribed_callback":" YB4YB2tzXvb"} 
  
        const response = await axios.post('http://localhost:3030/trader' ,payload ,{headers})
        result = response.data._id;
		  
		expect(result).toBeDefined();
		  
	}, 10000);
    

  	it('API get traders by socket', async () => {
  		let result /** Variable naming */;
    
  		
  		
        const response = await new Promise( resolve => {
          socket.emit('find', "trader",{}, (data) => {
            resolve(data)
          });
        });
        result = response;
		  
		expect(result).toBeDefined();
		  
	}, 10000);
    
});

describe('[Kịch bản 2 lỗi đăng nhập]', () => {
	const accumulation = {};
    let socket /** Variable naming */;
    
    beforeAll((done) => {
      socket /** Variable naming */ = io.connect("ws://localhost:3030",
      { 
        forceNew: true,
        transports: ['polling'],
        query: + {"token":"my-token"}
      })
      done();
    });
        
    afterAll((done) => {
      socket.close();
      done();
    });
        
		
  	it('Fail to login', async () => {
  		let result /** Variable naming */;
    
  		
  		
        const headers = {"Accept":"*/*"}
  
  
        const payload = {"strategy":"local","email":"hi@ftech.ltd","password":"1123123123"} 
  
        const response = await axios.post('http://localhost:3030/authentication' ,payload ,{headers})
        result = response.data;
		  
		expect(result).toMatchObject({"message":"Thông tin đăng nhập không đúng"});
		  
	}, 10000);
    

  	it('API update trader fail authen', async () => {
  		let result /** Variable naming */;
    
  		
        try {
          
        const headers = {}
  
  
        const payload = {} 
  
        const response = await axios.put('http://localhost:3030/trader/630dd7e6674c0c54111acbbe'  ,{headers})
        } catch (err) {
          result = err.response.status;
        }
  		//Request
      //Result
		  
		expect(result).toBe(401);
		  
	}, 10000);
    
});
});
	