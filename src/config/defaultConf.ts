import { AxiosRequestConfig } from "../types";

const defaultConf: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

const methodsNoData = ['get', 'delete', 'head', 'options']
methodsNoData.forEach(method => {
  defaultConf.headers[method] = {}
})
const methodsWithData = ['post', 'put', 'patch']
methodsWithData.forEach(method => {
  defaultConf.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaultConf