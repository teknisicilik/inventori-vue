import Vue from 'vue'
import Vuex from 'vuex'
import buildModule from '@/modules/_registration.js'
import global from '@/utils/global.js'
Vue.use(Vuex)

const state = {
  sideNavPrimary: false,
  sideNavSecondary: false,
  sideNavMobile: false
}

const mutations = {
  toggleState (state, variable) {
    state[variable] = !state[variable]
  },
  setOffSidebar (state) {
    state.sideNavSecondary = false
  },
  set (state, [variable, value, saveLS = false]) {
    Vue.set(state, variable, value)
    if (saveLS) localStorage.setItem(variable, JSON.stringify(value))
  }
}
const getters = {}
const actions = {
  async setModule (context) {
    await buildModule.then(res => {
      var allowedModule = []
      for (var index = 0; index < res.length; index++) {
        // const elm = res[index]
        const elm = Object.assign({}, res[index]) // remove fkin binding
        var tmpRoute = []
        for (var i = 0; i < elm.routes.length; i++) {
          const r = Object.assign({}, elm.routes[i]) // remove fkin binding
          if (r.meta.permission) {
            if (global.isAllowed(r.meta.permission.read)) tmpRoute.push(r)
          } else tmpRoute.push(r)
        }
        var data = elm
        data.routes = tmpRoute
        if (tmpRoute.length > 0) allowedModule.push(data)
      }
      context.commit('set', ['modules', allowedModule, true])
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
