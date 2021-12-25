import axios from '../../../src/index'

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})

axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello'
  }
})

axios.get('/extend/get')
axios.get('/extend/user')

axios.options('/extend/options')

axios.delete('/extend/delete')

axios.head('/extend/head')

axios.post('/extend/post', { msg: 'post' })

axios.put('/extend/put', { msg: 'put' })

axios.patch('/extend/patch', { msg: 'patch' })

// 重载示例
axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'reload request 666'
  }
})

// 接口响应数据-添加泛型参数
interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}
interface User {
  name: string
  age: number
  address: string
  id: number
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.error(err))
}
async function generic() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.id)
  }
}

generic()