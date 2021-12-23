const express = require('express')
const router = express.Router()
const simpleApi = require('./modules/simple')
const baseApi = require('./modules/base')
const errorApi = require('./modules/error')
const extendApi = require('./modules/extend')

// 入门示例
simpleApi(router)
// 基本示例
baseApi(router)
// error示例
errorApi(router)
// extend示例
extendApi(router)

module.exports = router