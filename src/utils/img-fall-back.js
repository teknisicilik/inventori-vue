export default function (el, binding) {
  try {
    let { value } = binding
    let ext = null
    if (value && typeof value === 'string') ext = value.split('/').slice(-1)[0].split('.').slice(-1)[0]
    else if (value && typeof value === 'object') {
      ext = value.ext ? value.ext : 'jpg'
      value = value.url
    } else ext = 'jpg'
    const supportExt = ['jpg', 'jpeg', 'xlsx', 'xls', 'css', 'csv', 'doc', 'html', 'js', 'mp4', 'pdf', 'png', 'svg', 'xml', 'zip']
    if (!supportExt.includes(ext)) ext = 'jpg'
    const loader = require('@/../static/img/loader.svg')
    const fallBackImage = require('@/../static/img/file/' + ext + '.svg')
    const img = new Image()
    let loading = loader
    let error = fallBackImage
    if (value && typeof value === 'string') {
      loading = value
    }
    if (value instanceof Object) {
      loading = value.imageLoader || loader
      error = value.fallBackImage || fallBackImage
    }
    img.src = value
    el.src = loading
    img.onload = () => {
      el.src = value
    }
    img.onerror = () => {
      el.src = error
    }
  } catch (e) {
    console.log(e)
  }
}
