'use strict'
export const compose = middleware => {
  if (!Array.isArray(middleware)) throw new TypeError('the param called middleware must be an array!');
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be an fn');
  }
  return (context, cb) => {
    // use index to calculate the number of what the middleware exec next function
    let index = -1; 
    let dispatch = i => { 
      if (i <= index){ // to prevent the next function called multiple times
        return Promise.reject(new Error('next() called multiple times'));
      }
      index = i; 
      let fn = middleware[i];
      // when all the middleware has been called,  to exec next() as to callback()
      if (i === middleware.length) { 
        fn = cb; 
      }
      try {
        return Promise.resolve(fn(context, () => {
          return dispatch(i + 1);  // exec next function procedure
        }));
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return dispatch(0); // entry
  }
}
