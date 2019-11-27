"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = load;

var bodyParser = _interopRequireWildcard(require("koa-bodyparser"));

var render = _interopRequireWildcard(require("koa-swig"));

var serve = _interopRequireWildcard(require("koa-static"));

var _co = _interopRequireDefault(require("co"));

var _log4js = require("log4js");

var _path = require("path");

var _koa2ConnectHistoryApiFallback = require("koa2-connect-history-api-fallback");

var _config = _interopRequireDefault(require("../config"));

var _errorHandler = _interopRequireDefault(require("./errorHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  createContainer,
  Lifetime,
  asClass
} = require('awilix'); // IOC


const {
  loadControllers,
  scopePerRequest
} = require('awilix-koa'); // IOC


// 初始化IOC容器
const initIOC = app => {
  // 创建IOC的容器
  const container = createContainer(); // 每一次请求都是一个new model

  app.use(scopePerRequest(container)); // 装载所有的service(models), 并将services代码注入到controllers

  container.loadModules([(0, _path.resolve)(__dirname, '../service/*.ts'), (0, _path.resolve)(__dirname, '../util/SafeRequest.ts')], {
    // we want `TodosService` to be registered as `todosService`.
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: Lifetime.SCOPED
    }
  });
}; // 配置log


const initLog = app => {
  (0, _log4js.configure)({
    appenders: {
      cheese: {
        type: 'file',
        filename: (0, _path.resolve)(__dirname, '../logs/yd.log')
      }
    },
    categories: {
      default: {
        appenders: ['cheese'],
        level: 'error'
      }
    }
  });
  const logger = (0, _log4js.getLogger)('cheese');
  app.context.logger = logger; //错误处理

  _errorHandler.default.error(app);
}; // 配置渲染


const initRender = app => {
  //配置swig(前端模板)
  app.context.render = _co.default.wrap(render({
    root: _config.default.viewDir,
    autoescape: true,
    cache: 'memory',
    ext: 'html',
    varControls: ["[[", "]]"],
    //默认动态数据是{{}}，但是为了与vue区分开来，改为[[xxx]]
    writeBody: false
  })); //配置静态文件目录

  app.use(serve(_config.default.staticDir));
}; // 配置路由


const initController = app => {
  console.log(app); //注册所有路由

  app.use(loadControllers((0, _path.resolve)(__dirname, '../controller/*.ts'), {
    cwd: __dirname
  }));
  app.use((0, _koa2ConnectHistoryApiFallback.historyApiFallback)({
    index: '/',
    whiteList: ['/api']
  }));
};

function load(app) {
  app.use(bodyParser());
  initIOC(app);
  initLog(app);
  initController(app);
  initRender(app);
}