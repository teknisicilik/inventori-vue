<template>
  <div v-if="main" class="card card-custom position-relative">
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">Penilaian {{ title }}</span>
        <span class="text-muted mt-3 font-weight-bold font-size-sm">Penilaian rating untuk {{ main.data_main.name }}</span>
      </h3>
    </div>
    <div class="card-body pt-0">
      <b-overlay :show="isLoading" rounded="sm" no-wrap />
      <div class="d-flex flex-wrap">
        <div class="col-auto text-center min-w-150px align-self-start bg-light-primary p-3" style="border-radius:8px">
          <span class="mb-0 font-size-xl font-weight-bold text-primary" style="line-height: 1;">{{ main.data_main.overall_rating_value | parse('number2fraction') }}</span>
          <rate class="readonly-rate" :length="maxValue" :value="main.data_main.overall_rating_value" :disabled="true" :readonly="true" />
          <span class="d-block mt-2 font-size-sm text-muted">Overall Rating</span>
        </div>
        <div class="col pr-0 align-self-center">
          <ul class="list-unstyled mb-2">
            <li v-for="(x,i) in main.data_rating" :key="i+'-rate-progress'" class="py-1">
              <div class="mt-1" style="white-space: nowrap;">{{ x.rating_type_name }}</div>
              <rate class="readonly-rate min-w-80px" :length="maxValue" :value="x.rating_value" :disabled="true" :readonly="true" />
            </li>
          </ul>
        </div>
      </div>
      <template v-if="$_sys.isAllowed( permission? 'do-ratings-'+permission : 'template-allow-all')">
        <hr>
        <div class="rate-wrapper mt-4">
          <h6 class="mb-5">Penilaian Anda</h6>
          <table class="table no-border v-center">
            <tr v-for="(x,i) in main.data_rating" :key="i+'-my-progress'">
              <td style="" class="pl-0 pr-5 text-left">{{ x.rating_type_name }}</td>
              <td style="" class="pl-0 pr-5 nowrap-table">
                <rate class="input-rate" :length="maxValue" v-model="x.my_rating_value" :disabled="false" :readonly="false" />
              </td>
            </tr>
          </table>
          <div class="text-center mt-5">
            <button @click="sendRating" class="btn btn-sm btn-light-primary btn-block">Kirim Penilaian</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'input-rating',
  props: {
    title: { type: String, required: true },
    setter: { type: String, required: true },
    getter: { type: String, required: true },
    maxValue: { type: Number, required: false, default () { return 5 } },
    permission: { type: String, required: false, default () { return '' } },
    filter: { type: Object, required: true }
  },
  data () {
    return {
      main: null,
      isLoading: false
    }
  },
  watch: {
    'main.data_main.overall_rating_value': {
      deep: false,
      immediate: false,
      handler (e) {
        this.$emit('done', e)
      }
    }
  },
  mounted () {
    if (this.$_sys.isAllowed(this.permission ? 'view-' + this.permission : 'template-allow-all')) {
      this.getRating()
    }
  },
  methods: {
    getRating () {
      this.isLoading = true
      this.$_api.get(this.getter, this.filter).then(res => {
        this.main = res.data
        this.isLoading = false
      }).catch((err) => {
        this.isLoading = false
        this.$_alert.error(err)
      })
    },
    sendRating () {
      this.$_api.post(this.setter, { data_rating: this.main.data_rating }).then(res => {
        this.getRating()
      }).catch((err) => {
        this.$_alert.error(err)
      })
    }
  }
}
</script>
