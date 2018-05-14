import * as koa from 'koa'
import { join } from 'path';
const defaultConfig = require(join(process.cwd(), 'config', 'config.default')) // 应用的config
const mwConfig = require(join(process.cwd(), 'config', 'middleware'))
import { port, serviceDir, controllerDir, mwConf, middlewareDir } from '../config/config'
export class Server {
   app: object = Object.create({});
   config: object = Object.create({});
   router: object = Object.create({});
   middleware: object = Object.create({});
   plugin: object = Object.create({});

  /**
   * @param listen 服务监听的端口
   */
  constructor(listen) {
    const app = new koa();
    this.startApp(); // 启动app
    app.listen(listen || port); //监听端口
    this.app = app;
  }
  /**
   * 启动应用程序——相当于java预编译过程
   */
   startApp() {
    const config = this._formateConfig(defaultConfig);
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
  _formateConfig(config, logConfig, mwConfig, pluginConfig) {
    const service = config.serviceDir || serviceDir;
    const controller = config.controllerDir || controllerDir;
    return { service, controller };
  }
  /** setter 方法 */
  setConfig(config: object) {
    this.config = config;
  }
  setPlugin(plugin: object) {
    this.plugin = plugin;
  }
  setRouter(router: object) {
    this.router = router;
  }
  loadRouter(dirObj) {
    return {
      match: () => {}
    } //加载第三方模块，获取coreService对象 含有 getServices方法 ---- 和第三方进行约定
  }
   loadExe() {}
   loadMw(mwConfig) {
    const mwl = new MiddlewareLoader(mwConfig, defaultConfig.middlewareDir || middlewareDir);
    return {

    }
  }
   loadPlugin() { return {}}
};