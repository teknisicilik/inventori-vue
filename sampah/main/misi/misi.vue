<template>
  <tas-base-crud :config="config" hide-create hide-delete></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-misi',
  data () {
    return {
      config: {
        title: 'Konfigurasi Misi',
        model_api: 'misi',
        getter: 'misi',
        setter: 'misi',
        // pk_field: 'area_name',
        permission: {
          create: 'create-misi',
          read: 'view-misi',
          update: 'update-misi',
          delete: 'delete-misi'
        },
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
          { id: 'img_image', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'video', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'id_title', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'en_title', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'id_subtitle', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'en_subtitle', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          // ===================
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
