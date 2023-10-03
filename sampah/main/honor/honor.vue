<template>
  <tas-base-crud :config="config" hide-create hide-delete></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-honor',
  data () {
    return {
      config: {
        title: 'Konfigurasi Penghargaan',
        model_api: 'honor',
        getter: 'honor',
        setter: 'honor',
        // pk_field: 'area_name',
        permission: {
          create: 'create-honor',
          read: 'view-honor',
          update: 'update-honor',
          delete: 'delete-honor'
        },
        slave: [
          {
            name: 'Detail',
            permission: 'template-allow-all',
            module: 'main/honor-detail/honor-detail',
            as_param: 'honor_id',
            key_field: 'id'
          }
        ],
        fields: [
          {
            id: 'id_description',
            label: 'Description (Indonesia)',
            methods: {
              list: true,
              create: {
                type: 'editor'
              },
              update: {
                type: 'editor'
              }
            }
          },
          {
            id: 'en_description',
            label: 'Description (English)',
            methods: {
              list: true,
              create: {
                type: 'editor'
              },
              update: {
                type: 'editor'
              }
            }
          },
          // disabled Field
          { id: 'id', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'updated_by', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'created_by', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'created_at', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'updated_at', methods: { list: false, detail: false, create: false, update: false, filter: false } }
        ]
      }
    }
  }
}
</script>
