import defaultConf from "../config/defaultConf";
import { extendObjFn } from "../helpers/util";
import { AxiosInstance, AxiosRequestConfig } from "../types";
import Axios from "./Axios";

function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extendObjFn(instance, context)
  return instance as AxiosInstance
}

const axiosInst = createInstance(defaultConf)
export default axiosInst