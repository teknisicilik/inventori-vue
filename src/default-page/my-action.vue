<template>
  <div class="d-flex flex-fill flex-column">
    <div class="my-action-filter">
      <b-overlay :show="loading" rounded="sm">
        <!-- <s-input v-model="filter.project_id" :item="{ classLabel:'col pl-0', rowclass: 'mx-0', label:'', prefix:'Filter Proyek', type:'lookup-radio', validation:[], placeholder: '', api:'projects', pointer: { label: 'project_name', code: 'id', display: ['rel_department_id', 'project_name'] }, nm:true }" /> -->
        <s-input class="mt-3" v-model="filter.module_name" :item="{ notAppendToBody:true, type:'select', validation:[], placeholder: 'Periode Laporan', optionList:moduleList, formatter:momentFormat, nm:true }" />
        <!-- <s-input v-model="filter.periode_date" :item="{ type:'month', validation:[], placeholder: 'Periode Laporan', api:'', formatter:momentFormat, ic:'w-100 mt-3' }" /> -->
        <hr>
      </b-overlay>
    </div>
    <div class="offcanvas-content pr-5 mr-n5 ps infinite flex-fill" v-infinite-scroll="getMyAction" :infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <div class="navi navi-icon-circle">
        <sequential-entrance fromBottom delay="100">
          <div v-for="(m,i) in mymoduleList" @click="goto(m)" :key="i+'-my-action'" class="navi-item pointer card-activity" :class="actionList.filter(x => x.code === m.action_name).length ? 'level-'+ actionList.filter(x => x.code === m.action_name)[0].level : 'level-3'">
            <div class="navi-link align-items-start px-0">
              <div class="symbol symbol-40 mr-3">
                <div class="symbol-label">
                  <i v-if="m.action_name === 'revision_request'" class="ri-close-line ri-2x"></i>
                  <i v-else-if="m.action_name === 'verification_request'" class="ri-check-double-line ri-2x"></i>
                  <i v-else class="ri-check-line ri-2x"></i>
                </div>
              </div>
              <div class="navi-text">
                <template v-if="moduleList.filter(x => x.code === m.module_name).length">
                  <span class="d-block font-size-sm font-weight-bolder text-muted">{{ moduleList.filter(x => x.code === m.module_name)[0].title }}</span>
                  <span class="d-block font-size-lg font-weight-bold">{{ moduleList.filter(x => x.code === m.module_name)[0].label }}</span>
                </template>
              </div>
            </div>
            <div class="mb-3 font-size-sm">
              <span v-if="actionList.filter(x => x.code === m.action_name).length" class="font-weight-bold d-block text-truncate status-text font-size-sm">{{ actionList.filter(x => x.code === m.action_name)[0].label }}</span>
              <span v-else class="font-weight-bold d-block text-truncate status-text font-size-sm">Butuh Tindakan</span>
              <span class=""> {{ m.data[0].template_name || '' }} </span>
              <span v-if="m.data[0].periode_year" class=""> - Tahun {{ m.data[0].periode_year || new Date() | parse('year') }} </span>
            </div>
          </div>
        </sequential-entrance>
      </div>
    </div>
  </div>
</template>

<script>

