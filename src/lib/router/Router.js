
/**
 * router - lantao.wang
 */
var sanner = require("./Scanner.js");
function each(a,cb){
    a = a||[];
    for(let i=0,l=a.length;i<l;i++){
        if(cb(a[i],i)===false){
            return ;
        }
    }
}

function toLst(o){
    var a = [];
    for(let i in o){
        a.push(o[i]);
    }
    return a;
}

//合并到树
function merge2Tree(s,action,tree){
    s = s.replace(/\s/g,"");
    var sa = s.split("/"),
        parasMap = {};
    if(!tree[sa.length]){
        tree[sa.length] = {};
    }
    tree = tree[sa.length];
    for(var i=1,l= sa.length-1;i<=l;i++){
        var cur = sa[i];
        if(/^\{\w+:\w+\}$/.test(cur)){
            cur = cur.replace(/\{|\}/g,"").split(":");
            parasMap[i] = cur[0];
            cur = cur[1]==='string'?'{string-pattern-nomi}':'{num-pattern-nomi}';
        }
        if(!tree[cur]){
            tree[cur] = i===l?{leaf:true,action:{},parasMap:parasMap}:{cs:{}};
        }
        if(i!==l) {
            if(!tree[cur].cs){
                tree[cur].cs = {};
            }
            tree = tree[cur].cs;
        }else{
            tree[cur].action[action.method] = action;
        }
    }
}

//生成树
function toTreeMap(a){
    var map = {},
        tree={},
        treeEmpty = true;
    each(a,function(e){
        if(/\{\w+:\w+\}/.test(e.path)){
            if(treeEmpty){
                treeEmpty = false;
            }
            merge2Tree(e.path,e,tree);
        }else{
            if(!map[e.path]){
                map[e.path] = {};
            }
            map[e.path][e.method] = e;
        }
    });
    return {
        map:map,
        tree:treeEmpty?null:tree
    };
}

//匹配url
function match(url,method,map,tree){
    if(!map&&!tree){
        throw Error("router module should be inited first before you use it!");
    }
    let mapRes = map[url];
    if(mapRes){
        return {action:(map[url]||{})[method]};
    }else if(tree){
        var ulst = url.split("/");
        tree = tree[ulst.length];
        if(tree){
            return backtrack(ulst,1,ulst.length-1,method,tree);
        }
    }
    throw Error("can't find url mapping action:"+url);
}

//生成可遍历分支
function genCadiates(str,cs){
    var branchs = [];
    if(cs[str]){
        branchs.push(str);
    }
    if(cs['{num-pattern-nomi}']&&!isNaN(str)){
        branchs.push('{num-pattern-nomi}');
    }
    if(cs['{string-pattern-nomi}']){
        branchs.push('{string-pattern-nomi}');
    }
    return branchs;
}

//parse parameters
function parseParas(url,map){
    var paras = {};
    for(var i in map){
        paras[map[i]] = url[i];
    }
    return paras;
}

//回溯
function backtrack(lst,cDeep,deep,method,tree){
    if(!tree){
        throw Error("");
    }
    var cs = tree,str = lst[cDeep];
    var cd = genCadiates(str,cs);
    for(let i=0,l = cd.length;i<l;i++){
        let treeNode = cs[cd[i]];
        if(cDeep==deep){
            if(treeNode.leaf){
                return treeNode.action[method]?{action:treeNode.action[method],paras:parseParas(lst,treeNode.parasMap)}:null;
            }else{
                throw Error("");
            }
        }else{
            return backtrack(lst,cDeep+1,deep,method,treeNode.cs)
        }
    }
    return null;
}


//存放全局数据
var gData = {
    //普通url
    map:null,
    //restfull url
    tree:null
};

//初始化
async function init(cfg){
    //生成actionMap
    let aLst = await sanner.scan(cfg);
    console.log(aLst);

    //生成树和图
    let res = toTreeMap(aLst);
    console.log(res);

    //缓存留作匹配时用
    gData.map = res.map;
    gData.tree = res.tree;

    return {
        match:function (url,method){
            return match(url,method,gData.map,gData.tree);
        }
    };
}


exports.init = init;