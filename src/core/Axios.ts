import { mergeConfig } from "../config/mergeConf";
import { AxiosPromise, AxiosRequestConfig, AxiosResponse, Method, RejectedFn, ResolvedFn } from "../types";
import dispatchRequest from "./dispatchRequest";
import InterceptorManager from "./interceptorManager";

interface Interceptor {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}
interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}
export default class Axios {
  // 属性
  defaultConf: AxiosRequestConfig
  interceptors: Interceptor

  // 构造函数
  constructor(initConfig: AxiosRequestConfig) {
    this.defaultConf = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }
  
  // 基本请求方法
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) config = {}
      config.url = url
    } else {
      config = url
    }
    // 合并配置
    config = mergeConfig(this.defaultConf, config)
    // Promise链
    const chain: PromiseChain<any>[] = [{
      resolved: dispatchRequest,
      rejected: undefined,
    }]
    this.interceptors.request.forEach(inter => chain.unshift(inter))
    this.interceptors.response.forEach(inter => chain.push(inter))

    let promise = Promise.resolve(config)
    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
  }
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData('get', url, config)
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData('delete', url, config)
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData('head', url, config)
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData('options', url, config)
  }
  post(url: string, data?: any, config?: AxiosRequestConfig) {
    this._requestWithData('post', url, data, config)
  }
  put(url: string, data?: any, config?: AxiosRequestConfig) {
    this._requestWithData('put', url, data, config)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig) {
    this._requestWithData('patch', url, data, config)
  }

  // 无data公用方法
  _requestWithoutData(method: Method, url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(Object.assign(config || {}, { method, url }))
  }
  // 有data公用方法
  _requestWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(Object.assign(config || {}, { method, url, data }))
  }
}