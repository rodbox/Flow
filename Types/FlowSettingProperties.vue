<template>
<div>
<div class="row">
	<div class="col-12 pr-1">
		<label for="opproplock"><i class="fa fa-lock"></i></label>
		<input id="opproplock" type="checkbox" v-model="operator.properties.lock" @change.prevent="reqPw">
	</div>
	<div class="col-6 pr-1">
		<label id="optop" for="">{{'label.top'|trans}}</label>
		<b-input id="optop" v-model="operator.top"></b-input>
	</div>
	<div class="col-6 pl-1">
		<label id="opleft" for="">{{'label.left'|trans}}</label>
		<b-input id="opleft" v-model="operator.left"></b-input>
	</div>
</div>
<label for="oppropview">{{'label.view'|trans}}</label>
<b-help :content="'help.vue'|trans"></b-help>
<v-codemirror id="oppropview" :readOnly="!operator.properties.lock" v-model="operator.properties.view" mode="vue" theme="default"></v-codemirror>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'FlowSettingProperties',
  computed: {
    ...mapGetters('flowModule', ['operator', 'types'])
  },
  methods: {
    ...mapActions(['addUi']),
    ...mapActions('flowModule', ['reqPw'])
  }
}
</script>
<style lang="less">

</style>