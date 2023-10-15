<template>
  <div class="card card-custom mb-5">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark" >Tambah Detail Produksi</span>
      </h3>
      <div class="card-toolbar">
        <a @click="$router.go(-1)" class="btn btn-outline-primary btn-icon btn-circle" v-b-tooltip.top="$t('global.go_back')">
          <i class="ri-arrow-go-back-line p-0"></i>
        </a>
      </div>
    </div>
    <!-- body -->
      <div class="card-body py-2 mt-3">
        <div class="form-group" key="">
          <div class="row">
            <div class="col-lg-6 col-sm-12">
              <ValidationObserver ref="mainForm" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(detailSubmit())" autocomplete="off">
                  <div v-for="(field, i) in config.fields" :key="i">
                      <s-input v-if="field.methods['create']" v-model="formData[field.id]"
                      :item="{
                          classLabel: 'col pl-0',
                          classItem: 'pr-7',
                          rowclass: 'mx-0',
                          groupClass: 'w-100',
                          api: field.methods['create'].getter,
                          label: field.label,
                          type: field.methods['create'].type,
                          validation: field.methods['create'].validation,
                          placeholder: '',
                          pointer: field.methods['create'].option != undefined ? field.methods['create'].option.list_pointer : false
                      }"/>
                  </div>
                  <button class="btn btn-info">Simpan</button>
                </form>
              </ValidationObserver>
              {{ formData }}
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  props: { config: Object },
  data () {
    return {
      formData: {}
    }
  },
  created () {
    this.formData.produksi_id = this.$store.state.activeSlave.key
  },
  methods: {
    st () {
      console.log(this.$store)
    },
    putKodeGroup () {
      // let data = {
      //   id: this.$store.state.activeSlave.key,
      //   stok_akhir: 0,
      //   nilai_akhir: 0
      // }
      let data = ''
      this.$_api.dataset('produksi', {limit: 10, id: this.$store.state.activeSlave.key}).then(res => {
        if (res) {
          this.$_api.dataset('kode-group', {limit: 10, id: res.data[0].kode_group_id}).then(response => {
            data = response.data[0]
            data.stok_akhir = response.data[0].stok_akhir - this.formData.jumlah
            data.nilai_akhir = (response.data[0].nilai_akhir / response.data[0].stok_akhir) * this.formData.jumlah
            if (response) {
              this.$_api.update('kode-group', data).then(result => {
                if (result) {
                  this.$_alert.success(null, 'Data ' + this.config.title + ' berhasil ditambahkan')
                  this.$router.go()
                }
              })
            }
          })
        }
      })
    },
    detailSubmit () {
      let isValid = this.$refs.mainForm.validate()
      if (isValid) {
        this.$_api.create('produksi-detail', this.formData).then(res => {
          if (res) {
            this.putKodeGroup()
          }
        })
      }
    }
  }
}
</script>
