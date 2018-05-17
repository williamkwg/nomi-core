export default class localB {
  constructor(options) {
    return async (ctx, next) => {
      console.log('local B into');
      next();
      console.log('local B back');
    }
  }
};
