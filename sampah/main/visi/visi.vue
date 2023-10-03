<template>
  <tas-base-crud :config="config" hide-create hide-delete></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-visi',
  data () {
    return {
      config: {
        title: 'Konfigurasi Visi',
        model_api: 'visi',
        getter: 'visi',
        setter: 'visi',
        // pk_field: 'area_name',
        permission: {
          create: 'create-visi',
          read: 'view-visi',
          update: 'update-visi',
          delete: 'delete-visi'
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
          {
            id: 'img_image',
            label: 'Banner Image',
            methods: {
              list: {
                type: 'file',
                view_data: 'img_image.url'
              },
              detail: {
                type: 'file',
                view_data: 'img_image.url'
              },
              create: {
                type: 'file',
                attr: [{ accept: 'image/*' }, { limit: 5 }]
              },
              update: {
                type: 'file',
                attr: [{ accept: 'image/*' }, { limit: 5 }],
                view_data: 'img_image'
              }
            }
          },
          // disabled Field
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
