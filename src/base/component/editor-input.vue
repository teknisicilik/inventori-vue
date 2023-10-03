<template>
  <div>
     <vue-editor  v-model="tmp_value" @text-change="textChange()"/>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor"

export default {
  name: 'editor-input',
  components: { VueEditor },
  props: {
    value: { required: true }
  },
  data () {
    return {
      tmp_value: null,
      errorList: false
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler (to) {
        this.tmp_value = to
      }
    }
  },
  beforeMount () {
    this.tmp_value = this.value
  },
  methods: {
    textChange (value) {
      this.$emit('input', this.tmp_value)
    }
  }
}
</script>

<style>

</style>
