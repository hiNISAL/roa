module.exports = (middlewares) => {
  return ctx => {

    function patch(i) {
      let fn = middlewares[i];

      if (!fn) {
        return Promise.resolve();
      }

      return Promise.resolve(fn(ctx, () => {
        return patch(i + 1);
      }));
    }

    return patch(0); 
  }
}