var  RequestMapping = require('../lib/router/Controller.js').RequestMapping;
var  Service = require('../lib/router/Service.js').Service;

@RequestMapping({
    path:"/user/{userId:num}",
    method:"post",
    middleware:['md1',"md1"]
})
class OrderController{

    @Service('service.orderService')
    serviceInst

    @RequestMapping({path:"/order/{type:num}",method:"get",})
    async index(req,res,ctx,paras) {
        this.serviceInst.loadOrders()
    }

    @RequestMapping("/order/{type:num}")
    async index1(req,res,ctx,paras) {
        this.serviceInst.loadOrders()
    }
}

exports.OrderController = OrderController;
