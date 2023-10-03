import Vue from 'vue'
import moment from 'moment'
import download from 'browser-downloads'
const _mixins = {
  read (value) {
    console.log(value)
  },
  dateNow (format) {
    return moment(new Date()).format(format)
  },
  monthNow (format) {
    return moment(new Date().setDate(1)).format(format)
  },
  objSort (property, sort) {
    var sortOrder = sort ? 1 : -1
    return function (a, b) {
      /*
       * next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
      return result * sortOrder
    }
  },
  isAllowed (permission) {
    if (permission && localStorage.getItem('profile')) {
      if (permission === 'template-allow-all') return true
      else {
        if (JSON.parse(localStorage.getItem('profile'))['role_id'] === -1) return true
        else {
          const _permission = JSON.parse(localStorage.getItem('permission')) || []
          return Boolean(_permission.includes(permission))
        }
      }
    } else return false
  },
  relSeparator (item, index) {
    let arr = item.split('-')
    return arr[index]
  },
  togleClass (id, classname, boolean) {
    let component = document.getElementById(id)
    if (component) {
      if (boolean) {
        component.classList.add(classname)
      } else {
        component.classList.remove(classname)
      }
    }
  },
  changeLocale (language = 'id') {
    Vue.$i18n.locale = language
  },
  cleansingObj (obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName]
      }
    }
    return obj
  },
  lock_period (date) {
    const now = new Date()

    const thisMonth = new Date()
    thisMonth.setDate(25)

    const nextMonth = new Date()
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    nextMonth.setDate(25)

    const prevMonth = new Date()
    prevMonth.setMonth(prevMonth.getMonth() - 1)
    prevMonth.setDate(25)

    if (now.getDate() <= 25) {
      return date < prevMonth || date > thisMonth
    } else {
      return date < thisMonth || date > nextMonth
    }
  },
  lockNow (date) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today || date > new Date(today.getTime() + 1 * 23 * 3600 * 1000)
  },
  lockAfter (date) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date > today
  },
  base64ToBlob (data, mime) {
    let base64 = window.btoa(window.unescape(encodeURIComponent(data)))
    let bstr = atob(base64)
    let n = bstr.length
    let u8arr = new Uint8ClampedArray(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  },
  async xlsHTML (refs, filename = 'filename', worksheet = 'worksheet') {
    // eslint-disable-next-line no-template-curly-in-string
    let xlsTemp = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta name=ProgId content=Excel.Sheet> <meta name=Generator content="Microsoft Excel 11"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><style>br {mso-data-placement: same-cell;}</style></head><body><table>${table}</table></body></html>'
    const xlsData = refs.innerHTML.replace(/<\/?tfoot>/g, '')
    // eslint-disable-next-line no-template-curly-in-string
    const data = xlsTemp.replace('${table}', xlsData).replace('${worksheet}', worksheet)
    let blob = this.base64ToBlob(data, 'application/vnd.ms-excel')
    download(blob, filename + '.xls', 'application/vnd.ms-excel')
  },
  forceDownload (e) {
    const link = document.createElement('a')
    link.href = e.url
    link.download = e.filename
    link.target = '_blank'
    console.log('download', link)
    link.click()
    // fetch(e.url).then(data => {
    //   console.log(data)
    //   download(data.url, e.filename)
    // })
  },
  resDownload (e, f) {
    download(e, f, 'application/vnd.ms-excel')
  },
  iframeLink (e, server = 0) {
    // eslint-disable-next-line no-template-curly-in-string
    const serverList = ['https://docs.google.com/gview?url=${link}&embedded=true', 'https://view.officeapps.live.com/op/embed.aspx?src=${link}']
    if (server > serverList.length) server = 0
    // eslint-disable-next-line no-template-curly-in-string
    return serverList[server].replace('${link}', e)
  },
  numberMonth (year, month) {
    return moment().set('date', 1).set('month', month - 1).set('year', year).format('YYYY-MM-DD')
  }
}
export default _mixins
