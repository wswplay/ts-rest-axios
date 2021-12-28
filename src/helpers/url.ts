import { isDate, isPlainObject, isURLSearchParams } from './util'

interface URLOrigin {
  protocol: string
  host: string
}

export function buildUrl(url: string, params?: any, paramsSerializer?: (params: any) => string): string {
  if (!params) return url

  let serializeParams
  if (paramsSerializer) {
    serializeParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializeParams = params.toString()
  } else {
    const parts: string[] = []
    Object.keys(params).forEach(key => {
      const val = params[key]
      if (val === null || typeof val === 'undefined') return
      let values = []
      if (Array.isArray(val)) {
        values = val
        key += '[]'
      } else {
        values = [val]
      }
      values.forEach(val => {
        if (isDate(val)) {
          val = val.toISOString()
        } else if (isPlainObject(val)) {
          val = JSON.stringify(val)
        }
        parts.push(`${encode(key)}=${encode(val)}`)
      })
    })
    serializeParams = parts.join('&')
  }
  if (serializeParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializeParams
  }
  return url
}

export function isURLSameOrigin(requestUrl: string): boolean {
  const parsedOrigin = resolveUrl(requestUrl)
  return (parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host)
}

// 编码解码
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/ig, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/ig, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/ig, '[')
    .replace(/%5D/ig, ']')
}
// 解析url相关信息
const urlParseingNode = document.createElement('a')
const currentOrigin = resolveUrl(window.location.href)
function resolveUrl(url: string): URLOrigin {
  urlParseingNode.setAttribute('href', url)
  const { protocol, host } = urlParseingNode
  return {
    protocol,
    host,
  }
}
