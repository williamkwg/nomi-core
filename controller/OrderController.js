var  RequestMapping = require('../src/lib/router/Controller.js').RequestMapping;
var  Service = require('../src/lib/router/Service.js').Service;

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
        this.serviceInst.loadOrders()
    }

    @RequestMapping({path:"/order1",method:"get",middleware:['localC']})
    async index1(req,res,paras,ctx) {
        this.serviceInst.test()
    }
}

exports.OrderController = OrderController;
