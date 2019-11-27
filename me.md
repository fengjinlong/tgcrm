1.webpack流程

2.entry -> loader(tsx|ts|js|jsx) 选择合适的loader
           周边loader,css-loader、url-loader、file-loader等

3.spa 系统：一个主文件 + 异步文件包 + manifest.json
4. .babelrc 和 tsconfig.json 遇到问题，再添加插件，不要一开始就复制进来


5. import { BrowserRouter } from 'react-router-dom'
对组件进行包裹， 把router 当作一个组件
6.
6-1.引入需要的异步组件
const Login = lazy(() =>
  import(/* webpackChunkName:"login" */ '@pages/Login')
)
@babel/plugin-syntax-dynamic-import
6-2.对引入的组件，结构化组成
BrowserRouter
   suspense 
      switch
         Route

7.historyApiFallback: true 应对前端假路由
8.@types/node @types/react @types/xxx


9.webpack.config.js (base) : 基本配置、loader、plugin 两个环境都需要的功能
    babel js 、 css 、 图片 、 插入变量 process.env.NOD_ENV

   测试 //api.test/user

   线上 //api/user

  const isDev = process.env.NOD_ENV === 'development'

  export default {
   'development': {
      'api': 'http://api.test/user'

   },
   'production': {
      'api': 'https://api/user'
   } 
 }

 webpack.dev.js
   webpack-dev-server,

 webpack.prod.js
   处理js、合并压缩，提取css、处理图片（压缩）、处理模版

 
