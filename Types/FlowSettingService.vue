<template>
<div>
  <b-select :item="{data: lists.services}" v-model="operator.properties.data.service" :disabled="operator.properties.lock"></b-select>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'FlowSettingService',
  components: {},
  computed: {
    ...mapGetters('flowModule', ['operator', 'types', 'lists'])
  },
  methods: {
    ...mapActions(['addUi'])
  }
}
</script>
<style lang="less">
</style>