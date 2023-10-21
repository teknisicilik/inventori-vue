<template>
  <tas-base-crud :config="config">
    <!-- <template #create-form>
      <FormDetail :config="config"></FormDetail>
    </template> -->
  </tas-base-crud>
</template>
<script>
export default {
  name: "crud-batal-produksi-detail",
  // components: {
  //   FormDetail: () => import('./form-detail.vue')
  // },
  data () {
    return {
      config: {
        title: "Detail Produksi",
        model_api: "batal-produksi-detail",
        getter: "batal-produksi-detail",
        setter: "batal-produksi-detail",
        // pk_field: 'area_name',
        permission: {
          create: false,
          read: "template-allow-all",
          update: false,
          delete: false
        },
        fields: [
          { id: 'barang_id', label: 'Barang Jadi', methods: { list: {view_data: 'rel_barang_id'}, create: { type: 'lookup-radio', setter: 'barang', getter: 'barang', validation: ['required'], option: { list_pointer: {label: 'Kode Group', code: 'id', display: ['nama']} } }, update: { type: 'lookup-radio', setter: 'barang', getter: 'barang', validation: ['required'], option: { list_pointer: {label: 'Kode Group', code: 'id', display: ['nama']} } }, detail: {view_data: 'rel_barang_id'} } },
          // { id: 'jumlah', label: 'Jumlah', methods: { list: true, create: { type: 'number', setter: 'kode-group', getter: 'kode-group', validation: ['required'] }, detail: true } },
          // {
          //   id: "produksi_id",
          //   methods: {
          //     list: false,
          //     detail: false,
          //     create: false,
          //     update: false,
          //     filter: false
          //   }
          // },
          // =====
          {
            id: "id",
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          {
            id: "updated_by",
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          {
            id: "created_by",
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          {
            id: "created_at",
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          {
            id: "updated_at",
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          }
        ]
      }
    }
  }
  // methods: {
  //   async getValid () {
  //     let filter = {
  //       produksi: {
  //         limit: 10,
  //         id: this.$store.state.activeSlave.key
  //       },
  //       group: {
  //         limit: 10,
  //         id: ''
  //       }
  //     }
  //     let detail = await this.$_api.dataset('batal-produksi-detail', {limit: 10, produksi_id: this.$store.state.activeSlave.key}).then(res => { return res.data })
  //     filter.group.id = await this.$_api.dataset('produksi', filter.produksi).then(res => { return res.data[0].kode_group_id })
  //     let stok = await this.$_api.dataset('kode_group', filter.group).then(res => { return res.data[0].stok_akhir })
  //     let arr = []
  //     let total = 0
  //     if (detail.length > 1) {
  //       for (let i = 0; i < detail.length; i++) {
  //         arr.push(detail[i].jumlah)
  //       }
  //       total = arr.reduce((total, current) => {
  //         return total + current
  //       }, 0)
  //     } else total = 0
  //     let valid = 'max_value:' + (stok - total)
  //     this.config.fields[1].methods.create.validation.push(valid)
  //   }
  // },
  // mounted () {
  //   this.getValid()
  // }
}
</script>
