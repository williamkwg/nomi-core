var  Service =  require('../lib/router/Service.js').Service;

@Service('ddddddddd.Sern')
class Servicea{
    async index() {
        console.log(this.nuu.test());
    }
    test(){
        console.log("aaaaaaaaaaa");
    }
}

exports.Servicea = Servicea;