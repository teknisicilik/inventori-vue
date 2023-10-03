<template>
  <div id="kt_header_mobile" class="header-mobile">
    <!--begin::Logo-->
    <router-link :to="{ path: '/' }" class="d-flex align-items-center">
      <img :src="$_config.logo.lg" alt="Logo APP" class="max-h-50px" />
      <div class="ml-2 mt-1">
        <h5 class="mb-0">{{ $_config.name }}</h5>
        <span class="font-size-sm text-dark-75">{{ $_config.company }}</span>
      </div>
    </router-link>
    <!--end::Logo-->
    <!--begin::Toolbar-->
    <div class="d-flex align-items-center">
      <button @click="togleSecondary(!$store.state.sideNavMobile)" class="btn p-0 burger-icon burger-icon-left" id="kt_aside_mobile_toggle">
        <span></span>
      </button>
    </div>
    <!--end::Toolbar-->
  </div>
</template>

<script>
export default {
  name: 'tas-header-mobile',
  methods: {
    togleSecondary (val) {
      if (val) {
        this.$store.commit('set', ['sideNavMobile', true])
        this.$_sys.togleClass('kt_aside', 'aside-on', true)
      } else {
        this.$store.commit('set', ['sideNavMobile', false])
        this.$_sys.togleClass('kt_aside', 'aside-on', false)
      }
    }
  }
}
</script>
<style>
  @media (max-width: 500px) {
    .header-mobile-fixed .wrapper {
      padding-top: 70px;
    }
  }
</style>
