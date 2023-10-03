<template>
  <tas-base-crud :config="config"></tas-base-crud>
</template>
<script>
export default {
  name: "crud-barang",
  data () {
    return {
      config: {
        title: "Barang",
        model_api: "barang",
        getter: "barang",
        setter: "barang",
        // pk_field: 'area_name',
        permission: {
          create: "template-allow-all",
          read: "template-allow-all",
          update: "template-allow-all",
          delete: "template-allow-all"
        },
        fields: [
          {
            id: 'kategori_barang_id',
            label: 'Kategori Barang',
            methods: {
              list: { view_data: 'rel_kategori_barang' },
              create: {
                setter: 'kategori_barang',
                getter: 'kategori_barang',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama', code: 'id', display: ['nama']
                  }
                }
              },
              update: {
                setter: 'kategori_barang',
                getter: 'kategori_barang',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama', code: 'id', display: ['nama']
                  }
                }
              },
              detail: { view_data: 'rel_kategori_barang' }
            }
          },
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
