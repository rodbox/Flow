<template>
<div>
  <div class="form-group">
  <b-select :item="{data: lists.dboperator}"  :required=true v-model="operator.properties.data.dboperator" :disabled="operator.properties.lock"></b-select>
  </div>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'FlowSettingDboperator',
  components: {},
  computed: {
    ...mapGetters('flowModule', ['operator', 'lists'])
  },
  methods: {
    ...mapActions(['addUi'])
  }
}
/**
* TODO : Entity db operator
**/
</script>
<style lang="less">
</style>