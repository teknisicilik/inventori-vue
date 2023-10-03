import MainLayout from '@/layouts/tas-admin'

const { default: router } = require('@/router')
const requireModules = require.context('.', true, /_index\.js$/)
const modulesSorter = require('./_order')['default']
var moduleList = []
var _moduleList = []
requireModules.keys().forEach(folder => {
  if (modulesSorter.indexOf(folder.split('/')[1]) > -1) moduleList[modulesSorter.indexOf(folder.split('/')[1])] = folder
  else _moduleList.push(folder)
})
const finalModule = [...moduleList, ..._moduleList]

const buildModule = new Promise(async (resolve, reject) => {
  var newModule = []
  for (var j = 0; j < finalModule.length; j++) {
    const fileName = finalModule[j]
    const appModules = requireModules(fileName).default
    const moduleName = fileName.split('/')[1].split('-').map((kebab) => kebab.toLowerCase()).join('-')
    var newRoutes = []
    for (var i = 0; i < appModules.routes.length; i++) {
      var r = appModules.routes[i]
      var permission = null
      if (r.component) {
        const data = await r.component()
        var config = data.default.data() ? data.default.data().config : null
        permission = (config) ? config.permission : null
      } else {
        r.component = () => import('@/default-page/maintenance.vue')
      }
      r = {
        ...r,
        meta: {
          title: r.name.split('-').map((kebab) => kebab.toLowerCase().charAt(0).toUpperCase() + kebab.slice(1)).join(' '),
          icon: r.icon,
          permission: permission,
          separator: r.separator || null
        },
        path: '/' + moduleName + r.path
      }
      if (i === 0) {
        let checkIfExist = router.resolve({name: 'main-module'})
        if (checkIfExist.resolved.matched.length === 0) {
          try {
            router.addRoute({ path: '/', name: 'main-module', component: MainLayout, redirect: { name: r.name } })
          } catch (error) {
            console.log(error)
          }
        }
      }
      if (appModules.config.layout) router.addRoute('main-module', r)
      else router.addRoute(r)
      newRoutes.push(r)
    }
    var vueX = appModules.config
    vueX.routes = newRoutes
    newModule.push(vueX)
  }
  resolve(newModule)
})

export default buildModule
