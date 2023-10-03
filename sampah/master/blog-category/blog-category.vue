<template>
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-blog-category',
  data () {
    return {
      config: {
        title: 'Kategori Berita',
        model_api: 'blog-category',
        getter: 'blog-category',
        setter: 'blog-category',
        pk_field: 'area_name',
        permission: {
          create: 'create-blog-category',
          read: 'view-blog-category',
          update: 'update-blog-category',
          delete: 'delete-blog-category'
        },
        fields: [
          {
            id: 'id_title',
            label: 'Title (Indonesia)',
            methods: {
              list: true,
              create: {
                class: 'col-6'
              },
              update: {
                class: 'col-6'
              }
            }
          },
          {
            id: 'en_title',
            label: 'Title (English)',
            methods: {
              list: true,
              create: {
                class: 'col-6'
              },
              update: {
                class: 'col-6'
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
