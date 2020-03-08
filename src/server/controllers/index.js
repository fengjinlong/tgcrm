import router from 'koa-simple-router';
const {
    Readable
} = require('stream')
const ReactDomServer = require('react-dom/server')
// 给服务端的app 方法
const serverEntry = require('../assets/server-entry.js').default
const controllersInit = (app) => {
    app.use(router(_ => {
        // 只考虑首页ssr
        let targetSsrUrl = '/index'
        _.get(targetSsrUrl, async (ctx, next) => {
            // 更改store，如数据获取场景 REDUX_DATA_LIST
            let u = ctx.request.url
            let result = await ctx.render('index')
            let appString = ReactDomServer.renderToString(serverEntry(targetSsrUrl))
            ctx.status = 200
            ctx.type = 'html'
            if (u === targetSsrUrl) {
                // 替换 <script>window.REDUX_DATA_LIST</script>
                let listNum = '<script>window.REDUX_DATA_LIST=10'
                result = result.replace('<script>window.REDUX_DATA_LIST=1', listNum)
            }
            result = result.replace('<appp></appp>', appString)
            function createSsrStreamPromise() {
                return new Promise((resolve, reject) => {
                    let stream = new Readable()
                    stream.push(result)
                    stream.push(null)
                    stream.on('error', err => {
                        reject(err)
                    }).pipe(ctx.res)
                })
            }
            await createSsrStreamPromise()
            ctx.body = result
        })
    }))
}

export default controllersInit;