<template>
  <div :class="[slave ? 'container-fluid p-0 mt-5': classes || 'container']">
    <template v-if="!isLoading">
      <div id="create" ref="create" class="animated" v-if="activeView === 'create'">
        <slot name="create-form">
          <tas-base-form :slave="slave" @back="config.redirectAfterForm? onSuccessForm('create',null):getEvent('list')" @success="onSuccessForm('create', $event)" :key="config.title+'-form-create'" :form="'create'" :API="{ setter:configAPI.create, getter:configAPI.read }" :title="config.title" :fields="fields.create">
            <template v-slot:form-header="rowData">
              <slot name="form-header" v-bind:rowData="rowData.rowData"></slot>
            </template>
          </tas-base-form>
        </slot>
      </div>
      <div id="update" ref="update" class="animated" v-if="activeView === 'update'">
        <slot name="update-form" v-bind:data="{'id': activeID, 'data': activeData}">
          <tas-base-form :slave="slave" :custom-getter="customGetter" @back="config.redirectAfterForm? onSuccessForm('update',null):getEvent('list')" @success="onSuccessForm('update', $event)" :key="config.title+'-form-update'" :id="activeID" :form="'update'" :API="{ setter:configAPI.create, getter:configAPI.read }" :title="config.title" :fields="fields.update">
            <template v-slot:form-header="rowData">
              <slot name="form-header" v-bind:rowData="rowData.rowData"></slot>
            </template>
          </tas-base-form>
        </slot>
      </div>
      <div id="detail" ref="detail" class="animated" v-if="activeView === 'detail'">
        <slot name="detail-header"></slot>
        <tas-base-detail :isBodySlot="!!$scopedSlots['detail-body']" :isSideSlot="!!$scopedSlots['detail-side-right-body'] || !!$scopedSlots['detail-side-left-body']" :isCustomAPI="config.custom_api? !!config.custom_api.read : false" @zoom="getEvent('zoom', $event)" @back="getEvent('list')" :key="config.title+'-detail'" :id="activeID" :slave="config.slave" :permission="permission" :title="config.title" :API="configAPI.read" :fields="fields.detail" :export="config.export">
          <template v-slot:detail-body>
            <slot name="detail-body" v-bind:id="activeID"></slot>
          </template>
          <template v-slot:detail-side-right-body="rowData">
            <slot name="detail-side-right-body" v-bind:rowData="rowData.rowData"></slot>
          </template>
          <template v-slot:detail-side-left-body="rowData">
            <slot name="detail-side-left-body" v-bind:rowData="rowData.rowData"></slot>
          </template>
          <template v-slot:detail-bottom="rowData">
            <slot name="detail-bottom" v-bind:rowData="rowData.rowData"></slot>
          </template>
          <template v-slot:detail-footer="rowData">
            <slot name="detail-footer" v-bind:rowData="rowData.rowData"></slot>
          </template>
          <template v-for="(f,i) in fields.list" v-slot:[f.id]="rowData">
            <div :key="i">
              <slot :name="'detail-'+f.id" v-bind:rowData="rowData.rowData"></slot>
            </div>
          </template>
        </tas-base-detail>
      </div>
      <div id="list" ref="list" class="animated" v-if="activeView === 'list'">
        <slot name="list-header"></slot>
        <slot name="list-body">
          <tas-base-table :isTableSlot="!!$scopedSlots['list-table']" :hideFilter="hideFilter" :filterView="filterView" v-if="!listCard" @zoom="getEvent('zoom', $event)" @add_new="getEvent('create')" @filter="getEvent('filter')" @export="getEvent('export')" @import="getEvent('import')" @detail="getEvent('detail', $event)" @update="getEvent('update', $event)" @delete="getEvent('delete', $event)" :key="config.title+'-list'" :slave="slave" :permission="permission" :title="config.title" :API="configAPI.list" :isCustomAPI="config.custom_api? !!config.custom_api.list : false" :endpoint="configAPI" :fields="fields.list" :export="config.export" :import="config.import" :filters="filters">
            <template v-if="!advanceFilter" v-slot:inline-filter>
              <tas-base-form class="animated" btnSaveLabel="Terapkan Filter" v-show="filterView" @back="getEvent('list')" @success="onSuccessForm('filter', $event)" :key="config.title+'-inline-form-filter'" simple :form="'filter'" :API="{ setter:configAPI.create, getter:configAPI.read }" :title="config.title" :fields="fields.filter" />
            </template>
            <template v-slot:table-action>
              <slot name="list-action"></slot>
            </template>
            <template v-slot:list-table="rowData">
              <slot name="list-table" v-bind:rowData="rowData.rowData"></slot>
            </template>
            <template v-slot:table-data-action="rowData">
              <slot name="list-table-action" v-bind:rowData="rowData.rowData"></slot>
            </template>
            <template v-for="(f,i) in fields.list" v-slot:[f.id]="rowData">
              <div :key="i">
                <slot :name="'list-'+f.id" v-bind:rowData="rowData.rowData"></slot>
              </div>
            </template>
            <template v-slot:header-table>
              <slot name="header-table"></slot>
            </template>
            <template v-slot:footer-table>
              <slot name="footer-table"></slot>
            </template>
          </tas-base-table>
          <tas-base-card v-else @zoom="getEvent('zoom', $event)" @add_new="getEvent('create')" @filter="getEvent('filter')" @export="getEvent('export')" @import="getEvent('import')" @detail="getEvent('detail', $event)" @update="getEvent('update', $event)" @delete="getEvent('delete', $event)" :key="config.title+'-list'" :slave="slave" :permission="permission" :title="config.title" :API="configAPI.list" :endpoint="configAPI" :fields="fields.list" :export="config.export" :import="config.import" :filters="filters">
            <template v-if="!advanceFilter" v-slot:inline-filter>
              <tas-base-form class="animated" v-show="filterView" @back="getEvent('list')" @success="onSuccessForm('filter', $event)" :key="config.title+'-inline-form-filter'" simple :form="'filter'" :API="{ setter:configAPI.create, getter:configAPI.read }" :title="config.title" :fields="fields.filter" />
            </template>
            <template v-slot:table-action>
              <slot name="list-action"></slot>
            </template>
            <template v-slot:header-card>
              <slot name="header-card"></slot>
            </template>
            <template v-slot:card-view="rowData">
              <slot name="card-view" v-bind:rowData="rowData.rowData"></slot>
            </template>
          </tas-base-card>
        </slot>
        <slot name="list-footer"></slot>
      </div>
    </template>
    <template v-else>
      <div class="h-90vh text-center position-relative animated">
        <img src="/static/img/loader.svg" class="img-fluid" style="transform: translate(-50%, -50%);position: absolute;top: 50%;">
      </div>
    </template>
    <b-modal id="zoom-modal" hide-footer hide-header centered size="lg">
      <img v-img-fb="zoomImg" alt="img-zoom" class="img-fluid rounded mx-auto d-block">
    </b-modal>
    <b-sidebar v-if="!isLoading && advanceFilter" @hidden="filterView = false" :visible="filterView" id="filter-component" backdrop :backdrop-variant="'light'" shadow right no-header body-class="bg-white">
      <tas-base-form btnSaveLabel="Terapkan Filter" @back="getEvent('list')" @success="onSuccessForm('filter', $event)" :key="config.title+'-form-filter'" :form="'filter'" :API="{ setter:configAPI.create, getter:configAPI.read }" :title="config.title" :fields="fields.filter" />
    </b-sidebar>
  </div>
