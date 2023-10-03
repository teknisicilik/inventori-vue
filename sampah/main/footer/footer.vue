<template>
  <tas-base-crud :config="config" hide-create hide-delete></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-footer',
  data () {
    return {
      config: {
        title: 'Konfigurasi Footer',
        model_api: 'footer',
        getter: 'footer',
        setter: 'footer',
        // pk_field: 'area_name',
        permission: {
          create: 'create-footer',
          read: 'view-footer',
          update: 'update-footer',
          delete: 'delete-footer'
        },
        fields: [
          {
            id: 'img_logo',
            label: 'Logo',
            methods: {
              list: false,
              detail: {
                type: 'file',
                view_data: 'img_logo.url'
              },
              create: {
                type: 'file',
                attr: [{ accept: 'image/*' }, { limit: 5 }]
              },
              update: {
                type: 'file',
                attr: [{ accept: 'image/*' }, { limit: 5 }],
                view_data: 'img_logo'
              }
            }
          },
          {
            id: 'title',
            label: 'Title',
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
            id: 'subtitle',
            label: 'Subtitle',
            methods: {
              list: true,
              create: {
                type: 'textarea',
                class: 'col-6'
              },
              update: {
                type: 'textarea',
                class: 'col-6'
              }
            }
          },
          {
            id: 'address',
            label: 'Address',
            methods: {
              list: true,
              create: {
                type: 'textarea',
                class: 'col-6'
              },
              update: {
                type: 'textarea',
                class: 'col-6'
              }
            }
          },
          {
            id: 'phone',
            label: 'Phone',
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
            id: 'email',
            label: 'Email',
            methods: {
              list: true,
              create: {
                type: 'email',
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
