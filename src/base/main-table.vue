<template>
  <div>
    <div class="card card-custom" :class="!slave? 'mb-2' : 'mb-1'">
      <div class="card-header border-0 py-4 pr-3 pl-5">
        <div class="card-title align-items-end flex-fill flex-wrap mr-0">
          <div class="d-block d-lg-flex flex-wrap align-items-center mb-3 mb-md-0 mb-lg-0">
            <h4 class="d-block d-lg-flex mb-3 mb-lg-0 pr-3 font-weight-bolder">{{ title }}</h4>
            <div class="input-icon min-w-300px">
              <input v-model.lazy.trim="paramAPI.search" autocomplete="off" name="search" type="text" class="form-control seach-form" :placeholder="$t('global.search')+' '+title">
              <span>
                <i class="ri-search-line text-primary"></i>
              </span>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <!-- <div class="v-separator mx-3"></div> -->
            <a v-b-modal.modal-visibility class="btn btn-light-primary btn-icon btn-circle ml-2 mr-2" v-b-tooltip.top="$t('global.visibility')">
              <i class="ri-layout-3-line p-0"></i>
            </a>
            <a v-if="!hideFilter" @click="emitEvent('filter')" class="btn btn-light-primary btn-icon btn-circle mr-2" v-b-tooltip.top="$t('global.filter')">
              <i class="ri-filter-2-line p-0"></i>
            </a>
            <!-- <div v-if="this.export || this.import" class="v-separator mx-3"></div> -->
            <a v-if="this.export" @click="emitEvent('export')" class="btn btn-light-primary btn-icon btn-circle mr-2" v-b-tooltip.top="$t('global.export')">
              <export-excel @done="isLoadingExport = false" :fieldsXLS="exportLabel" :data="exportData" :beforeGenerate="getExportData" :worksheet='"Data "+ title' :name="title.split(' ').join('-')+'_'+$_sys.dateNow('DD-MM-YYYY')+ '.xls'">
                <i class="ri-file-excel-2-line p-0"></i>
              </export-excel>
            </a>
            <a v-if="this.import" @click="emitEvent('import')" class="btn btn-light-primary btn-icon btn-circle mr-2" v-b-tooltip.top="$t('global.import')">
              <i class="ri-upload-2-line p-0"></i>
            </a>
          </div>
        </div>
        <div class="card-toolbar align-items-end">
          <slot name="table-action" />
          <template v-if="$_sys.isAllowed(permission.create)">
            <a @click="emitEvent('add_new')" class="btn btn-primary btn-circle" v-b-tooltip.top="$t('global.add_new')">
              <i class="ri-add-circle-line p-0"></i> Tambah Baru </a>
          </template>
        </div>
        <b-toast id="export-toast" variant="success" solid no-auto-hide no-close-button :visible="isLoadingExport">
          <template #toast-title>
            <div class="d-flex flex-grow-1 align-items-center pt-2">
              <b-spinner label="Spinning" small></b-spinner>
              <strong class="mr-auto pl-3"> Mengunduh File ...</strong>
              <small class="text-muted mr-2">
                <time-ago locale="id"></time-ago>
              </small>
            </div>
          </template> File Excel akan langsung terunduh ketika proses Ekspor data ke Excel selesai
        </b-toast>
      </div>
    </div>
    <div :class="!filterView? 'd-none':'card card-custom mb-3 mt-3'" class="">
      <div class="card-body">
        <slot name="inline-filter"></slot>
      </div>
    </div>
    <slot name='header-table'></slot>
    <slot name='list-table' v-bind:rowData="mainData"></slot>
    <div class="card card-custom mb-5">
      <div :class="isTableSlot? 'pt-0' : ' pt-3'" class="card-body px-3 pb-0">
        <div v-if="mainData.length && !isTableSlot" class="table-responsive">
          <table class="table table-head-custom table-vertical-center table-borderless table-hover">
            <thead class="">
              <tr>
                <th class="position-relative" v-for="(h,i) in fields.filter(x => x.show === true && $_sys.isAllowed(x.permission))" :key="i+'-header'" :class="[{ 'sticky': i===0 }, { 'pointer': h.order}]" @click="orderField(h)">
                  <span class="d-block nowrap" :class="{ 'text-dark-75 mr-5': h.id === orderID }">{{ h.label }}</span>
                  <i v-if="h.id === orderID" class="sort-table text-dark-75" :class="'ri-sort-'+paramAPI.sort.toLowerCase()"></i>
                </th>
                <th class="action-table"></th>
              </tr>
            </thead>
            <tbody v-if="mainData.length>0">
              <tr v-for="(b,i) in mainData" :key="i+'-body'">
                <td v-for="(h,j) in fields.filter(x => x.show === true && $_sys.isAllowed(x.permission))" :key="j" :class="{ 'sticky': j===0 }" class="">
                  <template v-if="h.type === 'slot' || h.type === 'row-slot'">
                    <slot v-if="h.type === 'slot'" :name="h.id" v-bind:rowData="b.real[h.id]"></slot>
                    <slot v-else-if="h.type === 'row-slot'" :name="h.id" v-bind:rowData="b.real"></slot>
                  </template>
                  <template v-else>
                    <div v-if="(b.mask[h.id] instanceof Array)" class="d-flex align-items-center">
                      <template v-for="(v, k) in b.mask[h.id]">
                        <template v-if="(v.data instanceof Array)">
                          <template v-if="v.type === 'text'">
                            <template v-for="(d, l) in v.data">
                              <span :key="k+'-value-multiple'+l" class="text-line-2" :class="classReader(d, h.class)">{{ d | parse(h.transform) }} {{ l != v.data.length-1 ? ', ' : ' ' }}</span>
                            </template>
                          </template>
                          <template v-else-if="v.type === 'button'">
                            <template v-for="(d, l) in v.data">
                              <a :key="k+'-value-multiple-'+l" class="btn btn-sm " :class="[classReader(d, h.class) ? classReader(d, h.class) : 'btn-primary']" @click="h.event.click">{{ d | parse(h.transform) }}</a>
                            </template>
                          </template>
                          <template v-else-if="v.type === 'file'">
                            <template v-for="(d, l) in v.data">
                              <img :key="k+'-value-multiple-'+l" class="img-table " :class="classReader(d, h.class)" v-img-fb="d" :alt="h.id" @click="emitEvent('zoom', d)" />
                            </template>
                          </template>
                          <template v-else>
                            <span :key="k+'-value-multiple-'+l">{{ $t('error.view_type') }} {{ '('+v.type+')' }} </span>
                          </template>
                        </template>
                        <template v-else>
                          <span v-if="v.type === 'text'" :key="k+'-value'" class="text-line-2" :class="classReader(v, h.class[k])">{{ v.data | parse(h.transform[k]) }}</span>
                          <a v-else-if="v.type === 'button'" :key="k+'-value'" class="btn btn-sm " :class="[classReader(v, h.class[k]) ? classReader(v, h.class[k]) : 'btn-primary']" @click="h.event.click[k]">{{ v.data | parse(h.transform[k]) }}</a>
                          <img v-else-if="v.type === 'file'" :key="k+'-value'" class="img-table " :class="classReader(v, h.class[k])" v-img-fb="v.data" :alt="h.id" @click="emitEvent('zoom', v.data)" />
                          <span v-else :key="k+'-value'">{{ $t('error.view_type') }} {{ '('+v.type+')' }}</span>
                        </template>
                      </template>
                    </div>
                    <template v-else>
                      <template v-if="(b.mask[h.id].data instanceof Array)">
                        <template v-if="b.mask[h.id].type === 'text'">
                          <template v-for="(d, k) in b.mask[h.id].data">
                            <span :key="k+'-value'" class="text-line-2" :class="classReader(d, h.class)">{{ d | parse(h.transform) }}{{ k != (b.mask[h.id].data.length-1) ? ', ' : ' ' }}</span>
                          </template>
                        </template>
                        <template v-else-if="b.mask[h.id].type === 'button'">
                          <template v-for="(d, k) in b.mask[h.id].data">
                            <a :key="k+'-value'" class="btn btn-sm " :class="[classReader(d, h.class) ? classReader(d, h.class) : 'btn-primary']" @click="h.event.click">{{ d | parse(h.transform) }}</a>
                          </template>
                        </template>
                        <template v-else-if="b.mask[h.id].type === 'file'">
                          <template v-for="(d, k) in b.mask[h.id].data">
                            <img :key="k+'-value'" class="img-table " :class="classReader(d, h.class)" v-img-fb="d" :alt="h.id" @click="emitEvent('zoom', d)" />
                          </template>
                        </template>
                        <template v-else>
                          <span :key="k+'-value'">{{ $t('error.view_type') }} {{ '('+b.mask[h.id].type+')' }}</span>
                        </template>
                      </template>
                      <template v-else>
                        <span v-if="b.mask[h.id].type === 'text'" class="text-line-2" :class="classReader(b.mask[h.id].data, h.class)">{{ b.mask[h.id].data | parse(h.transform) }}</span>
                        <div v-else-if="b.mask[h.id].type === 'money'" class="d-flex justify-content-between">
                          <span class="">Rp.</span>
                          <span class="text-right">{{ b.mask[h.id].data | parse(h.transform) }}</span>
                        </div>
                        <a v-else-if="b.mask[h.id].type === 'button'" class="btn btn-sm " :class="[classReader(b.mask[h.id].data, h.class) ? classReader(b.mask[h.id].data, h.class) : 'btn-primary']" @click="h.event.click">{{ b.mask[h.id].data | parse(h.transform) }}</a>
                        <img v-else-if="b.mask[h.id].type === 'file'" class="img-table " :class="classReader(b.mask[h.id].data, h.class)" v-img-fb="b.mask[h.id].data" :alt="h.id" @click="emitEvent('zoom', b.mask[h.id].data)" />
                        <span v-else>{{ $t('error.view_type') }} {{ '('+b.mask[h.id].type+')' }}</span>
                      </template>
                    </template>
                  </template>
                </td>
                <td class="action-table sticky-right">
                  <div class="action-button">
                    <slot name="table-data-action" v-bind:rowData="b.real"></slot>
                    <a v-b-tooltip.top.viewport="$t('global.detail')" @click="emitEvent('detail',b.real)" v-if="$_sys.isAllowed(permission.read)" class="btn font-size-sm font-weight-bold btn-info btn-sm">
                      <i class="ri-information-line p-0"></i> Lihat Detail </a>
                    <a v-b-tooltip.top.viewport="$t('global.update')" @click="emitEvent('update',b.real)" v-if="$_sys.isAllowed(permission.update)" class="btn btn-icon btn-warning btn-sm">
                      <i class="ri-edit-2-line"></i>
                    </a>
                    <a v-b-tooltip.top.viewport="$t('global.delete')" @click="deleteData(b.real)" v-if="$_sys.isAllowed(permission.delete)" class="btn btn-icon btn-danger btn-sm">
                      <i class="ri-delete-bin-2-line"></i>
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="mainData.length===0" class="text-center mt-3 " style="margin-bottom:3em;">
          <img src="/static/img/default/no_data_table.svg" style="width:120px;margin:2em 0;" alt="">
          <p class="text-muted font-weight-bold" v-if="!paramAPI.search">Belum ada data yang ditambahkan</p>
          <p v-else>{{ paramAPI.search }} tidak ditemukan</p>
        </div>
        <div v-if="mainData.length" class="d-flex justify-content-between align-items-center flex-wrap">
          <div class="pagination d-flex flex-wrap py-2 mr-3">
            <button type="button" @click="goPage('first')" :disabled="paramAPI.page == 1" class="btn btn-text btn-icon btn-sm btn-outline-primary mr-1 my-1">
              <i class="ri-skip-back-mini-line"></i>
            </button>
            <button type="button" @click="goPage('prev')" :disabled="paramAPI.page == 1" class="btn btn-text btn-sm btn-outline-primary mr-1 my-1"> {{ $t('global.prev') }} </button>
            <input @change="goPage('input')" v-model.lazy="paramAPI.page" type="text" name="pagination" autocomplete="off" class="form-control form-control-sm pagination-text mr-1 my-1" :placeholder="$t('global.goto')">
            <button type="button" @click="goPage('next')" :disabled="paramAPI.page == maxPage" class="btn btn-text btn-sm btn-outline-primary mr-1 my-1"> {{ $t('global.next') }} </button>
            <button type="button" @click="goPage('last')" :disabled="paramAPI.page == maxPage" class="btn btn-text btn-icon btn-sm btn-outline-primary mr-1 my-1">
              <i class="ri-skip-forward-mini-line"></i>
            </button>
          </div>
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
      <b-modal :hide-footer="true" size="lg" centered id="modal-visibility" :title="$t('global.visibility')+' Tabel '+title">
        <div class="row">
          <div v-for="(v,y) in fields" :key="y+'-visibility'" class="col-lg-6 col-sm-12">
            <div class="form-group row align-items-center">
              <label :for="v.data" class="col-lg-8 col-9 col-form-label text-capitalize">{{ v.label }}</label>
              <div class="col-3">
                <span class="switch switch-icon">
                  <label>
                    <input :id="v.data" v-model="v.show" type="checkbox" checked="checked" name="select" :true-value="true" :false-value="false">
                    <span></span>
                  </label>
                </span>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
    <slot name='footer-table'></slot>
  </div>
