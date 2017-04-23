<template>
<div>
  <b-select v-model="operator.properties.data.file" :options="lists.files" :disabled="operator.properties.lock"></b-select>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'FlowSettingFile',
  components: {},
  computed: {
    ...mapGetters('flowModule', ['operator', 'lists'])
  },
  methods: {
    ...mapActions(['addUi'])
  }
}
/**
* TODO : File Setting
**/
</script>
<style lang="less">
</style>