<template>
  <div>
    <tabs id="ophookerfroms" height="40vh" style="margin-top: 1rem">
      <tab :id="'froms-' + kfroms" :title="'froms-' + kfroms" v-for="(froms, kfroms, nfroms) in operator.properties.hydrate.froms">
        <flow-help v-for="from in froms" :id="from.from">{{from.from}}</flow-help> 
      </tab>
    </tabs>
    <table class="table table-sm">
      <thead>
        <tr>
          <th><button v-if="!operator.properties.lock" class="btn-sm btn" @click.prevent="addHook('inputs')"><i class="fa fa-plus"></i></button> Input</th>
          <th class="text-right">Output <button v-if="!operator.properties.lock" class="btn-sm btn" @click.prevent="addHook('outputs')"><i class="fa fa-plus"></i></button></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="width: 40%">
            <ul class="ul-hook">
              <li v-for="(input, kinput) in operator.properties.inputs">
                {{input.label}} <i class="fa fa-carret-right"></i>
                <select class="custom-select" :disabled="operator.properties.lock" v-model="input.output" style="padding: 0 1.5rem  0 .3rem; height:1rem; max-width: 60px" >
                  <option value="">-</option>
                  <option :value="koutput" v-for="(output, koutput) in operator.properties.outputs">
                    {{output.label}}
                  </option>
                </select>
                <a href="#"  v-if="!operator.properties.lock"  @click.prevent="deleteHook({hookId: kinput, type: 'inputs'})" class="btn btn-sm text-danger"><i class="fa fa-remove"></i></a>
              </li>
            </ul>
          </td>
          <td style="width: 50%" class="text-right">
            <ul class="ul-hook">
              <li v-for="(output, koutput) in operator.properties.outputs">
                {{output.label}} <a href="#"  v-if="!operator.properties.lock"  @click.prevent="deleteHook({hookId: koutput, type: 'outputs'})" class="btn btn-sm text-danger"><i class="fa fa-remove"></i></a>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
/**
* TODO : revoir l'attribution des modifications des hooks depuis chaque inputs
**/
  import { mapGetters, mapActions } from 'vuex'
  import flowHelp from '../FlowHelp.vue'
  export default {
    name: 'FlowSettingHook',
    components: { flowHelp },
    computed: {
      ...mapGetters('flowModule', ['operator', 'types'])
    },
    methods: {
      ...mapActions('flowModule', ['setOperator', 'saveOperator', 'addHook', 'deleteHook'])
    }
  }
</script>
<style lang="less">
  .ul-hook{
    padding: 0px;
    margin: 0px;
    list-style: none;
  }
</style>