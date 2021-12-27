import axios from '../../../src/index'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

const instance = axios.create()

// 进度条
loadProgressBar()

// 下载
const picUrl = 'https://cn.bing.com/th?id=OHR.Rauchnachte_ZH-CN6061051054_1920x1080.jpg&rf=LaDigue_1920x1080.jpg'
document.getElementById('downPic').setAttribute('src', picUrl)

const downloadEl = document.getElementById('download')
downloadEl!.addEventListener('click', e => {
  instance.get(picUrl).then(res => {
    console.log('res===', res)
  })
})

// 上传
const uploadEl = document.getElementById('upload')
uploadEl!.addEventListener('click', e => {
  const data = new FormData()
  const fileEl = document.getElementById('file') as HTMLInputElement
  if (fileEl.files) {
    data.append('file', fileEl.files[0])

    instance.post('/more/upload', data)
  }
})

function calculatePercentage(loaded: number, total: number) {
  return Math.floor(loaded * 1.0) / total
}
function loadProgressBar() {
  const setupStartProgress = () => {
    instance.interceptors.request.use(config => {
      NProgress.start()
      return config
    })
  }

  const setupUpdateProgress = () => {
    const update = (e: ProgressEvent) => {
      console.log(e)
      NProgress.set(calculatePercentage(e.loaded, e.total))
    }
    instance.defaultConf.onDownloadProgress = update
    instance.defaultConf.onUploadProgress = update
  }

  const setupStopProgress = () => {
    instance.interceptors.response.use(response => {
      NProgress.done()
      return response
    }, error => {
      NProgress.done()
      return Promise.reject(error)
    })
  }

  setupStartProgress()
  setupUpdateProgress()
  setupStopProgress()
}