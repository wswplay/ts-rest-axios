const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// export function isObject(val: any): boolean {
//   return val !== null && typeof val === 'object'
// }

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function extendObjFn<T, U>(to: T, from: U): T & U {
  for (let key in from) {
    ; (to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
// 深度合并对象
export function deepMergeObj(...args: any[]): any {
  const result = Object.create(null)
  args.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMergeObj(result[key], val)
          } else {
            result[key] = deepMergeObj(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}