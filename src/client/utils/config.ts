const config:object = {
  development: {
    host: '//localhost:8081'
  },
  production: {
    host: ''
  }
}

export default config[process.env.NODE_ENV || 'development']