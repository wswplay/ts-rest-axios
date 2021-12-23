module.exports = function (router) {
  router.get('/error/get', function (req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: `hello random 500`
      })
    } else {
      res.status(500)
      res.end()
    }
  })
  router.get('/error/timeout', function (req, res) {
    setTimeout(() => {
      res.json({
        msg: `hello timeout`
      })
    }, 3000)
  })
}