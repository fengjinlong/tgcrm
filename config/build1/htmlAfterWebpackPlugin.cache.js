
const pluginName = 'htmlAfterWebpackPlugin';

const range = [];

function sortByOrders(arrs) {
    arrs = arrs.sort((mapf, maps) => {
        let fIndex = 3, sIndex = 3;
        if (mapf.indexOf('runtime') > -1) {
            fIndex = 0;
        } else if (mapf.indexOf('vendor') > -1) {
            fIndex = 1;
        } else if (mapf.indexOf('index') > -1) {
        	fIndex = 2;
        }
        if (maps.indexOf('runtime') > -1) {
            sIndex = 0;
        } else if (maps.indexOf('vendor') > -1) {
            sIndex = 1;
        } else if (maps.indexOf('index') > -1) {
            sIndex = 2;
        }
        return fIndex > sIndex;
    });
    return arrs;
}

function cssHelp(arrs){
	let _cssHtml = '';
    //处理css
    for(let i=0;i<arrs.length;i++){
    	_cssHtml += '<link rel="stylesheet" type="text/css" href="' + arrs[i] + '"/>'
    }
    return _cssHtml;
}

function jsHelp(arrs){
    let maps = {};
    let reg= /.+\/((\w|-)+)\.((\w{5})\.)?\w+.js$/;
    let count = arrs.length;
    arrs = sortByOrders(arrs);
    arrs.forEach(arr => {
        let regRet = reg.exec(arr);
        if (regRet) {
            regRet = regRet[1];
            maps[regRet] = arr;
        }
    });

    console.log(Object.keys(maps));

    return `
	<script>
	(function(doc){
        var jsMap=${JSON.stringify(maps)},orders=${JSON.stringify(arrs)},_count=${count},_curc=0,_nodes = [];
        var createScript = function(cnt, index){
            var node = document.createElement('script');
            node.innerHTML = cnt;
            _nodes[index] = node;
            if(++_curc == _count){
                for(var i=0,len=_nodes.length;i<len;i++){
                    document.body.appendChild(_nodes[i]);
                }
            }
        }
        var getScript = function(key, index){
            axios.get(jsMap[key]).then(function(value){
                localStorage.setItem(key, jsMap[key]);
                localStorage.setItem(jsMap[key], value.data);
                createScript(value.data, index);
            });
        };
        var jsMapKeys = Object.keys(jsMap);
        for(var i=0;i<jsMapKeys.length;i++){
            var key = jsMapKeys[i];
            (function(vkey,_ind){
                var val = localStorage.getItem(vkey);
                if(!val){
                    flag = true;
                    getScript(vkey,_ind);
                }else{
                    if(val === jsMap[vkey]){
                        var scriptValue = localStorage.getItem(jsMap[vkey]);
                        scriptValue && createScript(scriptValue,_ind);
                    }else{
                        flag = true;
                        localStorage.removeItem(val);
                        getScript(vkey,_ind);
                    }
                }
            }(key,i));
        }
    })(window.document);
    </script>
    `;
}

class htmlAfterWebpackPlugin {
    apply(compiler) {
        compiler.plugin('compilation', (compilation) => {
        	compilation.plugin('html-webpack-plugin-before-html-processing',(data, cb) => {
        		let assets = data.assets;
        		let html = data.html;
        		html = html.replace("<!--injectcss-->", cssHelp(assets.css));
     			html = html.replace("<!--injectjs-->", jsHelp(assets.js));
     			data.html = html;
     			cb(null, data);
      		});
        });
    }
}
module.exports = htmlAfterWebpackPlugin;