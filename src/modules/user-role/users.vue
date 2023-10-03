<template>
  <tas-base-crud :config="config">
  </tas-base-crud>
</template>

<script>
export default {
  name: 'crud-users',
  data () {
    return {
      config: {
        title: 'Daftar Pengguna',
        model_api: 'users',
        getter: 'users',
        setter: 'users',
        pk_field: 'username',
        export: true,
        permission: {
          create: 'create-users',
          read: 'view-users',
          update: 'update-users',
          delete: 'delete-users'
        },
        fields: [
          { id: 'password', label: 'Password', methods: { list: false, detail: false, create: true, update: false, filter: false } },
          {
            id: 'data_role_id',
            label: 'Role',
            methods: {
              create: {
                setter: 'roles',
                getter: 'roles',
                type: 'lookup-checkbox',
                option: {
                  list_pointer: {
                    label: 'role_name', code: 'id', display: ['role_name']
                  }
                }
              },
              update: {
                setter: 'roles',
                getter: 'roles',
                type: 'lookup-checkbox',
                option: {
                  list_pointer: {
                    label: 'role_name', code: 'id', display: ['role_name']
                  }
                }
              },
              filter: {
                setter: 'roles',
                getter: 'roles',
                type: 'select',
                option: {
                  list_pointer: {
                    label: 'role_name', code: 'id', display: ['role_name']
                  }
                },
                class: 'min-w-250px'
              },
              list: {
                class: 'min-w-250px',
                view_data: 'data_role_id.role_name',
                order: false
              },
              detail: {
                view_data: 'data_role_id.role_name'
              }
            }
          },
          // disabled Temp Field
          { id: 'fullname', label: 'Nama Lengkap', methods: { list: true, detail: true, create: false, update: false, filter: false } },
          { id: 'email', label: 'Email', methods: { list: true, detail: true, create: false, update: false, filter: false } },
          { id: 'img_photo_user', label: 'Foto Pengguna', methods: { list: false, detail: false, create: false, update: false, filter: false } },
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

<style>
</style>
