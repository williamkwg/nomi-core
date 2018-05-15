exports.RequestMapping = function(){
    if(typeof(arguments[0])!=='function'){
        return function(){};
    }

}