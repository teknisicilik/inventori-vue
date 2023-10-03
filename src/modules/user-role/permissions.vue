<template>
  <tas-base-crud :config="config" hide-filter>
  </tas-base-crud>
</template>

<script>
export default {
  name: 'crud-task',
  data () {
    return {
      config: {
        title: 'Permission',
        model_api: 'permissions',
        getter: 'permissions',
        setter: 'permissions',
        pk_field: 'role_name',
        permission: {
          create: 'create-permissions',
          read: 'view-permissions',
          update: 'update-permissions',
          delete: 'delete-permissions'
        },
        fields: [
          {
            id: 'active',
            data: 'active',
            label: 'Status',
            placeholder: null,
            methods: {
              list: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'active'
              },
              detail: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'active'
              },
              create: {
                view_data: 'active',
                type: 'radio',
                value: '1',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [{ label: 'Aktif', code: '1' }, { label: 'Non Aktif', code: '0' }]
                  }
                }
              },
              update: {
                view_data: 'active',
                type: 'radio',
                value: '1',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [{ label: 'Aktif', code: '1' }, { label: 'Non Aktif', code: '0' }]
                  }
                }
              },
              filter: {
                view_data: 'active',
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [{ label: 'Aktif', code: '1' }, { label: 'Non Aktif', code: '0' }]
                  }
                }
              }
            }
          },
          // id
          {
            id: 'id',
            methods: { list: false, detail: false, create: false, update: false, filter: false }
          },
          // updated_by
          {
            id: 'updated_by',
            methods: { list: false, detail: false, create: false, update: false, filter: false }
          },
          // created_by
          {
            id: 'created_by',
            methods: { list: false, detail: false, create: false, update: false, filter: false }
          },
          // created_at
          {
            id: 'created_at',
            label: 'Dibuat',
            methods: { list: false, detail: false, create: false, update: false, filter: false }
          },
          // updated_at
          {
            id: 'updated_at',
            label: 'Diperbarui',
            methods: { list: false, detail: false, create: false, update: false, filter: false }
          }
        ]
      }
    }
  }
}
</script>

<style>
</style>
