<template>
  <tas-base-crud :config='config'></tas-base-crud>
</template>
<script>
export default {
  name: 'crud-kategori-barang',
  data () {
    return {
      config: {
        title: 'Kategori Barang',
        model_api: 'kategori-barang',
        getter: 'kategori-barang',
        setter: 'kategori-barang',
        // pk_field: 'area_name',
        permission: {
          create: 'template-allow-all',
          read: 'template-allow-all',
          update: 'template-allow-all',
          delete: 'template-allow-all'
        },
        fields: [
          // {
          //   id: 'nama',
          //   label: 'Nama',
          //   methods: {
          //     list: true,
          //     create: true,
          //     update: true
          //   }
          // },
          // ===================
          {
            id: 'id',
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          {
            id: 'updated_by',
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          {
            id: 'created_by',
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          {
            id: 'created_at',
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          {
            id: 'updated_at',
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
