const express = require('express')
const router = express.Router()

// 入门示例
router.get('/simple/get', function (req, res) {
  res.json({
    msg: `hello world`
  })
})
// 基本示例
router.get('/base/get', function(req, res) {
  res.json(req.query)
})
router.post('/base/post', function(req, res) {
  res.json(req.body)
})
router.post('/base/buffer', function(req, res) {
  let msg = []
  req.on('data', (chunk) => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})
// error示例
router.get('/error/get', function(req, res) {
  if (Math.random() > 0.5) {
    res.json({
      msg: `hello random 500`
    })
  } else {
    res.status(500)
    res.end()
  }
})
router.get('/error/timeout', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello timeout`
    })
  }, 3000)
})
// extend
router.get('/extend/get', function(req, res) {
  res.json({
    msg: 'hello world'
  })
})

router.options('/extend/options', function(req, res) {
  res.end()
})

router.delete('/extend/delete', function(req, res) {
  res.end()
})

router.head('/extend/head', function(req, res) {
  res.end()
})

router.post('/extend/post', function(req, res) {
  res.json(req.body)
})

router.put('/extend/put', function(req, res) {
  res.json(req.body)
})

router.patch('/extend/patch', function(req, res) {
  res.json(req.body)
})

router.get('/extend/user', function(req, res) {
  res.json({
    code: 0,
    message: 'ok',
    result: {
      name: 'jack',
      age: 18
    }
  })
})

module.exports = router