<template>
 <div class="flow-container" style="margin-top: -6.1rem;" >
  <div class="row form-grey p-1 ">
    <div class="col-3 pr-0">
      <div class="pl-1 ">
        <flow-player :id="flow.title"></flow-player>
      </div>
    </div>
    <div class="col-9 pl-2">
      <nav class="navbar navbar-toggleable-md navbar-light p-0">
        <form action="#" class="form-inline  ">
          <input class="form-control" v-model="flow.title" @keydown.enter.prevent="loadFlow" />
        </form>
        <ul class="navbar-nav mr-auto mt-2 mt-md-0">
          <li class="nav-item active">
           <div class="btn-group ml-1">
            <button class="btn btn-link" @click.prevent="newFlow"><i class="fa fa-file-o"></i></button>
            <button class="btn btn-link" @click.prevent="saveFlow"><i class="fa fa-floppy-o"></i></button>
            <button class="btn btn-link" @click.prevent="loadFlow"><i class="fa fa-folder-o"></i></button>
          </div>
        </li>
        <li class="nav-item">
         <div class="btn-group ml-1">
           <button class="btn btn-link" @click.prevent="createOperator"> <i class="fa fa-plus"></i></button>
           <button class="btn btn-link" @click.prevent="deleteSelected"> <i class="fa fa-trash "></i></button>
         </div>
       </li>
     </ul>
   </nav>
 </div>
</div>
<div class="row" style="margin:0;">
  <div class="col-3" style="max-height: 80vh; " >
    <tabs id="flow-set" class="tabs-sm tabs-white pane-overflow" style="margin-top: 1.3rem; margin-left:-10px; margin-right:-10px;" height="82vh">
      <tab id="flow" :title="'label.project'|trans">
        <flow-setting></flow-setting>
      </tab>
      <tab id="flow-operators" title="Operator" open=true>
        <flow-edit></flow-edit>
      </tab>
      <tab id="flowcapsules" title="Capsules">
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="capsule in lists.capsules">
              <td>
                <modal-button id="capsule" class="text-sm mr-1" title="Capsule" :subtitle="capsule.title" ><i class="fa fa-cloud"></i> <strong>{{capsule.title}}</strong>
      </modal-button> : {{capsule.description}}
              </td>
            </tr>
          </tbody>
        </table>
      </tab>
      <tab id="flowplayerdebug" title="Debug">
        <b-clip>
          <pre>{{hydrate}}</pre>
        </b-clip>
      </tab>
    </tabs>

  </div>
  <div class="col-9 p-0" style="">
    <flow-mouse-menu></flow-mouse-menu>
    <div id="flowbuilder" class="flow-grid" style="width:calc(100% - .3rem); height:calc(86vh - 0.5rem); " @click.stop="mouseHide" @contextmenu.prevent="mouseToggle" @keypress.27="deleteSelected"></div>
  </div>
</div>
<modal id="capsule" size="modal-lg">
    <flow-edit-capsule ></flow-edit-capsule>
  </modal>
</div>
</template>

<script>
  import $ from 'jquery'
  import flowEdit from './FlowEdit.vue'
  import flowSetting from './FlowSetting.vue'
  import FlowEditCapsule from './FlowEditCapsule.vue'
  import flowMouseMenu from './FlowMouseMenu.vue'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'flow',
    components: { flowEdit, flowSetting, flowMouseMenu, FlowEditCapsule },
    computed: {
      ...mapGetters('flowModule', ['flow', 'operator', 'hydrate', 'mouse', 'autoconnect', 'lists'])
    },
    methods: {
      ...mapActions(['addUi', 'action']),
      ...mapActions('flowModule', ['init', 'newFlow', 'saveFlow', 'loadFlow', 'createOperator', 'deleteSelected', 'mouseToggle', 'mouseHide', 'saveFlow', 'autoconnectToggle'])
    },
    mounted () {
      this.addUi({index: 'body', value: 'body-fix'})
      this.init()
      $('body').attr('data-theme', 'dark')
    },
    destroyed () {
      this.removeUi({index: 'body', value: 'body-fix'})
    }
  }
