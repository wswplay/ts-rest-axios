import cookie from '../helpers/cookie'
import { createError } from '../helpers/error'
import { parseHeaders } from '../helpers/headers'
import { isURLSameOrigin } from '../helpers/url'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, data = null, method = 'get', headers, responseType, timeout, cancelToken, withCredentials, xsrfCookieName, xsrfHeaderName
    } = config
    const request = new XMLHttpRequest()

    if (responseType) request.responseType = responseType
    if (timeout) request.timeout = timeout
    if (withCredentials) request.withCredentials = withCredentials

    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = function () {
      if (request.readyState !== 4) return
      if (request.status === 0) return
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType === 'text' ? request.responseText : request.response
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    // 异常处理
    request.onerror = function () {
      reject(createError('Network Error', config, null, request))
    }
    request.ontimeout = function () {
      reject(createError(`Timeout of ${timeout} exceeded`, config, 'Aborted', request))
    }
    // xsrf防御
    if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
      const xsrfValue = cookie.read(xsrfCookieName)
      if (xsrfValue && xsrfHeaderName) {
        headers[xsrfHeaderName] = xsrfValue
      }
    }
    // 处理headers
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    //  取消请求
    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    // 发送请求
    request.send(data)

    // 处理错误码
    function handleResponse(resData: AxiosResponse): void {
      if (resData.status >= 200 && resData.status < 300) {
        resolve(resData)
      } else {
        reject(createError(`Request failed with status code ${resData.status}`, config, null, request, resData))
      }
    }
  })
}