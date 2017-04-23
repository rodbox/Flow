<template>
<div>
  <h1>FlowSettingOperator</h1>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'FlowSettingOperator',
  components: {},
  computed: {
    ...mapGetters('flowModule', ['operator', 'types'])
  },
  methods: {
    ...mapActions(['addUi', 'action'])
  }
}
</script>
<style lang="less">
</style>