"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// 容错处理
const errorHandler = {
  error(app) {
    // 500
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        // error logs pm2 logs
        ctx.logger.error(error);
        console.log(error);
        ctx.status = error.status || 500;
        ctx.body = error || '请求出错';
      }
    }); // 404

    app.use(async (ctx, next) => {
      await next();
      if (404 !== ctx.status) return;
      ctx.logger.error(ctx);
      ctx.status = 404;
      ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="http://yoursite.com/yourPage.html" homePageName="回到我的主页"></script>';
    });
  }

};
var _default = errorHandler;
exports.default = _default;