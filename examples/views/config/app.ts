import axios from '../../../src/index'
import qs from 'qs'

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