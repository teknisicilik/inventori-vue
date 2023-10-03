<template>
  <div class="login login-4 wizard d-flex flex-column flex-lg-row flex-column-fluid wizard" id="kt_login" data-wizard-state="between">
    <!--begin::Content-->
    <div class="login-container d-flex flex-center flex-row flex-row-fluid order-2 order-lg-1 flex-row-fluid bg-white py-lg-0 pb-lg-0 pt-15 pb-12">
      <!--begin::Container-->
      <div class="login-content login-content-signup d-flex flex-column mb-20">
        <template v-if="!finishRegister">
          <!--begin::Aside Top-->
          <div class="d-flex flex-column-auto flex-column px-10">
            <!--begin::Aside header-->
            <router-link :to="{ path: '/login' }" class="login-logo pb-lg-4 pb-10">
              <img :src="$_config.logo.lg" alt="Logo" class="max-h-90px" />
            </router-link>
            <!--end::Aside header-->
            <!--begin: Wizard Nav-->
            <div class="wizard-nav pt-5 pt-lg-15 pb-10">
              <!--begin::Wizard Steps-->
              <div class="wizard-steps d-flex flex-column flex-sm-row">
                <!--begin::Wizard Step 1 Nav-->
                <div class="wizard-step flex-grow-1 flex-basis-0" data-wizard-type="step" :data-wizard-state="registerStep(1)">
                  <div class="wizard-wrapper pr-7">
                    <div class="wizard-icon">
                      <i class="wizard-check ki ki-check"></i>
                      <span class="wizard-number">1</span>
                    </div>
                    <div class="wizard-label">
                      <h3 class="wizard-title">Info Akun</h3>
                      <div class="wizard-desc">Detail Data Diri</div>
                    </div>
                    <span class="svg-icon pl-6">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <polygon points="0 0 24 0 24 24 0 24"></polygon>
                          <rect fill="#000000" opacity="0.3" transform="translate(8.500000, 12.000000) rotate(-90.000000) translate(-8.500000, -12.000000)" x="7.5" y="7.5" width="2" height="9" rx="1"></rect>
                          <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
                <!--end::Wizard Step 1 Nav-->
                <!--begin::Wizard Step 2 Nav-->
                <div class="wizard-step flex-grow-1 flex-basis-0" data-wizard-type="step" :data-wizard-state="registerStep(2)">
                  <div class="wizard-wrapper pr-7">
                    <div class="wizard-icon">
                      <i class="wizard-check ki ki-check"></i>
                      <span class="wizard-number">2</span>
                    </div>
                    <div class="wizard-label">
                      <h3 class="wizard-title">Instansi</h3>
                      <div class="wizard-desc">Proyek &amp; Role</div>
                    </div>
                    <span class="svg-icon pl-6">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <polygon points="0 0 24 0 24 24 0 24"></polygon>
                          <rect fill="#000000" opacity="0.3" transform="translate(8.500000, 12.000000) rotate(-90.000000) translate(-8.500000, -12.000000)" x="7.5" y="7.5" width="2" height="9" rx="1"></rect>
                          <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
                <!--end::Wizard Step 2 Nav-->
                <!--begin::Wizard Step 3 Nav-->
                <div class="wizard-step flex-grow-1 flex-basis-0" data-wizard-type="step" :data-wizard-state="registerStep(3)">
                  <div class="wizard-wrapper">
                    <div class="wizard-icon">
                      <i class="wizard-check ki ki-check"></i>
                      <span class="wizard-number">3</span>
                    </div>
                    <div class="wizard-label">
                      <h3 class="wizard-title">Selesai</h3>
                      <div class="wizard-desc">Kirim Pendaftaran</div>
                    </div>
                  </div>
                </div>
                <!--end::Wizard Step 3 Nav-->
              </div>
              <!--end::Wizard Steps-->
            </div>
            <!--end: Wizard Nav-->
          </div>
          <!--end::Aside Top-->
          <!--begin::Signin-->
          <div class="login-form">
            <!--begin::Form-->
            <form @submit.prevent="submitForm()" autocomplete="off" class="form px-10 fv-plugins-bootstrap fv-plugins-framework">
              <div class="pb-5" data-wizard-type="step-content" :data-wizard-state="registerStep(1)">
                <!--begin::Title-->
                <div class="pt-lg-0 pt-5 pb-15">
                  <h3 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">Informasi Akun</h3>
                  <!-- <div class="text-muted font-weight-bold font-size-h4">Have a Different Address ? <a href="#" class="text-primary font-weight-bolder">Add Address</a></div> -->
                </div>
                <!--begin::Title-->
                <!--begin::Row-->
                <div class="row">
                  <div class="col-xl-6">
                    <div class="form-group fv-plugins-icon-container">
                      <label class="font-size-h6 font-weight-bolder text-dark">Nama Lengkap</label>
                      <input v-model="regForm.fullname" type="text" class="form-control form-control-solid h-auto py-5 px-4 border-0 rounded-lg font-size-h6" placeholder="Ketikkan nama lengkap Anda">
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <div class="form-group fv-plugins-icon-container">
                      <label class="font-size-h6 font-weight-bolder text-dark">Email</label>
                      <input @input="$set(apiValidate, 'email', true)" @change="checkAvail('email', regForm.email)" v-model="regForm.email" type="email" class="form-control form-control-solid h-auto py-5 px-4 border-0 rounded-lg font-size-h6" placeholder="Ketikkan alamat E-mail Anda">
                      <span v-if="apiValidate.email" class="form-text text-danger"> Email salah / sudah terdaftar, gunakan email lain </span>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <div class="form-group fv-plugins-icon-container">
                      <label class="font-size-h6 font-weight-bolder text-dark">Username</label>
                      <input @input="$set(apiValidate, 'username', true)" @change="checkAvail('username', regForm.username)" v-model="regForm.username" type="text" class="form-control form-control-solid h-auto py-5 px-4 border-0 rounded-lg font-size-h6" placeholder="Ketikkan username Anda">
                      <span v-if="apiValidate.username" class="form-text text-danger"> Username sudah terdaftar, gunakan username lain </span>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <div class="form-group fv-plugins-icon-container">
                      <label class="font-size-h6 font-weight-bolder text-dark">Password</label>
                      <input v-model="regForm.password" :type="showPassword? 'text':'password'" class="form-control form-control-solid h-auto py-5 px-4 border-0 rounded-lg font-size-h6" placeholder="8 - 16 Karakter">
                      <div @click="showPassword = !showPassword" class="d-flex align-items-center justify-content-end">
                        <i class="ri-lock-password-line"></i> <span class="form-text text-muted ml-2 pointer"> {{ showPassword? 'Sembunyikan Password': 'Tampilkan Password' }} </span>
                      </div>
                    </div>
                  </div>
                </div>
                <!--end::Row-->
              </div>
              <div class="pb-5" data-wizard-type="step-content" :data-wizard-state="registerStep(2)">
                <!--begin::Title-->
                <div class="pt-lg-0 pt-5 pb-15">
                  <h3 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">Role Sistem &amp; Proyek</h3>
                  <!-- <div class="text-muted font-weight-bold font-size-h4">Have a Different Address ? <a href="#" class="text-primary font-weight-bolder">Add Address</a></div> -->
                </div>
                <!--begin::Title-->
                <div class="row">
                  <div class="col-xl-12">
                    <div class="form-group fv-plugins-icon-container">
                      <label class="font-size-h6 font-weight-bolder text-dark mb-3">Role Sistem</label>
                      <div class="radio-list">
                        <label v-for="(r,i) in roleList" :key="i+'-master-role'" class="radio radio-lg" id="popover-pm">
                          <input v-model.number="regForm.role_id" :value="r.id" type="radio" name="radio_role">
                          <span></span>
                          <div>
                            <span class="d-block font-weight-bold">{{ r.role_name }}</span> {{ r.description }}
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-12">
                    <div class="form-group fv-plugins-icon-container">
                      <label class="font-size-h6 font-weight-bolder text-dark">Pilih Departemen</label>
                      <v-select :clearable="false" @input="getProject($event)" v-model="temp_department" :appendToBody="true" class="vs-style" :options="datasets.department" :placeholder="'Departemen'">
                        <slot name="no-options">{{ $t('error.no_data') }}</slot>
                      </v-select>
                    </div>
                  </div>
                  <div class="col-xl-12">
                    <div class="form-group fv-plugins-icon-container">
                      <label class="font-size-h6 font-weight-bolder text-dark">Pilih Proyek</label>
                      <v-select :clearable="false" @input="filterProject($event)" v-model="temp_project" :appendToBody="true" class="vs-style" :options="datasets.project" :placeholder="'Proyek'">
                        <slot name="no-options">{{ $t('error.no_data') }}</slot>
                      </v-select>
                    </div>
                  </div>
                  <div class="col-xl-12">
                    <div class="form-group fv-plugins-icon-container">
                      <label class="font-size-h6 font-weight-bolder text-dark">Jabatan</label>
                      <input v-model="regForm.job_position" type="text" class="form-control form-control-solid h-auto py-5 px-4 border-0 rounded-lg font-size-h6" placeholder="Jabatan Anda">
                    </div>
                  </div>
                </div>
                <!--end::Row-->
              </div>
              <div class="pb-5" data-wizard-type="step-content" :data-wizard-state="registerStep(3)">
                <!--begin::Title-->
                <div class="pt-lg-0 pt-5 pb-15">
                  <h3 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">Selesai</h3>
                  <div class="text-muted font-weight-bold font-size-h4">Periksa kembali detail yang Anda Kirimkan</div>
                </div>
                <!--end::Title-->
                <!--begin::Section-->
                <h4 class="font-weight-bolder mb-3">Informasi Akun:</h4>
                <div class="text-dark-50 font-weight-bold line-height-lg mb-8">
                  <div>{{ regForm.fullname }}</div>
                  <div>{{ regForm.username }}</div>
                  <div>{{ regForm.email }}</div>
                </div>
                <!--end::Section-->
                <!--begin::Section-->
                <h4 class="font-weight-bolder mb-3">Role &amp; Proyek:</h4>
                <div class="text-dark-50 font-weight-bold line-height-lg mb-8">
                  <div v-if="regForm.role_id">{{ roleList.filter(x=> x.id == regForm.role_id)[0]['role_name'] }}</div>
                  <div v-if="temp_department">Departemen {{ temp_department.label }}</div>
                  <div v-if="temp_project">Proyek {{ temp_project.label }}</div>
                  <div>Jabatan {{ regForm.job_position }}</div>
                </div>
                <!--end::Section-->
                <!--begin::Section-->
                <!-- <h4 class="font-weight-bolder mb-3">Support Channels:</h4> -->
                <div class="text-dark-50 font-weight-bold line-height-lg mb-8 mt-10">
                  <div>Kami akan mengirimkan email untuk mengonfirmasi alamat email Anda, Silahkan lakukan verifikasi untuk melanjutkan ke proses selanjutnya</div>
                  <div>Terimakasih, <br><br>Tim QHSE Adhi Karya V2<br> PT ADHI KARYA (Persero) Tbk.<br> South Building Jalan Raya Pasar Minggu KM. 18<br> Jakarta Selatan 12510 <br>Indonesia </div>
                </div>
                <!--end::Section-->
              </div>
              <div class="d-flex justify-content-between pt-7">
                <div class="mr-2">
                  <router-link :to="{ path: '/login' }" v-if="step === 1" class="btn btn-link font-weight-bolder font-size-h6 pr-8 pl-6 py-4 my-3 mr-3" data-wizard-type="action-prev">
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
                  <button @click="(e)=> { e.preventDefault(); step-- }" v-if="step != 1" class="btn btn-light-primary font-weight-bolder font-size-h6 pr-8 pl-6 py-4 my-3 mr-3" data-wizard-type="action-prev">
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
                    </span>Sebelumnya </button>
                </div>
                <div>
                  <button type="button" @click="submitForm()" :disabled="isLoadingSubmit" v-if="step == 3" class="btn btn-primary font-weight-bolder font-size-h6 py-4 my-3 d-flex align-items-center"> Kirim Pendaftaran  <b-spinner v-if="isLoadingSubmit" variant="light" label="Spinning" class="ml-3"></b-spinner></button>
                  <button @click="(e)=> { e.preventDefault(); step++ }" v-if="step != 3" :disabled="validateStep" class="btn btn-primary font-weight-bolder font-size-h6 pl-8 pr-4 py-4 my-3" data-wizard-type="action-next">Selanjutnya <span class="svg-icon svg-icon-md ml-2">
                      <!--begin::Svg Icon | path:/metronic/theme/html/demo3/dist/assets/media/svg/icons/Navigation/Right-2.svg-->
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <polygon points="0 0 24 0 24 24 0 24"></polygon>
                          <rect fill="#000000" opacity="0.3" transform="translate(8.500000, 12.000000) rotate(-90.000000) translate(-8.500000, -12.000000)" x="7.5" y="7.5" width="2" height="9" rx="1"></rect>
                          <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"></path>
                        </g>
                      </svg>
                      <!--end::Svg Icon-->
                    </span>
                  </button>
                </div>
              </div>
            </form>
            <!--end::Form-->
          </div>
          <!--end::Signin-->
        </template>
        <template v-else>
          <div class="d-flex flex-column-auto flex-column px-10">
            <router-link :to="{ path: '/login' }" class="login-logo pb-lg-4 pb-10">
              <img :src="$_config.logo.sm" alt="Logo" class="max-h-70px" />
            </router-link>
          </div>
          <div class="pt-lg-0 pt-5 pb-15">
            <h3 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">Pendaftaran Selesai</h3>
            <div class="text-muted font-weight-bold font-size-h4">Silahkan periksa Email Anda, atau <router-link :to="{ path: '/login' }" class="text-primary font-weight-bolder">Ke Halaman Login </router-link>
            </div>
          </div>
          <img src="/static/img/qhse/no-data.svg" alt="" sizes="" srcset="">
        </template>
      </div>
      <!--end::Container-->
    </div>
    <!--begin::Content-->
    <!--begin::Aside-->
    <div class="login-aside order-1 order-lg-2 bgi-no-repeat bgi-position-x-right">
      <div class="login-conteiner bgi-no-repeat bgi-position-x-right bgi-position-y-bottom" style="background-image: url(/static/img/default/register-visual.svg);">
        <!--begin::Aside title-->
        <h3 class="pt-lg-40 pl-lg-20 pb-lg-0 pl-10 py-20 m-0 d-flex justify-content-lg-start font-weight-boldest display5 display1-lg text-white">QHSE<br>Adhi Karya<br>Persero<br>Tbk.</h3>
        <!--end::Aside title-->
      </div>
    </div>
    <!--end::Aside-->
  </div>
