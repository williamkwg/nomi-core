export default class PluginA {
  constructor(options) {
    console.log(`plugin A : options`, options);
  }
  go(page) {
    console.log('server will redirect to page', page);
  }
}