<template>
  <div class="login login-2 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white" id="kt_login">
    <!--begin::Aside-->
    <div class="login-aside order-2 order-lg-1 d-flex flex-row-auto position-relative overflow-hidden">
      <!--begin: Aside Container-->
      <div class="d-flex flex-column-fluid flex-column justify-content-between py-9 px-7 py-lg-13 px-lg-20">
        <!--begin::Logo-->
        <router-link :to="{ path: '/login' }" class="text-center pt-2">
          <img :src="$_config.logo.lg" alt="Logo" class="max-h-90px" />
          <img src="/static/img/logo/adhi/QHSE_720.png" alt="Logo" class="max-h-90px" />
        </router-link>
        <!--end::Logo-->
        <!--begin::Aside body-->
        <div class="d-flex flex-column-fluid flex-column flex-center">
          <!--begin::Forgot-->
          <div class="login-form login-forgot pt-11">
            <!--begin::Form-->
            <form @submit.prevent="resetPassword()" class="form fv-plugins-bootstrap fv-plugins-framework">
              <!--begin::Title-->
              <div class="text-center pb-8">
                <h2 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">Reset Password</h2>
                <p class="text-muted font-weight-bold font-size-h5">Ganti kata sandi Anda dengan yang baru</p>
              </div>
              <!--end::Title-->
              <!--begin::Form group-->
              <div class="form-group fv-plugins-icon-container">
                <input v-model="newPassword" class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6" :type="formType" placeholder="Kata sandi baru" name="pass" autocomplete="off">
                <div class="fv-plugins-message-container"></div>
              </div>
              <div class="form-group fv-plugins-icon-container">
                <input v-model="rePassword" class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6" :type="formType" placeholder="Konfirmasi kata sandi baru" name="repass" autocomplete="off">
                <div class="fv-plugins-message-container">
                  <span class="font-weight-bold text-primary mt-3 ml-2 pointer" @click="changeType()"> {{formType === 'password'? 'Tampilkan Kata sandi' : 'Sembunyikan Kata sandi' }}</span>
                </div>
              </div>
              <!--end::Form group-->
              <div v-if="errorRepassword" class="alert alert-custom alert-default p-2" role="alert">
                <div class="alert-icon">
                  <i class="ri-error-warning-fill text-danger"></i>
                </div>
                <div class="alert-text">{{ errorRepassword }} </div>
              </div>
              <div v-if="notSameText" class="alert alert-custom alert-default p-2" role="alert">
                <div class="alert-icon">
                  <i class="ri-error-warning-fill text-danger"></i>
                </div>
                <div class="alert-text">{{ notSameText }} </div>
              </div>
              <!--begin::Form group-->
              <div class="form-group d-flex flex-wrap flex-center pb-lg-0 pb-3">
                <button :disabled="!newPassword || !rePassword || (newPassword !== rePassword)" type="submit" id="kt_login_forgot_submit" class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mx-4">Perbarui &amp; Login</button>
              </div>
              <!--end::Form group-->
              <div></div>
            </form>
            <!--end::Form-->
          </div>
          <!--end::Forgot-->
        </div>
        <!--end::Aside body-->
        <!--begin: Aside footer for desktop-->
        <div class="text-center">
          <p class="font-weight-bold font-size-h5 text-muted">{{ $_config.name }}</p>
        </div>
        <!--end: Aside footer for desktop-->
      </div>
      <!--end: Aside Container-->
    </div>
    <!--begin::Aside-->
    <!--begin::Content-->
    <div class="content order-1 order-lg-2 d-flex flex-column w-100 pb-0" style="background-color: #B1DCED;">
      <!--begin::Title-->
      <div class="d-flex flex-column justify-content-center text-center pt-lg-40 pt-md-5 pt-sm-5 px-lg-0 pt-5 px-7">
        <h3 class="display4 font-weight-bolder my-7 text-dark" style="color: #986923;">{{ $_config.name }}</h3>
        <p class="font-weight-bolder font-size-h2-md font-size-lg text-dark opacity-70">Quality, Health, Safety &amp; Environment <br>PT Adhi Karya (Persero) Tbk.</p>
      </div>
      <!--end::Title-->
      <!--begin::Image-->
      <div class="content-img d-flex flex-row-fluid bgi-no-repeat bgi-position-y-center bgi-position-x-center" style="background-image: url(/static/img/qhse/login-side.svg);"></div>
      <!--end::Image-->
    </div>
    <!--end::Content-->
  </div>
</template>
<style scoped>
  .login.login-2 .content .content-img {
    min-height: 450px;
  }
  @media (min-width: 992px) {
    .login.login-2 .login-aside {
      width: 100%;
      max-width: 600px;
    }
    .login.login-2 .content .content-img {
      min-height: 600px !important;
    }
    .login.login-2 .login-form {
      width: 100%;
      max-width: 450px;
    }
  }
  @media (min-width: 992px) and (max-width: 1399.98px) {
    .login.login-2 .login-aside {
      width: 100%;
      max-width: 600px;
    }
  }
  @media (max-width: 991.98px) {
    .login.login-2 .content .content-img {
      min-height: 470px !important;
      background-size: 700px;
    }
    .login.login-2 .login-form {
      width: 100%;
      max-width: 400px;
    }
  }
  @media (max-width: 575.98px) {
    .login.login-2 .content .content-img {
      min-height: 280px !important;
      background-size: 400px;
    }
    .login.login-2 .login-form {
      width: 100%;
      max-width: 100%;
    }
  }
</style>
<script>
export default {
  name: 'login-page',
  props: {
    code: { type: String },
    ts: { type: Number }
  },
  data () {
    return {
      newPassword: null,
      rePassword: null,
      formType: 'password',
      errorRepassword: null
    }
  },
  computed: {
    notSameText () {
      if (this.newPassword && this.rePassword) {
        if (this.newPassword !== this.rePassword) return 'Konfirmasi kata sandi tidak cocok'
        else return null
      } else return null
    }
  },
  mounted () {
    if (!this.code || !this.ts) this.$router.push({ name: 'login' })
    else {
      let paramDate = new Date(this.ts * 1000)
      let now = new Date()
      let diff = new Date(now.getTime() - paramDate.getTime()).getUTCDate() - 1
      if (diff > 1) this.$router.push({ name: 'login' })
    }
  },
  methods: {
    resetPassword () {
      let form = {
        code: this.code,
        password: this.newPassword
      }
      this.$_api.post('/change_password', form).then(res => {
        this.$_alert.success('Password Berhasil diperbarui')
        this.$router.push({ name: 'login' })
      }).catch((err) => { this.errorRepassword = err.data.message })
    },
    changeType () {
      if (this.formType === 'password') this.formType = 'text'
      else this.formType = 'password'
    }
  }
}
</script>
