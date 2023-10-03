<template>
  <div :class="{'card card-custom mb-5': !simple}">
    <div v-if="!simple" class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark" v-if="form === 'create'"> {{ $t('global.form_add') }} {{ title }}</span>
        <span v-else-if="form === 'update'" class="card-label font-weight-bolder text-dark">{{ $t('global.form_edit') }} {{ title }}</span>
        <span v-else-if="form === 'filter'" class="card-label font-weight-bolder text-dark">{{ $t('global.form_filter') }} {{ title }}</span>
        <span v-else class="card-label font-weight-bolder text-dark">{{ title }}</span>
        <!-- <span class="text-muted mt-3 font-weight-bold font-size-sm">More than 400+ new members</span> -->
      </h3>
      <div v-if="form !== 'filter'" class="card-toolbar">
        <a v-if="!hideBtnBack && !$store.state.unknownRoute" @click="emitEvent('back')" class="btn btn-outline-primary btn-icon btn-circle" v-b-tooltip.top="$t('global.go_back')">
          <i class="ri-arrow-go-back-line p-0"></i>
        </a>
      </div>
    </div>
    <div v-else class="pb-0 px-2">
      <span class="card-label font-weight-bolder text-dark" v-if="form === 'create'"> {{ $t('global.form_add') }} {{ title }}</span>
      <span v-else-if="form === 'update'" class="card-label font-weight-bolder text-dark">{{ $t('global.form_edit') }} {{ title }}</span>
      <span v-else-if="form === 'filter'" class="card-label font-weight-bolder text-dark">{{ $t('global.form_filter') }} {{ title }}</span>
      <span v-else class="card-label font-weight-bolder text-dark">{{ title }}</span>
    </div>
    <div class="card-body" :class="[simple ? 'p-2' : 'py-2 mt-3']">
      <slot name="form-header" v-bind:rowData="defaultData"></slot>
      <!-- <pre>{{ fields }}</pre> -->
      <!-- <pre>{{ modelData }}</pre> -->
      <!-- <pre>{{ tmp_option_default }}</pre> -->
      <!-- <pre>{{ tmp_option }}</pre> -->
      <!-- <pre>{{ tempData }}</pre> -->
      <ValidationObserver v-slot="{ handleSubmit  }">
        <form @submit.prevent="handleSubmit(onSubmit)" autocomplete="off">
          <!-- <div :class="{'row': simple}"> -->
          <div :class="'row'">
            <template v-for="(fl,ix) in fields.filter(x => $_sys.isAllowed(x.permission))">
              <div v-if="fl.show" :class="simple? ['col-auto', fl.class]: fl.class? fl.class : 'col-12'" :key="ix+'-loop-col'">
                <template v-if="defaultType.includes(fl.type)">
                  <div class="form-group" :key="ix+'-field'" v-if="fl.show">
                    <ValidationProvider mode="eager" :name="fl.label" :rules="fl.validation.join('|')" v-slot="{ classes, errors }">
                      <label v-if="fl.type != 'hidden'">{{ fl.label }} <span v-if="fl.validation.includes('required')" class="text-danger">*</span></label>
                      <input v-on="fl.event" v-bind="fl.attr" v-model.lazy.trim="modelData[fl.data]" :type="fl.type" class="form-control" :class="[fl.validation.length===0 ? '' : classes]" :placeholder="fl.placeholder" />
                      <div class="invalid-feedback">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                </template>
                <template v-else-if="numberType.includes(fl.type)">
                  <div class="form-group" :key="ix+'-field'" v-if="fl.show">
                    <ValidationProvider mode="eager" :name="fl.label" :rules="fl.validation.join('|')" v-slot="{ classes, errors }">
                      <label>{{ fl.label }} <span v-if="fl.validation.includes('required')" class="text-danger">*</span></label>
                      <vue-numeric separator="." decimal-separator="," :empty-value="0" :currency="fl.type==='money'? 'Rp.': null" v-on="fl.event" v-bind="fl.attr" v-model.lazy="modelData[fl.data]" type="text" class="form-control" :class="[fl.validation.length===0 ? '' : classes]" :placeholder="fl.placeholder" />
                      <!-- <input v-on="fl.event" v-bind="fl.attr" v-number-input="fl.type" v-model.lazy="modelData[fl.data]" type="text" class="form-control" :class="[fl.validation.length===0 ? '' : classes]" :placeholder="fl.placeholder" /> -->
                      <div class="invalid-feedback">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                </template>
                <template v-else-if="dateType.includes(fl.type)">
                  <div class="form-group" :key="ix+'-field'" v-if="fl.show">
                    <ValidationProvider mode="eager" :name="fl.label" :rules="fl.validation.join('|')" v-slot="{ classes, errors }">
                      <label class="d-block">{{ fl.label }} <span v-if="fl.validation.includes('required')" class="text-danger">*</span></label>
                      <date-picker :inline="simple? false : (fl.attr && fl.attr.inline) || false" v-on="fl.event" v-bind="fl.attr" :input-attr="{ autocomplete:'off' }" v-model.lazy.trim="modelData[fl.data]" :type="fl.type" :input-class="'form-control date-field'" :class="[fl.validation.length===0 ? '' : classes]" :placeholder="fl.placeholder" :format="formatDateView(fl.type)" :lang="monthLang" :value-type="formatDate(fl.type)" />
                      <div class="invalid-feedback">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                </template>
                <template v-else-if="dateRangeType.includes(fl.type)">
                  <div class="form-group" :key="ix+'-field'" v-if="fl.show">
                    <ValidationProvider mode="eager" :name="fl.label" :rules="fl.validation.join('|')" v-slot="{ classes, errors }">
                      <label>{{ fl.label }} <span v-if="fl.validation.includes('required')" class="text-danger">*</span></label>
                      <date-picker v-on="fl.event" range :input-attr="{ autocomplete:'off' }" v-model.lazy.trim="modelData[fl.data]" :type="fl.type.split('-')[0]" :input-class="'form-control'" :class="[fl.validation.length===0 ? '' : classes]" :placeholder="fl.placeholder" :value-type="formatDate(fl.type)" />
                      <div class="invalid-feedback">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                </template>
                <template v-else-if="textType.includes(fl.type)">
                  <div class="form-group" :key="ix+'-field'" v-if="fl.show">
                    <ValidationProvider mode="eager" :name="fl.label" :rules="fl.validation.join('|')" v-slot="{ classes, errors }">
                      <label>{{ fl.label }} <span v-if="fl.validation.includes('required')" class="text-danger">*</span></label>
                      <textarea v-on="fl.event" v-bind="fl.attr" v-model.lazy="modelData[fl.data]" :input-attr="{ autocomplete:'off' }" class="form-control" :class="[fl.validation.length===0 ? '' : classes]" :placeholder="fl.placeholder"></textarea>
                      <div class="invalid-feedback">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                </template>
                <template v-else-if="fileType.includes(fl.type)">
                  <div class="form-group" :key="ix+'-field'" v-if="fl.show">
                    <ValidationProvider mode="aggressive" :name="fl.label" :rules="fl.validation.join('|')" v-slot="{ classes, errors }">
                      <label>{{ fl.label }}<span v-if="fl.validation.includes('required')" class="text-danger">*</span></label>
                      <single-upload v-on="fl.event" v-if="fl.type === 'file'" v-model="modelData[fl.data]" :error="errors" :classes="fl.validation.length===0 ? {} : classes" :placeholder="fl.placeholder" :attr="fl.attr" />
                      <multi-upload v-on="fl.event" v-else v-model="modelData[fl.data]" :error="errors" :classes="fl.validation.length===0 ? {} : classes" :placeholder="fl.placeholder" :attr="fl.attr" />
                    </ValidationProvider>
                  </div>
                </template>
                <template v-else-if="optionType.includes(fl.type)">
                  <div class="form-group" :key="ix+'-field'" v-if="fl.show">
                    <ValidationProvider mode="aggressive" :name="fl.label" :rules="fl.validation.join('|')" v-slot="{ classes, errors }">
                      <template v-if="fl.hint">
                        <div class="d-flex justify-content-start align-items-center">
                          <label style="margin-bottom:.15rem">{{ fl.label }} <span v-if="fl.validation.includes('required')" class="text-danger">*</span> </label>
                          <i class="ri-question-line ml-2" :id="'tooltip-target-'+fl.id"></i>
                          <b-popover :target="'tooltip-target-'+fl.id" triggers="hover" placement="right" custom-class="text-left"> {{ fl.hint }} </b-popover>
                        </div>
                      </template>
                      <label v-else>{{ fl.label }} <span v-if="fl.validation.includes('required')" class="text-danger">*</span> </label>
                      <template v-if="fl.type === 'select' || fl.type === 'select-multiple'">
                        <v-select v-on="fl.event" v-model="modelData[fl.data]" :reduce="x => x.code" :appendToBody="true" class="vs-style" :options="tmp_option[fl.id]" :placeholder="fl.placeholder" :class="[fl.validation.length===0 ? '' : classes]" :multiple="fl.type === 'select-multiple'">
                          <slot name="no-options">{{ $t('error.no_data') }}</slot>
                        </v-select>
                      </template>
                      <template v-else>
                        <div v-if="tmp_option[fl.id]" :class="[fl.validation.length===0 ? '' : classes, fl.class? fl.class : fl.type+'-inline']" class="mt-2">
                          <template v-for="(o,i) in tmp_option[fl.id]">
                            <label :class="fl.type" :key="i" :for="fl.data+'-'+i" :id="'label-'+fl.data+'-'+i" class="mr-5">
                              <input :type="fl.type" :id="fl.data+'-'+i" :name="fl.data+'-'+i" :value="o.code" v-model="modelData[fl.data]" />
                              <span></span> <a :id="'text-'+fl.data+'-'+i">{{ o.label ? o.label : o }}</a> </label>
                            <b-popover v-if="o.tooltip" :key="i+'-option-tooltip'" :target="'text-'+fl.data+'-'+i" :title="o.label ? 'Keterangan '+ o.label : 'Keterangan '+ o" triggers="hover" :placement="'right'" :boundary="'window'">
                              <div v-for="(t,i) in o.tooltip" :key="i+'-tooltip-body'">
                                <span class="font-weight-bold">{{ t.title }}</span>
                                <p class="mt-0">{{ t.data }}</p>
                              </div>
                            </b-popover>
                          </template>
                        </div>
                        <p v-else class="p-0">{{ $t('error.no_data') }}</p>
                      </template>
                      <div class="invalid-feedback">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                </template>
                <template v-else-if="lookupType.includes(fl.type)">
                  <div class="form-group" :key="ix+'-field'" v-if="fl.show">
                    <ValidationProvider mode="aggressive" :name="fl.label" :rules="fl.validation.join('|')" v-slot="{ classes, errors }">
                      <label>{{ fl.label }} <span v-if="fl.validation.includes('required')" class="text-danger">*</span></label>
                      <lookup-input v-on="fl.event" v-model="modelData[fl.data]" :multiple="fl.type==='lookup-checkbox'" :endpoint="fl.getter" :param="tmp_param[fl.id]" :errors="errors" :title="fl.label" :pointer="fl.option.list_pointer" :classes="fl.validation.length===0 ? {} : classes" :placeholder="fl.placeholder" />
                    </ValidationProvider>
                  </div>
                </template>
                <template v-else-if="mapType.includes(fl.type)">
                  <div class="form-group" :key="ix+'-field'" v-if="fl.show">
                    <label>{{ fl.label }} <span v-if="fl.validation.includes('required')" class="text-danger">*</span></label>
                    <ValidationProvider mode="eager" :name="fl.label" :rules="fl.validation.join('|')" v-slot="{ classes, errors }">
                      <map-input :readonly="false" v-on="fl.event" v-model="modelData[fl.data]" :multiple="fl.type==='map-multiple'" :errors="errors" :classes="fl.validation.length===0 ? {} : classes" :placeholder="fl.placeholder" />
                    </ValidationProvider>
                  </div>
                </template>
                <template v-else-if="fl.type === 'editor'">
                  <div class="form-group" :key="ix+'-field'" v-if="fl.show">
                    <label>{{ fl.label }} <span v-if="fl.validation.includes('required')" class="text-danger">*</span></label>
                    <ValidationProvider mode="eager" :name="fl.label" :rules="fl.validation.join('|')" v-slot="{ classes, errors }">
                      <editor-input v-on="fl.event" v-model="modelData[fl.data]" />
                    </ValidationProvider>
                  </div>
                </template>
                <template v-else>
                  <div class="form-group" :key="ix+'-field'">
                    <label> {{ $t('error.view_type') }} ({{ fl.type }}) | {{ fl.label }}</label>
                  </div>
                </template>
              </div>
            </template>
            <template v-if="simple">
              <div class="col-12 align-self-center">
                <slot name="form-btn-action" />
                <button type="submit" class="btn btn-light-primary mr-3"><i v-if="form !== 'filter'" class="ri-save-line"></i> {{ btnSaveLabel? btnSaveLabel: $t('global.submit') }}</button>
                <button v-if="form === 'filter'" type="button" class="btn btn-link" @click="resetForm()">Reset Filter</button>
              </div>
            </template>
          </div>
          <div v-if="!simple" class="d-flex justify-content-between py-5">
            <div>
              <slot name="form-btn-action" />
              <button type="submit" class="btn btn-primary mr-3"><i v-if="form !== 'filter'" class="ri-save-line"></i> {{ btnSaveLabel? btnSaveLabel: $t('global.submit') }}</button>
            </div>
            <button v-if="form === 'filter'" type="button" class="btn btn-link" @click="resetForm()">Reset Filter</button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<style>
  .mx-datepicker.is-invalid input {
    border-color: #f64e60;
    padding-right: calc(1.5em + 1.3rem);
    background-repeat: no-repeat;
    background-position: right calc(0.375em + 0.325rem) center;
    background-size: calc(0.75em + 0.65rem) calc(0.75em + 0.65rem);
  }
  .mx-datepicker.is-valid input {
    border-color: #3699ff;
    padding-right: calc(1.5em + 1.3rem);
    background-repeat: no-repeat;
    background-position: right calc(0.375em + 0.325rem) center;
    background-size: calc(0.75em + 0.65rem) calc(0.75em + 0.65rem);
  }
  .vs-style .vs__dropdown-toggle {
    border: 1px solid #e4e6ef;
    border-radius: 0.42rem;
    padding: 0.55rem 1rem;
  }
  .vs-style.is-invalid .vs__dropdown-toggle {
    border-color: #f64e60;
  }
  .vs-style.vs--single .vs__selected,
  .vs-style .vs__search,
  .vs-style .vs__actions {
    padding: 0;
    border: none;
    margin: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #333 !important;
    background-color: transparent !important;
  }
  .vs-style .vs__selected button {
    margin-left: 0.5rem;
  }
  .vs-style .vs__search::placeholder {
    color: #b5bcd4;
  }
