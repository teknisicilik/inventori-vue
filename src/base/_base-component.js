import Vue from 'vue'
import BaseDetail from './main-detail.vue'
import BaseForm from './main-form.vue'
import BaseTable from './main-table.vue'
import BaseCard from './main-card.vue'
import BaseCRUD from './main-crud.vue'

import compSingleUpload from './component/single-upload'
import compMultiUpload from './component/multiple-upload'
import compLookupInput from './component/lookup-input'
import compMappingInput from './component/mapping-input'
import compSingleInput from './component/single-input'
import compTableInput from './component/table-input'
import compRateInput from './component/rating-input'
import compMapInput from './component/input-map'
import compGlobalFilter from './component/global-filter'
import compGlobalQueue from './component/queue-import-modules'
import compTriggerEvent from './component/trigger-event'
import compEditorInput from './component/editor-input'

Vue.component('tas-base-table', BaseTable)
Vue.component('tas-base-card', BaseCard)
Vue.component('tas-base-form', BaseForm)
Vue.component('tas-base-detail', BaseDetail)
Vue.component('tas-base-crud', BaseCRUD)
Vue.component('s-input', compSingleInput)
Vue.component('single-upload', compSingleUpload)
Vue.component('multi-upload', compMultiUpload)
Vue.component('lookup-input', compLookupInput)
Vue.component('mapping-input', compMappingInput)
Vue.component('table-input', compTableInput)
Vue.component('map-input', compMapInput)
Vue.component('rate-input', compRateInput)
Vue.component('global-filter', compGlobalFilter)
Vue.component('queue-import', compGlobalQueue)
Vue.component('trigger-event', compTriggerEvent)
Vue.component('editor-input', compEditorInput)
