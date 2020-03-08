const errorHandler = {
    error(app) {
        app.use(async (ctx, next) => {
            try {
                await next();
            } catch (error) {
                ctx.logger.error(error);
                ctx.status = error.status || 500;
                ctx.body = "❎ 项目出错";
            }
        });
        app.use(async (ctx, next) => {
            await next();
            if (404 !== ctx.status) {
                return;
            }
            ctx.status = 404;
            ctx.logger.error('出现一次 404');
            ctx.body = `<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="/" homePageName="回到我的主页"></script>`;
        });
    }
}
export default errorHandler;
