<template>
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-career',
  data () {
    return {
      config: {
        title: 'Konfigurasi Karir',
        model_api: 'career',
        getter: 'career',
        setter: 'career',
        // pk_field: 'area_name',
        permission: {
          create: 'create-career',
          read: 'view-career',
          update: 'update-career',
          delete: 'delete-career'
        },
        fields: [
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
          //   id: 'career_category_id',
          //   label: 'Category',
          //   methods: {
          //     create: {
          //       setter: 'career_category',
          //       getter: 'career_category',
          //       type: 'lookup-radio',
          //       option: {
          //         list_pointer: {
          //           label: 'id_title', code: 'id', display: ['rel_career_category_id', 'id_title']
          //         }
          //       }
          //     },
          //     update: {
          //       setter: 'career_category',
          //       getter: 'career_category',
          //       type: 'lookup-radio',
          //       option: {
          //         list_pointer: {
          //           label: 'id_title', code: 'id', display: ['rel_career_category_id', 'id_title']
          //         }
          //       }
          //     },
          //     filter: {
          //       setter: 'career_category',
          //       getter: 'career_category',
          //       type: 'lookup-radio',
          //       option: {
          //         list_pointer: {
          //           label: 'id_title', code: 'id', display: ['rel_career_category_id', 'id_title']
          //         }
          //       }
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
          // {
          //   id: 'file_file',
          //   label: 'File',
          //   methods: {
          //     list: false,
          //     detail: {
          //       type: 'file',
          //       view_data: 'file_file.url'
          //     },
          //     create: {
          //       type: 'file',
          //       attr: [{ accept: 'image/*,.pdf' }, { limit: 5 }]
          //     },
          //     update: {
          //       type: 'file',
          //       attr: [{ accept: 'image/*' }, { limit: 5 }],
          //       view_data: 'file_file'
          //     }
          //   }
          // },
          {
            id: 'highlight',
            data: 'highlight',
            label: 'Highlight',
            placeholder: null,
            methods: {
              list: {
                order: true,
                class: { false: 'badge badge-danger', true: 'badge badge-success' },
                transform: 'ynBool'
              },
              detail: {
                order: true,
                class: { false: 'badge badge-danger', true: 'badge badge-success' },
                transform: 'ynBool'
              },
              create: {
                view_data: 'highlight',
                type: 'radio',
                value: true,
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [{ label: 'Ya', code: true }, { label: 'Tidak', code: false }]
                  }
                }
              },
              update: {
                view_data: 'highlight',
                type: 'radio',
                value: true,
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [{ label: 'Ya', code: true }, { label: 'Tidak', code: false }]
                  }
                }
              },
              filter: {
                view_data: 'highlight',
                type: 'radio',
                value: true,
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [{ label: 'Ya', code: true }, { label: 'Tidak', code: false }]
                  }
                }
              }
            }
          },
          // disabled Field
          { id: 'file_file', methods: { list: false, detail: false, create: false, update: false, filter: false } },
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
