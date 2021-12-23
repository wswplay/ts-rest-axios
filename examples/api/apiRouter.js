const fs = require('fs')
const path = require('path')
const router = require('express').Router()

// 读取modules文件，生成api
const fileExtList = ['.js']
const dirPath = path.join(__dirname, 'modules')
fs.readdirSync(dirPath)
  .filter(file => fileExtList.includes(path.extname(file).toLowerCase()))
  .forEach(file => require(`${dirPath}/${file}`)(router))

module.exports = router