export function downFile(data) {
  const fileData = new Blob([data])

  const aDom = document.createElement('a')
  aDom.style.display = 'none'
  aDom.download = '山谷中雪的圣诞树.png'
  aDom.href = window.URL.createObjectURL(fileData)
  document.body.appendChild(aDom).click()
  
  window.URL.revokeObjectURL(aDom.href)
  document.body.removeChild(aDom)
}