import axios, { AxiosError } from '../../../src/index'
import qs from 'qs'

// cookieDemo()
// corsDemo()
// xsrfDemo()
// authDemo()
// statusCodeDemo()
// serializerDemo()
baseUrlDemo()

function cookieDemo() {
  document.cookie = 'a=nanzhi'

  axios.get('/more/get').then(res => {
    console.log(res)
  })
}

function corsDemo() {
  axios.post('http://127.0.0.1:8088/more/server2', { msg: '跨域请求' }, {
    withCredentials: false
  }).then(res => {
    console.log('跨域：', res.data)
  })
}

function xsrfDemo() {
  const instance = axios.create({
    xsrfCookieName: 'XSRF-TOKEN-D',
    xsrfHeaderName: 'X-XSRF-TOKEN-D'
  })

  instance.get('/more/get').then(res => {
    console.log('XSRF', res)
  })
}

// 授权
function authDemo() {
  axios.post('/more/post', {
    a: '授权'
  }, {
    auth: {
      username: 'Xiao',
      password: 'nanzhi'
    }
  }).then(res => {
    console.log(res)
  })
}

// 状态码
function statusCodeDemo() {
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
}

// 参数序列化
function serializerDemo() {
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
}

// baseurl示例
function baseUrlDemo() {
  const baseUrlinstance = axios.create({
    baseURL: 'https://cn.bing.com'
  })
  baseUrlinstance.get('https://cn.bing.com/th?id=OHR.Rauchnachte_ZH-CN6061051054_1920x1080.jpg&rf=LaDigue_1920x1080.jpg')

  baseUrlinstance.get('th?id=OJ.2Eh3yWRgmXNSkA&pid=MSNJVFeeds')
}