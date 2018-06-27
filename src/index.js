const http = require('http');

const compose = require('./compose');
const createCtx = require('./createContext');

class Application {
  constructor() {
    this.middlewares = [];
  }

  use(cb) {
    this.middlewares.push(cb);
  }

  listen(...args) {
    const server = http.createServer(async (req ,res) => {
      let ctx = this.createCtx(req, res);

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
    return createCtx(req, res);
  }
};

module.exports = Application;
