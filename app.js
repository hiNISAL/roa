const Nia = require('./src');

let nia = new Nia();

function delay() {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
}


nia.use(async (ctx, next) => {
  ctx.body = 'hw';
  await next();
  ctx.body += '122'
});

nia.use(async ctx => {
  await delay();
  ctx.body += '呜呜呜';
});

nia.listen(3000);
