<template>
  <div class="card card-custom animated">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">{{ title }}</span>
      </h3>
      <div v-if="!readonly" class="input-icon w-100 mb-3 mt-3">
        <input v-model.lazy.trim="tmp_search" autocomplete="off" name="search" type="text" class="form-control seach-form" :placeholder="$t('global.search')+' '+title">
        <span>
          <i class="ri-search-line text-primary"></i>
        </span>
      </div>
      <div v-if="!readonly" class="form-group row mb-0">
        <label class="col-auto col-form-label">{{ $t('global.form_filter') }} :</label>
        <div class="col col-form-label">
          <div class="radio-inline">
            <label class="radio radio-success">
              <input type="radio" name="value_filter" v-model="value_filter" :value="2">
              <span></span>Semua {{ title }}</label>
            <label class="radio radio-success">
              <input type="radio" name="value_filter" v-model="value_filter" :value="1">
              <span></span>{{ title }} Aktif</label>
            <label class="radio radio-success">
              <input type="radio" name="value_filter" v-model="value_filter" :value="0">
              <span></span>Non Aktif</label>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body py-0 mt-3 mb-5">
      <div class="table-responsive">
        <table class="table table-mapping">
          <!-- <tbody> -->
          <tr v-for="(d,i) in dataList" :key="i+'-mapping-list'" :class="isloadingItem.includes(d.id) ? 'loading': ''">
            <td v-if="!readonly" class="nowrap-table">
              <span class="switch switch-icon flex-shrink-0">
                <label>
                  <input @change="handleValChange(d, i)" :disabled="isloadingItem.includes(d.id)" type="checkbox" :name="'lookup-item-'+i" :id="'lookup-item-'+i" :value="d[key_value]" v-model="d[key_value]">
                  <span></span>
                </label>
              </span>
            </td>
            <td v-for="(f,k) in display" :key="k+'-mapping-data'" :class="[k===0 ? 'font-weight-bold': '']">{{ d[f] }}</td>
          </tr>
          <!-- </tbody> -->
        </table>
      </div>
      <div class="d-flex justify-content-between align-items-center flex-wrap">
        <div class="pagination d-flex flex-wrap justify-content-end">
          <button type="button" @click="goPage('first')" :disabled="paramAPI.page == 1 || isLoadingPage" class="btn btn-text btn-icon btn-sm btn-outline-primary mr-1 my-1">
            <i class="ri-skip-back-mini-line"></i>
          </button>
          <button type="button" @click="goPage('prev')" :disabled="paramAPI.page == 1 || isLoadingPage" class="btn btn-text btn-sm btn-outline-primary mr-1 my-1"> {{ $t('global.prev') }} </button>
          <input :disabled="isLoadingPage" @change="goPage('input')" v-model.lazy="paramAPI.page" type="text" name="pagination" autocomplete="off" class="form-control form-control-sm pagination-text mr-1 my-1" :placeholder="$t('global.goto')">
          <button type="button" @click="goPage('next')" :disabled="paramAPI.page == maxPage || isLoadingPage" class="btn btn-text btn-sm btn-outline-primary mr-1 my-1"> {{ $t('global.next') }} </button>
          <button type="button" @click="goPage('last')" :disabled="paramAPI.page == maxPage || isLoadingPage" class="btn btn-text btn-icon btn-sm btn-outline-primary mr-1 my-1">
            <i class="ri-skip-forward-mini-line"></i>
          </button>
        </div>
        <div class="d-flex align-items-center py-3">
          <div v-if="isLoadingPage" class="d-flex align-items-center">
            <div class="mr-2 text-muted">{{ $t('global.loading') }} ...</div>
            <div class="spinner spinner-primary mr-10"></div>
          </div>
          <v-select class="mr-4" placeholder="Limit Data" v-model="temp_limit" :value="temp_limit" append-to-body :searchable="false" :clearable="false" :options="[10,20,50,100]"></v-select>
          <span class="text-muted">{{ detailPagination }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mapping-input',
  props: {
    title: { type: String, required: true },
    alert: { type: Array, required: false },
    setter_id: { type: String, required: true },
    getter: { type: String, required: true },
    setter: { type: String, required: true },
    params: { type: Object, required: false },
    display: { type: Array, required: true },
    readonly: { type: Boolean, required: false, default: () => { return false } },
    multiple: { type: Boolean, required: false, default: () => { return true } },
    refresh: { type: Number, required: false, default: () => { return 0 } },
    key_value: { type: String, required: false, default: () => { return 'value_mapping' } }
  },
  watch: {
    tmp_search: {
      immediate: false,
      deep: false,
      handler (to, from) {
        if (to) {
          let assign = {
            page: 1,
            search: to
          }
          this.paramAPI = Object.assign({}, this.paramAPI, assign)
        }
      }
    },
    paramAPI: {
      immediate: true,
      deep: true,
      handler (to, from) {
        this.getList(to)
      }
    },
    refresh: {
      immediate: false,
      deep: false,
      handler (to, from) {
        this.getList()
      }
    },
    value_filter: {
      immediate: false,
      deep: true,
      handler (to, from) {
        this.getList()
      }
    },
    temp_limit: {
      immediate: false,
      deep: true,
      handler (to, from) {
        let data = {
          page: 1,
          limit: to
        }
        this.paramAPI = { ...this.paramAPI, ...data }
      }
    }
  },
  computed: {
    detailPagination () {
      let _inPage = (this.paramAPI.limit > this.dataList.length) ? this.dataList.length : this.paramAPI.limit
      return this.$t('global.display') + ' ' + _inPage + ' ' + this.$t('global.of') + ' ' + this.total + ' ' + this.$t('global.record')
    }
  },
  data () {
    return {
      isLoadingPage: false,
      isloadingItem: [],
      paramAPI: {
        search: null,
        page: 1,
        limit: 10
      },
      total: 0,
      maxPage: 0,
      temp_page: 1,
      temp_limit: 10,
      value_filter: this.readonly ? 1 : 2,
      dataList: [],
      tmp_search: null
    }
  },
  methods: {
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
    async getList (localParam = null) {
      this.isLoadingPage = true
      if (!localParam) {
        localParam = {
          search: this.paramAPI.search,
          page: this.paramAPI.page,
          limit: 10
        }
      }
      let _f
      let obj = {}
      if (this.value_filter !== 2) _f = this.value_filter
      else _f = null
      obj[this.key_value] = _f
      let filters = { ...this.params, ...obj }
      let newParam = { ...localParam, ...this.paramAPI }
      newParam.filters = filters
      await this.$_api.list(this.getter, newParam).then(res => {
        this.isLoadingPage = false
        this.errorList = false
        this.dataList = res.data[0].data
        this.total = res.data[0].total
        this.maxPage = Math.ceil(this.total / this.paramAPI.limit)
      }).catch((err) => {
        this.isLoadingPage = false
        this.errorList = true
        this.$_alert.error(err, 'Daftar pilihan tidak ditemukan')
      })
    },
    handleValChange (data, index) {
      if (this.alert && !data[this.key_value]) {
        this.$_alert.confirm(this.alert[0], this.alert[1]).then((result) => {
          if (result.isConfirmed) {
            this.changeVal(data)
          } else {
            this.dataList[index][this.key_value] = !this.dataList[index][this.key_value]
          }
        })
      } else this.changeVal(data)
    },
    changeVal (data) {
      this.isloadingItem.push(data.id)
      let _tmp = { ...data, ...this.params }
      _tmp[this.setter_id] = _tmp.id
      delete _tmp.id
      this.$_api.update(this.setter, _tmp).then(res => {
        this.isloadingItem.splice(this.isloadingItem.findIndex(x => x === data.id), 1)
        this.$emit('change', null)
      }).catch((err) => {
        this.isLoadingPage = false
        this.errorList = true
        this.$_alert.error(err, 'Gagal Mengaktifkan data')
      })
    }
  }
}
</script>

<style>
  table.table-mapping tr td {
    vertical-align: middle;
  }
  table.table-mapping tr:first-child td {
    border-top: none !important;
  }
  .pagination-text {
    width: 80px !important;
    text-align: center;
  }
  table.table-mapping tr.loading {
    background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0) 80%
      ),
      #f0f3f7;
    background-repeat: repeat-y;
    background-position: 0 0;
    background-size: 5000px;
    animation: shine 3s infinite;
  }
  @keyframes shine {
    to {
      background-position: 100% 0, /* move highlight to right */ 0 0;
    }
  }
</style>
