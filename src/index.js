const http = require('http');

const request = require('./request');
const response = require('./response');
const context = require('./context');
const compose = require('./compose');

class Application {
  constructor() {
    this.middlewares = [];
  }

  use(cb) {
    this.middlewares.push(cb);
  }

  listen(...args) {
    const server = http.createServer(async (req, res) => {
      let ctx  = this.createCtx(req ,res);

      const cbs = this.compose(this.middlewares);

      await cbs(ctx);

      ctx.res.end(ctx.body);
    });

    server.listen(...args);
  }

  compose(middlewares) {
    return compose(middlewares);
  }

  createCtx(req, res) {
    let ctx = Object.create(context);

    ctx.request = Object.create(request);
    ctx.response = Object.create(response);

    ctx.request = req;
    ctx.response = res;

    ctx.req = ctx.request;
    ctx.res = ctx.response;

    return ctx;
  }
};

module.exports = Application;
