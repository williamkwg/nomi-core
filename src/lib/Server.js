import * as koa from 'koa';
import { join } from 'path';
const defaultConfig = require(join(process.cwd(), 'config', 'config.default')) // the defalut config of application
const mwConfig = require(join(process.cwd(), 'config', 'middleware'));
import { port, serviceDir, controllerDir, middlewareDir } from '../config/config';
import Router from './router/Router';
import MiddlewareLoader from './mwsLoader/lib/MwLoader';
export default class Server {
  app;
  config;
  router;
  middleware;
  plugin;

  /**
   * @param listen : listen server port 
   */
  constructor(listen) {
    const app = new koa.default();
    this.app = app;
    this._startApp(); // start app 
    app.listen(listen || port); //listen port 
  }
  match(ctx, next) {
    const { action, paras } = this.router.match(ctx.request.url, ctx.request.method.toLocaleLowerCase());
    const { middleware, controller, act } = action;
    // mwsLoader module handle global middlewares and local middlewares 
    this.middleware.use(this.app, middleware); 
    // exec controller.action 
    controller.act(ctx.request, ctx.response, {...ctx.request.query, ...paras}, ctx);
    console.log({...ctx.request.query, ...paras})
    next();
  }
  /**
   * start application - precompile code
   */
   async _startApp() {
    const config = this._formateConfig(defaultConfig);
    const router = await this._loadRouter(config);
    const mws = this._loadMw(mwConfig);
    this.app.use(this.match.bind(this)); // handle all middlewares
    this._setConfig({...defaultConfig, ...config});
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
  /** setter  */
  _setConfig(config) {
    this.config = config;
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
    const mwl = new MiddlewareLoader(mwConfig, defaultConfig.middlewareDir || middlewareDir);
    return mwl;
  }
  _loadPlugin() { return {}}
};