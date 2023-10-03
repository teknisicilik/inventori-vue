<template>
  <div class="login login-2 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white" id="kt_login">
    <!--begin::Aside-->
    <div class="login-aside order-2 order-lg-1 d-flex flex-row-auto position-relative overflow-hidden">
      <!--begin: Aside Container-->
      <div class="d-flex flex-column-fluid flex-column justify-content-between py-9 px-7 py-lg-13 px-lg-35">
        <!--begin::Logo-->
        <router-link :to="{ path: '/login' }" class="text-center pt-2">
          <img :src="$_config.logo.sm" alt="Logo" class="max-h-75px" />
        </router-link>
        <!--end::Logo-->
        <!--begin::Aside body-->
        <div class="d-flex flex-column-fluid flex-column flex-center">
          <div v-if="!isSubmitted" class="login-form login-signin py-11">
            <form @submit.prevent="sendAPI(code)" class="form fv-plugins-bootstrap fv-plugins-framework" novalidate="novalidate" id="kt_login_signin_form">
              <!--begin::Title-->
              <div class="text-center pb-20">
                <h2 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">Verifikasi Akun <br>{{ $_config.name }}</h2>
              </div>
              <!--end::Title-->
              <!--begin::Form group-->
              <div class="form-group fv-plugins-icon-container has-success">
                <label class="font-size-h6 font-weight-bolder text-dark">Kode Verifikasi</label>
                <input v-model.lazy.trim="code" class="form-control form-control-solid h-auto py-7 px-6 rounded-lg " type="text" name="code" autocomplete="off">
                <div class="fv-plugins-message-container"></div>
              </div>
              <!--end::Form group-->
              <div v-if="error" class="alert alert-custom alert-default p-2" role="alert">
                <div class="alert-icon">
                  <i class="ri-error-warning-fill text-danger"></i>
                </div>
                <div class="alert-text">{{ error }}</div>
              </div>
              <!--begin::Action-->
              <div class="text-center pt-2">
                <button class="pointer btn btn-dark font-weight-bolder font-size-h6 px-8 py-4 my-3">Kirim</button>
              </div>
            </form>
          </div>
          <!-- <div v-else class="login-form login-signin py-11"> -->
            <div v-else class="login-form login-signin py-11"  style="max-width:400px">
              <h2 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">{{ title }}<br>&nbsp;</h2>
              <p class="font-weight-bold font-size-h6 text-muted">Saat ini data anda sedang dalam proses persetujuan oleh Admin Departemen<br><br>Untuk informasi atau pertanyaan lebih lanjut, silahkan hubungi PIC Departemen masing-masing</p>
            </div>
          <!-- </div> -->
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
      <!-- <div class="d-flex flex-column justify-content-center text-center pt-lg-40 pt-md-5 pt-sm-5 px-lg-0 pt-5 px-7">
        <h3 class="display4 font-weight-bolder my-7 text-dark" style="color: #986923;">Amazing Wireframes</h3>
        <p class="font-weight-bolder font-size-h2-md font-size-lg text-dark opacity-70">User Experience &amp; Interface Design, Product Strategy <br>Web Application SaaS Solutions</p>
      </div> -->
      <!--end::Title-->
      <!--begin::Image-->
      <div class="content-img d-flex flex-row-fluid bgi-no-repeat bgi-position-y-center bgi-position-x-center" style="background-image: url(/static/img/qhse/waiting-side.svg);"></div>
      <!--end::Image-->
    </div>
    <!--end::Content-->
  </div>
</template>
<style scoped>
  .login.login-2 .login-forgot,
  .login.login-2 .login-signin,
  .login.login-2 .login-signup {
    display: none;
  }
  .login.login-2.login-signin-on .login-signup {
    display: none;
  }
  .login.login-2.login-signin-on .login-signin {
    display: block;
  }
  .login.login-2.login-signin-on .login-forgot {
    display: none;
  }
  .login.login-2.login-signup-on .login-signup {
    display: block;
  }
  .login.login-2.login-signup-on .login-signin {
    display: none;
  }
  .login.login-2.login-signup-on .login-forgot {
    display: none;
  }
  .login.login-2.login-forgot-on .login-signup {
    display: none;
  }
  .login.login-2.login-forgot-on .login-signin {
    display: none;
  }
  .login.login-2.login-forgot-on .login-forgot {
    display: block;
  }
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
  data () {
    return {
      code: null,
      error: null,
      isSubmitted: false
    }
  },
  mounted () {
    this.code = this.$route.query.code
    this.$nextTick()
    this.sendAPI(this.$route.query.code)
  },
  methods: {
    sendAPI (data) {
      this.$_api.post('/verify-email', { code: data }).then(res => {
        this.isSubmitted = true
        this.title = res.message
      }).catch((err) => {
        this.error = err.data.message
      })
    }
  }
}
</script>
