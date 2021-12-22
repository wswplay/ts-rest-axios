import { isPlainObject } from "./util";

export function processHeaders(headers: any, data: any): any {
  const contentTypeName = 'Content-Type'
  normalizeHeadersName(headers, contentTypeName)
  if (isPlainObject(data)) {
    if (headers && !headers[contentTypeName]) {
      headers[contentTypeName] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
function normalizeHeadersName(headers: any, name: string): void {
  if (!headers) return
  Object.keys(headers).forEach(key => {
    if (key !== name && key.toUpperCase() === name.toUpperCase()) {
      headers[name] = headers[key]
      delete headers[key]
    }
  })
}