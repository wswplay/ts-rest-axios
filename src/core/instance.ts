import Cancel, { isCancel } from "../cancel/Cancel";
import CancelToken from "../cancel/CancelToken";
import defaultConf from "../config/defaultConf";
import { mergeConfig } from "../config/mergeConf";
import { extendObjFn } from "../helpers/util";
import { AxiosRequestConfig, AxiosStatic } from "../types";
import Axios from "./Axios";

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extendObjFn(instance, context)
  return instance as AxiosStatic
}

const axiosInst = createInstance(defaultConf)

axiosInst.create = function (config) {
  return createInstance(mergeConfig(defaultConf, config))
}

axiosInst.CancelToken = CancelToken
axiosInst.Cancel = Cancel
axiosInst.isCancel = isCancel

axiosInst.all = function (promises) {
  return Promise.all(promises)
}
axiosInst.spread = function (callback) {
  return (arr) => callback.apply(null, arr)
}
axiosInst.Axios = Axios

export default axiosInst