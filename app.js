const Nia = require('./src');

let nia = new Nia();

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

nia.use(async (ctx, next) => {
  ctx.body = 'hw';
  await next();
  ctx.body += '122'
});

nia.use(async ctx => {
  await sleep(2000);
  ctx.body += '呜呜呜';
});

nia.listen(3000);
