var  Service =  require('../src/lib/router/Service.js').Service;


@Service("service.orderService")
class OrderService{
    async loadOrders() {
        console.log('loader:: order');
        const pluginA = require('../src/lib/pluginLoader/PluginLoader').default.get('pluginA');
        pluginA.go('order');
    }
    test(){
        console.log("aaaaaaaaaaa");
        const pluginA = require('../src/lib/pluginLoader/PluginLoader').default.get('pluginA');
        pluginA.go('test');
    }
}

exports.OrderService = OrderService;