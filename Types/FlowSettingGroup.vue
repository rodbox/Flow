<template>
<div>
  <ul class="ul-hook">
	  <li v-for="(tos, ktos) in operator.properties.hydrate.tos">
	    {{tos[0].connector}} > <flow-help :id="tos[0].to">{{tos[0].to}}</flow-help>
	  </li>
	</ul>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import flowHelp from '../FlowHelp.vue'
export default {
  name: 'FlowSettingGroup',
  components: { flowHelp },
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