<template>
<div>
  <b-select :item="{data: lists.folders}" v-model="operator.properties.data.folder" :disabled="operator.properties.lock"></b-select>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'FlowSettingFolder',
  components: {},
  computed: {
    ...mapGetters('flowModule', ['operator', 'lists'])
  },
  methods: {
    ...mapActions(['addUi'])
  }
}
</script>
<style lang="less">
</style>