<template>
  <div class="aside aside-left d-flex aside-fixed radius-aside-secondary" id="kt_aside">
    <div class="aside-primary d-flex flex-column align-items-center flex-row-auto bg-white">
      <div class="aside-brand d-flex flex-column align-items-center flex-column-auto py-5 py-lg-7">
        <router-link :to="{ path: '/' }" class="d-flex flex-column">
          <img :src="$_config.logo.lg" alt="Logo APP" class="img-fluid px-2" />
        </router-link>
      </div>
      <div class="aside-nav w-100 d-flex flex-column align-items-center flex-column-fluid py-5 scroll scroll-push scrolling-hide justify-content-start">
        <ul v-if="$store.state.modules.length" class="nav flex-column w-100" role="tablist">
          <li v-for="(v,i) in $store.state.modules" :key="i" class="nav-item mb-5">
            <div @click="openSecondary(v.routes, v.name, v)" class="nav-link p-0 pointer" :class="{ 'active': v.name === openedPrimary }">
              <span class="nav-tag ml-2 animate__animated" :class="v.name === openedPrimary ? 'bg-primary animate__fadeInLeft' : 'bg-transparent animate__fadeOutLeft'" style="height:80px;width:6px;border-radius:18px"></span>
              <i v-if="v.icon" :class="v.icon" style="font-size: 2.3em;" class="text-primary mx-auto pr-5 font-weight-light" v-b-tooltip.right.viewport :title="v.name.split('-').map((kebab) => kebab.toLowerCase().charAt(0).toUpperCase() + kebab.slice(1)).join(' ')"></i>
              <!-- <template v-else-if="v.svg" v-html="v.svg"></template> -->
              <span v-if="v.svg" class="svg-icon svg-icon-xl mx-auto pr-4"  v-b-tooltip.right.viewport :title="v.name.split('-').map((kebab) => kebab.toLowerCase().charAt(0).toUpperCase() + kebab.slice(1)).join(' ')" v-html="v.svg"></span>
            </div>
          </li>
        </ul>
      </div>
      <div class="aside-footer d-flex flex-column align-items-center flex-column-auto py-4 py-lg-10">
        <span v-if="secondaryItems.length>1" @click="togleSecondary(!$store.state.sideNavSecondary)" class="aside-toggle btn btn-icon btn-light-primary btn-hover-primary shadow-sm" id="kt_aside_toggle">
          <i class="ri-arrow-drop-left-line" style="font-size: 2em !important;"></i>
        </span>
        <a @click="reloadModule()" class="btn btn-icon btn-clean btn-hover-outline-primary btn-lg mb-1 position-relative" id="kt_quick_panel_toggle" v-b-tooltip.right title="Update Website">
          <span class="svg-icon svg-icon-custom svg-icon-primary p-1">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <rect x="0" y="0" width="24" height="24" />
                <path d="M7.38979581,2.8349582 C8.65216735,2.29743306 10.0413491,2 11.5,2 C17.2989899,2 22,6.70101013 22,12.5 C22,18.2989899 17.2989899,23 11.5,23 C5.70101013,23 1,18.2989899 1,12.5 C1,11.5151324 1.13559454,10.5619345 1.38913364,9.65805651 L3.31481075,10.1982117 C3.10672013,10.940064 3,11.7119264 3,12.5 C3,17.1944204 6.80557963,21 11.5,21 C16.1944204,21 20,17.1944204 20,12.5 C20,7.80557963 16.1944204,4 11.5,4 C10.54876,4 9.62236069,4.15592757 8.74872191,4.45446326 L9.93948308,5.87355717 C10.0088058,5.95617272 10.0495583,6.05898805 10.05566,6.16666224 C10.0712834,6.4423623 9.86044965,6.67852665 9.5847496,6.69415008 L4.71777931,6.96995273 C4.66931162,6.97269931 4.62070229,6.96837279 4.57348157,6.95710938 C4.30487471,6.89303938 4.13906482,6.62335149 4.20313482,6.35474463 L5.33163823,1.62361064 C5.35654118,1.51920756 5.41437908,1.4255891 5.49660017,1.35659741 C5.7081375,1.17909652 6.0235153,1.2066885 6.2010162,1.41822583 L7.38979581,2.8349582 Z" fill="#000000" opacity="0.3" />
                <path d="M14.5,11 C15.0522847,11 15.5,11.4477153 15.5,12 L15.5,15 C15.5,15.5522847 15.0522847,16 14.5,16 L9.5,16 C8.94771525,16 8.5,15.5522847 8.5,15 L8.5,12 C8.5,11.4477153 8.94771525,11 9.5,11 L9.5,10.5 C9.5,9.11928813 10.6192881,8 12,8 C13.3807119,8 14.5,9.11928813 14.5,10.5 L14.5,11 Z M12,9 C11.1715729,9 10.5,9.67157288 10.5,10.5 L10.5,11 L13.5,11 L13.5,10.5 C13.5,9.67157288 12.8284271,9 12,9 Z" fill="#000000" />
              </g>
            </svg>
          </span>
        </a>
        <a v-if="$_config.options.myAction" @click="key++" v-b-toggle.myaction-module class="btn btn-icon btn-clean btn-hover-outline-primary btn-lg mb-1 position-relative" id="kt_quick_user_toggle" v-b-tooltip.right title="My Actions">
          <span class="svg-icon svg-icon-custom svg-icon-primary p-1">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M17,12 L18.5,12 C19.3284271,12 20,12.6715729 20,13.5 C20,14.3284271 19.3284271,15 18.5,15 L5.5,15 C4.67157288,15 4,14.3284271 4,13.5 C4,12.6715729 4.67157288,12 5.5,12 L7,12 L7.5582739,6.97553494 C7.80974924,4.71225688 9.72279394,3 12,3 C14.2772061,3 16.1902508,4.71225688 16.4417261,6.97553494 L17,12 Z" fill="#000000" />
                <rect fill="#000000" opacity="0.3" x="10" y="16" width="4" height="4" rx="2" />
              </g>
            </svg>
          </span>
          <span v-if="$store.state['my-action-count']>0" class="label label-danger font-weight-bolder position-absolute" style="right:0px;top:-1px;padding-right: 1px;padding-top: 1px;border: 1.5px solid var(--primary)">{{ Number($store.state['my-action-count']) > 99 ? '99+' : $store.state['my-action-count'] }}</span>
        </a>
        <div v-b-toggle.profile-module class="symbol symbol-circle mt-2" v-b-tooltip.right title="Profil Pengguna">
          <img v-if="profile.img_photo_user" :src="profile.img_photo_user.url" class="min-w-50px min-h-50px" style="object-fit:cover" />
          <span v-else class="svg-icon p-1" style="object-fit:cover;">
            <svg style="width:50px;height:50px;border-radius:50%" width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="512" height="512" fill="var(--primary-light)" />
              <path d="M16 112C16 58.9806 58.9806 16 112 16H400C453.019 16 496 58.9806 496 112V400C496 453.019 453.019 496 400 496H112C58.9806 496 16 453.019 16 400V112Z" fill="var(--primary-light)" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M255.998 112C216.744 112 184.922 143.822 184.922 183.077C184.922 222.331 216.744 254.154 255.998 254.154C295.253 254.154 327.075 222.331 327.075 183.077C327.075 143.822 295.253 112 255.998 112V112Z" fill="var(--primary)" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M372.45 299.45C299.638 260.757 212.362 260.757 139.55 299.45C132.443 303.226 128.001 310.618 128.001 318.666V366.872C128.001 379.56 138.287 389.846 150.975 389.846H361.026C373.714 389.846 384.001 379.56 384.001 366.872V318.666C384.001 310.618 379.559 303.226 372.45 299.45H372.45Z" fill="var(--primary)" />
            </svg>
          </span>
        </div>
      </div>
    </div>
    <div v-if="secondaryItems.length>1" class="aside-secondary d-flex flex-row-fluid radius-aside-secondary" style="box-shadow: 3px 0px 8px rgba(0, 0, 0, 0.05);">
      <!--begin::Workspace-->
      <div class="aside-workspace scroll scroll-push scrolling-hide my-2">
        <!--begin::Tab Content-->
        <div class="tab-content">
          <!--begin::Tab Pane-->
          <div class="tab-pane p-3 px-lg-7 py-lg-5 fade show active" id="kt_aside_tab_1">
            <h4 class="p-2 p-lg-2 my-1 my-lg-3 text-capitalize">{{ openedPrimary.split('-').join(' ') }}</h4>
            <p v-if="secondaryDesc" class="px-2 text-muted">{{ secondaryDesc }}</p>
            <!--begin::List-->
            <div class="list list-hover">
              <!--begin::Item-->
              <template v-for="(s,i) in secondaryItems">
                <template v-if="!s.hidden">
                  <div v-if="s.meta.separator && (i>0? secondaryItems[i-1].meta.separator? secondaryItems[i-1].meta.separator !== s.meta.separator : true : true)" :key="i+'-separator'" class="d-block px-2 px-lg-2 py-1 mt-8 mb-2">
                    <span style="color:#7E8299" class="font-weight-bolder mb-1 font-size-sm text-muted">{{s.meta.separator}}</span>
                  </div>
                  <router-link :to="createLink(s)" @click.native="hideSideNav($event)" :key="i" class="d-block list-item hoverable p-2 p-lg-2 mb-2" :class="{ active: $route.name == s.name }">
                    <div class="d-flex align-items-center">
                      <div class="symbol symbol-30 symbol-light-primary mr-4">
                        <span class="symbol-label" :class="$route.name == s.name ? 'bg-primary' : 'bg-hover-primary'">
                          <i :class="[$route.name === s.name ? 'text-white': 'text-hover-white', s.meta.icon]"></i>
                        </span>
                      </div>
                      <div class="d-flex flex-column flex-grow-1 mr-2">
                        <span :class="$route.name == s.name ? 'text-primary' : 'text-dark-75'" class="font-size-lg mb-0">{{ s.label || s.meta.title }}</span>
                      </div>
                    </div>
                  </router-link>
                </template>
              </template>
              <!--end::Item-->
            </div>
            <!--end::List-->
          </div>
          <!--end::Tab Pane-->
        </div>
        <!--end::Tab Content-->
      </div>
      <!--end::Workspace-->
    </div>
    <b-sidebar z-index="1030" id="sidebar-module" no-close-on-route-change backdrop :backdrop-variant="'light'" shadow left no-header body-class="radius-aside-secondary offcanvas offcanvas-left p-10 offcanvas-on">
      <div class="offcanvas-header d-flex align-items-center justify-content-between pb-10" kt-hidden-height="56" style="">
        <h3 class="font-weight-bold m-0">Main Menu <small class="text-muted font-size-sm ml-2">{{ $_config.name }}</small></h3>
        <a v-b-toggle.sidebar-module class="btn btn-xs btn-icon btn-light btn-hover-primary" id="kt_quick_actions_close">
          <i class="ki ki-close icon-xs text-muted"></i>
        </a>
      </div>
      <div class="offcanvas-content pr-5 mr-n5 scroll ps">
        <div class="row">
          <div v-for="(p,i) in $store.state.modules" :key="i+'-main-menu'" class="col-6 gutter-b">
            <a @click="openSecondary(p.routes, p.name)" v-b-toggle.sidebar-module class="btn btn-block btn-light btn-hover-primary text-dark-50 text-center py-10 px-5">
              <i :class="p.icon" class="text-primary" style="font-size:2.5em"></i>
              <span style="font-size: 1.1rem;" class="d-block font-weight-bold mt-5">{{ p.name.split('-').map((kebab) => kebab.toLowerCase().charAt(0).toUpperCase() + kebab.slice(1)).join(' ') }}</span>
            </a>
          </div>
        </div>
      </div>
    </b-sidebar>
    <b-sidebar z-index="1030" id="profile-module" backdrop :backdrop-variant="'light'" shadow left no-header body-class="radius-aside-secondary offcanvas offcanvas-left p-10 offcanvas-on">
      <div class="offcanvas-header d-flex align-items-center justify-content-between pb-10" kt-hidden-height="56" style="">
        <h3 class="font-weight-bold m-0">Profil Pengguna</h3>
        <a v-b-toggle.profile-module class="btn btn-xs btn-icon btn-light btn-hover-primary" id="kt_quick_actions_close">
          <i class="ki ki-close icon-xs text-muted"></i>
        </a>
      </div>
      <user-profile />
    </b-sidebar>
    <b-sidebar v-if="$_config.options.myAction" z-index="1030" id="myaction-module" backdrop :backdrop-variant="'light'" shadow left no-header body-class="radius-aside-secondary offcanvas offcanvas-left p-10 offcanvas-on no-overflow d-flex flex-column">
      <div class="offcanvas-header d-flex align-items-center justify-content-between pb-5" kt-hidden-height="56" style="">
        <h3 class="font-weight-bold m-0">My Action <small class="text-muted font-size-sm ml-2">{{ $_config.name }}</small></h3>
        <a v-b-toggle.myaction-module class="btn btn-xs btn-icon btn-light btn-hover-primary" id="kt_quick_actions_close">
          <i class="ki ki-close icon-xs text-muted"></i>
        </a>
      </div>
      <my-action :refreshKey="key" />
    </b-sidebar>
  </div>
