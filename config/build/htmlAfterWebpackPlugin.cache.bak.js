
const pluginName = 'htmlAfterWebpackPlugin';

const range = ['runtime', 'vendor', 'index'];

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
		var jsMap = ${JSON.stringify(maps)},orders = ${JSON.stringify(range)};
		var createScript = function(content) {
            var scriptDom = document.createElement('script');
            scriptDom.innerHTML = content;
            document.body.appendChild(scriptDom);
        }
        var getScript = function(key) {
            axios.get(jsMap[key]).then(function(value) {
                localStorage.setItem(key, jsMap[key]);
                localStorage.setItem(jsMap[key], value.data);
                if(key === 'index'){
                    setTimeout(function(){
                        createScript(value.data);
                    },0);
                }else{
                    createScript(value.data);
                }
            });
        };
        var jsMapKeys = Object.keys(jsMap);
        for(var i=0;i<jsMapKeys.length;i++){
            var key = jsMapKeys[i];
            (function(vkey) {
                var val = localStorage.getItem(vkey);
                if (!val) {
                    getScript(vkey);
                } else {
                    if (val === jsMap[vkey]) {
                        var scriptValue = localStorage.getItem(jsMap[vkey]);
                        scriptValue && createScript(scriptValue);
                    } else {
                        localStorage.removeItem(val);
                        getScript(vkey);
                    }
                }
            }(key));
        }
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