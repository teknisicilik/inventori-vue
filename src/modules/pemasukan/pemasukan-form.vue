<template>
  <div class="card card-custom mb-5">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark" > Tambah {{ title }}</span>
      </h3>
      <div v-if="form !== 'filter'" class="card-toolbar">
        <a @click="$router.go(-1)" class="btn btn-outline-primary btn-icon btn-circle" v-b-tooltip.top="$t('global.go_back')">
          <i class="ri-arrow-go-back-line p-0"></i>
        </a>
      </div>
      </div>
      <div class="card-body py-2 mt-3">
        <div class="form-group" key="">
          <div class="row">
            <div class="col-lg-6 col-sm-12">
              <ValidationObserver ref="mainForm" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(onSubmit())" autocomplete="off">
                  <div v-for="(field, i) in config.fields" :key="i">
                      <s-input v-if="field.methods[form]" v-model="formData[field.id]"
                      :disabled="submited"
                      :item="{
                          classLabel: 'col pl-0',
                          classItem: 'pr-7',
                          rowclass: 'mx-0',
                          groupClass: 'w-100',
                          api: field.methods[form].getter,
                          label: field.label,
                          type: field.methods[form].type,
                          validation: field.methods[form].validation,
                          placeholder: '',
                          pointer: field.methods[form].option != undefined ? field.methods[form].option.list_pointer : false
                      }"/>
                  </div>
                  <button v-if="submited == false" class="btn btn-info">Simpan</button>
                </form>
              </ValidationObserver>
              <!-- Tambah Barang -->
              <ValidationObserver ref="detailForm" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(detailSubmit())" autocomplete="off">
                  <div class="text-right w-100" v-b-modal.modal-1>
                    <div class="flex">
                      <span @click="clearData()">Tambah Barang</span>
                      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 5C10.5523 5 11 5.44772 11 6V9L14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11H11V14C11 14.5523 10.5523 15 10 15C9.44771 15 9 14.5523 9 14V11H6C5.44772 11 5 10.5523 5 10C5 9.44771 5.44772 9 6 9L9 9V6C9 5.44772 9.44771 5 10 5Z" fill="#374151"/></svg>
                    </div>
                    <hr />
                    </div>
                    <b-modal id="modal-1" title="Tambah Barang">
                      <div v-for="(detail, d) in config_detail.fields" :key="d">
                        <s-input v-if="detail.methods[form]" v-model="temp_detail[detail.id]" :item="{
                            classLabel: 'col pl-0',
                            classItem: 'pr-7',
                            rowclass: 'mx-0',
                            groupClass: 'w-100',
                            api: detail.methods[form].getter,
                            label: detail.label,
                            type: detail.methods[form].type,
                            validation: detail.methods[form].validation,
                            placeholder: '',
                            pointer: detail.methods[form].option != undefined ? detail.methods[form].option.list_pointer : false
                        }"></s-input>
                      </div>
                      <template #modal-footer>
                        <div @click="clearData(), $bvModal.hide('modal-1')" class="btn">batal</div>
                        <div @click="getData(), $bvModal.hide('modal-1')" class="btn btn-info">simpan</div>
                      </template>
                    </b-modal>
                    <!-- list barang -->
                    <div v-if="detailBarang != ''">
                      <b-list-group>
                        <b-list-group-item v-for="(dtl, d) in detailBarang" :key="d" class="d-flex justify-content-between align-items-center">
                          <b-row class="w-100">
                            <b-col>{{ dtl.nama }}</b-col>
                            <b-col>{{ dtl.barang.jumlah + ' ' + dtl.satuan }}</b-col>
                            <b-col>{{ 'Rp.' + dtl.barang.total_nilai }}</b-col>
                          </b-row>
                          <div @click="hapus(dtl.barang)" class="btn"><i class="ri-close-fill"></i></div>
                        </b-list-group-item>
                      </b-list-group>
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
  props: {
    title: String,
    form: String,
    config: Object,
    config_detail: Object
  },
  data () {
    return {
      formData: {},
      temp_detail: {},
      detailBarang: [],
      pemasukan_id: '',
      submited: false,
      temp: ''
    }
  },
  methods: {
    getData () {
      let filter = {
        limit: 100,
        id: this.temp_detail.barang_id
      }
      this.$_api.dataset('barang', filter).then(res => {
        let a = res.data.map(function (x) { return x })
        this.tambah(a[0])
      })
    },
    tambah (value) {
      this.detailBarang.push({
        barang: {
          pemasukan_id: this.pemasukan_id,
          barang_id: this.temp_detail.barang_id,
          jumlah: this.temp_detail.jumlah,
          total_nilai: this.temp_detail.total_nilai
        },
        nama: value.nama,
        satuan: value.satuan
      })
    },
    hapus (d) {
      for (let i = 0; i < this.detailBarang.length; i++) {
        if (d === this.detailBarang[i].barang) {
          this.detailBarang.splice(i, 1)
        }
      }
    },
    clearData () {
      this.temp_detail = {}
    },
    onSubmit () {
      let isValid = this.$refs.mainForm.validate()
      let a = ''
      if (isValid) {
        this.$_api.create('pemasukan', this.formData).then(res => {
          if (res.success) {
            a = true
          }
        })
      } else a = false
      this.submited = a
      this.fetchDetail()
    },
    fetchDetail () {
      let filter = {
        limit: 100,
        no_pembelian: this.formData.no_pembelian
      }
      this.$_api.dataset('pemasukan', filter).then(res => {
        let a = res.data.map(function (x) { return x })
        this.tambahDetail(a[0])
      })
    },
    tambahDetail (value) {
      this.pemasukan_id = value.id
    },
    detailSubmit () {
      let isValid = this.$refs.mainForm.validate()
      if (isValid) {
        for (let i = 0; i < this.detailBarang.length; i++) {
          console.log(this.detailBarang)
          this.$_api.create('pemasukan_detail', this.detailBarang[i].barang).then(res => {
            this.$router.go(-1)
            this.clearData()
          })
        }
      }
      this.clearData()
    }
  }
}
</script>