</template>
<script>
// import { debounce } from 'lodash'

export default {
  name: 'register-page',
  data () {
    return {
      finishRegister: false,
      step: 1,
      regForm: {
        fullname: null,
        username: null,
        password: null,
        email: null,
        department_id: null,
        project_id: null,
        role_id: null,
        job_position: null
      },
      datasets: {
        department: [],
        project: []
      },
      temp_department: null,
      temp_project: null,
      showPassword: false,
      projectList: [],
      roleList: [],
      apiValidate: {
        email: null,
        username: null
      },
      isLoadingSubmit: false
    }
  },
  computed: {
    validateStep () {
      if (this.step === 1) {
        return !(!this.apiValidate.email && !this.apiValidate.username && this.regForm.fullname && this.regForm.username && this.regForm.password && this.regForm.email)
      } else if (this.step === 2) {
        return !(this.regForm.project_id && this.regForm.department_id && this.regForm.role_id && this.regForm.job_position)
      } else return false
    }
  },
  mounted () {
    this.getDepartment()
    this.getRole()
  },
  methods: {
    registerStep (id) {
      if (this.step > id) return 'done'
      else if (this.step < id) return 'pending'
      else return 'current'
    },
    checkAvail (prop, value) {
      let data = {}
      data[prop] = value
      this.$_api.get('/no-auth/find-user-by-username-email', data).then(res => {
        this.$set(this.apiValidate, prop, res)
      })
    },
    getRole () {
      this.$_api.dataset('/no-auth/role-register').then(res => {
        this.roleList = res.data
      })
    },
    getDepartment () {
      this.$_api.dataset('/no-auth/departments').then(res => {
        let data = res.data.map(x => { return { label: x.department_name, code: x.id } })
        this.$set(this.datasets, 'department', data)
      })
    },
    getProject (deptID) {
      this.temp_project = null
      this.$set(this.regForm, 'project_id', null)
      if (deptID.code) {
        let filter = {
          department_id: deptID.code
        }
        this.$_api.dataset('/no-auth/projects', filter).then(res => {
          let data = res.data.map(x => { return { label: x.project_name, code: x.id } })
          this.$set(this.datasets, 'project', data)
        })
      }
    },
    filterProject (e) {
      this.$set(this.regForm, 'project_id', e.code)
      this.$set(this.regForm, 'department_id', this.temp_department)
    },
    submitForm () {
      this.isLoadingSubmit = true
      this.$_api.post('/register', this.regForm).then(res => {
        this.finishRegister = true
        this.isLoadingSubmit = false
      }).catch((err) => { this.$_alert.error(err); this.isLoadingSubmit = false })
    }
  }
}
</script>
<style scoped>
  .login.login-4 .login-container .login-content {
    width: 450px;
  }
  .login.login-4 .login-container .login-content .wizard-nav {
    padding: 0;
  }
  .login.login-4 .login-container .login-content .wizard-nav .wizard-steps {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .login.login-4
    .login-container
    .login-content
    .wizard-nav
    .wizard-steps
    .wizard-step {
    padding: 0.75rem 0;
    -webkit-transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, -webkit-box-shadow 0.15s ease;
    transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, -webkit-box-shadow 0.15s ease;
    transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, box-shadow 0.15s ease;
    transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, box-shadow 0.15s ease,
      -webkit-box-shadow 0.15s ease;
    margin-bottom: 1.5rem;
  }
  .login.login-4
    .login-container
    .login-content
    .wizard-nav
    .wizard-steps
    .wizard-step
    .wizard-wrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .login.login-4
    .login-container
    .login-content
    .wizard-nav
    .wizard-steps
    .wizard-step
    .wizard-icon {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, -webkit-box-shadow 0.15s ease;
    transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, -webkit-box-shadow 0.15s ease;
    transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, box-shadow 0.15s ease;
    transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, box-shadow 0.15s ease,
      -webkit-box-shadow 0.15s ease;
    width: 46px;
    height: 46px;
    border-radius: 12px;
    background-color: #f3f6f9;
    margin-right: 1rem;
  }
  .login.login-4
    .login-container
    .login-content
    .wizard-nav
    .wizard-steps
    .wizard-step
    .wizard-icon
    .wizard-check {
    display: none;
    font-size: 1.4rem;
  }
  .login.login-4
    .login-container
    .login-content
    .wizard-nav
    .wizard-steps
    .wizard-step
    .wizard-icon
    .wizard-number {
    font-weight: 600;
    color: #3f4254;
    font-size: 1.35rem;
  }
  .login.login-4
    .login-container
    .login-content
    .wizard-nav
    .wizard-steps
    .wizard-step
    .wizard-label {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .login.login-4
    .login-container
    .login-content
    .wizard-nav
    .wizard-steps
    .wizard-step
    .wizard-label
    .wizard-title {
    color: #181c32;
    font-weight: 600;
    font-size: 1.24rem;
  }
  .login.login-4
    .login-container
    .login-content
    .wizard-nav
    .wizard-steps
    .wizard-step
    .wizard-label
    .wizard-desc {
    color: #b5b5c3;
    font-size: 0.925rem;
  }
  .login.login-4
    .login-container
    .login-content
    .wizard-nav
    .wizard-steps
    .wizard-step[data-wizard-state='done']
    .wizard-icon {
    -webkit-transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, -webkit-box-shadow 0.15s ease;
    transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, -webkit-box-shadow 0.15s ease;
    transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, box-shadow 0.15s ease;
    transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, box-shadow 0.15s ease,
      -webkit-box-shadow 0.15s ease;
    background-color: #e1f0ff;
  }
  .login.login-4
    .login-container
    .login-content
    .wizard-nav
    .wizard-steps
    .wizard-step[data-wizard-state='done']
    .wizard-icon
    .wizard-check {
    color: #3699ff;
    display: inline-block;
  }
  .login.login-4
    .login-container
    .login-content
    .wizard-nav
    .wizard-steps
    .wizard-step[data-wizard-state='done']
    .wizard-icon
    .wizard-number {
    display: none;
  }
  .login.login-4
    .login-container
    .login-content
    .wizard-nav
    .wizard-steps
    .wizard-step[data-wizard-state='done']
    .wizard-label
    .wizard-title {
    color: #b5b5c3;
  }
  .login.login-4
    .login-container
    .login-content
    .wizard-nav
    .wizard-steps
    .wizard-step[data-wizard-state='done']
    .wizard-label
    .wizard-desc {
    color: #d1d3e0;
  }
  .login.login-4
    .login-container
    .login-content
    .wizard-nav
    .wizard-steps
    .wizard-step[data-wizard-state='current'] {
    -webkit-transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, -webkit-box-shadow 0.15s ease;
    transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, -webkit-box-shadow 0.15s ease;
    transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, box-shadow 0.15s ease;
    transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, box-shadow 0.15s ease,
      -webkit-box-shadow 0.15s ease;
  }
  .login.login-4
    .login-container
    .login-content
    .wizard-nav
    .wizard-steps
    .wizard-step[data-wizard-state='current']
    .wizard-icon {
    -webkit-transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, -webkit-box-shadow 0.15s ease;
    transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, -webkit-box-shadow 0.15s ease;
    transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, box-shadow 0.15s ease;
    transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, box-shadow 0.15s ease,
      -webkit-box-shadow 0.15s ease;
    background-color: #e1f0ff;
  }
  .login.login-4
    .login-container
    .login-content
    .wizard-nav
    .wizard-steps
    .wizard-step[data-wizard-state='current']
    .wizard-icon
    .wizard-check {
    color: #3699ff;
    display: none;
  }
  .login.login-4
    .login-container
    .login-content
    .wizard-nav
    .wizard-steps
    .wizard-step[data-wizard-state='current']
    .wizard-icon
    .wizard-number {
    color: #3699ff;
  }
  .login.login-4
    .login-container
    .login-content
    .wizard-nav
    .wizard-steps
    .wizard-step[data-wizard-state='current']
    .wizard-label
    .wizard-title {
    color: #181c32;
  }
  .login.login-4
    .login-container
    .login-content
    .wizard-nav
    .wizard-steps
    .wizard-step[data-wizard-state='current']
    .wizard-label
    .wizard-desc {
    color: #b5b5c3;
  }
  .login.login-4 .login-container .login-content.login-content-signup {
    width: 700px;
  }
  .login.login-4 .login-aside {
    /* background: linear-gradient(147.04deg, #ca7b70 0.74%, #5a2119 99.61%); */
    background: linear-gradient(
      0deg,
      rgba(0, 180, 227, 1) 0%,
      rgba(0, 155, 189, 1) 100%
    );
    width: 700px;
  }
  .login.login-4 .login-aside .login-conteiner {
    height: 100%;
  }

  @media (min-width: 992px) {
    .login.login-4 .login-aside .login-conteiner {
      min-height: 610px !important;
      background-size: 580px;
    }
  }
  @media (min-width: 992px) and (max-width: 1399.98px) {
    .login.login-4 .login-aside .login-conteiner {
      min-height: 420px !important;
      background-size: 400px;
    }
  }
  @media (max-width: 991.98px) {
    .login.login-4 .login-container .wizard-nav {
      padding: 0;
      -ms-flex-line-pack: center;
      align-content: center;
    }
    .login.login-4 .login-container .wizard-nav .wizard-steps .wizard-step {
      margin-bottom: 0.5rem;
    }
    .login.login-4 .login-aside {
      width: 100% !important;
    }
    .login.login-4 .login-aside .login-conteiner {
      min-height: 210px !important;
      background-size: 200px;
    }
  }
  @media (max-width: 575.98px) {
    .login.login-4 .login-container {
      width: 100%;
    }
    .login.login-4 .login-container .wizard-nav .wizard-steps {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
    }
    .login.login-4 .login-container .wizard-nav .wizard-steps .wizard-step {
      width: 100%;
    }
    .login.login-4
      .login-container
      .wizard-nav
      .wizard-steps
      .wizard-step
      .wizard-wrapper
      .svg-icon {
      display: none;
    }
    .login.login-4 .login-container .login-content {
      width: 100%;
    }
    .login.login-4 .login-container .login-content.login-content-signup {
      width: 100%;
    }
    .login.login-4 .login-aside {
      width: 100% !important;
    }
  }
  @media (max-width: 1800px) {
    .login.login-4 .login-aside {
      width: 600px;
    }
  }
</style>
