const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const path = require('path')
const viewsPath = path.join(__dirname, 'views')

require('./server2')

const app = express()
const compiler = webpack(WebpackConfig)
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))
app.use(webpackHotMiddleware(compiler))
app.use(express.static(viewsPath, {
  setHeaders (res) {
    res.cookie('XSRF-TOKEN-D', 'nanzhi-xiao')
  }
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// 引入api路由文件
const router = require('./api/apiRouter')
app.use(router)

const port = process.env.PORT || 8090
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})