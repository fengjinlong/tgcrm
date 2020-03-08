import 'module-alias/register';
import Koa from 'koa';
import config from "./config";
import controllersInit from "./controllers";
import render from 'koa-swig';
import { wrap } from "co";
import serve from 'koa-static';
import errorHandler from "./middlewares/errorHandler";
const { error } = errorHandler;
import { configure, getLogger } from 'log4js';
const { viewDir, staticDir, port } = config;
const app = new Koa();
configure({
    appenders: { cheese: { type: 'file', filename: __dirname + '/logs/yd.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = getLogger('cheese');
app.context.logger = logger;
app.context.render = wrap(render({
    root: viewDir,
    autoescape: true,
    cache: 'memory',
    ext: 'html',
    writeBody: false
}));
app.use(serve(staticDir));
//容错处理中心
error(app);
//路由的注册中心
controllersInit(app);
app.listen(port, () => {
    console.log(`${port} 服务启动成功🍺`);
});
app.on("error", (err) => {
    logger.error(err);
})