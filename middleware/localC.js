export default class localC {
  constructor(options) {
    return async (ctx, next) => {
      console.log('local C into');
      next();
      console.log('local C back');
    }
  }
};
