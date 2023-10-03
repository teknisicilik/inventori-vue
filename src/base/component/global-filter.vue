<template>
  <form autocomplete="off">
    <div class="form-group row mb-0">
      <div :class="!inline? 'col-12 mb-3': 'col'">
        <div class="form-group mb-0">
          <span class="d-block mb-1 font-weight-bold font-size-lg" for="">Pilih Divisi</span>
          <v-select :disabled="readonly" :clearable="clearable" v-model="filter.division_id" :appendToBody="true" class="vs-style custom" :options="datasets.division" :placeholder="'Pilih salah satu Divisi'">
            <slot name="no-options">{{ $t('error.no_data') }}</slot>
          </v-select>
        </div>
      </div>
      <div :class="!inline? 'col-12': 'col-auto'">
        <div class="form-group mb-0">
          <span class="d-block mb-1 font-weight-bold font-size-lg" for="">Tahun</span>
          <date-picker :clearable="clearable" :input-attr="{ autocomplete:'off' }" v-model="filter.year" type="year" :input-class="'form-control custom'" class="w-100" :value-type="formatDate('year')" :formatter="momentFormat" />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import moment from 'moment'
moment.locale('id')
export default {
  props: {
    inline: { type: Boolean, required: false, default () { return false } },
    clearable: { type: Boolean, required: false, default () { return false } },
    readonly: { type: Boolean, required: false, default () { return false } },
    allowAll: { type: Boolean, required: false, default () { return false } },
    query: { type: Boolean, required: false, default () { return false } }
  },
  data () {
    return {
      filter: {
        division_id: !this.allowAll ? { label: 'Pilih Divisi', code: null } : { label: 'Tampilkan Semua Divisi', code: null },
        year: moment().set('date', 1).set('month', 0).format('YYYY')
      },
      datasets: {
        division: []
      },
      momentFormat: {
        stringify: (date) => {
          return date ? moment(date).format('YYYY') : ''
        },
        parse: (value) => {
          return value ? moment(value, 'YYYY').toDate() : null
        }
      }
    }
  },
  watch: {
    filter: {
      deep: true,
      immediate: false,
      handler (to) {
        let elm = Object.assign({}, to)
        elm.year = elm.year ? moment(moment(elm.year, 'YYYY').toDate()).format('YYYY-MM-DD') : null
        this.$emit('change', elm)
      }
    },
    '$route.query': {
      deep: true,
      immediate: true,
      async handler (e) {
        if (this.query && this.isFilterAvailable) {
          if (!this.datasets.division.length) await this.getListData()
          this.filter = Object.assign({}, {
            division_id: this.datasets.division.filter(x => x.code === Number(e.division_id))[0],
            year: e.periode_year
          })
        }
      }
    }
  },
  computed: {
    isFilterAvailable () {
      return this.$route.query.division_id || this.$route.query.periode_year
    }
  },
  mounted () {
    this.setDefValue()
  },
  methods: {
    formatDate (type) {
      let _format
      switch (type) {
        case 'date':
        case 'date-range':
          _format = 'YYYY-MM-DD'
          break
        case 'datetime':
        case 'datetime-range':
          _format = 'YYYY-MM-DD HH:mm:ss'
          break
        case 'year':
        case 'year-range':
          _format = 'YYYY'
          break
        case 'month':
        case 'month-range':
          _format = 'YYYY-MM-DD'
          break
        case 'time':
        case 'time-range':
          _format = 'HH:mm:ss'
          break
        case 'week':
        case 'week-range':
          _format = 'DD'
          break
      }
      return _format
    },
    setDefValue () {
      if (this.$_config.options.autofill) {
        this.initAutofillData()
      } else {
        this.initResData()
      }
    },
    async getListData () {
      await this.$_api.dataset('divisions', { sort: 'ASC' }).then(dept => {
        let division = dept.data.map(x => { return { label: x.division_name, code: x.id } })
        this.datasets = Object.assign({}, {
          division: !this.allowAll ? division : [...[{ label: 'Tampilkan Semua Divisi', code: null }], ...division]
        })
      })
    },
    initResData (setData = null) {
      if (!this.query || !this.isFilterAvailable) {
        this.$_api.dataset('divisions', { sort: 'ASC' }).then(dept => {
          let division = dept.data.map(x => { return { label: x.division_name, code: x.id } })
          this.datasets = Object.assign({}, {
            division: !this.allowAll ? division : [...[{ label: 'Tampilkan Semua Divisi', code: null }], ...division]
          })
          this.filter = Object.assign({}, {
            division_id: !this.allowAll ? division[0] : { label: 'Tampilkan Semua Divisi', code: null },
            year: moment().set('date', 1).set('month', 0).format('YYYY')
          })
        })
      }
    },
    initAutofillData () {
      this.datasets = Object.assign({}, {
        division: this.$store.state.autofill.division_id.list,
        year: moment().set('date', 1).set('month', 0).format('YYYY')
      })
    }
  }
}
</script>
<style>
  .form-control.custom.datepicker {
    height: calc(1.5em + 1.3rem - 0.61px);
  }
  .v-select.vs-style.custom.vs--disabled .vs__dropdown-toggle,
  .v-select.vs-style.custom.vs--disabled .vs__dropdown-toggle .vs__actions,
  .v-select.vs-style.custom.vs--disabled
    .vs__dropdown-toggle
    .vs__actions
    .vs__open-indicator {
    background-color: #ebedf3 !important;
  }
</style>
