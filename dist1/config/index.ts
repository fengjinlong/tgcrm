import { extend } from 'lodash'
import { join } from 'path'

let config = {
  viewDir: join(__dirname, '..', 'views'),
  staticDir: join(__dirname, '..', 'assets'),
  env: process.env.NODE_ENV 
};

if(process.env.NODE_ENV == 'development'){
  config = extend(config, {
    port: 8081,
    // viewDir: 'http://localhost:3000/public/'
  })
}

if(process.env.NODE_ENV == 'production'){
  config = extend(config, {
    port: 80,
  })
}

export default config