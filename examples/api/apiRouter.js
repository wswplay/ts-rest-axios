const fs = require('fs')
const path = require('path')
const router = require('express').Router()

// 读取modules文件，生成api
const dirPath = path.join(__dirname, 'modules')
fs.readdirSync(dirPath).forEach(file => {
  require(`${dirPath}/${file}`)(router)
})

module.exports = router