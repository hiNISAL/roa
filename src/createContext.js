const request = require('./request');
const response = require('./response');
const context = require('./context');

module.exports = (req, res) => {
  let ctx = Object.create(context);

  ctx.request = Object.create(request);
  ctx.response = Object.create(response);

  ctx.request.req = req;
  ctx.response.res = res;

  ctx.req = req;
  ctx.res = res;

  return ctx;
}