import moment from 'moment'
export default {
  name: 'my-action',
  props: {
    refreshKey: { type: Number, required: false, default () { return 0 } }
  },
  data () {
    return {
      mymoduleList: [],
      loading: false,
      page: 0,
      totalPage: 1,
      activeData: null,
      filter: {
        project_id: null,
        periode_date: null,
        module_name: null
      },
      actionList: [
        { label: 'Mengunci Template Kualitatif', code: 'do-lock-qualitatif-template', level: 0 },
        { label: 'Lengkapi dan Ajukan Verifikasi', code: 'do-verification-request', level: 3 },
        { label: 'Permintaan Revisi', code: 'do-revision-request', level: 0 },
        { label: 'Permintaan Verifikasi', code: 'do-verify', level: 1 }
      ],
      moduleList: [
        { title: 'Semua Action', label: 'Semua Action', code: null, route: null, view: null },
        { title: 'RKAP Kualitatif', label: 'Input Data Kualitatif', code: 'qualitatif-data-on-divisions', route: 'pengumpulan-input-kualitatif', view: null },
        { title: 'RKAP Kualitatif', label: 'Template Kualitatif', code: 'template-qualitatif-on-divisions', route: 'template-input-kualitatif', view: null }
      ],
      momentFormat: {
        stringify: (date) => {
          return date ? moment(date).format('MMMM YYYY') : ''
        },
        parse: (value) => {
          return value ? moment(value, 'MMMM YYYY').toDate() : null
        }
      },
      undoneStatus: ['open', 'on_investigation']
    }
  },
  watch: {
    filter: {
      deep: true,
      immediate: false,
      handler (to) {
        this.page = 0
        this.totalPage = 1
        this.getMyAction(true)
      }
    },
    refreshKey: {
      deep: false,
      immediate: false,
      handler () {
        this.page = 0
        this.totalPage = 1
        this.getMyAction(true)
      }
    }
  },
  mounted () {
    this.getMyAction()
  },
  methods: {
    getMyAction (reset = false) {
      if (this.page < this.totalPage) {
        let date = this.filter.periode_date
        if (date) date = moment(moment(date, 'MMMM YYYY').toDate()).format('YYYY-MM-DD')
        else date = null
        this.page++
        let filter = {
          page: this.page,
          module_name: this.filter.module_name,
          project_id: this.filter.project_id,
          periode_date: date,
          limit: 15
        }
        this.loading = true
        this.$_api.list('/custom/my-actions', filter).then(res => {
          this.loading = false
          if (!reset) this.mymoduleList = [...this.mymoduleList, ...res.data]
          else this.mymoduleList = res.data
          this.totalPage = res.totalPage
          this.$store.commit('set', ['my-action-count', res.totalMyActions, true])
        }).catch((err) => {
          this.loading = false
          this.$_alert.error(err)
        })
      }
    },
    goto (data) {
      if (this.activeData !== data) {
        this.activeData = JSON.parse(JSON.stringify(data))
        const selectedModule = this.moduleList.filter(x => x.code === data.module_name)[0]
        let param = data.data.length ? data.data[0] : {}
        param.rtn = new Date().getTime()
        this.$router.push({
          name: selectedModule.route,
          query: { ...{ view: selectedModule.view || new Date().getTime() }, ...param }
        })
      }
    }
  }
}
</script>

<style scoped>
  .infinite {
    height: 76vh;
    position: relative;
    overflow: auto;
  }
  .mx-datepicker {
    width: 100%;
  }
  .card-activity {
    display: block;
    border: 1px;
    border-top: 6px;
    border-radius: 8px;
    border-style: solid;
    margin-bottom: 1.25rem;
    padding: 0 1em !important;
  }
  /* =================================== */
  .card-activity.level-0 {
    border-color: #faedec;
  }
  .card-activity.level-0 .symbol .symbol-label {
    background-color: #faedec;
  }
  .card-activity.level-0 .symbol .symbol-label i {
    color: var(--danger-theme);
  }
  .card-activity.level-0 .status-text {
    color: var(--danger-theme);
  }
  .card-activity:hover.level-0 {
    background-color: #faedec;
  }
  .card-activity:hover.level-0 .symbol .symbol-label {
    background-color: var(--danger-theme);
  }
  .card-activity:hover.level-0 .symbol .symbol-label i {
    color: #fff;
  }
  /* =================================== */
  .card-activity.level-1 {
    border-color: #faf6ec;
  }
  .card-activity.level-1 .symbol .symbol-label {
    background-color: #faf6ec;
  }
  .card-activity.level-1 .symbol .symbol-label i {
    color: var(--warning-theme);
  }
  .card-activity.level-1 .status-text {
    color: var(--warning-theme);
  }
  .card-activity:hover.level-1 {
    background-color: #faf6ec;
  }
  .card-activity:hover.level-1 .symbol .symbol-label {
    background-color: var(--warning-theme);
  }
  .card-activity:hover.level-1 .symbol .symbol-label i {
    color: #fff;
  }
  /* =================================== */
  .card-activity.level-2 {
    border-color: #ddf1f6;
  }
  .card-activity.level-2 .symbol .symbol-label {
    background-color: #ddf1f6;
  }
  .card-activity.level-2 .symbol .symbol-label i {
    color: var(--info-theme);
  }
  .card-activity.level-2 .status-text {
    color: var(--info-theme);
  }
  .card-activity:hover.level-2 {
    background-color: #ddf1f6;
  }
  .card-activity:hover.level-2 .symbol .symbol-label {
    background-color: var(--info-theme);
  }
  .card-activity:hover.level-2 .symbol .symbol-label i {
    color: #fff;
  }
  /* =================================== */
  .card-activity.level-3 {
    border-color: #e1f8e9;
  }
  .card-activity.level-3 .symbol .symbol-label {
    background-color: #e1f8e9;
  }
  .card-activity.level-3 .symbol .symbol-label i {
    color: var(--success-theme);
  }
  .card-activity.level-3 .status-text {
    color: var(--success-theme);
  }
  .card-activity:hover.level-3 {
    background-color: #e1f8e9;
  }
  .card-activity:hover.level-3 .symbol .symbol-label {
    background-color: var(--success-theme);
  }
  .card-activity:hover.level-3 .symbol .symbol-label i {
    color: #fff;
  }
</style>
