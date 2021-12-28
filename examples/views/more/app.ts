import axios, { AxiosError } from '../../../src/index'

// document.cookie = 'a=nanzhi'

// axios.get('/more/get').then(res => {
//   console.log(res)
// })

// axios.post('http://127.0.0.1:8088/more/server2', { msg: '跨域请求' }, {
//   withCredentials: false
// }).then(res => {
//   console.log('跨域：', res.data)
// })

// const instance = axios.create({
//   xsrfCookieName: 'XSRF-TOKEN-D',
//   xsrfHeaderName: 'X-XSRF-TOKEN-D'
// })

// instance.get('/more/get').then(res => {
//   console.log('XSRF', res)
// })

// // 授权
// axios.post('/more/post', {
//   a: '授权'
// }, {
//   auth: {
//     username: 'Xiao',
//     password: 'nanzhi'
//   }
// }).then(res => {
//   console.log(res)
// })

// 状态码
axios.get('/more/304').then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
})

axios.get('/more/304', {
  validateStatus(status) {
    return status >= 200 && status < 400
  }
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
})