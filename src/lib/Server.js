import * as koa from 'koa';
import { join } from 'path';
const defaultConfig = require(join(process.cwd(), 'config', 'config.default')) // 应用的config
const mwConfig = require(join(process.cwd(), 'config', 'middleware'));
import { port, serviceDir, controllerDir, middlewareDir } from '../config/config';
import Router from './router'; 
import MiddlewareLoader from './lib/mwsLoader/lib/MwLoader';
export default class Server {
  app;
  config;
  router;
  middleware;
  plugin;

  /**
   * @param listen 服务监听的端口
   */
  constructor(listen) {
    const app = new koa();
    this.app = app;
    this._startApp(); // 启动app
    app.listen(listen || port); //监听端口
  }
  match(ctx, next) {
    const { middleware, controller, action } = this.router.match(ctx.request.url).action;
    this.middleware.use(this.app, middleware); // 流经 全局中间件 + 业务中间件 
    controller.action(ctx); // 执行action
    next();
  }
  /**
   * 启动应用程序——相当于java预编译过程
   */
   _startApp() {
    const config = this._formateConfig(defaultConfig);
    const router = this.loadRouter(config);
    const mws = this._loadMw(mwConfig);
    this.app.use(this.match); // 处理 业务流 中间件 
    this._setConfig({...defaultConfig, ...config});
    this._setRouter(router);
    this._setMws(mws); //收集中间件
    this._setPlugin(this._loadPlugin()); // 收集插件依赖
    this._loadExe(); //加载自定义启动文件
  }
  /**
   * 将应用程序的所有配置文件  转化成  框架core 的 配置
   * @param config 
   */
  _formateConfig(config/*, logConfig, mwConfig, pluginConfig*/) {
    const servicePath = config.serviceDir || serviceDir;
    const controllerPath = config.controllerDir || controllerDir;
    return { servicePath, controllerPath };
  }
  /** setter 方法 */
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
  _loadExe() {}
  _loadMw(mwConfig) {
    const mwl = new MiddlewareLoader(mwConfig, defaultConfig.middlewareDir || middlewareDir);
    return mwl;
  }
  _loadPlugin() { return {}}
};