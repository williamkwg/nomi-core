export default class hello {
    constructor(options) {
      console.log(options)
      return async (ctx, next) => {
        console.log('Hello World');
        next();
        console.log('bye world');
      }
    }
};
  