module.exports = router => {
  router.get('/interceptor/get', function(req, res) {
    res.end('interceptor hello world')
  })
}