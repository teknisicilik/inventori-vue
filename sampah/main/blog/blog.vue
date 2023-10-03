<template>
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-blog',
  data () {
    return {
      config: {
        title: 'Konfigurasi Berita',
        model_api: 'blog',
        getter: 'blog',
        setter: 'blog',
        // pk_field: 'area_name',
        permission: {
          create: 'create-blog',
          read: 'view-blog',
          update: 'update-blog',
          delete: 'delete-blog'
        },
        fields: [
          {
            id: 'blog_category_id',
            label: 'Category',
            methods: {
              create: {
                setter: 'blog_category',
                getter: 'blog_category',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'id_title', code: 'id', display: ['rel_blog_category_id', 'id_title']
                  }
                }
              },
              update: {
                setter: 'blog_category',
                getter: 'blog_category',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'id_title', code: 'id', display: ['rel_blog_category_id', 'id_title']
                  }
                }
              },
              filter: {
                setter: 'blog_category',
                getter: 'blog_category',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'id_title', code: 'id', display: ['rel_blog_category_id', 'id_title']
                  }
                }
              }
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
