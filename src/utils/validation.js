import { extend, configure, localize } from 'vee-validate'
import id from 'vee-validate/dist/locale/id.json'
import * as rules from 'vee-validate/dist/rules'

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})
extend('lock-periode', value => {
  if (value) {
    return true
  }
  return 'Cut Off Peride Aktif'
})
// localize(en)
localize('id', id)
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})
