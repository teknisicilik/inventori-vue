<template>
  <tas-base-crud :config="config">
    <template #create-form>
      <FormDetail :config="config"></FormDetail>
    </template>
  </tas-base-crud>
</template>
<script>
export default {
  name: "crud-batal-pemasukan-detail",
  data () {
    return {
      config: {
        title: "Detail Pemasukan",
        model_api: "batal-pemasukan-detail",
        getter: "batal-pemasukan-detail",
        setter: "batal-pemasukan-detail",
        // pk_field: 'area_name',
        permission: {
          create: false,
          read: "template-allow-all",
          update: false,
          delete: false
        },
        // slave: [
        //   {
        //     name: "Kode Group",
        //     permission: "template-allow-all",
        //     module: "kode-group/kode-group",
        //     as_param: "pemasukan_detail_id",
        //     key_field: "id",
        //     overwrite: {
        //       fields: [
        //         { rule: "1.methods.list", value: false },
        //         { rule: "1.methods.filter", value: false },
        //         { rule: "1.methods.create", value: false },
        //         { rule: "1.methods.update", value: false },
        //         { rule: "1.methods.detail", value: false }
        //       ],
        //       permission: {
        //         create: "template-allow-all",
        //         read: "template-allow-all",
        //         update: false,
        //         delete: false
        //       }
        //     }
        //   }
        // ],
        fields: [
          {
            id: 'barang_id',
            label: 'barang',
            methods: {
              list: { view_data: 'rel_barang_id' },
              create: {
                setter: "barang",
                getter: "barang",
                type: "lookup-radio",
                validation: ["required"],
                option: {
                  list_pointer: {
                    label: "Barang",
                    code: "id",
                    display: ["nama"]
                  }
                }
              },
              update: false,
              detail: {view_data: 'rel_barang_id'}
            }
          },
          {
            id: "id",
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          {
            id: "updated_by",
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          {
            id: "created_by",
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          {
            id: "created_at",
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          {
            id: "updated_at",
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          }
        ]
      }
    }
  }
}
</script>
