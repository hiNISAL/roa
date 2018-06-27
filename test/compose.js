async function fn1(next) {
  console.log('fn1');
  await next();
  console.log('fn1 end');
}

async function fn2(next) {
  console.log('fn2');
  await delay();
  await next();
  console.log('end fn2');
}

async function fn3() {
  console.log('fn3');
}

function delay() {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
}

function compose(middlewares) {
  return () => {

    function dispatch(i) {
      let fn = middlewares[i];

      if (!fn) {
        return Promise.resolve();
      }

      return Promise.resolve(fn(() => {
        return dispatch(i + 1);
      }));
    }

    dispatch(0); 
  }
}

const middlewares = [fn1, fn2, fn3];

let composed = compose(middlewares);
composed();
