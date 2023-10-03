<template>
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-report-detail',
  data () {
    return {
      config: {
        title: 'Daftar Report',
        model_api: 'report-detail',
        getter: 'report-detail',
        setter: 'report-detail',
        // pk_field: 'area_name',
        permission: {
          create: 'create-report-detail',
          read: 'view-report-detail',
          update: 'update-report-detail',
          delete: 'delete-report-detail'
        },
        fields: [
          {
            id: 'report_id',
            label: 'Laporan',
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
          // {
          //   id: 'id_description',
          //   label: 'Description (Indonesia)',
          //   methods: {
          //     list: true,
          //     create: {
          //       type: 'editor'
          //     },
          //     update: {
          //       type: 'editor'
          //     }
          //   }
          // },
          // {
          //   id: 'en_description',
          //   label: 'Description (English)',
          //   methods: {
          //     list: true,
          //     create: {
          //       type: 'editor'
          //     },
          //     update: {
          //       type: 'editor'
          //     }
          //   }
          // },
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
            id: 'link_file',
            label: 'Link File',
            methods: {
              list: false,
              detail: {
                type: 'link',
                view_data: 'link_file'
              },
              create: true,
              update: true
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
