<template>
<span :id="id" class="popover-container" :class="'type-' + flow.data.operators[id]['properties']['type']['name']">
 <button type="button" @click.ctrl="selectOperator(id)" class="badge btn-popover badge-flow-help" data-trigger="click | hover" :data-container="'#'+id" data-toggle="popover" :data-placement="placement" :data-content="id + '. ' + flow.data.operators[id]['properties']['title'] + ' <strong>' + flow.data.operators[id]['properties']['type']['name'] + '</strong><hr><pre>' + flow.data.operators[id]['properties']['description'] + '</pre>'"><i class="icon-type-help"></i> <slot></slot></button>
</span>

</template>
<script>
  import $ from 'jquery'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'flowHelp',
    computed: {
      ...mapGetters('flowModule', ['flow'])
    },
    methods: {
      ...mapActions('flowModule', ['selectOperator'])
    },
    props: {
      id: {type: String, default: ''},
      placement: {type: String, default: 'right'},
      content: {type: String, default: ''},
      popoverclass: {type: String, default: 'primary'}
    },
    mounted () {
      let id = this.id
      $('#' + id + ' .btn-popover').popover({
        animation: false,
        html: true,
        template: `<div class="popover popover-flow-help type-` + this.flow.data.operators[this.id]['properties']['type']['name'] + `" role="tooltip"><div class="popover-content"><i class="icon-type"></i></div></div>`
      })

      $(document).on('click', '.nav-link', (e) => {
        $('#' + id + ' .btn-popover').popover('hide')
      })
    }
  }
</script>
<style lang="less">
</style>