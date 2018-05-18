import * as koa from 'koa';
import { join } from 'path';
const mwConfig = join(process.cwd(), 'config', 'middleware');
import { port, serviceDir, controllerDir, middlewareDir } from '../config/config';
import Router from './router/Router';
import MiddlewareLoader from './mwsLoader/lib/MwLoader';
export default class Server {
  app;
  defaultConfig;
  config;
  router;
  middleware;
  plugin;

  /**
   * @param listen : listen server port 
   */
  constructor(conf) {
    console.log(conf)
    if (!conf) {
      console.log(`nomi-core module need the config file of the application project!`);
      return;
    }
    if (conf.port && isNaN(conf.port)) {
      console.log(`app.listen must be a number!`);
      return;
    }
    const app = new koa.default();
    this.app = app;
    this._setDefaultConf(conf);
    this._startApp(); // start app 
    app.listen(Number(conf.port) || port); //listen port
  }
  async match(ctx, next) {
    const { action, paras } = this.router.match(ctx.request.url, ctx.request.method.toLocaleLowerCase());
    const { middleware, act } = action;
    // mwsLoader module handle global middlewares and local middlewares 
    await this.middleware.use(ctx, middleware, () => {
      //exec controller.action 
      act(ctx.request, ctx.response, {...ctx.request.query, ...paras}, ctx);
    });
    next();
  }
  /**
   * start application - precompile code
   */
   async _startApp() {
    const config = this._formateConfig(this._getDefaultConf());
    const router = await this._loadRouter(config);
    const mws = this._loadMw(mwConfig);
    this.app.use(this.match.bind(this)); // handle all middlewares
    this._setConfig({...this._getDefaultConf(), ...config});
    this._setRouter(router);
    this._setMws(mws); //gather middlewares 
    this._setPlugin(this._loadPlugin()); // gather plugins dependencies
    this._loadExe(); // exec the custom entry file
  }
  /**
   * all configuration files of the application formate to the configuration of the core-nomi module
   * @param config 
   */
  _formateConfig(config/*, logConfig, mwConfig, pluginConfig*/) {
    const servicePath = config.serviceDir || serviceDir;
    const controllerPath = config.controllerDir || controllerDir;
    return { servicePath, controllerPath };
  }
  _getDefaultConf() {
    return this.defaultConfig;
  }
  /** setter  */
  _setConfig(config) {
    this.config = config;
  }
  _setDefaultConf(conf) {
    this.defaultConfig = conf;
  }
  _setPlugin(plugin) {
    this.plugin = plugin;
  }
  _setRouter(router) {
    this.router = router;
  }
  _setMws(mws) {
    this.middleware = mws;
  }
  async _loadRouter(dirObj) {
    const router = await Router.init(dirObj);
    return router;
  }
  /**
   * exec the custom entry file
   */
  _loadExe() {}
  _loadMw(mwConfig) {
    const mwl = new MiddlewareLoader(mwConfig, this._getDefaultConf().middlewareDir || middlewareDir);
    return mwl;
  }
  _loadPlugin() { return {}}
};