<template>
  <div>
    <div class="scrolling-table">
      <table class="table v-center header-center header-uppercase input-table table-custom-header">
        <thead class="bg-light-primary">
          <th class="nowrap-table">
            <span class="form-control form-control-sm font-weight-bolder">No.</span>
          </th>
          <template v-for="(h,i) in label">
            <th :class="[i===0? 'sticky-left': '']" :key="i+'-header-table'" class="">
              <span :class=" h.type === 'label'? '': 'bg-light-primary'" class="form-control form-control-sm font-weight-bolder">{{ h.label }}</span>
            </th>
          </template>
        </thead>
        <template v-if="mainData.length">
          <tbody>
            <template v-for="(v,i) in mainData">
              <tr :key="i+'-tr-table'">
                <td class="nowrap-table" :key="i+'-numbering-table'">
                  <span class="form-control form-control-sm">{{ i+1 + (paramAPI.limit * (paramAPI.page-1)) }}.</span>
                </td>
                <template v-for="(h,j) in label">
                  <td :class="j===0? 'sticky-left': ''" :key="j+'-td-table'">
                    <template v-if="h.type === 'label'">
                      <span @click="setFullWidth(h.id)" class="form-control form-control-sm">
                        <div :class="fullwidthColumns.includes(h.id) ? 'nowrap-table': 'text-line-1'">{{ v[h.id] }} </div>
                      </span>
                    </template>
                    <template v-else-if="h.type === 'text'">
                      <input v-model.lazy="v[h.id]" @change="changedValue(v)" type="text" class="form-control form-control-sm">
                    </template>
                    <template v-else>
                      <vue-numeric v-model.lazy="v[h.id]" @change="changedValue(v)" separator="." :empty-value="0" :currency="h.type==='money'? 'Rp.': null" :precision="h.precision ? h.precision : 0" class="form-control form-control-sm" />
                    </template>
                  </td>
                </template>
              </tr>
            </template>
          </tbody>
        </template>
      </table>
    </div>
    <div v-if="mainData.length>0" class="d-flex justify-content-between align-items-center flex-wrap">
      <b-pagination class="mb-0" size="md" prev-text="Sebelumnya" next-text="Selanjutnya" hide-goto-end-buttons v-model="paramAPI.page" :total-rows="total" :per-page="paramAPI.limit" />
      <div class="d-flex align-items-center py-3">
        <div v-if="isLoading" class="d-flex align-items-center">
          <div class="mr-2 text-muted">{{ $t('global.loading') }} ...</div>
          <div class="spinner spinner-primary mr-10"></div>
        </div>
        <v-select class="limit-table mr-4" placeholder="Limit Data" v-model="paramAPI.limit" :value="paramAPI.limit" append-to-body :searchable="false" :clearable="false" :options="[10,20,50,100]"></v-select>
        <span class="text-muted">{{ detailPagination }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'table-input',
  props: {
    mode: { type: String, required: false, default () { return 'bulk' } },
    filter: { type: Object, required: false, default () { return {} } },
    label: { type: Array, required: true },
    setter: { type: String, required: true },
    getter: { type: String, required: true }

  },
  data () {
    return {
      total: 0,
      isLoading: false,
      inputSearch: null,
      mainData: [],
      paramAPI: {
        page: 1,
        limit: 50,
        sort_by: '',
        sort: 'DESC',
        search: '',
        filters: {}
      },
      fullwidthColumns: []
    }
  },
  computed: {
    detailPagination () {
      let _inPage = (this.paramAPI.limit > this.mainData.length) ? this.mainData.length : this.paramAPI.limit
      return this.$t('global.display') + ' ' + _inPage + ' ' + this.$t('global.of') + ' ' + this.total + ' ' + this.$t('global.record')
    }
  },
  watch: {
    inputSearch: {
      deep: false,
      immediate: false,
      handler (to) {
        let param = Object.assign({}, this.paramAPI)
        param.page = 1
        param.search = to
        this.paramAPI = Object.assign({}, param)
      }
    },
    filter: {
      deep: true,
      immediate: true,
      handler (to) {
        console.log('filter change', to)
        let param = Object.assign({}, this.paramAPI)
        param.page = 1
        param.filters = to
        this.paramAPI = Object.assign({}, param)
      }
    },
    paramAPI: {
      deep: true,
      immediate: true,
      handler (to) {
        this.getListData(to)
      }
    }
  },
  methods: {
    setFullWidth (field) {
      if (this.fullwidthColumns.includes(field)) {
        this.fullwidthColumns = this.fullwidthColumns.filter(x => x !== field)
      } else this.fullwidthColumns.push(field)
    },
    async changedValue (val) {
      this.isLoading = true
      await console.log(val)
      this.isLoading = false
    },
    async getListData (filter) {
      this.isLoading = true
      const data = await this.sendAPI('list', this.getter, filter)
      if (data.data.length) {
        this.total = data.total
        this.mainData = data.data
      } else this.$emit('empty-list', true)
      this.isLoading = false
    },
    sendAPI (method, api, param) {
      return this.$_api[method](api, param).then(res => {
        return res
      }).catch((err) => {
        this.$_alert.error(err)
      })
    }
  }
}
</script>

<style>
  .w-fit-content {
    width: 100%;
  }
  .table.input-table th,
  .table.input-table td {
    width: 170px;
    min-width: 170px;
    border: 0 !important;
    padding: 0;
  }
  .table.input-table td {
    padding: 0;
  }
  .table.input-table th .form-control,
  .table.input-table td .form-control{
    border-color: #E4E6EF
  }
  .table.input-table th .form-control:focus,
  .table.input-table td .form-control:focus{
    background-color: #F4F1FE;
  }
  .table.input-table th .form-control {
    border-width: 1px;
    border-top-width: 2px;
  }
  .table.input-table th:first-child .form-control,
  .table.input-table td:first-child .form-control{
    border-left-width: 2px;
  }
  .table.input-table th:last-child .form-control,
  .table.input-table td:last-child .form-control{
    border-right-width: 2px;
  }
  .table.input-table tr:last-of-type td .form-control{
    border-bottom-width: 2px;
  }
  .table.input-table .form-control {
    border-radius: 0;
    height: auto;
  }
  /* .table.input-table td .form-control:focus {
    border: 1px solid var(--primary-color);
  } */
  .sticky-left {
    position: sticky !important;
    left: -1px !important;
    background-color: #ffffff;
    z-index: 2;
    max-width: 250px;
    min-width: 170px;
  }
  .scrolling-table {
    display: block;
    width: 100%;
    max-height: 70vh;
    overflow-y: auto;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .scrolling-table thead th {
    position: sticky !important;
    top: 0;
    background-color: #ffffff;
    z-index: 3;
  }
  .scrolling-table tfoot th {
    position: sticky !important;
    bottom: 0;
    background-color: #ffffff;
    z-index: 3;
  }
  .scrolling-table tfoot th.sticky-left,
  .scrolling-table thead th.sticky-left {
    z-index: 4;
  }
  .limit-table .vs__dropdown-toggle {
    border: 1px solid #e4e6ef;
  }
  .limit-table .vs__open-indicator {
    fill: #d3d6e2;
  }
  .v-separator {
    border-right: 2px solid #e4e6ef;
    height: 100%;
  }
  .pagination-text {
    width: 80px;
    text-align: center;
  }
</style>
