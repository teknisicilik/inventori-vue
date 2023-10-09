<template>
  <tas-base-crud :config="config">
    <template v-slot:create-form>
      <pemasukanForm
        form="create"
        :title="config.title"
        :config="config"
        :config_detail="config_detail"
      ></pemasukanForm>
    </template>
    <template v-slot:detail-body-data="rowData">
      <div style="border:1px solid #000;">
        {{ rowData.rowData.rel_pelanggan }}
      </div>
    </template>
  </tas-base-crud>
</template>
<script>
export default {
  components: {
    pemasukanForm: () => import("./pemasukan-form.vue")
  },
  name: "crud-pemasukan",
  data() {
    return {
      config: {
        title: "Pemasukan Barang",
        model_api: "pemasukan",
        getter: "pemasukan",
        setter: "pemasukan",
        // pk_field: 'area_name',
        permission: {
          create: "template-allow-all",
          read: "template-allow-all",
          update: false,
          delete: "template-allow-all"
        },
        slave: [
          {
            name: "Detail  Pemasukan",
            permission: "template-allow-all",
            module: "pemasukan/pemasukan-detail",
            as_param: "pemasukan_id",
            key_field: "id",
            overwrite: {
              fields: [
                { rule: "1.methods.list", value: false },
                { rule: "1.methods.filter", value: false },
                { rule: "1.methods.create", value: false },
                { rule: "1.methods.update", value: false },
                { rule: "1.methods.detail", value: false }
              ],
              permission: {
                create: "template-allow-all",
                read: "template-allow-all",
                update: "template-allow-all",
                delete: "template-allow-all"
              }
            }
          }
        ],
        fields: [
          {
            id: "pelanggan_id",
            label: "Pelanggan",
            methods: {
              list: { view_data: "rel_pelanggan" },
              create: {
                setter: "pelanggan",
                getter: "pelanggan",
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
              update: {
                setter: "pelanggan",
                getter: "pelanggan",
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
              detail: { view_data: "rel_pelanggan" }
            }
          },
          {
            id: "tgl_pembelian",
            label: "Tanggal Pembelian",
            methods: {
              list: { transform: "longDate" },
              detail: { transform: "longDate" },
              create: { type: "date", validation: ["required"] },
              update: { type: "date", validation: ["required"] },
              filter: { type: "date" }
            }
          },
          {
            id: "no_pembelian",
            label: "No Pembelian",
            methods: {
              list: { view_data: "no_pembelian" },
              create: { type: "text", validation: ["required"] },
              update: { type: "text", validation: ["required"] },
              filter: { type: "text" }
            }
          },
          {
            id: "no_invoice",
            label: "No invoice",
            methods: {
              list: { view_data: "no_invoice" },
              create: { type: "text", validation: ["required"] },
              update: { type: "text", validation: ["required"] },
              filter: { type: "text" }
            }
          },
          {
            id: "no_dokumen",
            label: "No dokumen",
            methods: {
              list: { view_data: "no_dokumen" },
              create: { type: "text", validation: ["required"] },
              update: { type: "text", validation: ["required"] },
              filter: { type: "text" }
            }
          },
          {
            id: "tipe_dokumen",
            label: "Tipe Dokumen",
            methods: {
              list: { view_data: "tipe_dokumen" },
              create: { type: "text", validation: ["required"] },
              update: { type: "text", validation: ["required"] },
              filter: { type: "text" }
            }
          },
          {
            id: "kurs",
            label: "Kurs",
            methods: {
              list: { view_data: "kurs" },
              create: { type: "number", validation: ["required"] },
              update: { type: "number", validation: ["required"] },
              filter: { type: "number" }
            }
          },
          // ===================
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
      },
      config_detail: {
        title: "Detail Pemasukan",
        model_api: "pemasukan_detail",
        getter: "pemasukan_detail",
        setter: "pemasukan_detail",
        // pk_field: 'area_name',
        permission: {
          create: "template-allow-all",
          read: "template-allow-all",
          update: false,
          delete: "template-allow-all"
        },
        fields: [
          {
            id: "barang_id",
            label: "barang",
            methods: {
              list: { view_data: "rel_barang" },
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
              update: {
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
              detail: { view_data: "rel_barang" }
            }
          },
          {
            id: "jumlah",
            label: "Jumlah",
            methods: {
              list: { view_data: "jumlah" },
              create: { type: "number", validation: ["required"] },
              update: { type: "number", validation: ["required"] },
              filter: { type: "number" }
            }
          },
          {
            id: "total_nilai",
            label: "Total Nilai",
            methods: {
              list: { view_data: "total_nilai" },
              create: { type: "number", validation: ["required"] },
              update: { type: "number", validation: ["required"] },
              filter: { type: "number" }
            }
          }
        ]
      }
    };
  }
};
</script>
