const http = require('http');
class Application {

  constructor() {
    this.cb = () => {};
  }

  use(cb) {
    this.cb = cb;
  }

  listen(...args) {
    const server = http.createServer((req, res) => {
      this.cb(req, res);
      res.end('default end');
    }).listen(...args);
  }


}

// module.exports = Application;

let app = new Application();

app.use((req, res) => {
  res.end('hellowowlrd');
});

app.listen(3000);