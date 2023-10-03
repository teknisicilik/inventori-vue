<template>
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-honor-detail',
  data () {
    return {
      config: {
        title: 'Detail Penghargaan',
        model_api: 'honor-detail',
        getter: 'honor-detail',
        setter: 'honor-detail',
        // pk_field: 'area_name',
        permission: {
          create: 'create-honor-detail',
          read: 'view-honor-detail',
          update: 'update-honor-detail',
          delete: 'delete-honor-detail'
        },
        fields: [
          {
            id: 'honor_id',
            label: 'Penghargaan',
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false
            }
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
          // {
          //   id: 'id_subtitle',
          //   label: 'Subtitle (Indonesia)',
          //   methods: {
          //     list: true,
          //     create: {
          //       type: 'textarea',
          //       class: 'col-6'
          //     },
          //     update: {
          //       type: 'textarea',
          //       class: 'col-6'
          //     }
          //   }
          // },
          // {
          //   id: 'en_subtitle',
          //   label: 'Subtitle (English)',
          //   methods: {
          //     list: true,
          //     create: {
          //       type: 'textarea',
          //       class: 'col-6'
          //     },
          //     update: {
          //       type: 'textarea',
          //       class: 'col-6'
          //     }
          //   }
          // },
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
          // {id: 'video', label: 'Video Youtube URL'},
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
