<template>
  <div class="card-wrapper">
    <div class="card card-custom mb-5">
      <div class="card-header border-0 pt-6 pb-0">
        <div class="card-title flex-fill mr-0">
          <h4>{{ title }}</h4>
        </div>
        <div class="card-toolbar">
          <slot name="table-action" />
          <div v-if="$_sys.isAllowed(permission.create)" class="mx-3"></div>
          <a @click="emitEvent('add_new')" v-if="$_sys.isAllowed(permission.create)" class="btn btn-primary btn-icon btn-circle" v-b-tooltip.top="$t('global.add_new')">
            <i class="ri-add-line p-0"></i>
          </a>
          <div class="v-separator mx-3"></div>
          <!-- <a v-b-modal.modal-visibility class="btn btn-outline-primary btn-icon btn-circle mr-2" v-b-tooltip.top="$t('global.visibility')">
            <i class="ri-layout-3-line p-0"></i>
          </a> -->
          <a @click="emitEvent('filter')" class="btn btn-outline-primary btn-icon btn-circle" v-b-tooltip.top="$t('global.filter')">
            <i class="ri-filter-2-line p-0"></i>
          </a>
          <div v-if="this.export || this.import" class="v-separator mx-3"></div>
          <a v-if="this.export" @click="emitEvent('export')" class="btn btn-outline-primary btn-icon btn-circle mr-2" v-b-tooltip.top="$t('global.export')">
            <i class="ri-file-excel-2-line p-0"></i>
          </a>
          <a v-if="this.import" @click="emitEvent('import')" class="btn btn-outline-primary btn-icon btn-circle mr-2" v-b-tooltip.top="$t('global.import')">
            <i class="ri-upload-2-line p-0"></i>
          </a>
        </div>
      </div>
      <div class="card-header border-0 py-0">
        <div class="card-title flex-fill mr-0">
          <div class="input-icon w-100">
            <input v-model.lazy.trim="paramAPI.search" autocomplete="off" name="search" type="text" class="form-control seach-form" :placeholder="$t('global.search')+' '+title">
            <span>
              <i class="ri-search-line text-primary"></i>
            </span>
          </div>
        </div>
        <div class="d-flex align-items-center py-3 ml-4">
          <span class="text-muted">{{ detailPagination }}</span>
        </div>
      </div>
      <div class="card-body pt-3">
        <slot name="inline-filter"></slot>
        <!-- <div v-if="filterList.length>0" class="row no-gutters mb-5">
          <div class="col-auto">
            <span class="d-block label label-inline bg-white mr-1">{{ $t('global.filter_label') }} :</span>
          </div>
          <div class="col">
            <template v-for="(f,i) in filterList">
              <span :key="i+'-key-filter'" class="label label-inline label-light-primary mr-1 mb-1 pr-1"> {{f.id === 'search' ? $t('global.search_label')  : f.type }} : {{ f.value ? f.value: 'Semua' }} <i @click="removeFilter(f.id)" class="ri-close-line ml-2 pointer text-danger"></i>
              </span>
            </template>
            <span @click="removeFilter()" class="label label-inline label-light-danger mr-1 mb-1 pointer">{{ $t('global.delete_all') }}</span>
          </div>
        </div> -->
      </div>
    </div>
    <slot name='header-card'></slot>
    <masonry v-if="mainData.length>0" :cols="{default: 3, 1024: 2, 768: 2, 425: 1}" :gutter="{default: '.75rem', 700: '15px'}">
      <div class="card card-custom mb-3" v-for="(b,i) in mainData" :key="i+'-item-card'">
        <slot name='card-view' v-bind:rowData="b.real"></slot>
      </div>
    </masonry>
    <div v-if="!isLoading && mainData.length===0" class="text-center my-3">
      <img src="/static/img/qhse/no-data_form.svg" style="width:120px;margin:2em 0;" alt="">
      <p v-if="!paramAPI.search">Belum ada data yang ditambahkan</p>
      <p v-else>{{ paramAPI.search }} tidak ditemukan</p>
    </div>
    <div v-if="mainData.length>0" class="d-flex flex-column align-items-center justify-content-center text-center my-6">
      <b-spinner v-if="isLoading" variant="primary" label="Text Centered" tag="div" style="width: 3rem; height: 3rem;"></b-spinner>
      <button v-if="!isLoading && !(paramAPI.page == maxPage)" @click="goPage('next')" :disabled="paramAPI.page == maxPage" class="btn btn-light-primary">Lihat Selanjutnya</button>
      <span v-if="!isLoading && (paramAPI.page == maxPage)" @click="goPage('next')" class="text-muted">Semua data sudah ditampilkan</span>
    </div>
    <!-- <div v-if="mainData.length>0" class="d-flex justify-content-end align-items-center flex-wrap">
      <div class="pagination d-flex flex-wrap py-2 mr-3">
        <button type="button" @click="goPage('first')" :disabled="paramAPI.page == 1" class="btn btn-text btn-icon btn-sm btn-primary mr-1 my-1">
          <i class="ri-skip-back-mini-line"></i>
        </button>
        <button type="button" @click="goPage('prev')" :disabled="paramAPI.page == 1" class="btn btn-text btn-sm btn-primary mr-1 my-1"> {{ $t('global.prev') }} </button>
        <input @change="goPage('input')" v-model.lazy="paramAPI.page" type="text" name="pagination" autocomplete="off" class="form-control form-control-sm pagination-text mr-1 my-1" :placeholder="$t('global.goto')">
        <button type="button" @click="goPage('next')" :disabled="paramAPI.page == maxPage" class="btn btn-text btn-sm btn-primary mr-1 my-1"> {{ $t('global.next') }} </button>
        <button type="button" @click="goPage('last')" :disabled="paramAPI.page == maxPage" class="btn btn-text btn-icon btn-sm btn-primary mr-1 my-1">
          <i class="ri-skip-forward-mini-line"></i>
        </button>
      </div>
    </div> -->
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
</template>

