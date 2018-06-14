import * as koa from 'koa';
import { join } from 'path';
const mwConfig = require(join(process.cwd(), 'config', 'middleware'));
import { port, serviceDir, controllerDir, middlewareDir, defaultLog } from '../config/config';
import Router from 'nomi-router';
import logger from 'nomi-logger';
import MiddlewareLoader from 'nomi-mwloader';
export default class Server {
  app;
  defaultConfig;
  config;
  router;
  middleware;
  logger;
  SysLogger;
  

  /**
   * @param listen : listen server port 
   */
  constructor(conf) {
    if (!conf) {
      console.log(`nomi-core module need the config file of the application project!`);
      return;
    }
    this._initLogger({ ...config.log , ...defaultLog });
    if (conf.port && isNaN(conf.port)) {
      this.SysLogger.ERROR("date is {}, app.listen must be a number!", new Date());
      return;
    }
    const app = new koa.default();
    this.app = app;
    this._setDefaultConf(conf);
    this._startApp(); // start app 
    app.listen(Number(conf.port) || port); //listen port
  }
  _initLogger(config) {
    const { SysLogger, Logger } = logger.init(config);
    this.SysLogger = SysLogger; // logger instance for system
    this.logger = Logger; // logger instance for user
  }
  async match(ctx, next) {
    const { action, paras } = this.router.match(ctx.request.url, ctx.request.method.toLocaleLowerCase());
    const { middleware, act } = action;
    const params = {...ctx.request.query, ...paras};
    let startTime = null;
    if (this.config.log.user.requestLog) {
      startTime = new Date();
      this.logger.INFO("date is {}, request[{}][{}] start, params is {}", startTime , ctx.url, ctx.method, params);
    }
    // mwsLoader module handle global middlewares and local middlewares
    await this.middleware.use(ctx, middleware, () => {
      //exec controller.action 
      act(ctx.request, ctx.response, params, ctx);
    });
    next();
    if (this.config.log.user.requestLog) {
      const endTime = new Date();
      this.logger.INFO("date is {}, request[{}][{}] end, request take {} milliseconds", endTime, ctx.url, ctx.method, (endTime.getTime() - startTime.getTime()));
    }
  }
  /**
   * start application - precompile code
   */
   async _startApp() {
    this.SysLogger.INFO("date is {}, application start!", new Date());
    const config = this._formateConfig(this._getDefaultConf());
    const router = await this._loadRouter(config);
    this.SysLogger.INFO("date is {}, the router module loaded", new Date());
    const mws = this._loadMw();
    this.SysLogger.INFO("date is {}, the middlewares module loaded", new Date());
    this.app.use(this.match.bind(this)); // handle all middlewares
    this._setConfig({...this._getDefaultConf(), ...config});
    this._setRouter(router);
    this._setMws(mws); //gather middlewares 
    // this._setPlugin(this._loadPlugin()); // gather plugins dependencies
    this._loadExe(); // exec the custom entry file
  }
  /**
   * all configuration files of the application formate to the configuration of the core-nomi module
   * @param config 
   */
  _formateConfig(config) {
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
  _loadMw() {
    const mwl = new MiddlewareLoader(mwConfig(this.app), this._getDefaultConf().middlewareDir || middlewareDir);
    return mwl;
  }
};