</template>
<style scoped>
  .icon-primary-menu {
    display: block;
    text-align: center;
    width: 100%;
  }
  .scrolling-hide {
    flex: 1 1 auto;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .scrolling-hide::-webkit-scrollbar {
    display: none;
  }
</style>
<style>
  .radius-aside-secondary {
    border-top-right-radius: 23px;
    border-bottom-right-radius: 23px;
  }
  .svg-icon.svg-icon-custom svg {
    height: 3rem !important;
    width: 3rem !important;
  }
  .btn.btn-clean:hover:not(:disabled):not(.disabled),
  .btn.btn-clean:not(:disabled):not(.disabled).active {
    background-color: var(--primary-light) !important;
  }

  .list.list-hover .list-item:hover,
  .list.list-hover .list-item.active {
    background-color: var(--primary-light);
  }
  .symbol.symbol-40 .symbol-label i {
    font-size: 18px;
  }
  .animated-tag {
    -webkit-transition: all 600ms ease-out 0s;
    -moz-transition: all 600ms ease-out 0s;
    -ms-transition: all 600ms ease-out 0s;
    -o-transition: all 600ms ease-out 0s;
    transition: all 600ms ease-out 0s;
    -webkit-animation: fade-in-left 600ms cubic-bezier(0.39, 0.575, 0.565, 1) both;
    animation: fade-in-left 600ms cubic-bezier(0.39, 0.575, 0.565, 1) both;
  }
</style>

<script>
import userProfile from './../default-page/profile-user'
import myAction from './../default-page/my-action'
export default {
  name: 'aside-left',
  components: { userProfile, myAction },
  data () {
    return {
      secondaryItems: [],
      secondaryDesc: null,
      openedPrimary: null,
      profile: JSON.parse(localStorage.getItem('profile')),
      key: 1,
      color: ['#a4b6b9', '#0074C8', '#0AAB41', '#D42B21', '#FFAE33'],
      icon: {
        action: './static/img/icon/my-action.svg',
        profile: './static/img/icon/my-action.svg'
      }
    }
  },
  watch: {
    '$route': {
      deep: true,
      immediate: false,
      handler (t, f) {
        if (t.name !== f.name) {
          let openModule = this.$store.state.modules.filter(x => x.routes.some(y => y.name === t.name))[0]
          if (openModule) {
            this.$store.commit('set', ['unknownRoute', false, true])
          } else this.$store.commit('set', ['unknownRoute', true, true])
        }
      }
    }
  },
  methods: {
    openSecondary (child, name, item, redirect = true) {
      this.openedPrimary = name
      this.secondaryDesc = item.desc
      this.secondaryItems = child.filter(x => !x.hidden)
      if (this.secondaryItems.length > 1) this.togleSecondary(true)
      else if (this.secondaryItems.length === 1) {
        this.togleSecondary(false)
        if (redirect && this.$route.name !== this.secondaryItems[0].name) this.$router.push({ name: this.secondaryItems[0].name, query: { view: 'list' } })
      } else this.togleSecondary(false)
    },
    togleSecondary (val) {
      if (val) {
        this.$_sys.togleClass('kt_body', 'aside-minimize', false)
        this.$store.commit('set', ['sideNavSecondary', true])
      } else {
        this.$_sys.togleClass('kt_body', 'aside-minimize', true)
        this.$store.commit('set', ['sideNavSecondary', false])
      }
    },
    createLink (s) {
      if (this.$route.name !== s.name || this.$route.query.view !== 'list') {
        return { name: s.name, query: { view: 'list' } }
      } else return { query: { view: 'list' } }
    },
    hideSideNav () {
      this.$store.commit('set', ['sideNavMobile', false])
      this.$_sys.togleClass('kt_aside', 'aside-on', false)
    },
    async reloadModule () {
      await this.$store.dispatch('setModule')
      try {
        await this.$router.push({ name: 'main-module' })
      } catch (error) {
        console.log(error)
      }
      location.reload()
    }
  }
}
</script>
