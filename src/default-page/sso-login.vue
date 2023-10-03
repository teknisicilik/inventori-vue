<template>
  <div class="p-5">
    <span v-if="!message" class="d-block"> Please wait while you are redirected to {{ $_config.name }} ...</span>
    <span v-else>{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: 'sso-login',
  data () {
    return {
      message: null
    }
  },
  mounted () {
    if (this.$route.query.id) this.loginAction(this.$route.query.id)
  },
  methods: {
    loginAction (token) {
      this.$_api.post('oauth/verify-oauth-sso-token', { token: token }).then(res => {
        if (res.token) this.saveProfile(res)
        else this.message = res.message
      }).catch((err) => {
        this.$_alert.error(err)
      })
    },
    async saveProfile (e) {
      if (this.$_config.options.autofill) {
        let deptList = e.departments.map(x => { return { label: x.department_name, code: x.id } })
        let projList = e.projects.map(x => { return { label: x.project_name, code: x.id } })
        let autofill = {
          department_id: {
            value: deptList.length > 0 ? deptList[0].code : null,
            list: deptList
          },
          project_id: {
            value: projList.length > 0 ? projList[0].code : null,
            list: projList
          }
        }
        this.$store.commit('set', ['autofill', autofill, true])
      }
      this.$store.commit('set', ['profile', e.user, true])
      this.$store.commit('set', ['_token', e.token, true])
      this.$store.commit('set', ['permission', e.permissions, true])
      await this.$store.dispatch('setModule')
      this.$router.replace({ name: 'main-module' })
    }
  }
}
</script>

<style>
</style>
