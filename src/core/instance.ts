import { extendObjFn } from "../helpers/util";
import { AxiosInstance } from "../types";
import Axios from "./Axios";

function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)
  extendObjFn(instance, context)
  return instance as AxiosInstance
}

const axiosInst = createInstance()
export default axiosInst