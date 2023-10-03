<template>
  <span :id="idName" @click="generate">
    <slot>Download {{name}}</slot>
  </span>
</template>

<script>
/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-useless-escape */
import download from 'browser-downloads'
export default {
  name: 'export-excel',
  props: {
    type: {
      type: String,
      default: 'xls'
    },
    data: {
      type: Array,
      required: false,
      default: null
    },
    fieldsXLS: {
      type: Object,
      required: false
    },
    exportFields: {
      type: Object,
      required: false
    },
    defaultValue: {
      type: String,
      required: false,
      default: ''
    },
    title: {
      default: null
    },
    footer: {
      default: null
    },
    name: {
      type: String,
      default: 'data.xls'
    },
    fetch: {
      type: Function
    },
    meta: {
      type: Array,
      default: () => []
    },
    worksheet: {
      type: String,
      default: 'Sheet1'
    },
    beforeGenerate: {
      type: Function
    },
    beforeFinish: {
      type: Function
    }
  },
  computed: {
    idName () {
      var now = new Date().getTime()
      return 'export_' + now
    },
    downloadFields () {
      if (this.fieldsXLS !== undefined) return this.fieldsXLS
      if (this.exportFields !== undefined) return this.exportFields
    }
  },
  methods: {
    async generate () {
      if (typeof this.beforeGenerate === 'function') {
        await this.beforeGenerate()
      }
      let data = this.data
      // console.log(data)
      // if (typeof this.fetch === 'function' || !data) { data = await this.fetch() }
      if (!data || !data.length) {
        this.$emit('done', 'kosongan')
        return
      }
      let json = this.getProcessedJson(data, this.downloadFields)
      if (this.type === 'html') {
        return this.export(
          this.jsonToXLS(json),
          this.name.replace('.xls', '.html'),
          'text/html'
        )
      } else if (this.type === 'csv') {
        return this.export(
          this.jsonToCSV(json),
          this.name.replace('.xls', '.csv'),
          'application/csv'
        )
      }
      return this.export(
        this.jsonToXLS(json),
        this.name,
        'application/vnd.ms-excel'
      )
    },
    export: async function (data, filename, mime) {
      let blob = this.base64ToBlob(data, mime)
      if (typeof this.beforeFinish === 'function') { await this.beforeFinish() }
      download(blob, filename, mime)
      this.$emit('done', filename)
    },
    jsonToXLS (data) {
      let xlsTemp = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta name=ProgId content=Excel.Sheet> <meta name=Generator content="Microsoft Excel 11"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><style>br {mso-data-placement: same-cell;}</style></head><body><table>${table}</table></body></html>'
      let xlsData = '<thead>'
      const colspan = Object.keys(data[0]).length
      let _self = this
      if (this.title != null) {
        xlsData += this.parseExtraData(
          this.title,
          '<tr><th colspan="' + colspan + '">${data}</th></tr>'
        )
      }
      xlsData += '<tr>'
      for (let key in data[0]) {
        xlsData += '<th>' + key + '</th>'
      }
      xlsData += '</tr>'
      xlsData += '</thead>'
      xlsData += '<tbody>'
      data.map(function (item, index) {
        xlsData += '<tr>'
        for (let key in item) {
          // eslint-disable-next-line quotes
          xlsData += '<td>&nbsp;' + _self.valueReformattedForMultilines(item[key]).toString() + "</td>"
        }
        xlsData += '</tr>'
      })
      xlsData += '</tbody>'
      if (this.footer != null) {
        xlsData += '<tfoot>'
        xlsData += this.parseExtraData(
          this.footer,
          '<tr><td colspan="' + colspan + '">${data}</td></tr>'
        )
        xlsData += '</tfoot>'
      }
      return xlsTemp.replace('${table}', xlsData).replace('${worksheet}', this.worksheet)
    },
    jsonToCSV (data) {
      var csvData = []
      if (this.title != null) {
        csvData.push(this.parseExtraData(this.title, '${data}\r\n'))
      }
      for (let key in data[0]) {
        csvData.push(key)
        csvData.push(',')
      }
      csvData.pop()
      csvData.push('\r\n')
      data.map(function (item) {
        for (let key in item) {
          let escapedCSV = '=\"' + item[key] + '\"'
          if (escapedCSV.match(/[,"\n]/)) {
            escapedCSV = '"' + escapedCSV.replace(/\"/g, '""') + '"'
          }
          csvData.push(escapedCSV)
          csvData.push(',')
        }
        csvData.pop()
        csvData.push('\r\n')
      })
      if (this.footer != null) {
        csvData.push(this.parseExtraData(this.footer, '${data}\r\n'))
      }
      return csvData.join('')
    },
    getProcessedJson (data, header) {
      let keys = this.getKeys(data, header)
      let newData = []
      let _self = this
      data.map(function (item, index) {
        let newItem = {}
        for (let label in keys) {
          let property = keys[label]
          newItem[label] = _self.getValue(property, item).toString()
        }
        newData.push(newItem)
      })
      return newData
    },
    getKeys (data, header) {
      if (header) {
        return header
      }

      let keys = {}
      for (let key in data[0]) {
        keys[key] = key
      }
      return keys
    },
    parseExtraData (extraData, format) {
      let parseData = ''
      if (Array.isArray(extraData)) {
        for (var i = 0; i < extraData.length; i++) {
          parseData += format.replace('${data}', extraData[i])
        }
      } else {
        parseData += format.replace('${data}', extraData)
      }
      return parseData
    },
    getValue (key, item) {
      const field = typeof key !== 'object' ? key : key.field
      let indexes = typeof field !== 'string' ? [] : field.split('.')
      let value = this.defaultValue

      if (!field) { value = item } else if (indexes.length > 1) { value = this.getValueFromNestedItem(item, indexes) } else { value = this.parseValue(item[field]) }

      if (key.hasOwnProperty('callback')) { value = this.getValueFromCallback(value, key.callback) }

      return value
    },
    valueReformattedForMultilines (value) {
      if (typeof (value) === 'string') return (value.replace(/\n/ig, '<br/>'))
      else return (value)
    },
    getValueFromNestedItem (item, indexes) {
      let nestedItem = item
      for (let index of indexes) {
        if (nestedItem) { nestedItem = nestedItem[index] }
      }
      return this.parseValue(nestedItem)
    },
    getValueFromCallback (item, callback) {
      if (typeof callback !== 'function') { return this.defaultValue }
      const value = callback(item)
      return this.parseValue(value)
    },
    parseValue (value) {
      return value || value === 0 || typeof value === 'boolean'
        ? value
        : this.defaultValue
    },
    base64ToBlob (data, mime) {
      let base64 = window.btoa(window.unescape(encodeURIComponent(data)))
      let bstr = atob(base64)
      let n = bstr.length
      let u8arr = new Uint8ClampedArray(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], {type: mime})
    }
  }
}
</script>
