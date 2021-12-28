import axios, { AxiosError } from '../../../src/index'
import qs from 'qs'

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
// axios.get('/more/304').then(res => {
//   console.log(res)
// }).catch((e: AxiosError) => {
//   console.log(e.message)
// })

// axios.get('/more/304', {
//   validateStatus(status) {
//     return status >= 200 && status < 400
//   }
// }).then(res => {
//   console.log(res)
// }).catch((e: AxiosError) => {
//   console.log(e.message)
// })

// 参数序列化
axios.get('/more/get', {
  params: new URLSearchParams('a=b&c=d')
}).then(res => {
  console.log(res)
})

axios.get('/more/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  }
}).then(res => {
  console.log(res)
})

const instance = axios.create({
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  }
})

instance.get('/more/get', {
  params: {
    a: 1,
    b: 2,
    c: ['instance', 'ai', 'bi', 'ci']
  }
}).then(res => {
  console.log(res)
})