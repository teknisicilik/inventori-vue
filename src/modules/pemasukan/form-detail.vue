<template>
  <div class="card card-custom mb-5">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark" >Tambah Detail Pemasukan</span>
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
    this.formData.pemasukan_id = this.$store.state.activeSlave.key
  },
  methods: {
    st () {
      console.log(this.$store)
    },
    // postKodeGroup () {
    //   let data = {
    //     name: this.formData.pemasukan_id,
    //     barang_id: this.formData.barang_id,
    //     stok_akhir: this.formData.jumlah,
    //     nilai_akhir: this.formData.total_nilai
    //   }
    //   this.$_api.create('kode_group', data).then(res => {
    //     if (res) {
    //       this.$_alert.success(null, 'Data ' + this.config.title + ' berhasil ditambahkan')
    //       this.$router.go()
    //     }
    //   })
    // },
    detailSubmit () {
      let isValid = this.$refs.mainForm.validate()
      if (isValid) {
        this.$_api.create('pemasukan_detail', this.formData).then(res => {
          if (res) {
            this.$router.go()
          }
        })
      }
    }
  }
}
</script>
