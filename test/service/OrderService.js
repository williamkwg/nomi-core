var  Service = require('../../src/lib/router/Service.js').Service;

@Service("service.orderService")
class OrderService{
    async loadOrders() {
        console.log(this.test());
    }
    test(){
        console.log("aaaaaaaaaaa");
    }
}

exports.OrderService = OrderService;