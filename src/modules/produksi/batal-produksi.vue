<template>
  <tas-base-crud :config="config">
  </tas-base-crud>
</template>

<script>
export default {
  data () {
    return {
      config: {
        title: "Produksi Dibatalkan",
        model_api: "batal-produksi",
        getter: "batal-produksi",
        setter: "batal-produksi",
        permission: {
          create: false,
          read: "template-allow-all",
          update: false,
          delete: false
        },
        slave: [
          {
            name: "Detail produksi Barang",
            permission: "template-allow-all",
            module: "produksi/batal-detail",
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
                create: false,
                read: "template-allow-all",
                update: false,
                delete: false
              }
            }
          }
        ],
        fields: [
          // { id: 'no_produksi', label: 'No Produksi', methods: { list: true, create: { type: 'text', validation: ['required'] }, update: { validation: ['required'] }, detail: true } },
          // { id: 'tgl_produksi', label: 'Tgl Produksi', methods: { list: true, create: { type: 'date', validation: ['required'] }, update: { type: 'date', validation: ['required'] }, detail: true } },
          { id: 'kode_group_id', label: 'Kode Group', methods: { list: {view_data: 'rel_kode_group_id'}, detail: {view_data: 'rel_kode_group_id'} } },
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
