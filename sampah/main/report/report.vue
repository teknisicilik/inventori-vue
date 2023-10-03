<template>
  <tas-base-crud :config="config" hide-create hide-delete></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-report',
  data () {
    return {
      config: {
        title: 'Konfigurasi Halaman Laporan',
        model_api: 'report',
        getter: 'report',
        setter: 'report',
        // pk_field: 'area_name',
        permission: {
          create: 'create-report',
          read: 'view-report',
          update: 'update-report',
          delete: 'delete-report'
        },
        slave: [
          {
            name: 'Detail',
            permission: 'template-allow-all',
            module: 'main/report-detail/report-detail',
            as_param: 'report_id',
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
