<template>
  <tas-base-crud :config="config" hide-filter>
    <!-- <template v-slot:detail-footer="data" v-if="$_sys.isAllowed('create-mapping_role-groups_tasks')">
      <mapping-input v-if="data.rowData" :title="mappingRole.title" :getter="mappingRole.getter" :setter="mappingRole.setter" :params="{ 'role_group_id': data.rowData.id }" :readonly="mappingRole.readonly" :display="mappingRole.display" :setter_id="mappingRole.setter_id" :key_value="mappingRole.key_value" />
    </template> -->
  </tas-base-crud>
</template>

<script>
export default {
  name: 'crud-role-groups',
  data () {
    return {
      config: {
        title: 'Role Group',
        model_api: 'role-groups',
        getter: 'role-groups',
        setter: 'role-groups',
        pk_field: 'group_name',
        permission: {
          create: 'create-role-groups',
          read: 'view-role-groups',
          update: 'update-role-groups',
          delete: 'delete-role-groups'
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
          { id: 'role_group_name', label: 'Nama Group' },
          { id: 'description', label: 'Deskripsi', methods: { create: { type: 'textarea' }, update: { type: 'textarea' } } },
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
      },
      mappingRole: {
        title: 'Role',
        getter: 'roles',
        setter: 'roles',
        display: ['role_code', 'description'],
        key_value: 'role_code',
        setter_id: 'task_id',
        readonly: false
      }
    }
  },
  methods: {
    checklist (modal, data) {

    }
  }
}
</script>

<style>
</style>
