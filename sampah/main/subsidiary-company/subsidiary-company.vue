<template>
  <tas-base-crud :config="config" hide-create hide-delete></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-subsidiary-company',
  data () {
    return {
      config: {
        title: 'Konfigurasi Anak Perusahaan',
        model_api: 'subsidiary-company',
        getter: 'subsidiary-company',
        setter: 'subsidiary-company',
        // pk_field: 'area_name',
        permission: {
          create: 'create-subsidiary-company',
          read: 'view-subsidiary-company',
          update: 'update-subsidiary-company',
          delete: 'delete-subsidiary-company'
        },
        slave: [
          {
            name: 'Detail',
            permission: 'template-allow-all',
            module: 'main/subsidiary-company-detail/subsidiary-company-detail',
            as_param: 'subsidiary_company_id',
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
