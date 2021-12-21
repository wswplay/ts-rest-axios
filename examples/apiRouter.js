const express = require('express')
const router = express.Router()

router.get('/simple/get', function (req, res) {
  res.json({
    msg: `hello world`
  })
})
router.get('/base/get', function(req, res) {
  res.json(req.query)
})

module.exports = router