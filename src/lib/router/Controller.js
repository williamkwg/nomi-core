exports.RequestMapping =  function RequestMapping(){
    if(typeof(arguments[0])!=='function'){
        return function(){};
    }

};