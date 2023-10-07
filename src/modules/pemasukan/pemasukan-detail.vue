<template>
  <tas-base-crud :config="config">
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
          create: false,
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
              create: false,
              update: false,
              detail: {view_data: 'rel_barang'}
            }
          },
          { id: 'jumlah', label: 'Jumlah', methods: { list: { view_data: 'jumlah' }, create: false, update: false, detail: { view_data: 'jumlah' }, filter: { type: 'number' } } },
          { id: 'total_nilai', label: 'Total Nilai', methods: { list: { view_data: 'total_nilai' }, detail: { view_data: 'total_nilai' }, create: false, update: false, filter: { type: 'number' } } },
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
