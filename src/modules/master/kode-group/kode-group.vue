<template>
  <tas-base-crud :config='config'></tas-base-crud>
</template>
<script>
export default {
  name: 'crud-kode-group',
  data () {
    return {
      config: {
        title: 'Kode Group',
        model_api: 'kode-group',
        getter: 'kode-group',
        setter: 'kode-group',
        // pk_field: 'area_name',
        permission: {
          create: false,
          read: 'template-allow-all',
          update: 'template-allow-all',
          delete: false
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
