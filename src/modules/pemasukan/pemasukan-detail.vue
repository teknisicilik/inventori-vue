<template>
  <tas-base-crud :config="config">
    <template v-slot:list-footer>
      <p>INI SLOT LIST PEMASUKAN DETAIL FOOTER</p>
    </template>
  </tas-base-crud>
</template>
<script>
export default {
  name: "crud-pemasukan-detail",
  data () {
    return {
      config: {
        title: "Detail Pemasukan",
        model_api: "pemasukan_detail",
        getter: "pemasukan_detail",
        setter: "pemasukan_detail",
        // pk_field: 'area_name',
        permission: {
          create: "template-allow-all",
          read: "template-allow-all",
          update: false,
          delete: false
        },
        fields: [
          {
            id: 'pemasukan_id',
            label: 'No Pemasukan',
            methods: {
              list: { view_data: 'rel_pemasukan' },
              create: false,
              update: false,
              detail: {view_data: 'rel_pemasukan'}
            }
          },
          {
            id: 'barang_id',
            label: 'barang',
            methods: {
              list: { view_data: 'rel_barang' },
              create: {
                setter: "barang",
                getter: "barang",
                type: "lookup-radio",
                validation: ["required"],
                option: {
                  list_pointer: {
                    label: "nama",
                    code: "id",
                    display: ["nama"]
                  }
                }
              },
              update: false,
              detail: {view_data: 'rel_barang'}
            }
          },
          { id: 'jumlah', label: 'Jumlah', methods: { list: { view_data: 'jumlah' }, create: true, update: false, detail: { view_data: 'jumlah' }, filter: { type: 'number' } } },
          { id: 'total_nilai', label: 'Total Nilai', methods: { list: { view_data: 'total_nilai' }, detail: { view_data: 'total_nilai' }, create: true, update: false, filter: { type: 'number' } } },
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
