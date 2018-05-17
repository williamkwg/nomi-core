'use strict'
export const compose = (middleware) => {
  if (!Array.isArray(middleware)) throw new TypeError('the param called middleware must be an array!');
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be an fn');
  }
  return (context, next) => {
    let index = -1;
    let dispatch = i => {
      if (i <= index){ 
        return Promise.reject();
      }
      index = i; // use index to count number
      let fn = middleware[i];
      // the last function, to exec next
      if (i === middleware.length) { 
        fn = next;
      }
      try {
        return Promise.resolve(fn(context, () => {
          return dispatch(i + 1);
        }));
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return dispatch(0);
  }
}
