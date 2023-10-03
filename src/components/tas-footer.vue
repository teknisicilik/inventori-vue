<template>
  <!--doc: add "bg-white" class to have footer with solid background color-->
  <div class="footer py-4 d-flex flex-lg-column" id="kt_footer">
    <!--begin::Container-->
    <div class="container d-flex flex-column flex-md-row align-items-center justify-content-between">
      <!--begin::Copyright-->
      <div class="text-dark order-2 order-md-1">
        <span class="text-muted font-weight-bold mr-2">{{ new Date().getFullYear() }}©</span>
        <router-link :to="{ path: '/' }" class="text-dark-75 text-hover-primary">{{ $_config.company }}</router-link>
      </div>
      <!--end::Copyright-->
      <!-- <v-select class="mr-4" placeholder="Language" v-model="$root.$i18n.locale" append-to-body :searchable="false" :clearable="false" :options="['id','en']"></v-select> -->
      <!--begin::Nav-->
      <div class="nav nav-dark order-1 order-md-2">
        <router-link :to="{ name: 'term-condition' }" target="_blank" class="nav-link pr-3 pl-0">Term &amp; Condition</router-link>
        <router-link :to="{ name: 'privacy-policy' }" target="_blank" class="nav-link pr-3 pl-0">Privacy Policy</router-link>
        <a v-if="$_config.guide" :href="$_config.guide" target="_blank" class="nav-link pl-3 pr-0">Panduan Penggunaan</a>
      </div>
      <!--end::Nav-->
    </div>
    <!--end::Container-->
  </div>
</template>
<script>
export default {
  name: 'tas-footer'
}
</script>
