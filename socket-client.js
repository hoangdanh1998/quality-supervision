import io from 'socket.io-client'

const socket = io.connect('http://localhost:3030', {
	forceNew: true,
	query: {
		token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJvYXQiOjE2NjA1NDk5ODksImlhdCI6MTY2MDU0OTk4OCwiZXhwIjoxNjYwNzIyNzg4LCJhdWQiOiJodHRwczovL3lvdXJkb21haW4uY29tIiwiaXNzIjoiZmVhdGhlcnMiLCJzdWIiOiI2MWEwOWM4OWIzNDk5ZjM4NDE1NmZlZTYiLCJqdGkiOiIwMmVlNjUwYS0yNjliLTQ4YTItYTQ5ZS0yOTE0N2ZmOTAwOTEifQ.dQLZG2vmu_swJztQZDHAlCShrCY_zh_wkhNT58Chdsk',
	}
});
console.log("📖 ~ file: socket-client.js ~ line 9 ~ socket", socket)

socket.on('connect', function(err) {
	console.log('connected');
	console.log(socket.connected);
	//
	// socket.emit('find', 'trader', {}, function(err, data) {
	// 	console.log('find', data);
	// })

})

socket.on('connect_error', function(err) {
	console.log(err);
	console.log('connected err');
})