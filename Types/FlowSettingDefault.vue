<template>
<div>
<b-input v-model="operator.properties.title" :disabled="operator.properties.lock" ></b-input>
<div class="form-group">
  <select :disabled="operator.properties.lock" v-model="operator.properties.type" @change="changeType" class="form-control form-control-sm custom-select">
    <option :value="type" v-for="type in types">{{type.name}}</option>  
  </select>
</div>
<div class="form-group">
  <label for="">{{'label.description'|trans}} <b-help style="float: right;" content="Texte de description de la variable retourné"></b-help></label>
  <textarea v-model="operator.properties.description" :disabled="operator.properties.lock" class="form-control" rows="5"></textarea>
</div>
<div class="form-group">
  <label for="">{{'label.helper'|trans}} <b-help style="float: right;" content="Texte d'aide pour le player"></b-help></label>
  <textarea v-model="operator.properties.helper" :disabled="operator.properties.lock" class="form-control" rows="5"></textarea>
</div>
<div class="form-group">
  <label for="">{{'label.filterindex'|trans}} <b-help style="float: right;" content="Index de la valeur a filtrer"></b-help></label>
  <input v-model="operator.properties.filterindex" :disabled="operator.properties.lock" class="form-control" />
</div>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'FlowSettingDefault',
  components: {},
  computed: {
    ...mapGetters('flowModule', ['operator', 'types'])
  },
  methods: {
    ...mapActions('flowModule', ['saveOperator', 'changeType'])
  },
  watch: {
    'operator.properties.title': () => {
      this.saveOperator()
    }
  }
}
</script>
<style lang="less">
</style>