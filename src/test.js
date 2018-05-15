var r = require("./lib/router/Router.js");
require("babel-polyfill");
async function test(){
    var router = await r.init({
        controllerPath:["/Controller/"],
        servicePath:["/services/"]
    });
    console.log(router.match('/user/12/order/12345','post'));
    var d = router.match('/user/12/order/12345','get').action.act("dd:ddddddddddddddd");

}

test();