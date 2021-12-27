module.exports = router => {
  router.post('/more/upload', function (req, res) {
    console.log(req.body, req.files)
    res.end('upload success!')
  })
}