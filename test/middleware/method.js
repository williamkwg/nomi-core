export default class method {
    constructor(options) {
      return async (ctx, next) => {
        console.log(`请求${ctx}...`);
        next();
      }
    }
  };
  