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
        title: "Pemasukan Barang",
        model_api: "pemasukan",
        getter: "pemasukan",
        setter: "pemasukan",
        permission: {
          create: "template-allow-all",
          read: "template-allow-all",
          update: false,
          delete: false
        },
        slave: [
          {
            name: "Detail  Pemasukan",
            permission: "template-allow-all",
            module: "pemasukan/pemasukan-detail",
            as_param: "pemasukan_id",
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
                update: false,
                delete: "template-allow-all"
              }
            }
          }
        ],
        fields: [
          { id: 'supplier_id', label: 'Supplier', methods: { list: {view_data: 'rel_supplier_id'}, create: { type: 'lookup-radio', setter: 'supplier', getter: 'supplier', validation: ['required'], option: { list_pointer: {label: 'Supplier', code: 'id', display: ['nama']} } }, update: { type: 'lookup-radio', validation: ['required'], setter: 'supplier', getter: 'supplier', option: { list_pointer: {label: 'Supplier', code: 'id', display: ['nama']} } }, detail: {view_data: 'rel_supplier_id'} } },
          { id: 'tgl_pembelian', label: 'Tgl Pemasukan', methods: { list: true, create: { type: 'date' }, update: { type: 'date' }, detail: true } },
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
      this.detail = await this.$_api.list('pemasukan_detail', {limit: 10, pemasukan_id: param.id}).then(res => { return res.data })
      this.batal(param)
    },
    batal (param) {
      this.$_alert.confirm('Batalkan Pemasukan ?', 'Data yang dibatalkan tidak dapat dikembalikan, lanjutkan ?').then((result) => {
        if (result.isConfirmed) {
          for (let i = 0; i < this.detail.length; i++) {
            this.$_api.create('batal_pemasukan_detail', this.detail[i])
            this.$_api.delete('pemasukan_detail', {data: this.detail[i]})
          }
          this.$_api.create('batal_pemasukan', param)
          this.$_api.delete('pemasukan', {data: param}).then(res => {
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