</style>
<script>
export default {
  name: 'main-form',
  props: {
    form: { type: String, required: true },
    title: { type: String, required: true },
    fields: { type: Array, required: true },
    API: { type: Object, required: true },
    id: { type: Number, required: false },
    hideBtnBack: { type: Boolean, required: false, default: false },
    btnSaveLabel: { type: String, required: false, default: '' },
    customGetter: { type: Boolean, required: false, default: false },
    simple: { type: Boolean, required: false, default: false },
    slave: { type: Boolean, required: false, default: false }
  },
  data () {
    return {
      modelData: [],
      defaultData: null,
      defaultType: ['text', 'email', 'hidden', 'password', 'tel', 'url', 'color'],
      numberType: ['number', 'money'],
      dateType: ['date', 'datetime', 'year', 'month', 'time', 'week'],
      dateRangeType: ['date-range', 'datetime-range', 'year-range', 'month-range', 'time-range', 'week-range'],
      textType: ['textarea'],
      fileType: ['file', 'file-multiple'],
      optionType: ['select', 'select-multiple', 'checkbox', 'radio'],
      lookupType: ['lookup-checkbox', 'lookup-radio'],
      mapType: ['map', 'map-multiple'],
      editorType: ['map', 'map-multiple'],
      tmp_option: {},
      tmp_option_default: {},
      tmp_param: {},
      tmp_field: {},
      tempData: {},
      monthLang: {
        formatLocale: {
          months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        }
      }
    }
  },
  mounted () {
    this.modelData = this.buildModelData()
    this.checkDefaultValue().then(async e => {
      if (this.form === 'update') await this.getValueAPI()
      this.buildParamOption().then(f => {
        // form loaded
      })
    })
  },
  methods: {
    buildModelData () {
      let _temp = this.fields.reduce((ac, a) => ({ ...ac, [a.view_data]: a.value }), {})
      let _field = {}
      Object.keys(_temp).forEach(e => {
        let _mask = e
        if (e.indexOf('.')) {
          _mask = e.split('.')[0]
          this.$set(this.tmp_field, _mask, e)
        }
        _field[_mask] = _temp[e]
      })
      return _field
    },
    formatDate (type) {
      let _format
      switch (type) {
        case 'date':
        case 'date-range':
          _format = 'YYYY-MM-DD'
          break
        case 'datetime':
        case 'datetime-range':
          _format = 'YYYY-MM-DD HH:mm:ss ZZ'
          break
        case 'year':
        case 'year-range':
          _format = 'YYYY-MM-DD'
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
    formatDateView (type) {
      let _format
      switch (type) {
        case 'date':
        case 'date-range':
          _format = 'DD MMMM YYYY'
          break
        case 'datetime':
        case 'datetime-range':
          _format = 'DD MMMM YYYY HH:mm:ss ZZ'
          break
        case 'year':
        case 'year-range':
          _format = 'YYYY'
          break
        case 'month':
        case 'month-range':
          _format = 'MMMM YYYY'
          break
        case 'time':
        case 'time-range':
          _format = 'HH : mm : ss'
          break
        case 'week':
        case 'week-range':
          _format = 'DD'
          break
      }
      return _format
    },
    emitEvent (e, data = null) {
      const value = data || true
      this.$emit(e, value)
    },
    async checkDefaultValue () {
      if (this.slave) this.$set(this.modelData, this.$store.state.activeSlave.param, this.$store.state.activeSlave.key)
      await this.fields.forEach(e => {
        if (e.type === 'checkbox' || e.type === 'select-multiple' || e.type === 'lookup-checkbox' || e.type === 'file-multiple') {
          if (!Array.isArray(this.modelData[e.data])) this.$set(this.modelData, e.data, [])
        }
        if (this.$_config.options.autofill && this.$store.state.autofill[e.data]) {
          if (this.slave && this.$store.state.activeSlave.param !== e.data) this.$set(this.modelData, e.data, this.$store.state.autofill[e.data].value)
          else this.$set(this.modelData, e.data, this.$store.state.autofill[e.data].value)
        }
        for (const key in this.$route.query) {
          if (Object.hasOwnProperty.call(this.$route.query, key)) {
            const element = this.$route.query[key]
            if (key !== 'view' || key !== 'id') {
              this.$set(this.modelData, key, element)
            }
          }
        }
      })
    },
    async buildParamOption () {
      let newField = this.fields.filter(x => this.optionType.includes(x.type) || this.lookupType.includes(x.type))
      await newField.forEach(e => {
        if (e.getter && e.option && e.option.get_param && e.option.get_param.length > 0) {
          e.option.get_param.forEach(el => {
            this.setWatcher(this.fields.filter(x => x.id === el.id)[0], el.alias ? el.alias : el.id, e)
          })
        } else if (e.getter) {
          if (this.optionType.includes(e.type)) this.getOptionData(e.getter, e.option.filterAPI || null, e)
          if (this.lookupType.includes(e.type)) {
            if (!this.tmp_param[e.id]) this.$set(this.tmp_param, e.id, {})
            this.tmp_param[e.id] = Object.assign({}, this.tmp_param[e.id], e.option.filterAPI)
          }
        } else {
          if (e.option.get_param) { // local dataset change
            e.option.get_param.forEach(el => {
              this.setWatcher(this.fields.filter(x => x.id === el.id)[0], el.alias ? el.alias : el.id, e)
            })
          }
          if (e.option.list_pointer.list) this.assignOptionData(e.option.list_pointer.list, e)
          else this.assignOptionData([], e)
        }
      })
      this.fields.forEach(e => {
        if (e.option && e.option.toggle_field && Array.isArray(e.option.toggle_field)) {
          e.option.toggle_field.forEach(f => {
            this.setWatcherToggle(this.fields.filter(x => x.id === f.id)[0], f, e)
          })
        }
      })
    },
    setWatcherToggle (target, toggle, owner) {
      this.$watch('modelData.' + owner.data, function (t, f) {
        let meetCondition
        if (typeof toggle.value === 'boolean') meetCondition = Boolean(t) === Boolean(toggle.value)
        else if (Array.isArray(toggle.value)) meetCondition = toggle.value.includes(t)
        else meetCondition = Boolean(t === toggle.value)

        if (meetCondition) {
          if (toggle.item === 'value') this.$set(this.modelData, [target.data], toggle.toggle[0])
          else {
            if (typeof toggle.toggle[0] === 'object') {
              if (toggle.toggle[0][t]) this.$set(target, [toggle.item], toggle.toggle[0][t])
              else this.$set(target, [toggle.item], toggle.toggle[1]) // fallback
            } else this.$set(target, [toggle.item], toggle.toggle[0])
          }
        } else {
          if (toggle.item === 'value') this.$set(this.modelData, [target.data], toggle.toggle[1])
          else {
            if (typeof toggle.toggle[1] === 'object') {
              if (toggle.toggle[1][t]) this.$set(target, [toggle.item], toggle.toggle[1][t])
              else this.$set(target, [toggle.item], toggle.toggle[0]) // fallback
            } else this.$set(target, [toggle.item], toggle.toggle[1])
          }
        }
      }, { deep: false, immediate: true })
    },
    setWatcher (target, alias, owner) {
      this.$watch('modelData.' + target.data, function (t, f) {
        if (owner.getter) {
          // check if param exist
          if (!this.tmp_param[owner.id]) this.$set(this.tmp_param, owner.id, {})
          const haveParam = owner.getter.split('?')[1]
          if (haveParam) {
            haveParam.split(',').forEach(x => {
              this.$set(this.tmp_param[owner.id], x.split('=')[0], x.split('=')[1])
            })
          }
          // assign new param
          this.$set(this.tmp_param[owner.id], alias, t)
          if (this.lookupType.includes(owner.type)) this.$set(this.modelData, owner.data, null) // reset owner value
          else this.getOptionData(owner.getter.split('?')[0], this.tmp_param[owner.id], owner, true) // call dataset
        } else {
          this.$set(this.modelData, owner.data, null)
          this.assignOptionData(owner.option.list_pointer.list.filter(x => x[alias] === t), owner)
        }
      }, { deep: true, immediate: false })
    },
    getOptionData (endpoint, filter, owner, watcher = false) {
      this.$_api.dataset(endpoint, filter).then(res => {
        this.assignOptionData(res.data, owner)
        // reset owner value if from watcher
        if (watcher) {
          if (owner.type === 'checkbox' || owner.type === 'select-multiple' || owner.type === 'lookup-checkbox') {
            if (!Array.isArray(this.modelData)) this.$set(this.modelData, owner.data, [])
          } else this.$set(this.modelData, owner.data, null)
        }
      }, err => {
        this.$_alert.error(err, null, 'Cannot get ' + owner.label.replace(/\b\w/g, l => l.toUpperCase()) + ' datalist')
      })
    },
    assignOptionData (data, owner) {
      if (typeof data[0] === 'object') {
        this.$set(this.tmp_option, owner.id, data.map(x => { return { 'label': x[owner.option.list_pointer.label], 'code': x[owner.option.list_pointer.code], 'tooltip': owner.option.list_pointer.tooltip ? owner.option.list_pointer.tooltip.map(y => { return { 'title': y.title, 'data': x[y.data] } }) : null } }))
        this.$set(this.tmp_option_default, owner.id, data)
      } else {
        this.$set(this.tmp_option, owner.id, data)
        this.$set(this.tmp_option_default, owner.id, data)
      }
    },
    revertDataArray (key) {
      if (this.tmp_option_default[key]) {
        let newData = []
        let owner = this.fields.filter(x => x.data === key)[0]
        this.modelData[key].forEach(val => {
          newData.push(this.tmp_option_default[key].filter(x => x[owner.option.list_pointer.code] === val)[0])
        })
        if (this.tempData[key]) {
          let deleted = this.tempData[key].filter(x => !newData.map(y => y[owner.option.list_pointer.code]).includes(x[owner.option.list_pointer.code])).map(x => { return { ...x, ...{ 'transaction_value': false } } })
          newData = newData.concat(deleted)
          // newData = [...newData, ...deleted]
        }
        return newData
      } else return this.modelData[key]
    },
    revertNumberType (value) {
      if (value) {
        const numberPattern = /\d+/g
        return Number(String(value).match(numberPattern).join(''))
      } else return value
    },
    onSubmit () {
      let formData = {}
      console.log("OE ", this.modelData)
      Object.keys(this.modelData).forEach(e => {
        if (this.modelData[e] instanceof Array && !(this.modelData[e][0] instanceof Object)) {
          this.$set(formData, e, this.revertDataArray(e))
        } else this.$set(formData, e, this.modelData[e])
      })

      let sendData = { ...this.defaultData, ...formData }
      if (this.form === 'create') {
        this.$_api.create(this.API.setter, sendData).then(res => {
          this.$emit('success', res.data)
        }).catch(err => {
          this.$_alert.error(err)
        })
      } else if (this.form === 'update') {
        this.$_api.update(this.API.setter, sendData).then(res => {
          this.$emit('success', res.data)
        }).catch(err => {
          this.$_alert.error(err)
        })
      } else {
        this.$emit('success', sendData)
      }
    },
    resetForm () {
      Object.keys(this.modelData).forEach(e => {
        if (this.modelData[e] instanceof Array) {
          this.$set(this.modelData, e, [])
        } else if (this.modelData[e] instanceof Object) {
          this.$set(this.modelData, e, {})
        } else this.$set(this.modelData, e, null)
      })
    },
    async getValueAPI () {
      if (!this.customGetter) {
        await this.$_api.single(this.API.getter, null, this.id).then(res => {
          let data = res.data
          this.defaultData = data
          Object.keys(this.modelData).forEach(e => {
            let _data = data[e]
            let field = this.fields.filter(x => x.id === e)
            if (field.length) field = field[0]
            if (this.tmp_field[e]) _data = this.renderVal(data, this.tmp_field[e])
            if (field.type === 'checkbox') {
              this.$set(this.tempData, e, _data)
              this.$set(this.modelData, e, _data.map(x => x[field.option.list_pointer.code]))
            } else this.$set(this.modelData, e, _data)
          })
        }).catch(err => {
          this.$_alert.error(err)
        })
      } else {
        await this.$_api.get(this.API.getter, { id: this.id }).then(res => {
          let data = res.data
          this.defaultData = data
          Object.keys(this.modelData).forEach(e => {
            let _data = data[e]
            let field = this.fields.filter(x => x.id === e)
            if (field.length) field = field[0]
            if (this.tmp_field[e]) _data = this.renderVal(data, this.tmp_field[e])
            if (field.type === 'checkbox') {
              this.$set(this.tempData, e, _data)
              this.$set(this.modelData, e, _data.map(x => x[field.option.list_pointer.code]))
            } else this.$set(this.modelData, e, _data)
          })
        }).catch(err => {
          this.$_alert.error(err)
        })
      }
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
    }
  }
}
</script>
