<template>
<div>
  <div class="form-group">
  		<b-select :item="{data: lists.entitys}" v-model="operator.properties.data.entity" :disabled="operator.properties.lock"></b-select>
  </div>

  <div class="form-group">
  <label for="">{{'label.repository'|trans}}</label>
		  <b-input v-model="operator.properties.data.repository"></b-input>
  </div>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'FlowSettingEntity',
  components: {},
  computed: {
    ...mapGetters('flowModule', ['operator', 'lists'])
  },
  methods: {
    ...mapActions(['addUi'])
  }
}
/**
* TODO : Entity setting
**/
</script>
<style lang="less">
</style>