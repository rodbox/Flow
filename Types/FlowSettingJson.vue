<template>
<div>

  <b-input v-model="operator.properties.data.jsonfile" item="{placeholder: 'Json Url'}" :disabled="operator.properties.lock"></b-input>
  <textarea cols="30" rows="10" class="form-control"  placeholder="Json string"  v-model="operator.properties.data.jsoncontent" :disabled="operator.properties.lock"></textarea>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'FlowSettingJson',
  components: {},
  computed: {
    ...mapGetters('flowModule', ['operator', 'types'])
  },
  methods: {
    ...mapActions(['addUi', 'action'])
  }
}
</script>
<style lang="less">
</style>