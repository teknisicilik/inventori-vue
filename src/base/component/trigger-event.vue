<template>
  <div></div>
</template>

<script>
export default {
  name: 'trigger-event',
  props: ['mainData'],
  watch: {
    mainData: {
      deep: true,
      immediate: true,
      handler (e) {
        if (e) this.$emit('ready', e)
      }
    }
  },
  created () {
    this.$emit('created', true)
  },
  mounted () {
    this.$emit('mounted', true)
  },
  destroyed () {
    this.$emit('destroyed', true)
  }
}
</script>

<style>
</style>
