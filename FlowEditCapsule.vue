<template>
<form action="#"  @submit.prevent="saveCapsule" disabled>
    <div class="alert alert-info">
      Enregistrer un jeu de donné a executer par une fonction
    </div>
    <div class="form-group">
    <label for="" class="title">{{'label.title' |trans}}</label>
    <input type="text" v-model="capsule.title" class="form-control" placeholder="Title">
</div>
    <div class="form-group">
    <label for="">Data</label>
    <table class="table table-sm">
      <tbody>
      <tr v-for="(to, kto, nto) in capsule.data">
        <td>
          <flow-help :id="to.to">{{to.to}}</strong></flow-help>
        </td>
        <td><input type="text" class="form-control"></td>
      </tr>
      </tbody>
    </table>
</div>
    <div class="form-group">
    <textarea  rows="5" class="form-control mb-0" v-model="capsule.description"  placeholder="Description" ></textarea>
</div>
    <button class="btn-primary btn btn-block mt-3">{{'action.save' |trans}}</button>
    </form>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import flowHelp from './FlowHelp.vue'
  export default {
    name: 'flowEditCapsule',
    components: { flowHelp },
    computed: {
      ...mapGetters('flowModule', ['operator', 'capsule'])
    },
    methods: {
      ...mapActions('flowModule', ['saveCapsule'])
      /**
      * TODO : Creer un champ adapté pour chaque type d'operteur a presaisir
      **/
    }
  }
</script>
<style lang="less">
</style>