export const auth = (request, response, next) => {
	console.log(request.query);
	next();
  }
  