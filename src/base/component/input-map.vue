<template>
  <div class="row">
    <div v-if="!readonly" class="col-12 col-lg-6">
      <div class="mb-3">
        <div class="input-icon">
          <gmap-autocomplete :placeholder="placeholder || 'Cari tempat, lokasi, atau alamat'" :value="searchMap" @place_changed="setPlace" class="form-control"></gmap-autocomplete>
          <span> <i class="flaticon2-search-1 icon-md"></i></span>
        </div>
        <div class="invalid-feedback">{{ errors[0] }}</div>
      </div>
      <div :class="place && addressMap? ' alert-light-primary' : ' alert-light-danger'" class="alert alert-custom alert-shadow fade show mb-0 py-3 px-5" role="alert">
        <div class="alert-icon">
          <span :class="place && addressMap? 'svg-icon-primary' : 'svg-icon-danger'" class="svg-icon svg-icon-xl">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <rect x="0" y="0" width="24" height="24" />
                <path d="M9.82829464,16.6565893 C7.02541569,15.7427556 5,13.1079084 5,10 C5,6.13400675 8.13400675,3 12,3 C15.8659932,3 19,6.13400675 19,10 C19,13.1079084 16.9745843,15.7427556 14.1717054,16.6565893 L12,21 L9.82829464,16.6565893 Z M12,12 C13.1045695,12 14,11.1045695 14,10 C14,8.8954305 13.1045695,8 12,8 C10.8954305,8 10,8.8954305 10,10 C10,11.1045695 10.8954305,12 12,12 Z" fill="#000000" />
              </g>
            </svg>
          </span>
        </div>
        <div v-if="place && addressMap" class="alert-text position-relative">
          <span class="d-block font-weight-bold mb-2">Hasil Pencarian:</span>
          <p style="word-break: break-word;" class="mb-0">{{ addressMap }}</p>
          <span class="text-muted font-size-sm">Latitude: {{ place.lat }}, Longitude: {{ place.lng }}</span>
          <div class="mb-0 mt-3 font-size-sm">
            <div class="d-flex align-items-center">
              <i class="ri-information-line pr-1 text-primary"></i>
              <span>Anda juga dapat menggeser <span class="font-weight-bolder text-danger">Pin Lokasi</span> pada map ke titik yang diinginkan</span>
            </div>
          </div>
          <span class="remove-address text-primary pointer" @click="removeAddress()">
            <i class="ri-close-line text-primary font-weight-bolder"></i>
          </span>
        </div>
        <div v-else class="alert-text position-relative">
          <span class="d-block font-weight-bolder mb-2">Belum ada data lokasi.</span>
          <p style="word-break: break-word;" class="mb-0">Silahkan ketik kata kunci lokasi anda di kotak pencarian, kemudian pilih lokasi yang sesuai atau <span @click="getLocation" class="font-weight-bold text-underline pointer">Gunakan lokasi saat ini</span></p>
        </div>
      </div>
      <div v-if="errAPI" class="alert alert-danger mt-3 mb-0" role="alert">{{ errAPI }}</div>
    </div>
    <div :class="readonly? 'col-12': 'col-12 col-lg-6'">
      <GmapMap ref="mapRef" :options="mapOption" :center="mapCenter" :zoom="readonly? 18 : zoomNum">
        <Gmap-Marker v-if="place" :draggable="!readonly" @dragend="updateMaker" :position="place"></Gmap-Marker>
      </GmapMap>
    </div>
  </div>
</template>
<style>
  .vue-map-container {
    width: 100%;
    height: 100%;
    border-radius: 18px;
  }
  .vue-map-container .vue-map {
    border-radius: 8px;
  }
  .remove-address {
    position: absolute;
    top: -10px;
    right: -10px;
  }
</style>
<script>
export default {
  name: 'map-input',
  props: {
    value: { required: true },
    placeholder: { type: String, required: false },
    errors: { type: Array, required: false },
    classes: { type: Object, required: false },
    readonly: { type: Boolean, required: false, default () { return false } }
  },
  data () {
    return {
      zoomNum: 5,
      mapOption: {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: true,
        disableDefaultUi: false
      },
      searchMap: null,
      addressMap: null,
      place: null,
      mapCenter: {
        lat: -7.0245542, lng: 110.3470253
      },
      errAPI: null
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler (to, from) {
        if (to && to.latitude && to.longitude) {
          this.place = { lat: Number(to.latitude), lng: Number(to.longitude) }
          this.addressMap = to.address
          this.mapCenter = Object.assign({}, { lat: Number(to.latitude), lng: Number(to.longitude) })
        }
      }
    },
    addressMap: {
      immediate: false,
      deep: false,
      handler (e) {
        if (e) this.zoomNum = 18
        else this.zoomNum = 5
      }
    }
  },
  methods: {
    setPlace (event) {
      if (event.geometry) {
        let position = {
          lat: event.geometry.location.lat(),
          lng: event.geometry.location.lng()
        }
        this.place = position
        this.addressMap = event.formatted_address
        this.mapCenter = Object.assign({}, position)
        this.$emit('input', {
          address: this.addressMap,
          lat: position.lat,
          lng: position.lng
        })
      } else {
        this.searchMap = null
        this.place = null
        this.mapCenter = Object.assign({}, {
          lat: -7.0245542, lng: 110.3470253
        })
      }
    },
    updateMaker (event) {
      let position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
      this.place = position
      this.mapCenter = Object.assign({}, position)
      this.$geocoder.send(position, response => {
        if (response.results.length >= 0) {
          this.addressMap = response.results[0].formatted_address
          this.$emit('input', {
            address: this.addressMap,
            latitude: position.lat,
            longitude: position.lng
          })
        }
      })
    },
    removeAddress () {
      this.place = null
      this.addressMap = null
    },
    getLocation () {
      const locationOption = {
        enableHighAccuracy: true,
        timeout: 'Infinity',
        maximumAge: 0
      }
      this.$getLocation(locationOption).then(coordinates => {
        let position = {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
        this.$geocoder.send(position, response => {
          if (response.results.length) {
            this.errAPI = null
            this.addressMap = response.results[0].formatted_address
            this.$emit('input', {
              address: response.results[0].formatted_address,
              latitude: position.lat,
              longitude: position.lng
            })
          } else {
            if (response.error_message) {
              this.errAPI = response.error_message
            } else {
              this.errAPI = null
            }
          }
        })
      })
    }
  }
}
</script>

<style>
</style>
