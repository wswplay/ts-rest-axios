import axios from '../../../src/index'

document.cookie = 'a=nanzhi'

axios.get('/more/get').then(res => {
  console.log(res)
})

axios.post('http://127.0.0.1:8088/more/server2', { msg: '跨域请求' }, {
  withCredentials: false
}).then(res => {
  console.log('跨域：', res.data)
})