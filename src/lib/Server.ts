import * as koa from 'koa'
import { join } from 'path';
import { defaultConfI, logConfigI, mwConfigI, coreConfigI, routerI } from '../interface/interface'
const defaultConfig = require(join(process.cwd(), 'config', 'config.default')) // 应用的config
const mwConfig = require(join(process.cwd(), 'config', 'middleware'))
import { port, serviceDir, controllerDir, mwConf, middlewareDir } from '../config/config'
import { MiddlewareLoader } from './MiddlewareLoader';
export class Server {

  private app: object = Object.create({});
  private config: object = Object.create({});
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
    this.app = app;
  }
  /** getter 方法 */
  getApp() {
    return this.app;
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
  protected setConfig(config: object) {
    this.config = config;
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
    const config = this.formateConfig(defaultConfig);
    this.setConfig({...defaultConfig, ...config});
    const router = this.loadRouter(config);
    this.setRouter(router);
    const mws = this.loadMw(mwConfig);
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
    const controller = config.controllerDir || controllerDir;
    return { service, controller };
  }
  private loadRouter(dirObj: coreConfigI): routerI {
    return {
      match: () => {}
    } //加载第三方模块，获取coreService对象 含有 getServices方法 ---- 和第三方进行约定
  }
  private loadExe() {}
  private loadMw(mwConfig: mwConfigI = mwConf) {
    const mwl = new MiddlewareLoader(mwConfig, defaultConfig.middlewareDir || middlewareDir);
    return {

    }
  }
  private loadPlugin() { return {}}
};