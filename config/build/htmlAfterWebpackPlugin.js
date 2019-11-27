
const pluginName = 'htmlAfterWebpackPlugin';

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
    let _html = '';
    console.log(arrs);

    for(let i=0;i<arrs.length;i++){
        _html += '<script src="' + arrs[i] + '"></script>';
    }

    return _html;
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