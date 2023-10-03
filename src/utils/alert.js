import Vue from 'vue'

const _alert = {
  error (err, title = null, text = null) {
    const message = err.data ? err.data.message : err.message
    return Vue.swal({
      position: 'center',
      icon: 'error',
      title: title || 'Error',
      text: text || message,
      toast: false,
      timer: 3000,
      showConfirmButton: false
    })
  },
  success (title = null, text = null) {
    return Vue.swal({
      position: 'top-right',
      icon: 'success',
      title: title || text,
      // text: text,
      toast: true,
      timer: 3000,
      showConfirmButton: false
    })
  },
  confirm (title = null, text = null, agree = null, disagree = null, icon = null) {
    return Vue.swal({
      title: title,
      text: text,
      icon: icon || 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--primary)',
      cancelButtonColor: '#868e96',
      confirmButtonText: agree || 'Ya, Lanjutkan',
      cancelButtonText: disagree || 'Batalkan'
    })
  }
}

export default _alert
