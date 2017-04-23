<template>
  <div class="">
    <div class="form-group">
      <label for="">inc</label> {{operatorinc}}
    </div>
    <div class="form-group">
     <label for="">{{'label.description' | trans}}</label>
     <textarea rows="5" class="form-control"></textarea>
   </div>
   <label for="">{{'label.security' | trans}}</label>
   <div class="form-group">
    <b-tag id="flowsecurity" :options="lists.roles"></b-tag>
  </div>
  
  <label for="">Operators</label>
  <table class="table table-sm">
    <tbody>
      <tr v-for="(operator, koperator, noperator) in flow.data.operators">
        <td>
          <a @click.prevent="selectOperator(koperator)" href="#">{{koperator}}. <strong>{{operator.properties.title}}</strong> {{operator.properties.type.name}}</a>
          <button class="btn btn-link btn-sm" @click.prevent="deleteOperator(koperator)"><i class="fa fa-remove text-danger"></i></button>
        </td>
      </tr>
    </tbody>
  </table>

  <label for="">Links</label>
  <table class="table table-sm">
    <tbody>
      <tr v-for="(link, klink, nlink) in flow.data.links">
        <td>
          <a href="#" @click.prevent="selectLink(klink)">link{{klink}} - <strong>{{link.fromOperator}}</strong> <i class="fa fa-arrow-right"></i> <strong>{{link.toOperator}}</strong></a>
          <button class="btn btn-link btn-sm" @click.prevent="deleteLink(klink)"><i class="fa fa-remove text-danger"></i></button>
        </td>
      </tr>
    </tbody>
  </table>

  <label for="">Archives</label>
  <table class="table table-sm">
    <tbody>
      <tr v-for="(archives, karchives, narchives) in flow.archives">
        <td>
          <strong>{{archives.title}}</strong>
          <p classs="mb-0">{{archives.description}}</p>
        </td>
        <td>
          <button class="btn btn-link btn-sm" @click.prevent="restoreArchive(karchive)"><i class="fa fa-upload" aria-hidden="true"></i></button>
          <button class="btn btn-link btn-sm" @click.prevent="deleteArchive(karchive)"><i class="fa fa-remove text-danger"></i></button>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="form-group">
      <label for="">inc</label> {{archives}}
    </div>
  <b-clip>
   <pre>{{flow.data}}</pre>
 </b-clip>
</div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'flowSetting',
    components: {
    },
    computed: {
      ...mapGetters('flowModule', ['flow', 'lists', 'operatorinc'])
    },
    methods: {
      ...mapActions('flowModule', ['setOperator', 'createOperator', 'deleteOperator', 'saveOperator', 'selectOperator', 'selectLink', 'deleteLink', 'restoreArchive', 'deleteArchive'])
    }
  }
</script>
<style lang="less">
</style>