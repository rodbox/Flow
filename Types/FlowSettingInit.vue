<template>
<div>
	<pre>{{operator.properties.data.libs}}</pre>
	<b-tag :options="lists.inits" v-model="operator.properties.data.libs"></b-tag>
  	<v-codemirror id="opinit" v-model="operator.properties.data.init" :value="operator.properties.data.init"></v-codemirror>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
/**
* TODO : Corriger le bug d'attribution de libs (voir b-tag) ou la fusion des datas
**/
export default {
  name: 'FlowSettingInit',
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