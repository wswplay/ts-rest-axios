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

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) return parsed
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    if (val) val = val.trim()
    parsed[key] = val
  })
  return parsed
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