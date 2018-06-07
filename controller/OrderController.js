var  RequestMapping = require('../src/lib/router/Controller.js').RequestMapping;
var  Service = require('../src/lib/router/Service.js').Service;
var pluginLoader = require('../src/lib/pluginLoader/PluginLoader').default;
var Cookie = require('../src/lib/cookie/Cookies').default;
@RequestMapping({
    path:"/user/{userId:num}",
    method:"post",
    middleware:['localA']
})
class OrderController{

    @Service('service.orderService')
    serviceInst
    @RequestMapping({path:"/order/{type:num}",method:"get",middleware:['localB']})
    async index(req,res,paras,ctx) {
        pluginLoader.get('pluginA').go('home');
        //const cookie = pluginLoader.get('cookie', ctx, 'nomi');
        const cookie = new Cookie(ctx, 'nomi');
        cookie.set('myname', 'weiguo');
        await this.serviceInst.loadOrders();
        console.log(cookie.get('myname'));
        res.body = res.headerSent ? '响应头已发送' : '响应头未发送';
    }

    @RequestMapping({path:"/order1",method:"get",middleware:['localC']})
    async index1(req,res,paras,ctx) {
        const cookie = new Cookie(ctx, 'nomi');
        pluginLoader.get('pluginA').go('order1');
        console.log(cookie.get('myname'));
        this.serviceInst.test();
    }
}

exports.OrderController = OrderController;
