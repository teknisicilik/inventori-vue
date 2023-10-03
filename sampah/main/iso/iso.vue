<template>
  <tas-base-crud :config="config" hide-create hide-delete></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-iso',
  data () {
    return {
      config: {
        title: 'Konfigurasi Standar Internasional',
        model_api: 'iso',
        getter: 'iso',
        setter: 'iso',
        // pk_field: 'area_name',
        permission: {
          create: 'create-iso',
          read: 'view-iso',
          update: 'update-iso',
          delete: 'delete-iso'
        },
        slave: [
          {
            name: 'Detail',
            permission: 'template-allow-all',
            module: 'main/iso-detail/iso-detail',
            as_param: 'iso_id',
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
