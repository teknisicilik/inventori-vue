<template>
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-project',
  data () {
    return {
      config: {
        title: 'Konfigurasi Proyek',
        model_api: 'project',
        getter: 'project',
        setter: 'project',
        // pk_field: 'area_name',
        permission: {
          create: 'create-project',
          read: 'view-project',
          update: 'update-project',
          delete: 'delete-project'
        },
        fields: [
          { id: 'order_number',
            methods: { list: true,
              detail: true,
              create: {
                type: 'number'
              },
              update: {
                type: 'number'
              },
              filter: false }
          },
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
          {
            id: 'id_subtitle',
            label: 'Subtitle (Indonesia)',
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
            id: 'en_subtitle',
            label: 'Subtitle (English)',
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
          {
            id: 'img_image',
            label: 'Image',
            methods: {
              list: false,
              detail: {
                type: 'file',
                view_data: 'img_image.url'
              },
              create: {
                type: 'file',
                attr: [{ accept: 'image/*' }, { limit: 5 }]
              },
              update: {
                type: 'file',
                attr: [{ accept: 'image/*' }, { limit: 5 }],
                view_data: 'img_image'
              }
            }
          },
          {
            id: 'image_position',
            data: 'image_position',
            label: 'Image Position',
            placeholder: null,
            methods: {
              list: {
                order: true
                // class: { 0: 'badge badge-danger', 1: 'badge badge-success' },
                // transform: 'active'
              },
              detail: {
                order: true
                // class: { false: 'badge badge-danger', true: 'badge badge-success' },
                // transform: 'active'
              },
              create: {
                view_data: 'image_position',
                type: 'radio',
                value: 'full',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [{ label: 'Left', code: 'left' }, { label: 'Full', code: 'full' }, { label: 'Right', code: 'right' }]
                  }
                }
              },
              update: {
                view_data: 'image_position',
                type: 'radio',
                value: 'full',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [{ label: 'Left', code: 'left' }, { label: 'Full', code: 'full' }, { label: 'Right', code: 'right' }]
                  }
                }
              },
              filter: {
                view_data: 'image_position',
                type: 'radio',
                value: 'full',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [{ label: 'Left', code: 'left' }, { label: 'Full', code: 'full' }, { label: 'Right', code: 'right' }]
                  }
                }
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
