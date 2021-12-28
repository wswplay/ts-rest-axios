import { deepMergeObj, isPlainObject } from "../helpers/util";
import { AxiosRequestConfig } from "../types";

const stratMap = Object.create(null)
const keysFromVal2 = ['url', 'params', 'data']
const keysDeepMerge = ['headers', 'auth']
keysFromVal2.forEach(key => stratMap[key] = fromVal2Strat)
keysDeepMerge.forEach(key => stratMap[key] = deepMergeStrat)

export function mergeConfig(defaultConf: AxiosRequestConfig, custConf?: AxiosRequestConfig): AxiosRequestConfig {
  if (!custConf) custConf = {}
  const config = Object.create(null)

  for (let key in custConf) {
    mergeField(key)
  }
  for (let key in defaultConf) {
    if (!custConf[key]) mergeField(key)
  }

  function mergeField(key: string): void {
    const curStrat = stratMap[key] || defaultStrat
    config[key] = curStrat(defaultConf[key], custConf![key])
  }
  return config
}

function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') return val2
}
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMergeObj(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMergeObj(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}