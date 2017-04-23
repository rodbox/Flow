<template>
<div class="input-group flow-player-container">
  <div class="input-group-addon"><i class="fa fa-search"></i></div>
  <input :id="'flow-player-' + id" type="text" class="form-control flow-player pl-0" @focus="loadFlow(id)" @blur="closeDialog" @keydown.esc="clearReq" @keydown.down="navFocus(+1)"  @keydown.up="navFocus(-1)" v-model="req.input" @input="reqReq" @keydown.enter="initItem(itemFocus)">
  <div class="input-group-addon"></div>
  <div class="dialog-group list-group list-group-sm" v-if="dialog">
    <!-- <div @click="initItem(data)" class="list-group-item p-2 " :class="focusClass(kdata)" v-for="(data, kdata, ndata) in req.list"> -->
    <div @click="initItem(data)" class="list-group-item p-2 " :class="focusClass(kdata)" v-for="(data, kdata, ndata) in req.list">
      <strong>{{data.properties.title}}</strong> 
    </div>
  </div>

  <modal :id="'modal-player-'+id"></modal>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'flowPlayer',
  props: {
    id: {type: String, default: 'default'}
  },
  computed: {
    ...mapGetters('flowPlayerModule', ['flow', 'dialog', 'focus', 'req', 'itemFocus', 'item', 'suggest'])
  },
  methods: {
    ...mapActions('flowPlayerModule', ['loadFlow', 'setDialog', 'initItem', 'closeDialog', 'reqReq', 'navFocus', 'clearReq']),
    focusClass (id) {
      if (id === this.focus) {
        return 'focus'
      }
    }
  }
}
</script>
<style lang="less">
@colorPlayer: #e1e6e9;
.flow-player{
  background-color: @colorPlayer;
}
.dialog-group{
  position: absolute;
  z-index: 3001;
  margin-top: 32px;
  left: 0;
  width: inherit;
  &,
  .list-group-item{
    &:first-child{
      border-radius: 0px !important;
    }
    background-color: @colorPlayer;
  }
  .list-group-item{
    cursor: pointer;
    color: contrast(@colorPlayer);
    border-color: @colorPlayer !important;
    border-bottom-color: darken(@colorPlayer, 3%) !important;
    border-top-color: darken(@colorPlayer, 3%) !important;

    &:hover,
    &.focus{
        background-color:  darken(@colorPlayer, 3%);
    }
  }
}
</style>