</template>
<script>
const merge = require('deepmerge')
export default {
  name: 'main-module',
  props: {
    config: { type: Object, required: true },
    listCard: { type: Boolean, required: false, default () { return false } },
    advanceFilter: { type: Boolean, required: false, default () { return false } },
    hideFilter: { type: Boolean, required: false, default () { return false } },
    hideCreate: { type: Boolean, required: false, default () { return false } },
    hideDetail: { type: Boolean, required: false, default () { return false } },
    hideDelete: { type: Boolean, required: false, default () { return false } },
    hideUpdate: { type: Boolean, required: false, default () { return false } },
    classes: { type: String, required: false, default () { return null } }
  },
  computed: {
    slave () {
      // console.log('title', this.$parent.$parent.title)
      if (this.$store.state.activeSlave && this.$parent.$parent.title) {
        if (this.$store.state.activeSlave.master === this.$parent.$parent.title) return true
        else return false
      } else if (this.$store.state.activeSlave && this.$store.state.activeSlave.master === 'mock-slave') {
        return true
      } else return false
    }
  },
  watch: {
    config: {
      deep: true,
      immediate: true,
      handler (to, from) {
        if (this.slave && this.$store.state.activeSlave.rules) {
          let rule = JSON.parse(JSON.stringify(this.$store.state.activeSlave.rules))
          if (rule.fields) delete rule.fields
          const newSlaveConfig = { ...to, ...rule }
          this.moduleChange(newSlaveConfig)
        } else this.moduleChange(to)
      }
    },
    activeView: {
      deep: false,
      immediate: false,
      handler (to) {
        if (!this.slave) {
          if (to && this.$route.query.view !== to) {
            this.$router.push({ name: this.$route.name, query: { 'view': to, id: this.activeID }, params: { id: this.activeID } }).catch(() => { })
          }
        }
      }
    },
    '$route': {
      deep: true,
      immediate: true,
      handler (to) {
        if (!this.slave) {
          if (to.query.view) {
            this.activeView = to.query.view
            this.activeID = Number(to.query.id)
          } else this.activeView = 'list'
        } else {
          this.activeView = 'list'
        }
      }
    }
  },
  data () {
    return {
      isLoading: true,
      orderedFields: [],
      activeID: null,
      activeData: null,
      activeView: null,
      permission: {},
      filters: null,
      filterView: false,
      viewSlave: null,
      fields: {
        list: [],
        detail: [],
        create: [],
        update: [],
        filter: []
      },
      configAPI: {},
      customGetter: false,
      zoomImg: null
    }
  },
  methods: {
    getNewProps (data, rule) {
      let newProps = {}
      Object.assign(newProps, data)
      rule.forEach(f => {
        let path = f.rule.split('.')
        this.setToValue(newProps, f.value, path)
      })
      let result = Object.keys(newProps).map((key) => newProps[key])
      return result
    },
    setToValue (obj, value, path) {
      let i
      for (i = 0; i < path.length - 1; i++) { obj = obj[path[i]] }
      obj[path[i]] = value
    },
    writePermission (hide, permission) {
      if (!hide) {
        return permission
      } else return null
    },
    moduleChange (config) {
      this.isLoading = true
      this.filters = config.filter_api ? config.filter_api : {}
      if (config.permission) {
        this.permission = {
          create: this.writePermission(this.hideCreate, config.permission.create),
          read: this.writePermission(this.hideDetail, config.permission.read),
          update: this.writePermission(this.hideUpdate, config.permission.update),
          delete: this.writePermission(this.hideDelete, config.permission.delete)
        }
      } else {
        this.permission = {
          create: null,
          read: null,
          update: null,
          delete: null
        }
      }
      if (config.custom_api) {
        this.configAPI = {
          list: config.custom_api.list ? config.custom_api.list : config.getter,
          create: config.custom_api.create ? config.custom_api.create : config.setter,
          read: config.custom_api.read ? config.custom_api.read : config.getter,
          update: config.custom_api.update ? config.custom_api.update : config.setter,
          delete: config.custom_api.delete ? config.custom_api.delete : config.setter
        }
        if (config.custom_api.read) this.customGetter = true
      } else {
        this.configAPI = {
          list: (this.slave && this.$store.state.activeSlave.rules && this.$store.state.activeSlave.rules.getter) ? this.$store.state.activeSlave.rules.getter : config.getter,
          create: (this.slave && this.$store.state.activeSlave.rules && this.$store.state.activeSlave.rules.getter) ? this.$store.state.activeSlave.rules.setter : config.setter,
          read: (this.slave && this.$store.state.activeSlave.rules && this.$store.state.activeSlave.rules.getter) ? this.$store.state.activeSlave.rules.getter : config.getter,
          update: (this.slave && this.$store.state.activeSlave.rules && this.$store.state.activeSlave.rules.getter) ? this.$store.state.activeSlave.rules.setter : config.setter,
          delete: (this.slave && this.$store.state.activeSlave.rules && this.$store.state.activeSlave.rules.getter) ? this.$store.state.activeSlave.rules.setter : config.setter
        }
      }
      if (config.model_api) {
        this.$_api.get('/gen-model/' + config.model_api).then(res => {
          this.generateFieldAPI(res).then(result => {
            this.buildField(config.fields, result, config.pk_field).then(result => {
              const sortFields = (array, sortArray) => {
                return array.slice().sort((a, b) => sortArray.indexOf(a.id) + sortArray.indexOf(b.id))
              }
              result.update = sortFields(result.update, res.fieldEdit)
              result.create = sortFields(result.create, res.fieldAdd)
              result.detail = sortFields(result.detail, res.fieldView)
              result.list = this.swapPrimaryField(sortFields(result.list, res.fieldList), config.pk_field)
              this.fields = result
              this.isLoading = false
            })
          })
        }, err => {
          console.log(err)
          this.isLoading = false
        })
      } else {
        this.buildField(config.fields, [], config.pk_field).then(result => {
          this.fields = result
          this.isLoading = false
        })
      }
    },
    async generateFieldAPI (res) {
      let field = []
      res.fieldList.forEach(el => {
        let _field = {
          id: el,
          data: el,
          label: el.split('_').map((kebab) => kebab.toLowerCase().charAt(0).toUpperCase() + kebab.slice(1)).join(' '),
          placeholder: null,
          methods: {
            list: res.fieldList.find(x => x === el) ? this.defineTypeAPI(res.fieldType[el], res, el, 'list') : false,
            detail: res.fieldView.find(x => x === el) ? this.defineTypeAPI(res.fieldType[el], res, el, 'detail') : false,
            create: res.fieldAdd.find(x => x === el) ? this.defineTypeAPI(res.fieldType[el], res, el, 'create') : false,
            update: res.fieldEdit.find(x => x === el) ? this.defineTypeAPI(res.fieldType[el], res, el, 'update') : false,
            // filter: Object.keys(res.fieldFilterable).find(x => x === el) ? this.defineTypeAPI(res.fieldType[el], res, el, 'filter') : false
            filter: false // set default to false
          }
        }
        field.push(_field)
      })
      return field
    },
    defineRelationAPI (data, pointer) {
      if (data.fieldRelation[pointer]) {
        return data.fieldRelation[pointer].displayName
      } else return pointer
    },
    defineTypeAPI (item, data, pointer, from) {
      let _tmp = {}
      let toReturn = {}
      switch (item) {
        case 'integer':
          _tmp.listType = 'text'
          _tmp.formType = 'number'
          _tmp.transform = pointer
          _tmp.view_data = this.defineRelationAPI(data, pointer)
          break
        case 'timestamp_with_time_zone':
          _tmp.listType = 'text'
          _tmp.formType = 'datetime'
          _tmp.transform = 'longDateTime'
          _tmp.view_data = this.defineRelationAPI(data, pointer)
          break
        case 'bigint':
          _tmp.listType = 'text'
          _tmp.formType = 'number'
          _tmp.transform = 'number'
          _tmp.view_data = this.defineRelationAPI(data, pointer)
          break
        case 'double_precision':
          _tmp.listType = 'text'
          _tmp.formType = 'text'
          _tmp.transform = 'text'
          _tmp.view_data = this.defineRelationAPI(data, pointer)
          break
        case 'character_varying':
          _tmp.listType = 'text'
          _tmp.formType = 'text'
          _tmp.transform = null
          _tmp.view_data = this.defineRelationAPI(data, pointer)
          break
        case 'enum':
          _tmp.listType = 'text'
          _tmp.formType = 'number'
          _tmp.transform = null
          _tmp.view_data = this.defineRelationAPI(data, pointer)
          break
        case 'text':
          _tmp.listType = 'text'
          _tmp.formType = 'text'
          _tmp.transform = null
          _tmp.view_data = this.defineRelationAPI(data, pointer)
          break
        default:
          _tmp = 'unset'
      }
      if (_tmp !== 'unset' && data.fieldValidation[pointer]) {
        let ignore = ['nullable', 'string', 'exists_file', 'date', 'integer']
        _tmp.validation = data.fieldValidation[pointer].split('|').filter(x => !ignore.includes(x) && (x.indexOf('exists:') === -1) && (x.indexOf('in:') === -1))
      } else _tmp = true
      switch (from) {
        case 'list':
          toReturn.type = _tmp.listType
          toReturn.transform = _tmp.transform
          toReturn.view_data = _tmp.view_data
          break
        case 'detail':
          toReturn.type = _tmp.listType
          toReturn.transform = _tmp.transform
          toReturn.view_data = _tmp.view_data
          break
        case 'create':
          toReturn.type = _tmp.formType
          toReturn.transform = _tmp.transform
          toReturn.validation = _tmp.validation
          break
        case 'update':
          toReturn.type = _tmp.formType
          toReturn.transform = _tmp.transform
          toReturn.validation = _tmp.validation
          break
        case 'filter':
          toReturn.type = _tmp.formType
          toReturn.transform = _tmp.transform
          break
      }
      return toReturn
    },
    buidView (config) {
      if (config.mode) {
        let view = {
          list: config.mode.list || 'default',
          detail: config.mode.detail || 'default',
          create: config.mode.create || 'default',
          update: config.mode.update || 'default',
          filter: config.mode.filter || 'default'
        }
        Object.keys(view).forEach(el => {
          if (view[el] !== 'default' && view[el] !== 'modal') {
            view[el] = {
              type: el + '-custom',
              file: view[el]
            }
          } else if (view[el] === 'default') {
            view[el] = {
              type: el + '-default',
              file: null
            }
          } else {
            view[el] = {
              type: el + '-modal',
              file: null
            }
          }
        })
        return view
      }
    },
    mergeArr (a, b, prop) {
      const map = new Map()
      a.forEach(item => map.set(item[prop], item))
      b.forEach(item => map.set(item[prop], merge(map.get(item[prop]), item)))
      return Array.from(map.values())
    },
    async buildField (local, server, pk = null) {
      let field = { list: [], detail: [], create: [], update: [], filter: [] }
      let _data = server.length ? this.mergeArr(server, local, 'id') : local
      let data = (this.slave && this.$store.state.activeSlave.rules && this.$store.state.activeSlave.rules.fields) ? this.getNewProps(_data, this.$store.state.activeSlave.rules.fields) : _data
      let sortedData = pk ? this.swapPrimaryField(data, pk) : data
      await sortedData.forEach((item) => {
        let def = {
          id: item.id,
          data: item.data ? item.data : item.id,
          label: item.label,
          placeholder: item.placeholder,
          hint: item.hint || null
        }
        let list = {}
        let detail = {}
        let create = {}
        let update = {}
        let filter = {}
        if (item.methods) {
          if (item.methods.list) {
            if (typeof item.methods.list === 'object') {
              list = {
                show: item.methods.list.show === undefined ? true : item.methods.list.show,
                order: item.methods.list.order === undefined ? true : item.methods.list.order,
                view_data: item.methods.list.view_data || def.data,
                label: item.methods.list.label || def.label,
                permission: item.methods.list.permission || 'template-allow-all',
                type: item.methods.list.type || 'text',
                class: item.methods.list.class || '',
                transform: item.methods.list.transform,
                event: item.methods.list.event
              }
            } else {
              list = {
                show: true,
                order: true,
                permission: 'template-allow-all',
                view_data: def.data,
                type: 'text',
                class: ''
              }
            }
            field.list.push({ ...def, ...list })
          }
          if (item.methods.detail) {
            if (typeof item.methods.detail === 'object') {
              detail = {
                show: item.methods.detail.show === undefined ? true : item.methods.detail.show,
                order: item.methods.detail.order === undefined ? true : item.methods.detail.order,
                permission: item.methods.detail.permission || 'template-allow-all',
                view_data: item.methods.detail.view_data || def.data,
                label: item.methods.detail.label || def.label,
                type: item.methods.detail.type || 'text',
                class: item.methods.detail.class || '',
                transform: item.methods.detail.transform,
                event: item.methods.detail.event
              }
            } else {
              detail = {
                show: true,
                order: true,
                permission: 'template-allow-all',
                view_data: def.data,
                type: 'text',
                class: ''
              }
            }
            field.detail.push({ ...def, ...detail })
          }
          if (item.methods.create) {
            if (typeof item.methods.create === 'object') {
              create = {
                show: item.methods.create.show === undefined ? true : item.methods.create.show,
                view_data: item.methods.create.view_data || def.data,
                label: item.methods.create.label || def.label,
                permission: item.methods.create.permission || 'template-allow-all',
                setter: item.methods.create.setter,
                getter: item.methods.create.getter,
                type: item.methods.create.type || 'text',
                class: item.methods.create.class || '',
                attr: item.methods.create.attr || null,
                value: item.methods.create.value,
                transform_after: item.methods.create.transform_after,
                transform_before: item.methods.create.transform_before,
                validation: Array.isArray(item.methods.create.validation) ? item.methods.create.validation : [],
                event: item.methods.create.event,
                option: item.methods.create.option
              }
            } else {
              create = {
                show: true,
                view_data: def.data,
                permission: 'template-allow-all',
                type: item.methods.create.type || 'text',
                class: '',
                attr: null,
                validation: [],
                value: null
              }
            }
            field.create.push({ ...def, ...create })
          }
          if (item.methods.update) {
            if (typeof item.methods.update === 'object') {
              update = {
                show: item.methods.update.show === undefined ? true : item.methods.update.show,
                view_data: item.methods.update.view_data || def.data,
                label: item.methods.update.label || def.label,
                permission: item.methods.update.permission || 'template-allow-all',
                setter: item.methods.update.setter,
                getter: item.methods.update.getter,
                type: item.methods.update.type || 'text',
                class: item.methods.update.class || '',
                attr: item.methods.update.attr || null,
                value: item.methods.update.value,
                transform_after: item.methods.update.transform_after,
                transform_before: item.methods.update.transform_before,
                validation: Array.isArray(item.methods.update.validation) ? item.methods.update.validation : [],
                event: item.methods.update.event,
                option: item.methods.update.option
              }
            } else {
              update = {
                show: true,
                view_data: def.data,
                permission: 'template-allow-all',
                type: item.methods.update.type || 'text',
                class: '',
                attr: null,
                validation: [],
                value: null
              }
            }
            field.update.push({ ...def, ...update })
          }
          if (item.methods.filter) {
            if (typeof item.methods.filter === 'object') {
              filter = {
                show: item.methods.filter.show === undefined ? true : item.methods.filter.show,
                view_data: item.methods.filter.view_data || def.data,
                label: item.methods.filter.label || def.label,
                permission: item.methods.filter.permission || 'template-allow-all',
                setter: item.methods.filter.setter,
                getter: item.methods.filter.getter,
                type: item.methods.filter.type || 'text',
                class: item.methods.filter.class || '',
                attr: item.methods.filter.attr || null,
                value: item.methods.filter.value,
                transform_after: item.methods.filter.transform_after,
                transform_before: item.methods.filter.transform_before,
                validation: Array.isArray(item.methods.filter.validation) ? item.methods.filter.validation : [],
                event: item.methods.filter.event,
                option: item.methods.filter.option
              }
            } else {
              filter = {
                show: true,
                view_data: def.data,
                permission: 'template-allow-all',
                type: item.methods.filter.type || 'text',
                class: '',
                attr: null,
                validation: [],
                value: null
              }
            }
            field.filter.push({ ...def, ...filter })
          }
        } else console.log('Konfigurasi Field ' + item.id + ' Tidak ditemukan')
      })
      return field
    },
    swapPrimaryField (arr, primary) {
      if (!primary) return arr
      let pk = arr.findIndex((x) => x.id === primary)
      if (pk === -1) return arr
      else {
        var temp = arr[0]
        arr[0] = arr[pk]
        arr[pk] = temp
        return arr
      }
    },
    onSuccessForm (from, e) {
      if (from === 'update') {
        if (this.config.redirectAfterForm) {
          this.$router.push(this.config.redirectAfterForm).catch((err) => { return err })
        } else {
          this.getEvent(this.hideDetail ? 'list' : 'detail', e)
          this.$_alert.success(null, 'Edit data ' + this.config.title + ' berhasil')
        }
      } else if (from === 'create') {
        if (this.config.redirectAfterForm) {
          this.$router.push(this.config.redirectAfterForm).catch((err) => { return err })
        } else {
          this.getEvent(this.hideDetail ? 'list' : 'detail', e)
          this.$_alert.success(null, 'Data ' + this.config.title + ' berhasil ditambahkan')
        }
      } else if (from === 'filter') {
        this.filters = { ...this.$_sys.cleansingObj(e), ...this.config.filter_api }
        this.filterView = false
      }
    },
    getEvent (type, data = null) {
      switch (type) {
        case 'detail':
          this.activeView = 'detail'
          this.activeID = data.id
          this.activeData = null
          break
        case 'list':
          this.activeView = 'list'
          this.activeID = null
          this.activeData = null
          break
        case 'update':
          this.activeView = 'update'
          this.activeID = data.id
          this.activeData = data.data
          break
        case 'create':
          this.activeView = 'create'
          this.activeID = null
          this.activeData = null
          break
        case 'filter':
          this.filterView = !this.filterView
          this.activeID = null
          this.activeData = null
          break
        case 'zoom':
          this.zoomImg = data
          this.$nextTick(function () {
            this.$bvModal.show('zoom-modal')
          })
          break
      }
    }
  }
}
</script>
