import axios from 'axios';
import {describe, expect, it, beforeAll, afterAll} from '@jest/globals';
import io from "socket.io-client";


describe('[ProjectName]', () => {
		  
describe('[Kịch bản 1]', () => {
	const accumulation = {};
    let socket;
    let danh =JSON.stringify({ _id: "442"});
    
    beforeAll((done) => {
      socket = io.connect("ws://localhost:3030",
      { 
        forceNew: true,
        transports: ['polling'],
        query: 
          {"token":"my-token"}
      })
      done();
    });
        
    afterAll((done) => {
      socket.close();
      done();
    });
        
		
  	it('API get token', async () => {
  		let result;
    
  		
  		const headers = {"Accept":"*/*"};
		const payload = {"strategy":"local","email":"hi@ftech.ltd","password":"123123123"};
		const response = await axios.post('http://localhost:3030/authentication',payload,{headers})
		  
		result = response.data.authentication;
		expect(result).toBeDefined();
		  accumulation['accessToken'] = result.accessToken;
          accumulation['danh'] = result.danh;
          
	}, 10000);
    

  	it('API get traders', async () => {
  		let result;
    
  		
  		const headers = {};
		headers[`Authorization`] = 'Bearer ' +  accumulation['accessToken'];
		const response = await axios.get('http://localhost:3030/trader',{headers})
		  
		result = response.data.data;
		expect(result).toBeDefined();
		  
	}, 10000);
    

  	it('API create trader', async () => {
  		let result;
    
  		
  		const headers = {};
		headers[`Authorization`] = 'Bearer ' +  accumulation['accessToken'];
		const payload = {"init_balance":50,"full_name":"Nguyen Hoang Danh","email":" KCq2bmPROOE@gmail.com","telephone":522576650,"secret_key":" A6WXSfwFsR9","api_key":" rWXZ7HeLCt9","subscribed_callback":" RnyEC0txzCk"};
		const response = await axios.post('http://localhost:3030/trader',payload,{headers})
		  
		result = response.data._id;
		expect(result).toBeDefined();
		  
	}, 10000);
    

  	it('API get traders by socket', async () => {
  		let result;
        const response = await new Promise( resolve => {
			socket.emit('find', "trader",{}, (callback) => {
				resolve(callback)
			});
		});
		  console.log('response-log', response);
		result = response;
		expect(result).toBeDefined();
		  
	}, 10000);
    
});

describe('[Kịch bản 2 lỗi đăng nhập]', () => {
	const accumulation = {};
    let socket;
    let danh =JSON.stringify({ _id: "442"});
    
    beforeAll((done) => {
      socket = io.connect("ws://localhost:3030",
      { 
        forceNew: true,
        transports: ['polling'],
        query: 
          {"token":"my-token"}
      })
      done();
    });
        
    afterAll((done) => {
      socket.close();
      done();
    });
        
		
  	it('Fail to login', async () => {
  		let result;
    
  		
  		const headers = {"Accept":"*/*"};
		const payload = {"strategy":"local","email":"hi@ftech.ltd","password":"1123123123"};
		const response = await axios.post('http://localhost:3030/authentication',payload,{headers})
		  
		result = response.data;
		expect(result).toMatchObject({"message":"Thông tin đăng nhập không đúng"});
		  
	}, 10000);
    

  	it('API update trader fail authen', async () => {
  		let result;
    
  		
        try {
          const headers = {};
		const response = await axios.put('http://localhost:3030/trader/630dd7e6674c0c54111acbbe',{headers})
        } catch (err) {
          
		result = err.response.status;
		expect(result).toBe(401);
        }
  		
		  
		  
	}, 10000);
    
});
});
	