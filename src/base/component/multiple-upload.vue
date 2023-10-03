<template>
  <div class="d-block">
    <div v-if="error.length > 0 || errMessage" class="alert alert-custom alert-light-danger fade show mb-5 py-2 px-4 w-50" role="alert">
      <div class="alert-icon">
        <i style="font-size: 1.5rem;" class="flaticon-warning"></i>
      </div>
      <div class="alert-text">
        <div class="error-wrapper" v-if="error.length > 0">
          <span class="d-block font-size-sm">{{ error[0] }}</span>
        </div>
        <div class="error-wrapper" v-if="errMessage">
          <span class="d-block font-size-sm">{{ $t('hint.failed_upload') }}, {{ errMessage }}</span>
        </div>
      </div>
    </div>
    <div class="img-form-wrapper">
      <div class="input-img">
        <label>
          <a>
            <img v-img-fb="'./static/img/default/camera.svg'" alt="">
            <input type="file" hidden v-bind="attributes" @change="handleFile($event)">
          </a>
        </label>
        <b-progress :max="100" animated v-if="isUploading">
          <b-progress-bar :value="uploadPercentage" :label="`${uploadPercentage}%`"></b-progress-bar>
        </b-progress>
      </div>
      <div class="input-desc">
        <div>
          <span class="d-block font-weight-bold">{{ $t('hint.upload') }}</span>
          <span class=" font-weight-bold font-size-sm">{{ $t('hint.max_size') }} {{ attributes.filter(x=> x.limit)[0].limit }} Mb, {{ $t('hint.max_file') }} {{ attributes.filter(x=> x.max)[0].max }} File </span>
        </div>
        <div class="mt-3">
          <div class="uploaded-wrapper">
            <template v-for="(f,i) in value">
              <div v-if="f.img_attachment" :key="i" class="img-multi-wrapper">
                <img v-img-fb="f.img_attachment.url || './static/img/default/camera.svg'" alt="">
                <button type="button" @click="handleDelete(i)" class="btn btn-icon btn-sm btn-danger">
                  <i class="ri-close-fill pointer"></i>
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'multiple-upload-component',
  props: {
    error: { type: Array, required: false },
    placeholder: { type: String, required: false },
    classes: { type: Object, required: false },
    attr: {
      type: Array, required: false, default: () => { return [{ accept: 'image/*' }, { limit: 1 }, { max: 5 }] }
    },
    value: { type: Array, required: false }
  },
  data () {
    return {
      isUploading: false,
      uploadDetail: null,
      uploadPercentage: 0,
      errMessage: null
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: false,
      handler (to, from) {
        this.$emit('input', to)
      }
    }
  },
  computed: {
    attributes () {
      if (!this.attr) return [{ accept: 'image/*' }, { limit: 1 }, { max: 5 }]
      else return this.attr
    }
  },
  methods: {
    handleDelete (index) {
      if (!this.value[index].id) this.value.splice(index, 1)
      else this.$set(this.value[index], 'img_attachment', null)
    },
    handleFile (e) {
      if (this.value.length < this.attributes.filter(x => x.max)[0].max) {
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
            //   this.$emit('input', res.data.data.path)
            let file = {
              img_attachment: res.data
            }
            this.value.push(file)
            this.isUploading = false
            this.errMessage = null
            e.target.value = null
          }).catch((err) => {
            //   this.$emit('input', null)
            this.isUploading = false
            this.errMessage = err
            e.target.value = null
          })
        } else {
          this.isUploading = false
          this.errMessage = 'File terlalu besar'
          e.target.value = null
        }
      } else {
        this.isUploading = false
        this.errMessage = 'Jumlah File melebihi batas Upload'
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
    padding: 0.5rem 0;
    width: 100%;
    overflow: auto;
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
  .uploaded-wrapper {
    display: flex;
    overflow-x: auto;
  }
  .error-wrapper {
    display: flex;
    align-self: center;
    flex-direction: column;
    margin-right: 1rem;
  }
  .uploaded-wrapper .img-multi-wrapper {
    display: flex;
    position: relative;
    margin-right: 0.5rem;
  }
  .uploaded-wrapper .img-multi-wrapper:hover button {
    opacity: 1;
  }
  .uploaded-wrapper .img-multi-wrapper button {
    opacity: 0;
    position: absolute;
    top: 3px;
    right: 3px;
    border-radius: 10px;
  }
  .uploaded-wrapper .img-multi-wrapper img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 13px;
    border: 2px solid #e4e6ef;
  }
</style>
