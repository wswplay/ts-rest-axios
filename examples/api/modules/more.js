const atob = require('atob')

module.exports = router => {
  router.get('/more/get', function (req, res) {
    res.json(req.cookies)
  })
  router.post('/more/post', function (req, res) {
    const auth = req.headers.authorization
    const [type, credentials] = auth.split(' ')
    console.log(atob(credentials))
    const [username, password] = atob(credentials).split(':')
    if (type === 'Basic' && username === 'Xiao' && password === 'nanzhi') {
      res.json(req.body)
    } else {
      res.end('UnAuthorization')
    }
  })
  router.get('/more/304', function(req, res) {
    res.status(304)
    res.end()
  })
  // 静态扩展
  router.get('/more/A', function(req, res) {
    res.end('A')
  })
  router.get('/more/B', function(req, res) {
    res.end('B')
  })
}