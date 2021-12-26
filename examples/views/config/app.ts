import axios from '../../../src/index'
import qs from 'qs'
import { AxiosTransformer } from '../../../src/types'

axios.defaultConf.headers.common['test2'] = 123

axios({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: '合并config'
  }),
  headers: {
    test: '666 merge config'
  }
}).then((res) => {
  console.log(res.data)
})

axios({
  transformRequest: [(function (data) {
    return qs.stringify(data)
  }), ...(axios.defaultConf.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaultConf.transformResponse as AxiosTransformer[]), function (data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }],
  url: '/config/post',
  method: 'post',
  data: {
    a: 1,
    msg: "配置化"
  }
}).then((res) => {
  console.log(res.data)
})