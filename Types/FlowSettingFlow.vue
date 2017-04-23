<template>
  <div class="form-group">
  		<b-select :item="{data: lists.flows}"  :required=true  v-model="operator.properties.data.flow" :disabled="operator.properties.lock"></b-select>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'FlowSettingFlow',
  components: {},
  computed: {
    ...mapGetters('flowModule', ['operator', 'lists'])
  },
  methods: {
    ...mapActions([''])
  }
}
/**
* TODO : Entity Flow
**/
</script>
<style lang="less">
</style>