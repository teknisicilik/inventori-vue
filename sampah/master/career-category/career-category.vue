<template>
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-career-category',
  data () {
    return {
      config: {
        title: 'Kategori Karir',
        model_api: 'career-category',
        getter: 'career-category',
        setter: 'career-category',
        // pk_field: 'area_name',
        permission: {
          create: 'create-career-category',
          read: 'view-career-category',
          update: 'update-career-category',
          delete: 'delete-career-category'
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
