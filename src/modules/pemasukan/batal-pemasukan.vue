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
        title: "Pemasukan Dibatalkan",
        model_api: "batal-pemasukan",
        getter: "batal-pemasukan",
        setter: "batal-pemasukan",
        permission: {
          create: false,
          read: "template-allow-all",
          update: false,
          delete: false
        },
        slave: [
          {
            name: "Detail Pemasukan",
            permission: "template-allow-all",
            module: "pemasukan/batal-detail",
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
                create: false,
                read: "template-allow-all",
                update: false,
                delete: false
              }
            }
          }
        ],
        fields: [
          { id: 'supplier_id', label: 'Supplier', methods: { list: {view_data: 'rel_supplier_id'}, create: { type: 'lookup-radio', setter: 'supplier', getter: 'supplier', validation: ['required'], option: { list_pointer: {label: 'Supplier', code: 'id', display: ['nama']} } }, update: { type: 'lookup-radio', validation: ['required'], setter: 'supplier', getter: 'supplier', option: { list_pointer: {label: 'Supplier', code: 'id', display: ['nama']} } }, detail: {view_data: 'rel_supplier_id'} } },
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
  }
}
</script>
