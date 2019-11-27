import * as Router from 'koa-router'
import { route, GET } from 'awilix-koa'
import User from '../model/user'

const ReactDomServer = require('react-dom/server')
// const serverEntry = require('./assets/server-entry.js').default
const serverEntry = require('../../../dist/assets/scripts/server-entry.js').default
// import serverEntry1 from '../../../dist/assets/scripts/server-entry.js'

console.log(serverEntry)

@route('/')
@route('/index')
export default class IndexController {
  constructor({ indexService }) {
    this.indexService = indexService
  }
  @route('/login')
  @GET()
  private async index(
    ctx: Router.IRouterContext,
    next: () => Promise<any>
  ): Promise<any> {
    // const result: User = await this.indexService.getUser('0')
    // console.log(result.email)
    console.log('11111111111111111111111111111')
    let appString = ReactDomServer.renderToString(serverEntry('login'))
    console.log(appString)
      // ćšĺź1
      ctx.body = appString
    // ctx.body = await ctx.render('index', { data: result.email });
  }
}