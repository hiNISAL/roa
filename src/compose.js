module.exports = (middlewares) => {
  return ctx => {

    function dispatch(i) {
      let fn = middlewares[i];

      if (!fn) {
        return Promise.resolve();
      }

      return Promise.resolve(fn(ctx, () => {
        return dispatch(i + 1);
      }));
    }

    return dispatch(0); 
  }
}