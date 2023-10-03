import {format, setCursor} from './numeric/utils'
import assign from './numeric/assign'
import defaults from './numeric/default'
export default function (el, binding, vnode) {
  try {
    let deff
    if (binding.value === 'money') deff = { prefix: 'Rp. ', suffix: '', thousands: '.', decimal: ',', precision: 3 }
    else deff = { prefix: '', suffix: '', thousands: '.', decimal: ',', precision: 2 }
    let opt = assign(defaults, deff)
    if (el.value) el.value = format(el.value, opt)
    el.addEventListener('input', function () {
      let positionFromEnd = el.value.length - el.selectionEnd
      el.value = format(el.value, opt)
      positionFromEnd = Math.max(positionFromEnd, opt.suffix.length) // right
      positionFromEnd = el.value.length - positionFromEnd
      positionFromEnd = Math.max(positionFromEnd, opt.prefix.length + 1) // left
      setCursor(el, positionFromEnd)
      vnode.context.$emit('change')
    })
    el.addEventListener('focus', function () {
      setCursor(el, el.value.length - opt.suffix.length)
    })
  } catch (e) {
    console.log(e)
  }
}
