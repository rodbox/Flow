<template>
  <div class="" :data-filter='operator.properties.type.name'>
    <div class="row">
      <form class="col-12 " style="padding-bottom:0px;">
        <div class="btn-group-sm pull-right" style="margin-top:1rem;">
          <button class="btn btn-link" @click.prevent="saveOperatorDB"> <i class="fa fa-floppy-o"></i> </button>
        </div>
        <h1 style="margin-top:.5rem; margin-bottom:1.5rem" class="p-1 flowchart-editor-operator-title"><div class="text-sm text-muted"></div>
         <i class="icon-type"></i> {{operator.properties.title}} <span class="text-sm"></span>
        </h1>
      </form>
      <div class="col-12">
        <tabs class="tabs-sm tabs-white attr-overflow" height="70vh" :filter='operator.properties.type.name'>
          <tab id="op" title="Infos" icon="<i class='fa fa-info'></i>" open=true><set-def></set-def></tab>
          <tab id="hook" title="Hook" icon="<i class='fa fa-cog'></i>"><set-hook></set-hook></tab>
          <tab id="properties" :title="'label.props' | trans" icon="<i class='fa fa-cog'></i>"><set-properties></set-properties></tab>
          <tab id="setFolder" filter="folder" title="Folder"><set-folder></set-folder></tab> 
          <tab id="setList" filter="list" title="List"><set-list></set-list></tab> 
          <tab id="setJson" filter="json" title="Json"><set-json></set-json></tab> 
          <tab id="setFile" filter="file" title="File"><set-file></set-file></tab> 
          <tab id="setEntity" filter="entity" title="Entity"><set-entity></set-entity></tab> 
          <tab id="setFunction" filter="function" title="Function"><set-function></set-function></tab> 
          <tab id="setDboperator" filter="dboperator" title="OperatorDB"><set-dboperator></set-dboperator></tab>
          <tab id="setFree" filter="free" title="Free"><set-free></set-free></tab> 
          <tab id="setService" filter="service" title="Service"><set-service></set-service></tab> 
          <tab id="setRoute" filter="route" title="Route"><set-route></set-route></tab> 
          <tab id="setInit" filter="init" title="Init"><set-init></set-init></tab> 
          <tab id="setGroup" filter="group" title="Group"><set-group></set-group></tab> 
          <tab id="setFlow" filter="flow" title="Flow"><set-flow></set-flow></tab> 
          <tab id="opdebug" :title="'label.debug' | trans" icon="<i class='fa fa-cog'></i>">
           <b-clip>
            <pre>{{operator}}</pre>
          </b-clip>
          </tab>
        </tabs>
      </div>
    </div>
  </div>
</template>
<script>
/**
* TODO : Locker les inputs d'editions de l'operator
**/
  import { mapGetters, mapActions } from 'vuex'
  import flowHelp from './FlowHelp.vue'
  import setDef from './Types/FlowSettingDefault.vue'
  import setHook from './Types/FlowSettingHook.vue'
  import setFolder from './Types/FlowSettingFolder.vue'
  import setList from './Types/FlowSettingList.vue'
  import setJson from './Types/FlowSettingJson.vue'
  import setFile from './Types/FlowSettingFile.vue'
  import setEntity from './Types/FlowSettingEntity.vue'
  import setFunction from './Types/FlowSettingFunction.vue'
  import setDboperator from './Types/FlowSettingDboperator.vue'
  import setFree from './Types/FlowSettingFree.vue'
  import setService from './Types/FlowSettingService.vue'
  import setRoute from './Types/FlowSettingRoute.vue'
  import setGroup from './Types/FlowSettingGroup.vue'
  import setInit from './Types/FlowSettingInit.vue'
  import setFlow from './Types/FlowSettingFlow.vue'
  import setProperties from './Types/FlowSettingProperties.vue'
  import flowMouseMenu from './FlowMouseMenu.vue'
  export default {
    name: 'flowEdit',
    components: {
      flowHelp,
      setDef,
      setHook,
      setFolder,
      setList,
      setJson,
      setFile,
      setEntity,
      setFunction,
      setDboperator,
      setFree,
      setService,
      setRoute,
      setGroup,
      setFlow,
      setInit,
      flowMouseMenu,
      setProperties
    },
    computed: {
      ...mapGetters('flowModule', ['operator', 'types', 'saveFlow'])
    },
    watch: {
      'operator.properties.title' () {
        this.saveOperator()
      },
      'operator.properties.hook' () {
        this.saveOperator()
      },
      'operator.properties.type' () {
        this.saveOperator()
      },
      'operator.properties.type.data' () {
        this.saveOperator()
      }
    },
    methods: {
      ...mapActions('flowModule', ['setOperator', 'createOperator', 'deleteOperator', 'saveOperator', 'saveOperatorDB'])
    }
  }
</script>
<style lang="less">
  li[data-filter='folder'],
  li[data-filter='list'],
  li[data-filter='json'],
  li[data-filter='flow'],
  li[data-filter='file'],
  li[data-filter='init'],
  li[data-filter='entity'],
  li[data-filter='function'],
  li[data-filter='dboperator'],
  li[data-filter='free'],
  li[data-filter='service'],
  li[data-filter='group'],
  li[data-filter='route'] {
    display: none;
  }
  
  [data-filter='false'],
  [data-filter='false'] li[data-filter='false'],
  [data-filter='folder'] li[data-filter='folder'],
  [data-filter='list'] li[data-filter='list'],
  [data-filter='json'] li[data-filter='json'],
  [data-filter='file'] li[data-filter='file'],
  [data-filter='init'] li[data-filter='init'],
  [data-filter='flow'] li[data-filter='flow'],
  [data-filter='entity'] li[data-filter='entity'],
  [data-filter='function'] li[data-filter='function'],
  [data-filter='dboperator'] li[data-filter='dboperator'],
  [data-filter='free'] li[data-filter='free'],
  [data-filter='service'] li[data-filter='service'],
  [data-filter='group'] li[data-filter='group'],
  [data-filter='route'] li[data-filter='route'] {
    display: list-item !important;
  }

</style>