<script>
export default {
  name: 'main-card',
  props: {
    API: { type: String, required: true },
    endpoint: { type: Object, required: true },
    fields: { type: Array, required: true },
    export: { type: Object, required: false },
    import: { type: Object, required: false },
    title: { type: String, required: true },
    permission: { type: Object, required: true },
    slave: { type: Boolean, required: false, default: false },
    filters: { type: Object, required: false, default () { return {} } }
  },
  data () {
    return {
      orderID: '',
      total: 0,
      maxPage: 0,
      mainData: [],
      isLoading: false,
      paramAPI: {
        page: 1,
        limit: 9,
        sort_by: '',
        sort: 'DESC',
        search: '',
        filters: {}
      }
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
            filter.push({ id: e, type: label, value: _mask[e] })
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
      handler (to, from) {
        if (to.page !== from.page) this.getData(to, false)
        else {
          let filter = Object.assign({}, to)
          filter.page = 1
          this.getData(filter, true)
        }
      }
    },
    filters: {
      deep: true,
      immediate: true,
      handler (to) {
        this.$set(this.paramAPI, 'filters', to)
      }
    }
  },
  mounted () {
    this.changeParam(this.paramAPI, true)
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
    getData (param, reload = false) {
      this.isLoading = true
      if (param.filters) {
        param.filters = (typeof param.filters === 'string') ? JSON.parse(param.filters) : param.filters
        if (this.slave) {
          param.filters[this.$store.state.activeSlave.param] = this.$store.state.activeSlave.key
        }
      } else param.filters = {}
      this.$_api.list(this.API, param).then(e => {
        let data = e.data
        this.total = e.total
        if (reload) this.mainData = []
        this.maxPage = e.totalPage
        this.buildData(data).then(e => {
          this.isLoading = false
        })
      }, err => {
        console.log(err)
      })
    },
    async buildData (data) {
      await data.forEach(d => {
        let newData = {}
        this.fields.forEach(f => {
          if (f.view_data instanceof Array) {
            let newMask = []
            f.view_data.forEach((v, i) => {
              newMask.push({ type: f.type[i], data: this.renderVal(d, v) })
            })
            newData[f.id] = newMask
          } else {
            newData[f.id] = { type: f.type, data: this.renderVal(d, f.view_data) }
          }
        })
        let _temp = {
          real: d,
          mask: newData
        }
        this.mainData = this.mainData.concat(_temp)
      })
    },
    renderVal (source, prop) {
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
            this.getData(this.paramAPI, true)
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

<style>
  .limit-table .vs__dropdown-toggle {
    border: 1px solid #e4e6ef;
  }
  .limit-table .vs__open-indicator {
    fill: #d3d6e2;
  }
</style>
<style scoped>
  @media (min-width: 576px) {
    .card-columns {
      column-count: 1;
    }
  }

  @media (min-width: 768px) {
    .card-columns {
      column-count: 2;
    }
  }

  @media (min-width: 992px) {
    .card-columns {
      column-count: 2;
    }
  }

  @media (min-width: 1200px) {
    .card-columns {
      column-count: 3;
    }
  }
  .sticky {
    position: sticky !important;
    left: 0 !important;
    background-color: #ffffff;
    z-index: 2;
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
  .v-separator {
    border-right: 2px solid #e4e6ef;
    height: 100%;
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
</style>
