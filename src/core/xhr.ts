import cookie from '../helpers/cookie'
import { createError } from '../helpers/error'
import { parseHeaders } from '../helpers/headers'
import { isURLSameOrigin } from '../helpers/url'
import { isFormData } from '../helpers/util'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      url,
      data = null,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth
    } = config

    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url!, true)
    configRequest()
    addEvents()
    processHeaders()
    processCancel()
    request.send(data)

    // 配置请求
    function configRequest(): void {
      if (responseType) request.responseType = responseType
      if (timeout) request.timeout = timeout
      if (withCredentials) request.withCredentials = withCredentials
    }
    // 事件监听
    function addEvents(): void {
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
      // 上传下载进度
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }
    // 处理headers
    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }
      // xsrf防御
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }
      // 授权
      if (auth) {
        headers['Authorization'] = `Basic ${btoa(auth.username + ':' + auth.password)}`
      }
      // 处理headers
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }
    // 处理取消
    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }
    // 处理错误码
    function handleResponse(resData: AxiosResponse): void {
      if (resData.status >= 200 && resData.status < 300) {
        resolve(resData)
      } else {
        reject(
          createError(
            `Request failed with status code ${resData.status}`,
            config,
            null,
            request,
            resData
          )
        )
      }
    }
  })
}