</script>
<style lang="less">
  button {
    &:focus,
    &:hover,
    &:active{
      outline: 0 !important;
    }
  }
  path{
    -webkit-box-shadow: 0 0 0 10px rgba(0,0,0,11);
    box-shadow: 0 0 0 10px rgba(0,0,0,11);
  }
  .popover{
    hr{
      margin: .2rem 0rem;
    }
    pre{
      margin: 0px;
      padding: 0px;
    }
  }
  #flow-operators{
    label{
      font-size: .5rem!!important;
      margin-bottom: 0px;
    }
  }

  .btn.btn-link{
    background-color: transparent !important;
  }
  .flow-grid{
    margin-top: .3rem;
    border-radius: .125rem;
    background-color: #ebedee;
    border: 1px solid darken(#ebedee, 5%);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23454545' fill-opacity='0.12'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    /* background-image: url(http://192.168.1.81/cdn/img/patterns/graphy_transparent.png);  */
    background-size: 50px;
  }
  @scaleSelect: 1.2;
  .flowchart-operator.selected{
  /* -moz-transform: scale(@scaleSelect);
  -webkit-transform: scale(@scaleSelect);
  -o-transform: scale(@scaleSelect);
  -ms-transform: scale(@scaleSelect);
  transform: scale(@scaleSelect); */
}
@arrow: 12;
.flowchart-operator-connector{
  padding-top: 0px !important;
}

.flowchart-operator-outputs {
  .flowchart-operator-connector-arrow {
    right: -8px;
  }

  .flowchart-operator-connector-small-arrow {
    display: none;
  }
}

.flowchart-operator-inputs {
  .flowchart-operator-connector-arrow {
    left: -0px;
  }
  .flowchart-operator-connector-small-arrow {
    left: -3px;
    margin-top: -3px;
  }
}
.tab-pane{
  overflow-x: none;
}


h1.flowchart-editor-operator-title{
  font-size: 1.1rem;
}


.pane-overflow {
  .tab-content > .tab-pane.active {
    max-height: attr('data-height');
    overflow-y: auto;
    overflow-x: hidden;
  }
}
.flow-container{
  margin-top: -3rem;
}
.flowchart-container{
}

.flowchart-operator{
  &:before{
    content: attr(id);
    position: absolute;
    margin-top: -0.8rem;
    margin-left: .3rem;
    font-size: .5rem;
    color: fade(#000, 60%);
  }
  width: 126px;
  border-radius: .3rem;
  border-bottom-width: 0;
  border-top-width: 0;
  border-left: 3px solid #ccc;
  border-right: 3px solid #ccc;

  /* background-color: #ccc; */
  &.selected{
    border-color: #ccc;
    -webkit-box-shadow: 0 0 0 3px rgba(0,0,0,.05);
    box-shadow: 0 0 0 3px rgba(0,0,0,.05);
    z-index: 3001;
  }
  &.ui-draggable-dragging{
    z-index: 3002;
  }
}

.item-form{
  padding-top: 1rem !important;
}

.flowchart-operator-title,
.icon-type-help,
.icon-type{
  &:after,
  &:before{
    font-family: FontAwesome;
    font-style: normal !important;
    font-weight: normal !important;
  }
}
.flowchart-operator[data-lock=true] .flowchart-operator-title {
  &:after {
    position: absolute;
    content: "\f023";
    right: .3rem;
    font-size: .6rem;
    opacity: .3;
  }

}

.flowchart-operator-connector-arrow {
  border-top: 10px solid transparent !important;
  border-bottom: 10px solid transparent !important;
}

.badge-flow-help{
  border-width: 0;
  padding: .3rem;
}

li.select2-selection__choice{
  background-color: #4b1194 !important;
  &,
  *{
    font-size: .7rem !important;
    color: contrast(#4b1194) !important ;
  }
}
@colors : #F76C51, #DC3522, #4EBCDA, #27292C, #009E4D, #98BC73, #878787, #949597, #ffef00, #4b1194, #196ca7, #1f23ad, #046380, #406a87 ;
@names : free, service, list, function, entity, json, route, folder, group, init, flow, form, file, dboperator;
@icons : "\f1dd", "\f02e", "\f03a", "\f121", "\f1c0", "\f02d", "\f018", "\f07b", "\f07b", "\f121", "\f265", "\f0ce", "\f016", "\f0c2" ;


.flowchart-operator{

  .flowchart-operator-title{
    background-color: transparent !important;
    border-width: 0;
    height: 22px;
    padding: .3rem .3rem 0rem .3rem;
    &:before{
      margin-right: 0.3rem !important;
    }
  }
  .flowchart-operator-inputs-outputs{
    margin: 0 !important;
    &,
    * {
      font-size: .7rem;
    }
    .flowchart-operator-connector-label{
      font-size: .5rem;
    }
  }
}

[data-filter] .data-filter{
  display:none;
}

.mixin-loop (@i:1) when (@i <= length(@colors)){
  @name: extract(@names,@i);
  @color: extract(@colors,@i);
  @icon: extract(@icons,@i);


  [data-filter="@{name}"] .data-filter[data-filter="@{name}"]{
    display: inline;
  }

  .popover-container.@{name}{
    *,
    &{
      color: @color !important;
    }
  }

  .c-type-@{name}{
    color: @color;

  }

  .bg-type-@{name}{
    background-color: @color;
  }


  .context-menu.type-@{name},
  .flowchart-operator.type-@{name},
  [data-filter="@{name}"],
  form[data-form-filter-content="@{name}"],
  .card-item-@{name}{
    .flowchart-operator-title,
    .icon-type{
      &:before{
        color:@color !important;
        content: @icon !important;
      }
    }
  }
  


  .flowchart-operator{
    &[data-filter="@{name}"],
    &.type-@{name}{

      &,
      .flowchart-operator-connector-arrow{
        border-color:@color !important;
      }

      .flowchart-operator-connector-arrow{
        width: 0;
        height: 0;
        border-style: solid;
        border-width:unit(@arrow / 2, px) 0 unit(@arrow / 2, px) unit(@arrow /2 , px) !important;
        border-color: transparent transparent transparent @color !important;
      }

      .flowchart-operator-inputs{}

      -webkit-box-shadow: 0 0 0 0 fade(@color,20%) !important;
      box-shadow: 0 0 0 0 fade(@color,20%) !important;

      &.selected{
        -webkit-box-shadow:0 0 0 3px fade(@color,20%) !important;
        box-shadow:   0 0 0 3px fade(@color,20%) !important;
        border-color: darken(@color, 10%) !important;

        background-color: @color !important;
        &,
        *{
          color: contrast(@color) !important;
        }
        .flowchart-operator-connector-label,
        .flowchart-operator-title::before{
          color: fade(contrast(@color), 50%) !important;
        }            
        .flowchart-operator-connector-small-arrow,
        .flowchart-operator-connector-arrow{
          border-color: darken(@color, 10%);
        }
      }
    }
  }
  form[data-form-filter-content="@{name}"]{
    border-top: 5px solid @color !important;
    .nav-link.active{
      //border-top: 2px solid @color !important;
    }
  }
  .popover-flow-help.type-@{name},
  .popover-container.type-@{name}{
    .badge {
      background-color: @color !important;
      border-color: @color !important;
      color: contrast(@color) !important;
    }
    .icon-type-help {
      &:before{
        content: @icon !important;
      }
    }
  }
  .popover-flow-help.type-@{name} {
    background-color: @color !important;
    border-color: @color !important;
    color: contrast(@color) !important;
    .icon-type-help {
      &:before{
        content: @icon !important;
      }
    }
    &.bs-tether-element-attached-left::after,
    &.popover-right::after {
      border-right-color: @color;
    }
  }

  .item-helper-content.type-@{name} th{
    border-bottom-color:@color !important;
  }


  .card-item.card-item-@{name}{
    border-left-color: @color !important;
  }

  .mixin-loop(@i + 1);
}

.mixin-loop();
</style>