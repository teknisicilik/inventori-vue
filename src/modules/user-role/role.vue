<template>
  <tas-base-crud :config="config" hide-filter>
    <template v-slot:detail-footer="data" v-if="$_sys.isAllowed('update-mapping-roles-permissions')">
      <mapping-input v-if="data.rowData" :title="mappingRole.title" :getter="mappingRole.getter" :setter="mappingRole.setter" :params="{ 'role_id': data.rowData.id }" :readonly="mappingRole.readonly" :display="mappingRole.display" :setter_id="mappingRole.setter_id" :key_value="mappingRole.key_value" />
    </template>
  </tas-base-crud>
</template>

<script>
export default {
  name: 'crud-roles',
  data () {
    return {
      config: {
        title: 'Role Pengguna',
        model_api: 'roles',
        getter: 'roles',
        setter: 'roles',
        pk_field: 'role_name',
        permission: {
          create: 'create-roles',
          read: 'view-roles',
          update: 'update-roles',
          delete: 'delete-roles'
        },
        fields: [
          { id: 'active', label: 'Status' },
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
          },
          {
            id: 'allow_register',
            label: 'Pendaftaran',
            methods: { list: false, detail: false, create: false, update: false, filter: false }
          },
          // {
          //   id: 'allow_register',
          //   label: 'Pendaftaran',
          //   methods: {
          //     list: {
          //       order: true,
          //       class: { y: 'badge badge-primary', n: 'badge badge-danger' },
          //       transform: 'allow'
          //     },
          //     detail: {
          //       order: true,
          //       class: { y: 'badge badge-primary', n: 'badge badge-danger' },
          //       transform: 'allow'
          //     },
          //     create: {
          //       type: 'radio',
          //       class: 'radio-list',
          //       option: {
          //         list_pointer: {
          //           label: 'label',
          //           code: 'code',
          //           list: [
          //             { label: 'Ya, Perbolehkan', code: 'y' },
          //             { label: 'Tidak', code: 'n' }
          //           ]
          //         }
          //       }
          //     },
          //     update: {
          //       type: 'radio',
          //       class: 'radio-list',
          //       option: {
          //         list_pointer: {
          //           label: 'label',
          //           code: 'code',
          //           list: [
          //             { label: 'Ya, Perbolehkan', code: 'y' },
          //             { label: 'Tidak', code: 'n' }
          //           ]
          //         }
          //       }
          //     }
          //   }
          // },
          {
            id: 'role_group_id',
            label: 'Role Group',
            methods: {
              create: {
                setter: 'role-groups',
                getter: 'role-groups',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'role_group_name', code: 'id', display: ['role_group_name', 'description']
                  }
                }
              },
              update: {
                setter: 'role-groups',
                getter: 'role-groups',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'role_group_name', code: 'id', display: ['role_group_name', 'description']
                  }
                }
              },
              filter: {
                setter: 'role-groups',
                getter: 'role-groups',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'role_group_name', code: 'id', display: ['role_group_name', 'description']
                  }
                }
              }
            }
          },
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
          { id: 'description', label: 'Keterangan', methods: { create: { type: 'textarea' }, update: { type: 'textarea' } } }
        ]
      },
      mappingRole: {
        title: 'Permission',
        getter: 'custom/mapping-roles-permissions',
        setter: 'custom/mapping-roles-permissions',
        display: ['permission_code', 'description'],
        key_value: 'active',
        setter_id: 'permission_id',
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
