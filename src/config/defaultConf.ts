import { transformRequest, transformResponse } from "../helpers/data";
import { processHeaders } from "../helpers/headers";
import { AxiosRequestConfig } from "../types";

const defaultConf: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  transformRequest: [
    function (data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function (data: any): any {
      return transformResponse(data)
    }
  ],
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