var  Service =  require('../lib/router/Service.js').Service;

@Service('ddddddddd.Serm')
class Servicea{
    async index() {
        console.log(this.nuu.test());
    }
    test(){
        console.log("aaaaaaaaaaa");
    }
}

exports.Servicea = Servicea;