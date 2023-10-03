<template>
  <div class="img-form-wrapper">
    <div class="input-img">
      <label>
        <a>
          <img v-if="uploadURL" v-img-fb="uploadURL.url || './static/img/default/camera.svg'" alt="">
          <img v-else v-img-fb="'./static/img/default/camera.svg'" alt="">
          <input type="file" hidden v-bind="attributes" @change="handleFile($event)">
        </a>
      </label>
      <b-progress :max="100" animated v-if="isUploading">
        <b-progress-bar :value="uploadPercentage" :label="`${uploadPercentage}%`"></b-progress-bar>
      </b-progress>
    </div>
    <div v-if="!hideDesc" class="input-desc">
      <div>
        <span class="d-block font-weight-bold">{{ $t('hint.upload') }}</span>
        <span class=" font-weight-bold font-size-sm">{{ $t('hint.max_size') }} {{ attributes.filter(x=> x.limit)[0].limit }} Mb </span>
      </div>
      <div class="mt-3" v-if="uploadDetail && value && !errMessage && error.length === 0">
        <span class="d-block text-muted font-size-sm">{{ $t('global.file_name') }}: <a :href="value" target="_blank">{{ uploadDetail.name }}</a></span>
        <span class="d-block text-muted font-size-sm">{{ $t('global.size') }}: {{ (uploadDetail.size / 1000000).toFixed(2) }} Mb</span>
        <span class="d-block text-muted font-size-sm">{{ $t('global.type') }}: {{ uploadDetail.type }}</span>
        <span class="badge badge-danger badge-sm mt-3 pointer" @click="$emit('input', null); uploadURL = null">{{ $t('global.delete') }}</span>
      </div>
      <div class="mt-3" v-else-if="error.length > 0">
        <span class="d-block text-danger font-size-sm">{{ error[0] }}</span>
      </div>
      <div class="mt-3" v-else-if="errMessage">
        <span class="d-block text-danger font-size-sm">{{ $t('hint.failed_upload') }}</span>
        <span class="d-block text-danger font-size-sm">{{ errMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'single-upload-component',
  props: {
    error: { type: Array, required: false },
    placeholder: { type: String, required: false },
    classes: { type: Object, required: false },
    attr: { type: Array, required: false, default: () => { return [{ accept: 'image/*' }, { limit: 1 }] } },
    value: { type: Object, required: false },
    hideDesc: { type: Boolean, required: false, default: () => { return false } }
  },
  data () {
    return {
      isUploading: false,
      uploadDetail: null,
      uploadPercentage: 0,
      errMessage: null,
      uploadURL: null
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler (to) {
        this.uploadURL = Object.assign({}, this.uploadURL, to)
      }
    }
  },
  computed: {
    attributes () {
      if (!this.attr) return [{ accept: 'image/*' }, { limit: 1 }]
      else return this.attr
    }
  },
  methods: {
    handleFile (e) {
      if ((e.target.files[0].size / 1000000).toFixed(2) < this.attributes.filter(x => x.limit)[0].limit) {
        this.uploadPercentage = 0
        this.isUploading = true
        let image = e.target.files[0]
        var reader = new FileReader()
        reader.readAsDataURL(image)
        this.$_api.fileUpload(image, event => {
          this.uploadDetail = image
          this.uploadPercentage = Math.round((100 * event.loaded) / event.total)
        }).then(res => {
          this.$emit('input', res.data)
          this.uploadURL = res.data
          this.isUploading = false
          this.errMessage = null
          e.target.value = null
        }).catch((err) => {
          this.$emit('input', null)
          this.isUploading = false
          this.errMessage = err
          e.target.value = null
        })
      } else {
        this.isUploading = false
        this.errMessage = 'File terlalu besar'
        e.target.value = null
      }
    }
  }
}
</script>

<style>
  .img-form-wrapper {
    margin-bottom: 1.75rem;
    display: flex;
    position: relative;
  }
  .img-form-wrapper .input-img {
    display: block;
    position: relative;
    width: 158px;
    height: 158px;
    border-radius: 17px;
    border: 2px dashed #e4e6ef;
    padding: 2px;
    cursor: pointer;
  }
  .img-form-wrapper .input-desc {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 1rem;
    padding: 1rem 0;
  }
  .img-form-wrapper .input-img img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 13px;
    cursor: pointer;
  }
  .img-form-wrapper .input-img .progress {
    position: absolute;
    width: 90%;
    top: calc(50% - 0.5rem);
    left: 5%;
  }
</style>
