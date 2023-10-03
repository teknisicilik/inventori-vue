import exportExcel from './exportExcel.vue'

const exportX = {
  install: function (Vue) {
    Vue.component(exportExcel.name, exportExcel)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(exportX)
}

export default exportX
