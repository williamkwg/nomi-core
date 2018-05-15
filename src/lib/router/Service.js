exports.Service = function(){
    if(typeof(arguments[0])!=='function'){
        return function(){
            var a = arguments;
            if(arguments.length===3){
                a[2].writable = true;
            }
        };
    }
}