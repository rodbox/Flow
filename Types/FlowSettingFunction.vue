<template>
<div>
<div v-for="(tosroad, ktosroad, ntosroad) in operator.properties.hydrate.tos">
    <span @click="setCapsule(ktosroad)">
      <modal-button id="capsule" class="text-sm mr-1" title="Capsule" :subtitle="operator.properties.title" ><i class="fa fa-cloud"></i> {{ktosroad}}
      </modal-button>
    </span>
  <flow-help v-for="to in tosroad" :id="to.to">{{to.to}}</strong></flow-help>
</div>

  <b-help style="float: right;" content="Les variables sont accessibles par <code>v</code> :
  <hr class='m-0'>
  <pre class='mb-0'>{
  op11: 'toto from flow',
  op12: {
    objet1: {name: 'toto'},
    objet2: {name: 'lorem'},
    objet3: {name: 'impsum'}
  },
  op13: false,
  op14: [42, 123, 4131]
}
ex: alert(v.op13) => return false
  </pre>"></b-help>
  <table class="table table-sm mb-0">
    <tbody>
      <tr v-for="(flowvar, kvar, nvar) in operator.properties.data.vars">
        <td>{{flowvar}}</td>
        <td></td>
      </tr>
    </tbody>
  </table>
  <v-codemirror id="opfunc" v-model="operator.properties.data.function" :value="operator.properties.data.function"></v-codemirror>
  
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import flowHelp from '../FlowHelp.vue'
import FlowEditCapsule from '../FlowEditCapsule.vue'
export default {
  name: 'FlowSettingFunction',
  components: { flowHelp, FlowEditCapsule },
  watch: {
    'operator.properties.data.function' (val) {
    }
  },
  computed: {
    ...mapGetters('flowModule', ['operator', 'types'])
  },
  methods: {
    ...mapActions('flowModule', ['setCapsule'])
  }
}
</script>
<style lang="less">
</style>