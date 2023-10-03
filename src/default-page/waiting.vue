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
        <div class="login-form login-signin py-11">
          <div class="d-flex flex-column-fluid flex-column flex-center">
            <div class="text-left pb-20">
              <h2 class="text-center font-weight-bolder text-dark font-size-h2 font-size-h1-lg mb-10">Proses Persetujuan</h2>
              <p class="font-weight-bold font-size-h5 text-muted">Saat ini data anda sedang dalam proses persetujuan oleh Admin Departemen</p>
              <!-- <p class="font-weight-bold font-size-h5 text-muted">Konfirmasi persetujuan akan terkirim otomatis ke email anda dalam kurun waktu 2x24 jam.</p> -->
              <p class="font-weight-bold font-size-h5 text-muted">Untuk informasi atau pertanyaan lebih lanjut, silahkan menuju Narahubung berikut :</p>
              <!-- <hr class="mt-15"> -->
              <div v-if="user.departement.contact_pic" class="form-group mt-10">
                <label class="font-weight-bold font-size-h5 text-muted">PIC Departemen</label>
                <div class="input-group input-group-lg">
                  <input type="text" readonly class="form-control text-muted" placeholder="Recipient's username" :value="user.departement.contact_pic" aria-describedby="basic-addon2">
                  <div id="tooltip-copy" class="input-group-append pointer" v-clipboard:copy="user.departement.contact_pic.split('-')[1].trim()" v-clipboard:success="handleCopy">
                    <span class="input-group-text">
                      <i class="ri-file-copy-line"></i>
                    </span>
                  </div>
                </div>
                <b-tooltip triggers="click" :show.sync="isCopyed" target="tooltip-copy" placement="top"> Nomor PIC sudah dicopy </b-tooltip>
              </div>
              <router-link :to="{ path: '/login' }" type="button" class="btn btn-link font-weight-bolder font-size-h6 pr-8 pl-0 py-4 my-3 mr-3" data-wizard-type="action-prev">
                <span class="svg-icon svg-icon-md mr-2">
                  <!--begin::Svg Icon | path:/metronic/theme/html/demo3/dist/assets/media/svg/icons/Navigation/Left-2.svg-->
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <polygon points="0 0 24 0 24 24 0 24"></polygon>
                      <rect fill="#000000" opacity="0.3" transform="translate(15.000000, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-15.000000, -12.000000)" x="14" y="7" width="2" height="10" rx="1"></rect>
                      <path d="M3.7071045,15.7071045 C3.3165802,16.0976288 2.68341522,16.0976288 2.29289093,15.7071045 C1.90236664,15.3165802 1.90236664,14.6834152 2.29289093,14.2928909 L8.29289093,8.29289093 C8.67146987,7.914312 9.28105631,7.90106637 9.67572234,8.26284357 L15.6757223,13.7628436 C16.0828413,14.136036 16.1103443,14.7686034 15.7371519,15.1757223 C15.3639594,15.5828413 14.7313921,15.6103443 14.3242731,15.2371519 L9.03007346,10.3841355 L3.7071045,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(9.000001, 11.999997) scale(-1, -1) rotate(90.000000) translate(-9.000001, -11.999997)"></path>
                    </g>
                  </svg>
                  <!--end::Svg Icon-->
                </span>Kembali ke Halaman Login
              </router-link>
            </div>
          </div>
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
  props: {
    user: { required: true }
  },
  data () {
    return {
      error: null,
      isCopyed: false
    }
  },
  methods: {
    handleCopy (data) {
      console.log(data)
      this.isCopyed = true
    }
  }
}
</script>
