"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _awilixKoa = require("awilix-koa");

var _dec, _dec2, _dec3, _dec4, _class, _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const ReactDomServer = require('react-dom/server'); // const serverEntry = require('./assets/server-entry.js').default


const serverEntry = require('../../../dist/assets/scripts/server-entry.js').default; // import serverEntry1 from '../../../dist/assets/scripts/server-entry.js'


console.log(serverEntry);
let IndexController = (_dec = (0, _awilixKoa.route)('/'), _dec2 = (0, _awilixKoa.route)('/index'), _dec3 = (0, _awilixKoa.route)('/login'), _dec4 = (0, _awilixKoa.GET)(), _dec(_class = _dec2(_class = (_class2 = class IndexController {
  constructor({
    indexService
  }) {
    this.indexService = indexService;
  }

  async index(ctx, next) {
    // const result: User = await this.indexService.getUser('0')
    // console.log(result.email)
    console.log('11111111111111111111111111111');
    let appString = ReactDomServer.renderToString(serverEntry('login'));
    console.log(appString); // ćšĺź1

    ctx.body = appString; // ctx.body = await ctx.render('index', { data: result.email });
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "index", [_dec3, _dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "index"), _class2.prototype)), _class2)) || _class) || _class);
exports.default = IndexController;