</template>
<style>
  .limit-table .vs__dropdown-toggle {
    border: 1px solid #e4e6ef;
  }
  .limit-table .vs__open-indicator {
    fill: #d3d6e2;
  }
  .v-separator {
    border-right: 2px solid #e4e6ef;
    height: calc(1.5em + 1.3rem);
  }
</style>
<style scoped>
  .sticky {
    position: sticky !important;
    left: 0 !important;
    background-color: #ffffff;
    z-index: 2;
    max-width: 350px;
    min-width: 250px;
    /* width: 200px; */
  }
  .sticky-right {
    position: sticky !important;
    right: 0 !important;
    z-index: 2;
  }
  .pagination-text {
    width: 80px;
    text-align: center;
  }
  .seach-form {
    border-radius: 18px;
  }
  .img-table {
    height: 50px;
    width: 50px;
    border-radius: 8px;
    object-fit: cover;
    cursor: pointer;
  }
  .table-hover tbody tr:hover td {
    color: #3f4254;
    background-color: #f5f5f5 !important;
  }
  .action-table {
    width: 1%;
    height: 100%;
    white-space: nowrap;
    text-align: right;
    position: relative;
  }
  .action-table .action-button {
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    right: 5px;
    background-color: transparent;
    transform: translate(0, -50%);
    height: 100%;
    transition: all 0.5s ease;
    opacity: 0;
    padding: 1rem;
  }
  .action-table .action-button a {
    margin-right: 0.25em;
  }
  .table-hover tbody tr:hover td.action-table .action-button {
    opacity: 1;
    background-color: #f5f5f5 !important;
  }
  .sort-table {
    transition: all 0.5s ease;
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translate(0, -50%);
  }
  .table-head-custom th {
    background-color: #f4f4f4 !important;
    color: #000 !important;
  }
  .table-head-custom th span {
    color: #000 !important;
  }
