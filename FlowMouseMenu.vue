
<template>
  <div v-if="mouse.show" class="context-menu list-group" :style="'top:' + mouse.position.top + 'px; left:' + mouse.position.left + 'px'" @contextmenu.prevent="mouseToggle" :class="'type-' + operator.properties.type.name" >
    <button class="list-group-item" @click="focusPlayer() + ' ' + mouseToggle(false)" ><i class="fa fa-list fa-fw mr-1"></i> {{'action.focus' |trans}}</button>
    <button class="list-group-item" @click="saveFlow() + ' ' + mouseToggle(false)" ><i class="fa fa-floppy-o fa-fw mr-1"></i> {{'action.save' |trans}}</button>
    <button class="list-group-item" @click="alignOperators"><i class="fa fa-th fa-fw mr-1"></i> {{'action.align' |trans}}</button>
    <div class="list-group-item">
      <div class="input-group mb-1">
        <button class="input-group-addon" @click="createOperator"><i class="fa fa-plus"></i></button>
        <select @change="getSelect" class="pl-0 pr-0 form-control form-control-sm custom-select">
          <option :value="op.properties.id" v-for="(op, kop) in operators" class="p-1">{{op.properties.id}} - {{op.properties.title}}</option>  
        </select>
        <div class="input-group-addon pl-0 pr-1">
          <input type="checkbox" v-model="autoconnect"  @change="autoconnectToggle">
        </div>
      </div>
      <div class="input-group mb-1">
        <div class="input-group-addon" ><i class="fa icon-type "></i></div>
        <select v-model="operator.properties.type" @change="changeType" class="pl-0 form-control form-control-sm custom-select">
          <option :value="type" v-for="type in types">{{type.name}}</option>  
        </select>
      </div>
    </div>
    <button class="list-group-item" @click="deleteSelected"><i class="fa fa-trash fa-fw mr-1"></i> {{'action.delete' |trans}}</button>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'flowMouseMenu',
    data: () => {
      return {
        ope: {type: Object, default: {}}
      }
    },
    computed: {
      ...mapGetters('flowModule', ['operator', 'types', 'mouse', 'operators', 'autoconnect'])
    },
    methods: {
      ...mapActions('flowModule', ['mouseToggle', 'createOperator', 'deleteSelected', 'alignOperators', 'saveFlow', 'selectOperator', 'focusPlayer', 'autoconnectToggle']),
      getSelect (e) {
        this.selectOperator(e.target.value)
      }
    }
  }
</script>
<style lang="less">
  .context-menu{
    -webkit-box-shadow: 7px 7px 2px 0 rgba(0,0,0,.2);
    box-shadow: 7px 7px 2px 0 rgba(0,0,0,.2);
    border-radius: .3rem;
    width: 170px;
    &,
    *,
    .form-control{
      font-size: .7rem;
    }
    margin-top: -1rem;
    margin-left: -1rem;
    position: fixed;
    z-index: 3002;
    .list-group-item{
      padding: .3rem;
    }
    button.list-group-item > i {
      padding: .5rem .75rem;
      margin-right: 1rem !important;
    }
  }
</style>