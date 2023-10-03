<template>
  <div>
    <div class="d-flex align-items-center mt-5">
      <div class="symbol symbol-100 mr-5">
        <div v-if="profile.img_photo_user" class="symbol-label" :style="{backgroundImage: 'url(' + profile.img_photo_user.url + ')' }"></div>
        <div v-else class="symbol-label" style="background-image: url(/static/img/qhse/no-profile.svg)"></div>
        <i class="symbol-badge bg-success"></i>
      </div>
      <div class="d-flex flex-column">
        <span class="font-weight-bold" style="word-break: break-word;">{{ profile.username }}</span>
        <span class="font-weight-bold font-size-h5 text-dark-75" style="word-break: break-word;">{{ profile.fullname }}</span>
        <div class="text-muted mt-1">{{ userRoles.join(', ') }}</div>
        <div class="navi mt-4">
          <a @click="showModalProfile()" class="btn btn-sm btn-light-primary font-weight-bolder py-2 px-5">Profile</a>
          <a @click="logOut()" class="btn btn-sm btn-light-danger font-weight-bolder py-2 px-5">Log Out</a>
        </div>
      </div>
    </div>
    <div class="separator separator-dashed mt-8 mb-5"></div>
    <table class="table no-border mb-0">
      <tr>
        <td class="nowrap-table pl-0">Email</td>
        <th style="word-break: break-all;">{{ profile.email ? profile.email : "-" }}</th>
      </tr>
      <tr>
        <td class="nowrap-table pl-0">No. Telp</td>
        <th class="pr-0">{{ profile.telephone ? profile.telephone : "-" }}</th>
      </tr>
      <!-- <tr>
        <td class="nowrap-table pl-0">Divisi</td>
        <th style="word-break: break-all;">{{ profile.division_name ? profile.division_name : "-" }}</th>
      </tr>
      <tr>
        <td class="nowrap-table pl-0">Departemen</td>
        <th style="word-break: break-all;">{{ profile.department_name ? profile.department_name : "-" }}</th>
      </tr>
      <tr>
        <td class="nowrap-table pl-0">Unit</td>
        <th style="word-break: break-all;">{{ profile.unit_name ? profile.unit_name : "-" }}</th>
      </tr> -->
    </table>
    <template v-if="$_config.options.autofill">
      <div class="separator separator-dashed mt-8 mb-5"></div>
      <span class="d-block font-weight-bolder text-dark-75 text-sm mb-1">Autofill Form</span>
      <span class="d-block font-weight-normal text-muted text-sm mb-4">Departemen &amp; Proyek akan terisi otomatis sesuai pilihan berikut</span>
      <div>
        <s-input style="z-index:1003" @input="$store.commit('set', ['autofill', $store.state.autofill, true])" v-model="$store.state.autofill.department_id.value" :item="{ notAppendToBody:true, label:'Departemen', type:'select', validation:[], placeholder: 'Pilih Departemen', optionList:$store.state.autofill.department_id.list }" />
        <s-input @input="$store.commit('set', ['autofill', $store.state.autofill, true])" v-model="$store.state.autofill.project_id.value" :item="{ notAppendToBody:true, label:'Proyek', type:'select', validation:[], placeholder: 'Pilih Proyek', optionList:$store.state.autofill.project_id.list }" />
      </div>
    </template>
    <div class="separator separator-dashed mt-8 mb-5"></div>
    <b-modal id="modal-profile" title="Profil Pengguna" hide-footer hide-header size="lg">
      <h5 class="card-title mb-0">
        <span class="card-label font-weight-bolder text-dark">Perbarui Informasi profil Anda</span>
      </h5>
      <hr>
      <template v-if="formProfile">
        <ValidationObserver v-slot="{ handleSubmit  }" ref="formProfileObserver">
          <form autocomplete="off" @submit.prevent="handleSubmit(changeProfile)">
            <div class="row">
              <div class="col-auto">
                <single-upload hide-desc v-model.lazy="formProfile.img_photo_user" :attr="[{ accept:'.jpg, .pdf, .jpeg' }, { limit: 2 }]" :error="[]" />
              </div>
              <div class="col">
                <s-input v-model="formProfile.fullname" :item="{ label:'Nama Pengguna', type:'text', validation:['required'], placeholder: '', api:'' }" />
                <s-input v-model="formProfile.username" :item="{ label:'Username', type:'text', validation:['required'], placeholder: '', api:'' }" />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <span class="d-block card-label font-weight-bold text-dark h6 mb-4">Kontak Pengguna</span>
              </div>
              <div class="col-12">
                <s-input v-model="formProfile.email" :item="{ label:'Email', type:'text', validation:['required'], placeholder: '', api:'' }" />
              </div>
             <!-- <div class="col-6">
                <s-input v-model="formProfile.telephone" :item="{ label:'No Telp.', type:'text', validation:['required'], placeholder: '', api:'' }" />
              </div>
              <div class="col-12">
                <span class="d-block card-label font-weight-bold text-dark h6 mb-4">Pekerjaan</span>
              </div>
              <div class="col-6">
                <s-input v-model="formProfile.nip" :item="{ label:'NIP (Nomor Induk Pegawai)', type:'text', validation:[], placeholder: '', api:'' }" />
              </div>
              <div class="col-6">
                <s-input v-model="formProfile.job_position" :item="{ label:'Jabatan', type:'text', validation:['required'], placeholder: '', api:'' }" />
              </div> -->
              <div class="col-12 text-right">
                <button class="btn btn-light-primary">Simpan Profil</button>
              </div>
            </div>
          </form>
        </ValidationObserver>
        <div class="separator separator-dashed mt-8 mb-8"></div>
        <ValidationObserver v-slot="{ handleSubmit  }" ref="formPasswordObserver">
          <form autocomplete="off" @submit.prevent="handleSubmit(changePassword)">
            <div class="row">
              <div class="col-12 mb-4">
                <span class="card-label font-weight-bold text-dark h6">Ubah Kata sandi</span>
              </div>
              <div class="col-6">
                <ValidationProvider rules="required" v-slot="{ errors, classes }" vid="password" :name="'Kata sandi Baru'">
                  <div class="form-group">
                    <label for="">Kata sandi Baru</label>
                    <input v-model="formPassword.password" :type="formPassword.show? 'text': 'password' " class="form-control" :class="classes">
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                    <div class="d-flex align-items-center mt-3">
                      <i class="ri-lock-password-line mr-3"></i>
                      <span @click="$set(formPassword, 'show', !formPassword.show)" class="form-text text-muted text-hover-primary pointer"> {{ !formPassword.show? 'Tampilkan': 'Sembunyikan' }} Kata sandi</span>
                    </div>
                  </div>
                </ValidationProvider>
              </div>
              <div class="col-6">
                <ValidationProvider rules="confirmed:password|required" v-slot="{ errors, classes }" :name="'Konfirmasi Kata sandi'">
                  <div class="form-group">
                    <label for="">Konfirmasi Kata sandi</label>
                    <input v-model="formPassword.confirm" :type="formPassword.show? 'text': 'password' " class="form-control" :class="classes">
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </ValidationProvider>
              </div>
              <div class="col-12 text-right">
                <button class="btn btn-light-danger">Simpan Kata sandi</button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'profile-component',
  data () {
    return {
      profile: JSON.parse(localStorage.getItem('profile')),
      formProfile: null,
      formPassword: {
        password: null,
        confirm: null,
        show: false
      }
    }
  },
  computed: {
    userRoles () {
      const roles = this.profile.data_role_id
      if (!roles || !roles.length) return []
      let arrayColumn = (array, column) => {
        return roles.map(item => item[column])
      }
      return arrayColumn(this.profile.data_role_id, 'role_name')
    }
  },
  methods: {
    logOut () {
      this.$router.push({ path: '/login' })
      localStorage.clear()
      this.$store.replaceState({
        sideNavPrimary: false,
        sideNavSecondary: false,
        sideNavMobile: false
      })
      this.$_sys.togleClass('kt_body', 'aside-minimize', true)
    },
    showModalProfile () {
      let profile = JSON.parse(localStorage.getItem('profile'))
      delete profile.password
      this.formProfile = Object.assign({}, this.formProfile, profile)
      this.$bvModal.show('modal-profile')
    },
    changeProfile () {
      this.$_api.update('/users', this.formProfile).then(res => {
        this.$_alert.success('Profil berhasil diperbarui')
        this.$store.commit('set', ['profile', res.data, true])
        this.profile = Object.assign({}, this.profile, res.data)
        this.$refs.formProfileObserver.reset()
      }).catch((err) => { this.$_alert.error(err) })
    },
    changePassword () {
      let form = {
        username: this.profile.username,
        password: this.formPassword.password
      }
      this.$_api.post('/change-password', form).then(res => {
        this.formPassword = Object.assign({}, this.formPassword, {
          password: null,
          confirm: null,
          show: false
        })
        this.$refs.formPasswordObserver.reset()
        this.$_alert.success('Kata sandi berhasil diperbarui')
      }).catch((err) => { this.$_alert.error(err) })
    }
  }
}
</script>

<style>
</style>
