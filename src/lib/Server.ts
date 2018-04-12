import * as koa from 'koa'
import { defaultConfInter, logConfig, mwConfig } from '../interface/interface'
import * as defaultConfig from '../../config/config.default'
import { port } from '../config/config'
export class Server {
  app: Object;
  config: Object = {};
  constructor(listen: number = port) {
    const app = new koa();
    this.startApp();
    app.listen(listen);
    this.app = app;
  }
  startApp() {
    const config = this.config = this.formateConfig(defaultConfig.default);
    this.loadService(); //生成service对象 @service
    this.loadController();// 生成controller对象 @controller 生成routers对象 
    //this.loadTask(config.task); //生成task定时任务对象, 注册定时任务服务 //先不做  @task
    this.loadExe(); //加载自定义启动文件
  }
  formateConfig(config: defaultConfInter, logConfig?: logConfig, mwConfig?: mwConfig, pluginConfig ?:Object): Object {
    const service = config.serviceDir;
    const controller = config.controllerDir;
    return {
      service,
      controller
    };
  }
  loadService() {
  }
  loadController() {}
  loadExe() {}
};