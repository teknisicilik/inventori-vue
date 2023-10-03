import Vue from 'vue'
import _config from '@/config.js'
import Router from 'vue-router'
import LoginPage from '@/default-page/login'
import SSOLoginPage from '@/default-page/sso-login'
import TermPage from '@/default-page/term-condition'
import PrivacyPage from '@/default-page/privacy-policy'
import RegisterPage from '@/default-page/register'
import VerifyPage from '@/default-page/verify'
import WaitingPage from '@/default-page/waiting'
import ResetPass from '@/default-page/reset-password'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/term-condition',
      name: 'term-condition',
      component: TermPage
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPage
    },
    {
      path: '/login',
      name: 'login-apps',
      component: LoginPage
    },
    {
      path: '/sso-login',
      name: 'sso-login-apps',
      component: SSOLoginPage
    },
    {
      path: '/register',
      name: 'register-apps',
      component: _config.options.allowRegister ? RegisterPage : LoginPage
    },
    {
      path: '/verify-email',
      name: 'verify-apps',
      component: _config.options.allowRegister ? VerifyPage : LoginPage
    },
    {
      path: '/waiting-account',
      name: 'waiting-apps',
      component: _config.options.allowRegister ? WaitingPage : LoginPage,
      props: true
    },
    {
      path: '/reset-password',
      name: 'reset-apps',
      component: _config.options.forgetPassword ? ResetPass : LoginPage,
      props: _config.options.forgetPassword ? route => ({ code: route.query.code, ts: Number(route.query.ts) }) : true
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('modules') !== undefined || localStorage.getItem('modules') !== null) {
    let noAuth = ['sso-login-apps', 'login-apps', 'privacy-policy', 'term-condition', 'register-apps', 'verify-apps', 'waiting-apps', 'reset-apps', 'soc-page']
    if (!noAuth.includes(to.name) && (localStorage.getItem('_token') === undefined || localStorage.getItem('_token') == null)) {
      next({ name: 'login-apps', replace: true })
    } else {
      if (to.name && from.name) {
        if ((to.name !== from.name) || (to.query.view !== from.query.view)) next()
        else return false
      } else {
        next()
      }
    }
  } else next({ name: 'login-apps', replace: true })
})

export default router
