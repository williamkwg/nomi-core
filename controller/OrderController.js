var  RequestMapping = require('../src/lib/router/Controller.js').RequestMapping;
var  Service = require('../src/lib/router/Service.js').Service;
var pluginLoader = require('../src/lib/pluginLoader/PluginLoader').default;

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
        const cookie = new (require('../src/lib/cookie/Cookies').default)(ctx, 'nomi');
        cookie.set('name', 'weiguo');
        this.serviceInst.loadOrders();
        console.log(cookie);
    }

    @RequestMapping({path:"/order1",method:"get",middleware:['localC']})
    async index1(req,res,paras,ctx) {
        this.serviceInst.test();
    }
}

exports.OrderController = OrderController;
