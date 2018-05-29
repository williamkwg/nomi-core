var  RequestMapping = require('../src/lib/router/Controller.js').RequestMapping;
var  Service = require('../src/lib/router/Service.js').Service;
var pluginA = require('../src/lib/pluginLoader/PluginLoader').default.get('pluginA');

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
        pluginA.go('home');
        this.serviceInst.loadOrders();
    }

    @RequestMapping({path:"/order1",method:"get",middleware:['localC']})
    async index1(req,res,paras,ctx) {
        this.serviceInst.test();
    }
}

exports.OrderController = OrderController;
