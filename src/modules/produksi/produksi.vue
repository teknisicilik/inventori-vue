<template>
  <tas-base-crud :config="config">
    <template #list-table-action="rowData">
      <button @click="getDetail(rowData.rowData)" class="btn btn-danger btn-sm mr-1">Batalkan</button>
    </template>
  </tas-base-crud>
</template>

<script>
export default {
  data () {
    return {
      detail: '',
      config: {
        title: "Produksi Barang",
        model_api: "produksi",
        getter: "produksi",
        setter: "produksi",
        permission: {
          create: "template-allow-all",
          read: "template-allow-all",
          update: false,
          delete: false
        },
        slave: [
          {
            name: "Detail produksi Barang",
            permission: "template-allow-all",
            module: "produksi/produksi-detail",
            as_param: "produksi_id",
            key_field: "id",
            overwrite: {
              fields: [
                { rule: "1.methods.list", value: false },
                { rule: "1.methods.filter", value: false },
                { rule: "1.methods.create", value: false },
                { rule: "1.methods.update", value: false },
                { rule: "1.methods.detail", value: false }
              ],
              permission: {
                create: "template-allow-all",
                read: "template-allow-all",
                update: "template-allow-all",
                delete: "template-allow-all"
              }
            }
          }
        ],
        fields: [
          { id: 'no_produksi', label: 'No Produksi', methods: { list: true, create: { type: 'text', validation: ['required'] }, update: { validation: ['required'] }, detail: true } },
          { id: 'tgl_produksi', label: 'Tgl Produksi', methods: { list: true, create: { type: 'date', validation: ['required'] }, update: { type: 'date', validation: ['required'] }, detail: true } },
          { id: 'kode_group_id', label: 'Kode Bahan', methods: { list: false, create: { type: 'lookup-radio', setter: 'kode-group', getter: 'kode-group', validation: [], option: { list_pointer: {label: 'Kode Group', code: 'id', display: ['rel_barang_id', 'nama']} } }, update: { type: 'lookup-radio', setter: 'kode-group', getter: 'kode-group', validation: ['required'], option: { list_pointer: {label: 'Kode Group', code: 'id', display: ['nama']} } }, detail: {view_data: 'rel_kode_group_id'} } },
          // ===================
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
  },
  methods: {
    async getDetail (param) {
      this.detail = await this.$_api.list('produksi_detail', {limit: 10, produksi_id: param.id}).then(res => { return res.data })
      this.batal(param)
    },
    batal (param) {
      this.$_alert.confirm('Batalkan Produksi ?', 'Data yang dibatalkan tidak dapat dikembalikan, lanjutkan ?').then((result) => {
        if (result.isConfirmed) {
          for (let i = 0; i < this.detail.length; i++) {
            this.$_api.create('batal_produksi_detail', this.detail[i])
            this.$_api.delete('produksi_detail', {data: this.detail[i]})
          }
          this.$_api.create('batal_produksi', param)
          this.$_api.delete('produksi', {data: param}).then(res => {
            if (res) {
              this.$_alert.success(null, 'Data Berhasil dibatalkan')
              this.$router.go()
            }
          })
        }
      })
    }
  }
}
</script>
