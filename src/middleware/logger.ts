export const logger = (request, response, next) => {
  console.log({body: request.body});
  console.log({query: request.query});
  console.log({params: request.params});
  next();
}