</style>
<script>
export default {
  name: 'main-table',
  props: {
    API: { type: String, required: true },
    endpoint: { type: Object, required: true },
    fields: { type: Array, required: true },
    export: { type: Boolean, required: false },
    import: { type: Boolean, required: false },
    title: { type: String, required: true },
    permission: { type: Object, required: true },
    slave: { type: Boolean, required: false, default: false },
    isTableSlot: { type: Boolean, required: false, default: false },
    filters: { type: Object, required: false, default () { return {} } },
    hideFilter: { type: Boolean, required: false, default () { return false } },
    filterView: { type: Boolean, required: false, default () { return false } },
    isCustomAPI: { type: Boolean, required: false, default () { return false } }
  },
  data () {
    return {
      orderID: '',
      total: 0,
      maxPage: 0,
      mainData: [],
      isLoading: true,
      paramAPI: {
        page: 1,
        limit: 10,
        sort_by: '',
        sort: 'DESC',
        search: '',
        filters: {}
      },
      inputSearch: null,
      exportLabel: {},
      exportData: null,
      isLoadingExport: false
    }
  },
  computed: {
    detailPagination () {
      let _inPage = (this.paramAPI.limit > this.mainData.length) ? this.mainData.length : this.paramAPI.limit
      return this.$t('global.display') + ' ' + _inPage + ' ' + this.$t('global.of') + ' ' + this.total + ' ' + this.$t('global.record')
    },
    filterList () {
      let search
      let filter = []
      let _mask = this.paramAPI.filters || {}
      if (this.paramAPI.search && this.paramAPI.search !== '') {
        search = { id: 'search', type: 'search', value: this.paramAPI.search }
      } else search = null
      if (this.fields && Object.entries(_mask).length !== 0) {
        Object.keys(_mask).forEach(e => {
          let field = this.fields.filter(x => x.id === e)[0]
          if (field) {
            let label = field.label
            filter.push({ id: e, type: label, value: _mask[e], display: null })
          }
        })
      }
      if (search) filter.unshift(search)
      return filter
    },
    urlProperties () {
      if (!this.slave) return { ...this.$route.query, ...this.paramAPI }
      else return this.paramAPI
    }
  },
  watch: {
    urlProperties: {
      deep: true,
      immediate: false,
      handler (to) {
        this.getData(to)
      }
    },
    filters: {
      deep: true,
      immediate: true,
      handler (to) {
        let param = Object.assign({}, this.paramAPI)
        param.page = 1
        param.filters = to
        this.paramAPI = Object.assign({}, this.paramAPI, param)
        // this.$set(this.paramAPI, 'filters', to)
      }
    },
    '$route.query': {
      deep: true,
      immediate: true,
      handler (to, from) {
        if (!to.page && !this.slave) this.changeParam(this.paramAPI, true)
      }
    },
    inputSearch: {
      deep: false,
      immediate: false,
      handler (to) {
        let param = Object.assign({}, this.paramAPI)
        param.page = 1
        param.search = to
        this.paramAPI = Object.assign(this.paramAPI, param)
      }
    }
  },
  methods: {
    emitEvent (e, data = null) {
      const value = data || true
      this.$emit(e, value)
    },
    changeParam (e, replace) {
      let queryRoute = {
        page: e.page || 1,
        limit: e.limit || 10,
        sort_by: e.sort_by || '',
        sort: e.sort || '',
        search: e.search || '',
        filters: (typeof e.filters === 'string') ? e.filters : JSON.stringify(e.filters)
      }
      if (replace) {
        let _mask = queryRoute
        _mask.page = String(_mask.page)
        _mask.limit = String(_mask.limit)
        if (JSON.stringify(this.$route.query) !== JSON.stringify(_mask)) {
          this.$router.replace({ query: Object.assign({ ...this.$route.query }, queryRoute) })
        } else this.getData(e)
      } else this.getData(e)
    },
    async getExportData () {
      this.exportLabel = Object.assign({}, {})
      this.exportData = null
      this.isLoadingExport = true
      const param = Object.assign({}, this.paramAPI)
      delete param.limit
      delete param.page
      await this.$_api[this.isCustomAPI ? 'get' : 'dataset'](this.API, param).then(async res => {
        if (res.data.length > 0) {
          await this.buildData(res.data, true).then(e => {
            const data = e.map(x => x.export)
            const header = this.fields.filter(x => x.show === true && this.$_sys.isAllowed(x.permission))
            for (let iH = 0; iH < header.length; iH++) {
              const el = Object.assign({}, header[iH])
              this.$set(this.exportLabel, el.label, el.id)
            }
            this.exportData = data
          })
        } else this.$_alert.error(null, 'Data Kosong', 'Tidak dapat mengeksport data kosong')
      })
    },
    getData (param) {
      this.isLoading = true
      if (param) {
        if (param.filters) {
          param.filters = (typeof param.filters === 'string') ? JSON.parse(param.filters) : param.filters
          if (this.slave) {
            // let _filter = { ...param.filters, ...this.$store.state.activeSlave.param }
            param.filters[this.$store.state.activeSlave.param] = this.$store.state.activeSlave.key
            // console.log(param)
          }
        } else param.filters = {}
      } else param = this.paramAPI
      this.$_api[this.isCustomAPI ? 'get' : 'list'](this.API, param).then(e => {
        let data = e.data
        this.total = e.total
        this.mainData = []
        this.maxPage = e.totalPage
        this.buildData(data).then(e => {
          this.mainData = e
          this.isLoading = false
        })
      }, err => {
        console.log(err)
      })
    },
    async buildData (data, fromExport = false) {
      return new Promise(async (resolve, reject) => {
        let result = []
        await data.forEach(d => {
          let newData = {}
          let newExport = {}
          this.fields.forEach(f => {
            const transform = f.transform
            if (f.view_data instanceof Array) {
              let newMask = []
              f.view_data.forEach((v, i) => {
                newMask.push({ type: f.type[i], data: this.renderVal(d, v) })
              })
              newData[f.id] = newMask
              if (fromExport) {
                if (transform) newExport[f.id] = newMask.map(x => this.$options.filters.parse(x.data, transform))
                else newExport[f.id] = newMask.map(x => x.data)
              }
            } else {
              newData[f.id] = { type: f.type, data: this.renderVal(d, f.view_data) }
              if (fromExport) {
                if (transform) {
                  newExport[f.id] = this.$options.filters.parse(this.renderVal(d, f.view_data), transform)
                } else newExport[f.id] = this.renderVal(d, f.view_data)
              }
            }
          })
          let _temp = {
            real: d,
            mask: newData,
            export: newExport
          }
          result.push(_temp)
        })
        resolve(result)
      })
    },
    renderVal (source, prop) {
      if (!prop) return null
      let _index = prop.indexOf('.')
      if (_index > -1) {
        let e = prop.split('.')
        for (let i = 0; i < e.length; i++) {
          if (source[e[i]]) source = source[e[i]]
          else {
            if (Array.isArray(source)) {
              let tmp = []
              source.forEach(el => {
                tmp.push(el[e[i]])
              })
              source = tmp
            }
          }
        }
        return source
      } else return source[prop]
    },
    classReader (value, classes) {
      if (classes instanceof Object) {
        if (value instanceof Array) {
          value.forEach(val => {
            return classes[val]
          })
        } else return classes[value]
      } else return classes
    },
    goPage (e, event = null) {
      if (event) console.log(event)
      switch (e) {
        case 'first':
          this.paramAPI.page = 1
          break
        case 'last':
          this.paramAPI.page = Number(this.maxPage)
          break
        case 'next':
          this.paramAPI.page = this.paramAPI.page < this.maxPage ? Number(this.paramAPI.page) + 1 : this.paramAPI.page
          break
        case 'prev':
          this.paramAPI.page = this.paramAPI.page === 1 ? this.paramAPI.page : Number(this.paramAPI.page) - 1
          break
        case 'input':
          if (!isNaN(this.paramAPI.page)) {
            if (this.paramAPI.page > this.maxPage) this.paramAPI.page = this.maxPage
            else if (this.paramAPI.page < 1) this.paramAPI.page = 1
          }
          break
      }
    },
    orderField (e) {
      if (e.order) {
        if (e.view_data instanceof Array) {
          if (e.view_data[0] !== this.paramAPI.sort_by) {
            this.paramAPI.sort_by = e.view_data[0]
            this.paramAPI.sort = 'DESC'
            this.orderID = e.id
          } else this.paramAPI.sort = this.paramAPI.sort === 'ASC' ? 'DESC' : 'ASC'
        } else {
          if (e.view_data !== this.paramAPI.sort_by) {
            this.paramAPI.sort_by = e.view_data
            this.paramAPI.sort = 'DESC'
            this.orderID = e.id
          } else this.paramAPI.sort = this.paramAPI.sort === 'ASC' ? 'DESC' : 'ASC'
        }
      }
    },
    removeFilter (id = null) {
      if (!id) {
        this.paramAPI.search = ''
        this.paramAPI.filters = {}
      } else {
        if (id === 'search') {
          this.paramAPI.search = ''
        } else {
          const _mask = { ...this.paramAPI.filters }
          delete _mask[id]
          this.$set(this.paramAPI, 'filters', _mask)
        }
      }
    },
    deleteData (data) {
      this.$_alert.confirm('Hapus Permanen', 'Data yang sudah dihapus tidak dapat dikembalikan, lanjutkan ?').then((result) => {
        if (result.isConfirmed) {
          this.$_api.delete(this.endpoint.delete, { data: data }).then(res => {
            this.getData(this.paramAPI)
            this.$_alert.success(null, res.message)
          }).catch(err => {
            this.$_alert.error(err)
          })
        }
      })
    }
  }
}
</script>
