<template>
  <tas-base-crud :config="config" hide-create hide-delete></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-organization-structure',
  data () {
    return {
      config: {
        title: 'Konfigurasi Struktur Organisasi',
        model_api: 'organization-structure',
        getter: 'organization-structure',
        setter: 'organization-structure',
        // pk_field: 'area_name',
        permission: {
          create: 'create-organization-structure',
          read: 'view-organization-structure',
          update: 'update-organization-structure',
          delete: 'delete-organization-structure'
        },
        slave: [
          {
            name: 'Detail',
            permission: 'template-allow-all',
            module: 'main/organization-structure-detail/organization-structure-detail',
            as_param: 'organization_structure_id',
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
