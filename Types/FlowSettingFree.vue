<template>
<div>
	<b-input :label="'reg'" v-model="operator.properties.data.reg" :disabled="operator.properties.lock"></b-input>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'FlowSettingFree',
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