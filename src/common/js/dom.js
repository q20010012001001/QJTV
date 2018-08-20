let div = document.createElement('div').style
let vn = (() => {
  let transfrom = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let i in transfrom) {
    if (div[transfrom[i]] !== undefined) {
      return i
    }
  }
  return false
})()

export function prefixStyle (style) {
  if (vn === false) {
    return false
  }

  if (vn === 'standard') {
    return style
  }

  return vn + style.charAt(0).toUpperCase() + style.substr(1)
}
