import * as koa from 'koa'
import { defaultConfI, logConfigI, mwConfigI, coreConfigI } from '../interface/interface'
import * as defaultConfig from '../../config/config.default'
import { port, serviceDir } from '../config/config'
export class Server {

  private app: object = Object.create({});
  private config: object = Object.create({});
  private controller: object = Object.create({});
  private service: object = Object.create({});
  private router: object = Object.create({});
  private middleware: object = Object.create({});
  private plugin: object = Object.create({});

  /**
   * @param listen 服务监听的端口
   */
  constructor(listen: number = port) {
    const app = new koa();
    this.startApp(); // 启动app
    app.listen(listen); //监听端口
    this.setApp(app);
  }
  /** getter 方法 */
  getApp() {
    return this.app;
  }
  getController() {
    return this.controller;
  }
  getService() {
    return this.service;
  }
  getRouter() {
    return this.router;
  }
  gerMiddleware() {
    return this.middleware;
  }
  getPlugin() {
    return this.plugin;
  }
  getConfig() {
    return this.config;
  }
  /** setter 方法 */
  protected setService(service: object) {
    this.service = service;
  }
  protected setConfig(config: object) {
    this.config = config;
  }
  protected setApp(app: object) {
    this.app = app;
  }
  protected setController(controller: object) {
    this.controller = controller;
  }
  protected setMw(middleware: object) {
    this.middleware = middleware;
  }
  protected setPlugin(plugin: object) {
    this.plugin = plugin;
  }
  protected setRouter(router: object) {
    this.router = router;
  }

  /**
   * 启动应用程序——相当于java预编译过程
   */
  private startApp() {
    const config = this.formateConfig(defaultConfig.default);
    this.setConfig({...defaultConfig.default, ...config});
    this.setService(this.loadService(config.service)); //收集service对象 @service
    this.setController(this.loadController());// 收集controller对象 @controller 收集routers对象
    this.setMw(this.loadMw()); // 收集 中间件 对象
    this.setPlugin(this.loadPlugin()); // 收集 中间件 对象
    this.loadExe(); //加载自定义启动文件
  }
  /**
   * 将应用程序的所有配置文件  转化成  框架core 的 配置
   * @param config 
   * @param logConfig 
   * @param mwConfig 
   * @param pluginConfig 
   */
  private formateConfig(config: defaultConfI, logConfig?: logConfigI, mwConfig?: mwConfigI, pluginConfig ?:Object): coreConfigI {
    const service = config.serviceDir || serviceDir;
    const controller = config.controllerDir;
    return { service, controller };
  }
  private loadService(dir: Array<string> | string) {
    return {} //加载第三方模块，获取coreService对象 含有 getServices方法 ---- 和第三方进行约定
  }
  private loadController() { return {} }
  private loadExe() {}
  private loadMw() {return {}}
  private loadPlugin() { return {}}
};