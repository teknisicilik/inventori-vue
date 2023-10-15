<template>
  <tas-base-crud :config="config">
    <template #list-kode_group_id="rowData">{{ getBarang }}</template>
  </tas-base-crud>
</template>

<script>
export default {
  data () {
    return {
      config: {
        title: "Produksi Barang",
        model_api: "produksi",
        getter: "produksi",
        setter: "produksi",
        permission: {
          create: "template-allow-all",
          read: "template-allow-all",
          update: "template-allow-all",
          delete: "template-allow-all"
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
          { id: 'kode_group_id', label: 'Kode Bahan', methods: { list: false, create: { type: 'lookup-radio', setter: 'kode-group', getter: 'kode-group', validation: ['required'], option: { list_pointer: {label: 'Kode Group', code: 'id', display: ['rel_barang_id', 'name']} } }, update: { type: 'lookup-radio', setter: 'kode-group', getter: 'kode-group', validation: ['required'], option: { list_pointer: {label: 'Kode Group', code: 'id', display: ['name']} } }, detail: false } },
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
