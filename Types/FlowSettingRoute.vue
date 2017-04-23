<template>
<div>
  <b-select :item="{data: lists.routes}" v-model="operator.properties.data.route" :disabled="operator.properties.lock"></b-select>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'FlowSettingRoute',
  components: {},
  computed: {
    ...mapGetters('flowModule', ['operator', 'lists'])
  },
  methods: {
    ...mapActions(['addUi', 'action'])
  }
}
</script>
<style lang="less">
</style>